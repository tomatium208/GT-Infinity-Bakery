/**
 * @typedef {{nbt(): Internal.CompoundTag}} HasNBT
 */

function MasterMultiblockMachine(holder) {
    /** @type {SlaveMultiMachine[]} */
    var _children = [];
    /** @type {Internal.WorkableElectricMultiblockMachine & HasNBT} */
    const Logic = {
        nbt() {
            return this.holder.persistentData;
        },
        ////////////////// 形成時、解体時の子機との紐付け管理 //////////////////
        onStructureFormed() {
            this.super$onStructureFormed();
            console.log("master structure formed");
            const children = this.getMultiblockState().getMatchContext().getOrDefault("children", []);
            _children = children;
            for (const machine of children) {
                machine.setParent(this);
            }
        },

        onUnload() {
            this.super$onUnload();
            for (const child of _children) {
                child.removeParent();
            }
        },
    };
    return new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
}

/**
 * ワイヤレスエネルギー供給を行うMachineTraitを生成する
 * @param {SlaveMultiMachine} slaveMachine
 * @param {number} tier
 * @returns
 */
function WirelessEnergyHandlerMachineTrait(slaveMachine, tier) {
    const tierVoltage = GTValues.V[tier];
    function _getEnergyStored() {
        const parent = slaveMachine.getParent();
        if (parent == null) {
            return 0;
        }
        const energyContainer = parent.getEnergyContainer();

        if (energyContainer == null) {
            return 0;
        }
        return energyContainer.getEnergyStored();
    }

    var _managedFieldHolder = null;
    var _tickSubscription = null;
    var listeners = new ArrayList();
    var lastEnergyOutputPerSec = 0,
        lastEnergyInputPerSec = 0,
        energyOutputPerSec = 0,
        energyInputPerSec = 0;

    /** @type {Internal.NotifiableRecipeHandlerTrait<EnergyStack> & Internal.IEnergyContainer} */
    const Logic = {
        //// MachineTrait ////
        ////////////////// IManaged ////////////////
        // なんでか知らないけど再実装した方がいいらしい
        getFieldHolder() {
            if (_managedFieldHolder == null) {
                _managedFieldHolder = new ManagedFieldHolder(this.getClass());
            }
            return _managedFieldHolder;
        },

        ////////////////// IRecipeHandlerTrait //////////////////
        getHandlerIO() {
            return IO.IN;
        },
        addChangedListener(listener) {
            listeners.add(listener);
            return () => listeners.remove(listener);
        },
        ////////////////// IRecipeHandler //////////////////
        handleRecipeInner(io, recipe, left, isSimulate) {
            if (io != IO.IN) return left;
            const iter = left.listIterator();
            while (iter.hasNext()) {
                var stack = iter.next();
                if (stack.isEmpty()) {
                    iter.remove();
                    continue;
                }
                var totalEU = stack.totalEU;
                var availableEU = this.getEnergyStored();
                var canTransfer = Math.min(totalEU, availableEU);
                if (!isSimulate) {
                    var parent = slaveMachine.getParent();
                    if (parent) {
                        parent.energyContainer.removeEnergy(canTransfer);
                    }
                }
                totalEU -= canTransfer;
                if (totalEU <= 0) {
                    iter.remove();
                } else {
                    iter.set(new EnergyStack(totalEU));
                }
            }
            return left.isEmpty() ? null : left;
        },
        getContents() {
            var amperage = this.getInputAmperage();
            return Collections.singletonList(
                EnergyContainerList.calculateVoltageAmperage(this.getEnergyStored(), amperage)
            );
        },
        getTotalContentAmount() {
            return this.getEnergyStored();
        },
        getCapability() {
            return EURecipeCapability.CAP;
        },
        ///////////////// IEnergyContainer //////////////////
        onMachineLoad() {
            this.super$onMachineLoad();
            this.getMachine().subscribeServerTick(_tickSubscription, () => this.updateTick());
        },
        onMachineUnLoad() {
            this.super$onMachineUnLoad();
            if (_tickSubscription) {
                _tickSubscription.unsubscribe();
                _tickSubscription = null;
            }
        },
        updateTick() {
            if (this.getMachine().getOffsetTimer() % 20 == 0) {
                lastEnergyOutputPerSec = energyOutputPerSec;
                lastEnergyInputPerSec = energyInputPerSec;
                energyOutputPerSec = 0;
                energyInputPerSec = 0;
            }
        },

        getInputVoltage() {
            return tierVoltage;
        },
        // 仮にこれがシングルブロックだったら1だったけどマルチブロックのエネルギーハッチの代わりなので多分2が正解。
        getInputAmperage() {
            return 2;
        },

        getEnergyCapacity() {
            // 基本定なエネルギーコンテナのサイズがvoltage * 16 * amp EUだからそれに合わせる
            return tierVoltage * 16 * this.getInputAmperage();
        },
        // キャパ以上のエネルギーを持つはずないよね
        getEnergyStored() {
            return Math.min(_getEnergyStored(), this.getEnergyCapacity());
        },

        getInputPerSec() {
            return lastEnergyInputPerSec;
        },
        getOutputPerSec() {
            return lastEnergyOutputPerSec;
        },
        // 果たしてこれ実装するべきなんだろうか よくわかってないけどまあいいや 実装しとこ
        changeEnergy(delta) {
            const parent = slaveMachine.getParent();
            if (!parent) return 0;

            const energyContainer = parent.getEnergyContainer();
            if (!energyContainer) return 0;

            const oldEnergy = this.getEnergyStored();
            const cap = this.getEnergyCapacity();

            // clamp
            const newEnergy = cap - oldEnergy < delta ? cap : oldEnergy + delta;

            const diff = newEnergy - oldEnergy;
            if (diff === 0) return 0;

            // 統計
            if (diff > 0) {
                energyInputPerSec += diff;
            } else {
                energyOutputPerSec -= diff;
            }

            // 実体反映（唯一の変更点）
            const changed = energyContainer.changeEnergy(diff);

            this.notifyListeners();
            return changed;
        },
        // マルチブロック機械はエネルギーを自分で受け取ることができない
        acceptEnergyFromNetwork(direction, voltage, amperage) {
            return 0;
        },
        inputsEnergy(direction) {
            return false;
        },
    };
    // MachineTrait(MetaMachine machine)
    /** @type {WirelessEnergyAcceptor} */
    const adapter = new JavaAdapter(NotifiableRecipeHandlerTrait, IEnergyContainer, Logic, slaveMachine);

    return adapter;
}
///////////////////////////////////////////////////////////////////////////////
// Slave Multiblock Machine
// parentはonMultiblockFormedでbindされるからステートレス
// FORCED_POSは親マルチブロックの位置を記憶しておいて
///////////////////////////////////////////////////////////////////////////////
/***/
function SlaveMultiblockMachine(holder) {
    /** @type {Internal.TickableSubscription} */
    var _tickSubscription = null;
    /** @type {SlaveMultiMachine} */
    const Logic = {
        _parent: null,
        nbt() {
            return this.holder.persistentData;
        },
        setParent(parent) {
            this._parent = parent;
        },
        removeParent() {
            this._parent = null;
        },
        getParent() {
            return this._parent;
        },
        getLinkState() {
            const machine = this.getParent();
            if (!machine) return "not_detected";
            return machine.isActive() ? "active" : "not_active";
        },
        onStructureFormed() {
            this.super$onStructureFormed();
            if (this.isRemote()) return;

            _tickSubscription = this.subscribeServerTick(() => this.serverTick());
        },
        serverTick() {
            // currently do nothing
        },
        onStructureInvalid() {
            this.super$onStructureInvalid();
            if (this.isRemote()) return;
            _tickSubscription.unsubscribe();
            _tickSubscription = null;
        },
        addDisplayText(textList) {
            this.super$addDisplayText(textList);
            if (this.isFormed()) {
                textList.add(Component.translatable("gtceu.ms." + this.getLinkState()));
                textList.add(Component.literal("Usable Energy: " + this.getEnergyContainer().energyStored + " EU"));
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

    const adapter = new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
    WirelessEnergyHandlerMachineTrait(adapter, GTValues.ZPM);
    // コンストラクタ呼び出しだけでも大丈夫
    return adapter;
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
        .machine(holder => MasterMultiblockMachine(holder))
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("ms_master")
        .noRecipeModifier()
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
                                var children = blockWorldState.getMatchContext().getOrPut("children", []);
                                var machine = MetaMachine.getMachine(
                                    blockWorldState.getWorld(),
                                    blockWorldState.getPos()
                                );
                                machine && children.push(machine);
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
        .machine(holder => SlaveMultiblockMachine(holder))
        .recipeTypes([
            "assembler",
            "circuit_assembler",
            "bender",
            "wiremill",
            "lathe",
            "mixer",
            "extruder",
            "polarizer",
            "vacuum_freezer",
        ])
        .recipeModifiers(true, [
            GTRecipeModifiers.PARALLEL_HATCH,
            GTRecipeModifiers.OC_NON_PERFECT_SUBTICK,
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

/*
forceload things

        ////////////////// Forceloading Helper //////////////////
        _forced: false,
        forceloadParent() {
            if (this.isRemote() || this._forced) return;
            const pos = this.getParentPosForForceload();
            if (!pos) return;
            const cp = new ChunkPos();
            ForgeChunkManager[
                "forceChunk(net.minecraft.server.level.ServerLevel,java.lang.String,net.minecraft.core.BlockPos,int,int,boolean,boolean)"
            ](this.level, "kubejs", this.getPos(), cp.x, cp.z, true, true);
            this._forced = true;
        },
        unForceloadParent() {
            // このメソッドがすでにunload後に呼ばれると死にます。でもthis._forcedがすでにfalseになってるはずなので安全だけど…
            if (this.isRemote() || !this._forced) return;

            const pos = this.getParentPosForForceload();
            if (!pos) return;
            const cp = new ChunkPos(pos);
            ForgeChunkManager[
                "forceChunk(net.minecraft.server.level.ServerLevel,java.lang.String,net.minecraft.core.BlockPos,int,int,boolean,boolean)"
            ](this.level, "kubejs", this.getPos(), cp.x, cp.z, false, true);
            this._forced = false;
        },

        ///////////////// Forceloading Hooks //////////////////
        onLoad() {
            this.super$onLoad();
        },
        onUnload() {
            this.super$onUnload();
        },


*/
