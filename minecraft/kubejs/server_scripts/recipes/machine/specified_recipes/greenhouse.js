ServerEvents.recipes(event => {
    const gtceu = event.recipes.gtceu;

    // event.recipes.gtceu
    //     .greenhouse("oak_sapring")
    //     .notConsumable("minecraft:oak_sapling")
    //     .inputFluids(Fluid.of("gtceu:soil", 1000))
    //     .itemOutputs("16x minecraft:oak_log")
    //     .itemOutputs("4x minecraft:oak_sapling")
    //     .chancedOutput("minecraft:apple", 4000, 0)
    //     .outputFluids(Fluid.of("gtceu:soil", 990))
    //     .duration(20 * 60 * 5)
    //     .EUt(2)
    //     .addData("tier", 1);

    createGreenhouseRecipe(
        Item.of("oak_sapling"),
        [Item.of("minecraft:oak_log", 16), Item.of("minecraft:oak_sapling", 4)],
        1,
        20 * 60 * 5,
        90,
        [[Item.of("minecraft:apple"), 4000, 0]]
    );

    createGreenhouseRecipe(
        Item.of("wheat_seeds"),
        [Item.of("minecraft:wheat", 16), Item.of("minecraft:wheat_seeds", 4)],
        1,
        20 * 60 * 3,
        70
    );

    createGreenhouseRecipe(
        Item.of("beetroot_seeds"),
        [Item.of("minecraft:beetroot", 16), Item.of("minecraft:beetroot_seeds", 4)],
        1,
        20 * 60 * 3,
        65
    );
    createGreenhouseRecipe(Item.of("kelp"), [Item.of("minecraft:kelp", 24)], 1, 20 * 60 * 1, 40);
    createGreenhouseRecipe(
        Item.of("pumpkin_seeds"),
        [Item.of("minecraft:pumpkin", 12), Item.of("minecraft:pumpkin_seeds", 4)],
        1,
        20 * 60 * 3,
        90
    );
    createGreenhouseRecipe(
        Item.of("melon_seeds"),
        [Item.of("minecraft:melon", 12), Item.of("minecraft:melon_seeds", 4)],
        1,
        20 * 60 * 3,
        95
    );
    /**
     *
     * @param {Internal.InputItem} catalyst
     * @param {Internal.ExtendedOutputItem[]} output
     * @param {number} baseTier
     * @param {number} duration
     * @param {Array<[Internal.ExtendedOutputItem, number, number]>} chanced
     */
    function createGreenhouseRecipe(catalyst, output, baseTier, duration, lightIntensity, chanced) {
        chanced = chanced || [];
        var lightIntensitySensitive = false;
        if (lightIntensity instanceof Array) {
            lightIntensity = lightIntensity[0];
            lightIntensitySensitive = true;
        }
        function addChancedOutputs(recipe, chanced) {
            for (const entry of chanced) {
                recipe.chancedOutput(entry[0], entry[1], entry[2]);
            }
        }
        let counter = 0;
        function soiled(input, out_fluid, out_fluid_2, tier, durationMultiplier) {
            const recipe = event.recipes.gtceu
                .greenhouse(Item.of(catalyst).id + "_" + counter++)
                .notConsumable(catalyst)
                .itemOutputs(output)
                .duration(Math.floor(duration * durationMultiplier))
                .inputFluids(input)
                .outputFluids(out_fluid)
                .EUt(32)
                .addData("tier", Math.min(baseTier + tier, 4))
                .addData("optimal_light_intensity", lightIntensity);
            addChancedOutputs(recipe, chanced);
            if (out_fluid_2 != null) {
                recipe.outputFluids(out_fluid_2);
            }
            if (lightIntensitySensitive) {
                recipe.addData("light_intensity_sensitive", true);
            }
        }
        soiled(Fluid.of("gtceu:soil", 1000), Fluid.of("gtceu:soil", 900), null, 0, 1);
        // soiled(
        //     Fluid.of("gtceu:soil_t1", 1000),
        //     Fluid.of("gtceu:soil_t1", 900),
        //     Fluid.of("gtceu:depleted_soil_t1", 100),
        //     0,
        //     0.8
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t2", 1000),
        //     Fluid.of("gtceu:soil_t2", 900),
        //     Fluid.of("gtceu:depleted_soil_t2", 100),
        //     0,
        //     0.75
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t3", 1000),
        //     Fluid.of("gtceu:soil_t3", 800),
        //     Fluid.of("gtceu:depleted_soil_t3", 200),
        //     1,
        //     0.75
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t4", 1000),
        //     Fluid.of("gtceu:soil_t4", 800),
        //     Fluid.of("gtceu:depleted_soil_t4", 200),
        //     1,
        //     0.5
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t5", 1000),
        //     Fluid.of("gtceu:soil_t5", 750),
        //     Fluid.of("gtceu:depleted_soil_t5", 250),
        //     2,
        //     0.3
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t6", 1000),
        //     Fluid.of("gtceu:soil_t6", 750),
        //     Fluid.of("gtceu:depleted_soil_t6", 250),
        //     2,
        //     0.2
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t7", 1000),
        //     Fluid.of("gtceu:soil_t7", 700),
        //     Fluid.of("gtceu:depleted_soil_t7", 300),
        //     3,
        //     0.1
        // );
        // soiled(
        //     Fluid.of("gtceu:soil_t8", 1000),
        //     Fluid.of("gtceu:soil_t8", 600),
        //     Fluid.of("gtceu:depleted_soil_t8", 400),
        //     3,
        //     0.05
        // );
    }
});
