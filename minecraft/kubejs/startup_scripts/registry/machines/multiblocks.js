const $SteamMulti = Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.steam.SteamParallelMultiblockMachine');

GTCEuStartupEvents.registry('gtceu:recipe_type', event => {

    event.create("fission")
        .category('fission')
        .setEUIO('out')
        .setMaxIOSize(3, 3, 3, 3)
        .setProgressBar(GuiTextures.PROGRESS_BAR_GAS_COLLECTOR, FillDirection.DOWN_TO_UP)
        .setSound(GTSoundEntries.ARC)

    event.create("cosmic_simulation")
        .category('cosmic_simulation')
        .setEUIO('in')
        .setMaxIOSize(12, 12, 1, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.JET_ENGINE)

})

GTCEuStartupEvents.registry("gtceu:machine", event => {

    event.create('primitive_bakery', 'multiblock')
        .machine((holder) => new $SteamMulti(holder, 8))
        .recipeModifier((machine, recipe) => $SteamMulti.recipeModifier(machine, recipe), true)
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType('bakery')
        .appearanceBlock(GTBlocks.CASING_BRONZE_BRICKS)
        .pattern(definition => FactoryBlockPattern.start()
            .aisle('SSSSS', 'SSSSS', '_SSS_')
            .aisle('SSSSS', 'S___S', 'SSSSS')
            .aisle('SSSSS', 'S___S', 'SSSSS')
            .aisle('SSSSS', 'S___S', 'SSSSS')
            .aisle('SSSSS', 'SS@SS', '_SSS_')
            .where('_', Predicates.any())
            .where('@', Predicates.controller(Predicates.blocks(definition.get())))
            .where('S', Predicates.blocks('gtceu:steam_machine_casing')
                .or(Predicates.abilities(PartAbility.STEAM))
                .or(Predicates.abilities(PartAbility.STEAM_IMPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.STEAM_EXPORT_ITEMS))
            )
            .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_bronze_plated_bricks",
            "gtceu:block/multiblock/primitive_bakery"
        )

    event.create('fission_reactor', 'multiblock')
        .rotationState(RotationState.ALL)
        .recipeType('fission')
        .appearanceBlock(() => Block.getBlock('kubejs:fission_casing'))
        .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH])
        .generator(true)
        .pattern(definition => FactoryBlockPattern.start()
            .aisle("CCCCCCC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CCCCCCM")
            .aisle("CCCCCCC", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GR_R_RG", "CCCCCCC")
            .aisle("CCCCCCC", "G_F_F_G", "G_F_F_G", "G_F_F_G", "G_F_F_G", "G_R_R_G", "CCCCCCC")
            .aisle("CCCCCCC", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GR_R_RG", "CCCCCCC")
            .aisle("CCCCCCC", "G_F_F_G", "G_F_F_G", "G_F_F_G", "G_F_F_G", "G_R_R_G", "CCCCCCC")
            .aisle("CCCCCCC", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GF_F_FG", "GR_R_RG", "CCCCCCC")
            .aisle("@CCCCCC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CGGGGGC", "CCCCCCC")
            .where("_", Predicates.any())
            .where('@', Predicates.controller(Predicates.blocks(definition.get())))
            .where("M", Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
            .where('C', Predicates.blocks("kubejs:fission_casing"))
            .where("G", Predicates.blocks("gtceu:tempered_glass")
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS))
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH))
            )
            .where("F", Predicates.blocks("kubejs:fission_cell"))
            .where("R", Predicates.blocks("kubejs:fission_rod"))
            .build()
        )
        .workableCasingModel(
            "kubejs:block/casings/fission/solid",
            "gtceu:block/multiblock/fusion_reactor"
        )

    event.create('sub-dimensional_singular_furnace', 'multiblock')
        .rotationState(RotationState.ALL)
        .recipeType(GTRecipeTypes.BLAST_RECIPES)
        .appearanceBlock(() => Block.getBlock('kubejs:dimensional_rift'))
        .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH])
        .generator(true)
        .pattern(definition => FactoryBlockPattern.start()
            .aisle("_@GGGGGGGGGGGG")
            .where("_", Predicates.any())
            .where('@', Predicates.controller(Predicates.blocks(definition.get())))
            .where("G", Predicates.blocks("kubejs:dimensional_rift")
                .or(Predicates.abilities(PartAbility.INPUT_ENERGY))
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS))
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH))
            )
            .build()
        )
        .workableCasingModel(
            "kubejs:block/dimensional_rift",
            "gtceu:block/multiblock/fusion_reactor"
        )

})