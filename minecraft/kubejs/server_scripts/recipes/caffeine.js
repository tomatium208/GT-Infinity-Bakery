ServerEvents.recipes(event => {
    const gtceu = event.recipes.gtceu;
    gtceu
        .extractor("crude_caffeine_extract")
        .itemInputs("cocoa_beans")
        .outputFluids(Fluid.of("gtceu:crude_caffeine_extract", GTValues.L * 2));

    gtceu
        .centrifuge("unrefined_caffeine_solution")
        .inputFluids("gtceu:crude_caffeine_extract 144")
        .chancedOutput("gtceu:small_cocoa_dust", 4000, 0)
        .outputFluids("gtceu:unrefined_caffeine_solution 144");

    gtceu
        .distillery("concentrated_caffeine_solution")
        .inputFluids("gtceu:unrefined_caffeine_solution 288")
        .outputFluids("gtceu:concentrated_caffeine_solution 144");
    gtceu
        .autoclave("caffeine_bad")
        .itemInputs("gtceu:tiny_nether_quartz_dust")
        .inputFluids("gtceu:concentrated_caffeine_solution 144")
        .chancedOutput("gtceu:tiny_caffeine_dust", 2000, 0);
    gtceu
        .autoclave("caffeine_good")
        .notConsumable("gtceu:tiny_caffeine_dust")
        .inputFluids("gtceu:concentrated_caffeine_solution 144")
        .itemOutputs("gtceu:caffeine_dust");

    gtceu
        .autoclave("carbonated_water")
        .itemInputs("minecraft:water_bucket")
        .inputFluids("gtceu:carbon_dioxide 1000")
        .itemOutputs("gtceu:carbonated_water_bucket");
    // infomation
    gtceu
        .canner("fill_water")
        .itemInputs("minecraft:bucket")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("minecraft:water_bucket")
        .EUt(4)
        .duration(16);
    gtceu
        .canner("drain_carbonated_water")
        .itemInputs("gtceu:carbonated_water_bucket")
        .itemOutputs("minecraft:bucket")
        .outputFluids("gtceu:carbonated_water 1000")
        .EUt(4)
        .duration(16);
});
