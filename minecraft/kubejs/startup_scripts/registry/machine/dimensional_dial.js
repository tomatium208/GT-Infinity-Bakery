GTCEuStartupEvents.registry("gtceu:machine", event => {
    const CUSTOM_PREDICATE = Predicates.custom(
        blockWorldState => {
            var blockState = blockWorldState.getBlockState();
            if (blockState.is(Block.getBlock("kubejs:absolute_dimension_anchor_casing"))) {
                return true;
            }
            if (
                [
                    Block.getBlock("gtceu:dimensional_harvestor_module_luv"),
                    Block.getBlock("gtceu:dimensional_harvestor_module_zpm"),
                    Block.getBlock("gtceu:dimensional_harvestor_module_uv"),
                ].some(block => blockState.is(block))
            ) {
                var children = blockWorldState.getMatchContext().getOrPut("children", []);
                var machine = MetaMachine.getMachine(blockWorldState.getWorld(), blockWorldState.getPos());
                machine && children.push(machine);
                return true;
            }
            return false;
        },
        () =>
            convertToJavaArray(
                [
                    Block.getBlock("kubejs:absolute_dimension_anchor_casing"),
                    Block.getBlock("gtceu:dimensional_harvestor_module_luv"),
                    Block.getBlock("gtceu:dimensional_harvestor_module_zpm"),
                    Block.getBlock("gtceu:dimensional_harvestor_module_uv"),
                ].map(entry => BlockInfo.fromBlock(entry)),
                BlockInfo
            )
    );

    event
        .create("dimensional_dial", "multiblock")
        .machine(holder => MasterMultiblockMachine(holder))
        .recipeTypes(["dimensional_dial"])
        .noRecipeModifier()
        .rotationState(RotationState.NON_Y_AXIS)
        .appearanceBlock(() => Block.getBlock("kubejs:absolute_dimension_anchor_casing"))
        .pattern(definition =>
            /** @type {FactoryBlockPattern} */ (DIMENSIONAL_DIAL_PATTERN)
                .where(
                    "A",
                    Predicates.blocks("kubejs:absolute_dimension_anchor_casing")
                        // .setMinGlobalLimited(1600)
                        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                    // .or(Predicates.ability(PartAbility.MAINTENANCE).setExactLimit(1))
                    // .or(Predicates.ability(PartAbility.INPUT_LASER))
                )
                .where("B", Predicates.blocks("gtceu:nonconducting_casing"))
                .where("C", Predicates.blocks("kubejs:dimension_connection_casing"))
                .where("D", Predicates.blocks("gtceu:atomic_casing"))
                .where("E", Predicates.blocks("gtceu:fusion_glass"))
                .where("F", Predicates.blocks("kubejs:multi_dimensional_machine_casing"))
                .where("G", Predicates.blocks("kubejs:dimensional_rift"))
                .where(" ", Predicates.any())
                .where("&", Predicates.any())
                .where("I", Predicates.blocks("gtceu:neutronium_frame"))
                .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                .where("%", CUSTOM_PREDICATE)
                .build()
        )
        .workableCasingModel("kubejs:block/casings/solid/anchor", "gtceu:block/multiblock/fusion_reactor");

    for (const tier of GTValues.tiersBetween(GTValues.LuV, GTValues.UV)) {
        // varのスコープを切るためにIIFEを使用。constは内部ではvarなのでvarと一緒です。おのれRhino
        (tier => {
            event
                .create("dimensional_harvestor_module_" + voltages[tier], "multiblock")
                .machine(holder => SlaveMultiblockMachine(holder, tier))
                .recipeTypes(["dimensional_harvesting"])
                .recipeModifiers(true, [GTRecipeModifiers.OC_NON_PERFECT_SUBTICK, GTRecipeModifiers.BATCH_MODE])
                .rotationState(RotationState.NON_Y_AXIS)
                .appearanceBlock(() => Block.getBlock("kubejs:absolute_dimension_anchor_casing"))
                .pattern(definition =>
                    FactoryBlockPattern.start()
                        .aisle("A", "A", "A", "A")
                        .aisle("A", "A", "@", "A")
                        .where(
                            "A",
                            Predicates.blocks("kubejs:absolute_dimension_anchor_casing")
                                .or(
                                    Predicates.abilities(
                                        PartAbility.IMPORT_ITEMS,
                                        PartAbility.IMPORT_FLUIDS,
                                        PartAbility.EXPORT_ITEMS,
                                        PartAbility.EXPORT_FLUIDS,
                                        PartAbility.COMPUTATION_DATA_RECEPTION
                                    )
                                )
                                .or(Predicates.ability(PartAbility.MAINTENANCE).setExactLimit(1))
                        )
                        .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                        .build()
                )
                .workableCasingModel("kubejs:block/casings/solid/anchor", "gtceu:block/multiblock/fusion_reactor");
        })(tier);
    }
});

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event
        .create("dimensional_dial")
        .category("interdimensional")
        .setEUIO("in")
        .setMaxIOSize(0, 0, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ARC);

    event
        .create("dimensional_harvesting")
        .category("interdimensional")
        .setEUIO("in")
        .setMaxIOSize(2, 9, 2, 9)
        .setProgressBar(GuiTextures.PROGRESS_BAR_EXTRACT, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.SUS_RECORD);
});
