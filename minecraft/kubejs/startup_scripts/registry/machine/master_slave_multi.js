/**
 * @typedef {{nbt(): Internal.CompoundTag}} HasNBT
 */

function MasterMulti(holder) {
    /** @type {Internal.WorkableElectricMultiblockMachine & HasNBT} */
    const Logic = {
        nbt() {
            return this.holder.persistentData;
        },
        // 形成時、Predicateで取得した子機のインスタンスにnbtを書き込む
        onStructureFormed() {
            this.super$onStructureFormed();
            const children = this.getMultiblockState().getMatchContext().getOrDefault("child_positions", []);
            for (const pos of children) {
                getMachine(this.level, pos).holder.persistentData.putLong("parent_pos", this.getPos().asLong());
            }
        },
    };
    return new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
}

/**
 *
 * @param parentMachine
 * @returns
 */
function WirelessEnergy(slaveLogic) {
    function getParent() {
        return slaveLogic.getParent();
    }
    function getEnergyStored() {
        return getParent().energyContainer.energyStored;
    }
    function getInputAmperage() {
        return 2;
    }
    function getOutputAmperage() {}
    /** @type {Internal.IRecipeHandler<EnergyStack>} */
    const Logic = {
        handleRecipeInner(io, recipe, left, simulate) {
            if (io != IO.IN) return left;
            const it = left.listIterator();
            while (it.hasNext()) {
                var stack = it.next();
                if (stack.isEmpty()) {
                    it.remove();
                    continue;
                }
                var totalEU = stack.totalEU();
                var availableEU = getEnergyStored();
                var canTransfer = Math.min(totalEU, availableEU);
                if (!simulate) {
                    getParent().energyContainer.removeEnergy(canTransfer);
                }
                totalEU -= canTransfer;
                if (totalEU <= 0) {
                    it.remove();
                } else {
                    it.set(new EnergyStack(totalEU));
                }
            }
            return left.isEmpty() ? null : left;
        },
        getContents() {
            var amperage = getInputAmperage();
            return Collections.singletonList(EnergyContainerList.calculateVoltageAmperage(getEnergyStored(), amperage));
        },
        getTotalContentAmount() {
            return getEnergyStored();
        },
        getCapability() {
            return EURecipeCapability.CAP;
        },
    };
    return new JavaAdapter(IRecipeHandler, Logic);
}

function SlaveMulti(holder) {
    /** @type {Internal.TickableSubscription} */
    var _tickSubscription = null;
    var _wirelessEnergy = null;
    /** @type {Internal.WorkableElectricMultiblockMachine & HasNBT & { getLinkState():"not_detected" | "not_active" | "active", getParentPos(): BlockPos | null; getParent(): Internal.WorkableElectricMultiblockMachine | null; forceloadPos(pos: BlockPos);unForceloadPos(pos: BlockPos); }} */
    const Logic = {
        nbt() {
            return this.holder.persistentData;
        },

        getParentPos() {
            if (this.nbt().contains("parent_pos")) {
                const parentPos = this.nbt().getLong("parent_pos");
                return BlockPos.of(parentPos);
            }
            return null;
        },
        getParent() {
            const pos = this.getParentPos();
            if (pos) {
                return getMachine(this.level, pos);
            }
            return null;
        },
        getLinkState() {
            const machine = this.getParent();
            if (!machine) return "not_detected";
            return machine.isActive() ? "active" : "not_active";
        },
        ////////////////// Forceloading Helper //////////////////
        _forced: false,
        forceloadPos(pos) {
            if (this.isRemote() || this._forced) return;
            const cp = new ChunkPos(pos);
            ForgeChunkManager[
                "forceChunk(net.minecraft.server.level.ServerLevel,java.lang.String,net.minecraft.core.BlockPos,int,int,boolean,boolean)"
            ](this.level, "kubejs", this.getPos(), cp.x, cp.z, true, true);
            this._forced = true;
        },
        unForceloadPos(pos) {
            if (this.isRemote() || !this._forced) return;
            const cp = new ChunkPos(pos);
            ForgeChunkManager[
                "forceChunk(net.minecraft.server.level.ServerLevel,java.lang.String,net.minecraft.core.BlockPos,int,int,boolean,boolean)"
            ](this.level, "kubejs", this.getPos(), cp.x, cp.z, false, true);
            this._forced = false;
        },
        ///////////////// Forceloading Hooks //////////////////
        onLoad() {
            this.super$onLoad();
            const pos = this.getParentPos();
            if (pos) {
                this.forceloadPos(pos);
            }
        },
        onUnload() {
            this.super$onUnload();
            const pos = this.getParentPos();
            if (pos) {
                this.unForceloadPos(pos);
            }
        },

        onStructureFormed() {
            this.super$onStructureFormed();
            if (this.isRemote()) return;

            var tick = 0;
            _tickSubscription = this.subscribeServerTick(() => {
                if (tick % 20 === 0) {
                    // 親がnbtにあってかつMetaMachineとして発見できる = 親と看做せる
                    if (this.getParent()) {
                        // 親を見つけた
                        this.forceloadPos(this.getParentPos());
                    } else {
                        // 親がいなくなった
                        this.unForceloadPos(this.getParentPos());
                        this.nbt().remove("parent_pos");
                        _wirelessEnergy = null;
                    }
                }
                tick++;
            });
        },
        onStructureInvalid() {
            this.super$onStructureInvalid();
            if (this.isRemote()) return;

            _tickSubscription.unsubscribe();
            _tickSubscription = null;
            _wirelessEnergy = null;
        },

        ///////////////// Wireless Energy //////////////////
        getWirelessEnergy() {
            if (_wirelessEnergy == null) {
                _wirelessEnergy = WirelessEnergy(this);
            }
            return _wirelessEnergy;
        },
        // ここにアクセスする段階では必ず親がいるはずだったんですが
        getCapabilitiesFlat(io, cap) {
            console.log("SlaveMulti getCapabilitiesFlat", io, cap);
            if (arguments.length === 0) {
                return this.super$getCapabilitiesFlat();
            }

            if (cap === EURecipeCapability.CAP && io === IO.IN) {
                return Collections.singletonList(this.getWirelessEnergy());
            }

            return this.super$getCapabilitiesFlat(io, cap);
        },

        addDisplayText(textList) {
            this.super$addDisplayText(textList);
            if (this.isFormed()) {
                textList.add(Component.translatable("gtceu.ms." + this.getLinkState()));
            }
        },

        beforeWorking(recipe) {
            const result = this.super$beforeWorking(recipe);
            if (!result) return false;

            const linkedState = this.getLinkState();
            if (linkedState === "not_detected") return false;
            if (linkedState === "not_active") return false;

            return true;
        },
    };
    return new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
}

