ServerEvents.recipes(event => {
    // LV

    {
    }

    // MV

    {
        event.remove({ output: "gtceu:phenolic_circuit_board" });

        event.recipes.gtceu
            .assembler("kjs/phenolic_circuit_board")
            .inputFluids("gtceu:glue 200")
            .itemInputs("2x #forge:dusts/wood", "4x #forge:fine_wires/annealed_copper", "1x kubejs:particle_star")
            .itemOutputs("2x gtceu:phenolic_circuit_board")
            .EUt(VHA.LV);
    }
});
