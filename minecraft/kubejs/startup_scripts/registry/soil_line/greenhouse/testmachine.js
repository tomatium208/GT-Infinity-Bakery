const helper = createTieredMachineHelper("PipeTier", () => [
    GTBlocks.CASING_BRONZE_PIPE,
    GTBlocks.CASING_STEEL_PIPE,
    GTBlocks.CASING_TITANIUM_PIPE,
    GTBlocks.CASING_TUNGSTENSTEEL_PIPE,
]);

/**
 *
 * @param {*} holder
 * @returns
 */
function ExampleMachine(holder) {
    /**
     * @type {Internal.WorkableElectricMultiblockMachine &
     * {
     * getTier():number
     * nbt:Internal.CompoundTag
     * }}
     */
    const Logic = {
        // 注意: Javaクラスにこれが生成されるわけではない。Logicオブジェクト内でしか使えない
        nbt: this.getHolder().persistentData,
        // 上と同じ。
        getTier() {
            return this.nbt.getDouble("tier");
        },
        // これらはoverrideしてるので生成される
        /** @override */
        onStructureFormed() {
            // Rhinoの特殊な記法であり、superを呼び出す
            this.super$onStructureFormed();

            helper.getTier(this);

            this.nbt.putDouble("tier", tier);
        },

        /** @override */
        addDisplayText(textList) {
            this.super$addDisplayText(textList);
            if (this.isFormed()) {
                textList.add(
                    Component.translatable(
                        "gtceu.multiblock.example_machine.tier",
                        I18n.get("gtceu.example_machine.tier." + tier)
                    )
                );
            }
        },
    };
    // (Class,Logic,...args)
    // 可変長引数は配列として渡されるので、空配列を渡す
    // 使ったことはないけど(Class,[...Interface],Logic,...args)も可能かも
    // public com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine(com.gregtechceu.gtceu.api.machine.IMachineBlockEntity,java.lang.Object[])
    return new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
}
/**
 * @returns {Internal.RecipeModifier}
 */
function ExampleMachineRecipeModifier() {
    return (machine, recipe) => {
        var nbt = machine.holder.persistentData;
        var tier = nbt.getDouble("tier");
        var recipeTier = recipe.data.getDouble("tier");
        //  tier low
        if (recipeTier > tier) {
            return ModifierFunction.NULL;
        }
        var tierDiff = tier - recipeTier;
        // Parallel count becomes 4 times higher per tier difference where machine tier > required tier.
        var freeParallelAmount = 4 ** tierDiff;
        if (freeParallelAmount > 1) {
            /** @type {number} */
            var parallelAmount = ParallelLogic.getParallelAmount(machine, recipe, freeParallelAmount);
            return ModifierFunction.builder()
                .modifyAllContents(ContentModifier.multiplier(parallelAmount))
                .eutMultiplier(parallelAmount)
                .parallels(parallelAmount)
                .build();
        }
        return ModifierFunction.IDENTITY;
    };
}

GTCEuStartupEvents.registry("gtceu:machine", event => {
    GTRecipeTypes.get("greenhouse").addDataInfo(data => {
        var str = "";

        str += I18n.get(
            "emi_info.kubejs.example_machine.tier",
            I18n.get("gtceu.example_machine.tier." + data.getDouble("tier"))
        );

        return str;
    });

    event
        .create("example_machine", "multiblock")
        .machine(holder => ExampleMachine(holder))
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeTypes("example_machine")
        // もしRecipeModifierで何かを変更する必要があるなら、これは重要です
        // 普通のマルチブロック機械はfalse
        .alwaysTryModifyRecipe(true)
        .recipeModifiers(true, [
            ExampleMachineRecipeModifier(),
            GTRecipeModifiers.OC_NON_PERFECT,
            GTRecipeModifiers.BATCH_MODE,
        ])
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .pattern(definition =>
            FactoryBlockPattern.start()
                .aisle("AAA", "CCC", "AAA")
                .aisle("AAA", "C C", "AMA")
                .aisle("A@A", "CCC", "AAA")
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .where("M", Predicates.machines(GTMachines.MUFFLER_HATCH))
                .where(" ", Predicates.air())
                .where(
                    "A",
                    Predicates.blocks("gtceu:solid_machine_casing")
                        .setMinGlobalLimited(5)
                        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                        .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                )
                .where("C", helper.predicate())
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "block/multiblock/gcym/implosion_compressor"
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
            .create("example_machine")
            .category("multiblock")
            .setEUIO("in")
            .setMaxIOSize(3, 9, 3, 2)
            .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
            .setSound(GTSoundEntries.ELECTROLYZER)
            .setMaxTooltips(6);
    }
);