/**
 * 不正アサーションしてるけど許してね
 * @param {Internal.BlockGetter} level
 * @param {BlockPos_} pos
 * @returns {Internal.WorkableElectricMultiblockMachine}
 */
function getMachine(level, pos) {
    return MetaMachine.getMachine(level, pos);
}

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event
        .create("ms_master")
        .category("util")
        .setEUIO("in")
        .setMaxIOSize(0, 0, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ARC);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {
    event
        .create("ms_master", "multiblock")
        .machine(holder => MasterMulti(holder))
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("ms_master")
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .pattern(definition =>
            FactoryBlockPattern.start()
                .aisle("   AAA   ", "    X    ")
                .aisle("  AAAAA  ", "  X   X  ")
                .aisle(" AAAAAAA ", "         ")
                .aisle(" AAAAAAA ", " X  @  X ")
                .aisle(" AAAAAAA ", "         ")
                .aisle("  AAAAA  ", "  X   X  ")
                .aisle("   AAA   ", "    X    ")
                .where(
                    "A",
                    Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
                        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                        .or(Predicates.ability(PartAbility.MAINTENANCE))
                )
                .where(
                    "X",
                    Predicates.custom(
                        blockWorldState => {
                            var blockState = blockWorldState.getBlockState();

                            if (blockState.is(GTBlocks.CASING_STAINLESS_CLEAN.get())) {
                                return true;
                            }
                            if (blockState.is(Block.getBlock("gtceu:ms_slave"))) {
                                var child_positions = blockWorldState.getMatchContext().getOrPut("child_positions", []);
                                child_positions.push(blockWorldState.getPos());
                                return true;
                            }
                            return false;
                        },
                        () =>
                            convertToJavaArray(
                                [GTBlocks.CASING_STAINLESS_CLEAN.get(), Block.getBlock("gtceu:ms_slave")].map(entry =>
                                    BlockInfo.fromBlock(entry)
                                ),
                                BlockInfo
                            )
                    )
                )
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_stable_titanium",
            "gtceu:block/multiblock/implosion_compressor"
        );

    event
        .create("ms_slave", "multiblock")
        .machine(holder => SlaveMulti(holder))
        .recipeTypes(["assembler", "circuit_assembler"])
        .recipeModifiers(true, [
            GTRecipeModifiers.PARALLEL_HATCH,
            GTRecipeModifiers.OC_NON_PERFECT,
            GTRecipeModifiers.BATCH_MODE,
        ])
        .rotationState(RotationState.NON_Y_AXIS)
        .appearanceBlock(GTBlocks.CASING_STAINLESS_CLEAN)
        .pattern(definition =>
            FactoryBlockPattern.start()
                .aisle("C", "C", "C")
                .aisle("@", "C", "C")
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .where(
                    "C",
                    Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get())
                        .or(
                            Predicates.abilities(
                                PartAbility.IMPORT_ITEMS,
                                PartAbility.IMPORT_FLUIDS,
                                PartAbility.EXPORT_ITEMS,
                                PartAbility.EXPORT_FLUIDS
                            )
                        )
                        .or(Predicates.ability(PartAbility.MAINTENANCE).setExactLimit(1))
                        .or(Predicates.ability(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
                )
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_clean_stainless_steel",
            "gtceu:block/multiblock/blast_furnace"
        );
});
