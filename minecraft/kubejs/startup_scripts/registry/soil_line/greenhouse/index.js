var $I18n = Java.loadClass("net.minecraft.client.resources.language.I18n");
var IRecipeLogicMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.feature.IRecipeLogicMachine");
var RecipeModifier = Java.loadClass("com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifier");
var StairsShape = Java.loadClass("net.minecraft.world.level.block.state.properties.StairsShape");
var $WorkableElectricMultiblockMachine = Java.loadClass(
    "com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine"
);
var $IDisplayUIMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.feature.multiblock.IDisplayUIMachine");
var $HoverEvent = Java.loadClass("net.minecraft.network.chat.HoverEvent");
var $HoverEvent$Action = Java.loadClass("net.minecraft.network.chat.HoverEvent$Action");
var $Style = Java.loadClass("net.minecraft.network.chat.Style");
var $ChatFormatting = Java.loadClass("net.minecraft.ChatFormatting");
var $ComponentPanelWidget = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ComponentPanelWidget");
var Tags = Java.loadClass("dev.latvian.mods.kubejs.util.Tags");
var $List = Java.loadClass("java.util.List");
var $Arrays = Java.loadClass("java.util.Arrays");
var $RecipeLogic$Status = Java.loadClass("com.gregtechceu.gtceu.api.machine.trait.RecipeLogic$Status");
var $ContentModifier = Java.loadClass("com.gregtechceu.gtceu.api.recipe.content.ContentModifier");

/**
 *
 * @param {*} holder
 * @param {number} tier
 * @returns
 */
