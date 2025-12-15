GTCEuStartupEvents.registry('gtceu:machine', event => {

    //event.create('steam_bakery', 'steam')
    //  .recipes('bakery')

    event.create('bakery', 'simple')
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV)
        .definition((tier, builder) =>
            builder
                .recipeType('bakery')
                .workableTieredHullModel('gtceu:block/machines/bakery')
        )

    event.create('sieve', 'simple')
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV)
        .definition((tier, builder) =>
            builder
                .recipeType('sieving')
                .workableTieredHullModel('gtceu:block/machines/sieve')
        )
    
    event.create('particle_accelerator', 'simple')
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV)
        .definition((tier, builder) =>
            builder
                .recipeType('particle_collision')
                .workableTieredHullModel('gtceu:block/machines/particle_accelerator')
        )
    
    event.create('submitter', 'simple')
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV)
        .definition((tier, builder) =>
            builder
                .recipeType('submit')
                .workableTieredHullModel('gtceu:block/machines/submitter')
        )
    
})