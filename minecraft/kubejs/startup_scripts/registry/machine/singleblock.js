GTCEuStartupEvents.registry('gtceu:recipe_type', event => {

    event.create('bakery')
        .category('bakery')
        .setEUIO('in')
        .setMaxIOSize(6, 2, 3, 2)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ELECTROLYZER)

    event.create('sieving')
        .category('sieving')
        .setEUIO('in')
        .setMaxIOSize(2, 24, 1, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_EXTRACT, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.COMBUSTION)

    event.create('particle_collision')
        .category('particle_collision')
        .setEUIO('in')
        .setMaxIOSize(2, 1, 2, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_MACERATE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.MACERATOR)

})

GTCEuStartupEvents.registry('gtceu:machine', event => {

    //event.create('steam_bakery', 'steam')
    //  .recipes('bakery')

    event.create('bakery', 'simple')
        .tiers(GTValues.tiersBetween(GTValues.LV, GTValues.OpV))
        .definition((tier, builder) =>
            builder
                .recipeType('bakery')
                .workableTieredHullModel('gtceu:block/machines/bakery')
        )

    event.create('sieve', 'simple')
        .tiers(GTValues.tiersBetween(GTValues.LV, GTValues.OpV))
        .definition((tier, builder) =>
            builder
                .recipeType('sieving')
                .workableTieredHullModel('gtceu:block/machines/sieve')
        )

    event.create('particle_accelerator', 'simple')
        .tiers(GTValues.tiersBetween(GTValues.LV, GTValues.OpV))
        .definition((tier, builder) =>
            builder
                .recipeType('particle_collision')
                .workableTieredHullModel('gtceu:block/machines/particle_accelerator')
        )

})