function greenhouseMachine(holder, tier) {
    /**
     * @type {Internal.WorkableElectricMultiblockMachine &
     * {
     *  getLI(): number,
     *  getSoilPositions():Internal.BlockPos[]
     *  timer:number,
     *  _cached_soilPos: Internal.BlockPos[],
     *
     * }}
     */
    const Logic = {
        timer: 0,
        _cached_soilPos: null,
        // soils
        onStructureFormed() {
            this.super$onStructureFormed();
            console.log("formed!");
            // デフォルト用
            var nbt = this.getHolder().persistentData;
            if (!nbt.contains("greenhouse_lightIntensity")) {
                nbt.putDouble("greenhouse_lightIntensity", 50);
            }

            const newAABB = calcAABB(this.getMultiblockState().getCache());
            const oldAABB = readAABB(nbt);

            // AABB 同じ & soil_positions がある → 再利用
            if (isSameAABB(newAABB, oldAABB) && nbt.contains("soil_positions")) {
                // キャッシュ復活だけ
                this._cached_soilPos = nbt.getLongArray("soil_positions").map(l => BlockPos.of(l));
                return;
            }

            // ここから初回 or 形状変更時のみ
            const soils = scanDirtLike(this.getLevel(), newAABB);

            nbt.putLongArray(
                "soil_positions",
                soils.map(p => p.asLong())
            );
            // キャッシュ用
            writeAABB(nbt, newAABB);
            this._cached_soilPos = soils;
        },

        onStructureInvalid() {
            this.super$onStructureInvalid();
            // キャッシュを削除
            this._cached_soilPos = null;
        },

        getSoilPositions() {
            if (this._cached_soilPos) {
                return this._cached_soilPos;
            }
            const nbt = this.getHolder().persistentData;

            if (nbt.contains("soil_positions") == false) {
                return [];
            }

            const soils = nbt.getLongArray("soil_positions").map(long => BlockPos.of(long));

            this._cached_soilPos = soils;
            return soils;
        },

        onWorking() {
            const result = this.super$onWorking();
            this.timer++;
            // every second
            const soils = this.getSoilPositions();
            if (this.timer % 20 == 0) {
                for (const pos of soils) {
                    toWetFarmland(this.getLevel(), pos);
                }
            }

            return result;
        },
        // light intensity
        addDisplayText(textList) {
            this.super$addDisplayText(textList);
            if (this.isFormed()) {
                textList.add(
                    Component.translatable(
                        "gtceu.multiblock.greenhouse.tier",
                        $I18n.get("gtceu.greenhouse_tier." + tier)
                    )
                );

                var amp = calcEnergyConsumption(this.getLI() / 100);

                var lightIntensityText = Component.translatable(
                    "gtceu.multiblock.greenhouse.light_intensity",
                    $ChatFormatting.AQUA.toString() +
                        this.getLI() +
                        "% (" +
                        $ChatFormatting.RED.toString() +
                        amp.toFixed(1) +
                        "A" +
                        $ChatFormatting.AQUA.toString() +
                        ")"
                ).setStyle(
                    $Style.EMPTY.withHoverEvent(
                        new $HoverEvent(
                            $HoverEvent$Action.SHOW_TEXT,
                            Component.translatable("gtceu.multiblock.greenhouse.light_intensity.tooltip")
                        )
                    )
                );
                textList.add(lightIntensityText);

                var buttonText = Component.translatable("gtceu.multiblock.greenhouse.light_modify");
                buttonText.append(" ");
                buttonText.append($ComponentPanelWidget.withButton(Component.literal("[-]"), "sub"));
                buttonText.append(" ");
                buttonText.append($ComponentPanelWidget.withButton(Component.literal("[+]"), "add"));
                textList.add(buttonText);
            }
        },

        getLI() {
            const nbt = this.getHolder().persistentData;
            if (!nbt.contains("greenhouse_lightIntensity")) {
                nbt.putDouble("greenhouse_lightIntensity", 50);
            }
            return nbt.getDouble("greenhouse_lightIntensity");
        },

        handleDisplayClick(componentData, clickData) {
            if (!clickData.isRemote) {
                var result = componentData == "add" ? 5 : -5;
                const nbt = this.getHolder().persistentData;
                var lightIntensity = this.getLI();
                lightIntensity = clamp(lightIntensity + result, 25, 100);
                nbt.putDouble("greenhouse_lightIntensity", lightIntensity);
            }
        },
    };
    // public com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine(com.gregtechceu.gtceu.api.machine.IMachineBlockEntity,java.lang.Object[])

    return new JavaAdapter($WorkableElectricMultiblockMachine, Logic, holder, []);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Tiered Machine Modifier
 * Checks Recipe.data.tier against Machine tier
 * @param {number} tier
 * @returns {Internal.RecipeModifier}
 */
function tieredModifier(tier) {
    return (_machine, recipe) => {
        // machine.getHolder().persistentData;
        return recipe.data.getLong("tier") > tier ? ModifierFunction.NULL : ModifierFunction.IDENTITY;
    };
}
/**
 * 同じレシピを実行し続けると効率が低下するモディファイア
 * @returns {Internal.RecipeModifier}
 */
function greenhouseModifier() {
    return (machine, recipe) => {
        if (!(machine instanceof IRecipeLogicMachine)) {
            return RecipeModifier.nullWrongType(IRecipeLogicMachine.class, machine);
        }
        const holder = machine.getHolder();
        const nbt = holder.persistentData;
        //#region cast to IRecipeLogicMachine
        /** @type {Internal.IRecipeLogicMachine} */
        const _ = machine;
        //#endregion

        const rl = _.getRecipeLogic();
        const runs = rl.getConsecutiveRecipes();
        const durationMultiplier = 1 / (1.0 - (Math.min(runs, 100) / 100.0) * 0.5);

        const lightIntensityPercent = holder.persistentData.getDouble("greenhouse_lightIntensity");
        // EU/tの50%は光量に依存する

        const optimalLI = recipe.data.getDouble("optimal_light_intensity");
        const isLISensitive = recipe.data.getBoolean("light_intensity_sensitive") || false;
        const LI = nbt.getDouble("greenhouse_lightIntensity");
        if (optimalLI === 0) {
            throw new Error("Greenhouse recipe missing optimal_light_intensity data");
        }
        const result = calcGreenhouse(LI / 100, { opt: optimalLI / 100, rangeLow: rangeLow, brightLoose: brightLoose });
        if (isLISensitive && result.efficiency < 0.5) {
            nbt.putString("last_error", "gtceu.multiblock.greenhouse.error.low_light_intensity");
            return ModifierFunction.NULL;
        }
        const parallel = Math.floor(result.efficiency * 8 + 0.1); // efficiencyが0.99とかのとき8並列にしたい

        const modifier = ModifierFunction.builder()
            .durationMultiplier(durationMultiplier)
            .eutMultiplier(result.I_total);

        if (parallel > 1) {
            // EU消費増加なしで並列するボーナス
            modifier.parallels(parallel).modifyAllContents($ContentModifier.multiplier(parallel));
        }
        return modifier.build();
    };
}
const brightLoose = 2;
const rangeLow = 0.2;
/**
 *
 * @param {number} L 0.25 .. 1.0
 * @param { { opt: number, rangeLow: number, brightLoose: number }} plant
 * @param {number} [gammaPower=2.0]
 * @returns { { efficiency: number, I_total: number} }
 */
function calcGreenhouse(
    L, // 0.25..1.0
    plant
) {
    // 効率（非対称）
    const delta = L - plant.opt;
    const range = delta < 0 ? plant.rangeLow : plant.rangeLow * plant.brightLoose;
    const x = Math.abs(delta) / range;
    const efficiency = Math.max(0, 1 - x * x);

    const t = (L - 0.25) / 0.75; // 0..1
    const I_light = 0.25 + Math.pow(t, 2.0) * 3.25;
    const I_total = 0.5 + I_light;

    return { efficiency: efficiency, I_total: calcEnergyConsumption(L) };
}
function calcEnergyConsumption(L) {
    // 電力（0.5 + 0.25..3.5）
    const t = (L - 0.25) / 0.75; // 0..1
    const I_light = 0.25 + Math.pow(t, 2.0) * 3.25;
    const I_total = 0.5 + I_light;
    return I_total;
}

GTCEuStartupEvents.registry("gtceu:machine", event => {
    GTRecipeTypes.get("greenhouse").addDataInfo(data => {
        var str = "";

        str += $I18n.get("emi_info.kubejs.greenhouse_tier", $I18n.get("gtceu.greenhouse_tier." + data.getByte("tier")));
        str += "\n";
        str += $I18n.get(
            "emi_info.kubejs.greenhouse_optimal_light_intensity",
            data.getDouble("optimal_light_intensity").toFixed(0)
        );
        str += "\n";
        if (data.getBoolean("light_intensity_sensitive")) {
            str += $I18n.get("emi_info.kubejs.greenhouse_light_intensity_sensitive");
        }
        return str;
    });

    event
        .create("greenhouse_t1", "multiblock")
        .machine(holder => greenhouseMachine(holder, 1))
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeTypes("greenhouse")
        .alwaysTryModifyRecipe(true)
        .recipeModifiers(true, [
            tieredModifier(1),
            greenhouseModifier(),
            GTRecipeModifiers.OC_NON_PERFECT,
            GTRecipeModifiers.BATCH_MODE,
        ])
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .pattern(definition =>
            FactoryBlockPattern.start()
                .aisle("AAAAA", "BHHHB", "BCCCB", "BCCCB", "BCCCB", "DDDDD", "     ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "DJJJD", " LLL ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "DJJJD", " LLL ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "DJJJD", " LLL ")
                .aisle("AA@AA", "BCCCB", "BCCCB", "BCCCB", "BCCCB", "DDDDD", "     ")
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .where(" ", Predicates.any())
                .where(
                    "A",
                    Predicates.blocks("gtceu:solid_machine_casing")
                        .setMinGlobalLimited(5)
                        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                )
                .where("B", Predicates.blocks("gtceu:aluminium_frame"))
                .where("C", Predicates.blocks("gtceu:tempered_glass"))
                .where("D", Predicates.blocks("minecraft:stone_brick_stairs"))
                .where(
                    "G",
                    Predicates.blockTag(Tags.block("minecraft:dirt")).or(Predicates.blocks("minecraft:farmland"))
                )
                .where("H", Predicates.blocks("gtceu:steel_firebox_casing"))
                .where("J", Predicates.blocks("minecraft:redstone_lamp"))
                .where("L", Predicates.blocks("minecraft:stone_brick_slab"))
                .build()
        )
        .shapeInfo(controller =>
            MultiblockShapeInfo.builder()
                .aisle("AAAAA", "BHHHB", "BCCCB", "BCCCB", "BCCCB", "MNNNO", "     ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "IJJJK", " LLL ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "IJJJK", " LLL ")
                .aisle("AGGGA", "H   H", "C   C", "C   C", "C   C", "IJJJK", " LLL ")
                .aisle("AA@AA", "BCCCB", "BCCCB", "BCCCB", "BCCCB", "DEEEF", "     ")
                .where("@", controller, Direction.SOUTH)
                // .where("i", GTMachines.ITEM_IMPORT_BUS[1], Direction.SOUTH)
                // .where("%", GTMachines.FLUID_IMPORT_HATCH[1], Direction.SOUTH)
                // .where("o", GTMachines.ITEM_EXPORT_BUS[1], Direction.SOUTH)
                // .where("O", GTMachines.FLUID_EXPORT_HATCH[1], Direction.SOUTH)
                // .where("m", GTMachines.MAINTENANCE_HATCH, Direction.WEST)
                // .where("e", GTMachines.ENERGY_INPUT_HATCH[1], Direction.WEST)
                .where(" ", Blocks.AIR)
                .where("A", GTBlocks.CASING_STEEL_SOLID.get())
                .where("B", Block.getBlock("gtceu:aluminium_frame"))
                .where("C", Block.getBlock("gtceu:tempered_glass"))
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "D",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.SOUTH)
                        .setValue(BlockProperties.STAIRS_SHAPE, StairsShape.OUTER_RIGHT)
                )
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "E",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.NORTH)
                )
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "F",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.EAST)
                        .setValue(BlockProperties.STAIRS_SHAPE, StairsShape.OUTER_RIGHT)
                )
                .where("G", Block.getBlock("minecraft:dirt"))
                .where("H", Block.getBlock("gtceu:steel_firebox_casing"))
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "I",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.EAST)
                )
                .where("J", Block.getBlock("minecraft:redstone_lamp"))
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "K",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.WEST)
                )
                .where("L", Block.getBlock("minecraft:stone_brick_slab"))

                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "M",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.WEST)
                        .setValue(BlockProperties.STAIRS_SHAPE, StairsShape.OUTER_RIGHT)
                )
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "N",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.SOUTH)
                )
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "O",
                    Block.getBlock("minecraft:stone_brick_stairs")
                        .defaultBlockState()
                        .setValue(BlockProperties.HORIZONTAL_FACING, Direction.NORTH)
                        .setValue(BlockProperties.STAIRS_SHAPE, StairsShape.OUTER_RIGHT)
                )
                .build()
        )

        .modelProperty(GTModelProperties.RECIPE_LOGIC_STATUS, $RecipeLogic$Status.IDLE)
        .model(
            GTMachineModels.createWorkableCasingMachineModel(
                "gtceu:block/casings/solid/machine_casing_solid_steel",
                // tmporary
                "gtceu:block/multiblock/gcym/large_sifting_funnel"
            )["andThen(java.util.function.Consumer)"](b =>
                b.addDynamicRenderer(() =>
                    GTDynamicRenders.makeGrowingPlantRender(
                        $List.of(
                            new Vector3f(-1, 1, -1),
                            new Vector3f(0, 1, -1),
                            new Vector3f(1, 1, -1),
                            new Vector3f(-1, 1, -2),
                            new Vector3f(0, 1, -2),
                            new Vector3f(1, 1, -2),
                            new Vector3f(-1, 1, -3),
                            new Vector3f(0, 1, -3),
                            new Vector3f(1, 1, -3)
                        )
                    )
                )
            )
        );

    event
        .create("greenhouse_t2", "multiblock")
        .machine(holder => greenhouseMachine(holder, 2))
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeTypes("greenhouse")
        .alwaysTryModifyRecipe(true)
        .recipeModifiers(true, [
            GTRecipeModifiers.OC_NON_PERFECT,
            GTRecipeModifiers.BATCH_MODE,
            tieredModifier(2),
            greenhouseModifier(),
        ])
        .appearanceBlock(GTBlocks.CASING_TUNGSTENSTEEL_ROBUST)
        .pattern(definition =>
            FactoryBlockPattern.start()
                .aisle(
                    "BBBBBBBBB AAA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB AAA",
                    "BBBBBBBBB    "
                )
                .aisle(
                    "EFFFFFFFE AAA",
                    "DGGGGGGGD CAC",
                    "DHHHHHHHD CAC",
                    "D       D CAC",
                    "DHHHHHHHD CAC",
                    "D       D AAA",
                    "EIIIIIIIE    "
                )
                .aisle(
                    "EFFFFFFFE AAA",
                    "DGGGGGGGJJAAA",
                    "D       D AAA",
                    "D       JJAAA",
                    "D       D AAA",
                    "D       D AAA",
                    "EKKKKKKKE    "
                )
                .aisle(
                    "EFFFFFFFE AAA",
                    "DGGGGGGGD CAC",
                    "DHHHHHHHD CAC",
                    "D       D CAC",
                    "DHHHHHHHD CAC",
                    "D       D AAA",
                    "EIIIIIIIE    "
                )
                .aisle(
                    "BBBBBBBBB AAA",
                    "BBBB@BBBB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB ACA",
                    "BDDDDDDDB AAA",
                    "BBBBBBBBB    "
                )
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .where(" ", Predicates.any())
                .where("A", Predicates.blocks("kubejs:greenhouse_casing_mk2"))
                .where(
                    "B",
                    Predicates.blocks("gtceu:robust_machine_casing")
                        .setMinGlobalLimited(12)
                        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                )
                .where("C", Predicates.blocks("ae2:spatial_pylon"))
                .where("D", Predicates.blocks("gtceu:tempered_glass"))
                .where("E", Predicates.blocks("gtceu:tungstensteel_firebox_casing"))
                .where("F", Predicates.blocks("kubejs:greenhouse_casing_mk2"))
                .where(
                    "G",
                    Predicates.blockTag(Tags.block("minecraft:dirt")).or(Predicates.blocks("minecraft:farmland"))
                )
                .where("H", Predicates.blocks("gtceu:stainless_steel_frame"))
                .where("I", Predicates.blocks("gtceu:white_lamp"))
                .where("J", Predicates.blocks("gtceu:titanium_pipe_casing"))
                .where("K", Predicates.blocks("gtceu:filter_casing"))
                .build()
        )
        .modelProperty(GTModelProperties.RECIPE_LOGIC_STATUS, $RecipeLogic$Status.IDLE)
        .model(
            GTMachineModels.createWorkableCasingMachineModel(
                "gtceu:block/casings/solid/machine_casing_robust_tungstensteel",
                "gtceu:block/multiblock/implosion_compressor"
            )["andThen(java.util.function.Consumer)"](b =>
                b.addDynamicRenderer(() => {
                    var array = [];
                    // 7列
                    for (let x = -3; x <= 3; x++) {
                        array.push(new Vector3f(x, 2, -1));
                        array.push(new Vector3f(x, 4, -1));
                        array.push(new Vector3f(x, 2, -3));
                        array.push(new Vector3f(x, 4, -3));
                    }

                    return GTDynamicRenders.makeGrowingPlantRender($Arrays.asList(array));
                })
            )
        );
});

GTCEuStartupEvents.registry(
    "gtceu:recipe_type",
    /**
     *
     * @param {Internal.GTRegistryEventJS<any, Internal.GTRecipeType>} event
     */
    event => {
        event
            .create("greenhouse")
            .category("multiblock")
            .setEUIO("in")
            .setMaxIOSize(3, 9, 3, 2)
            .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
            .setSound(GTSoundEntries.ELECTROLYZER)
            .setMaxTooltips(6);
    }
);
