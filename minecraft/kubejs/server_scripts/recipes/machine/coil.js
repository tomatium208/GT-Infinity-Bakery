ServerEvents.recipes(event => {
    // CUPRONICKEL

    event.remove({ output: "gtceu:cupronickel_coil_block" });

    event.recipes.gtceu
        .assembler("kjs/coil_cupronickel")
        .itemInputs("1x gtceu:lv_voltage_coil", "8x gtceu:cupronickel_double_wire", "8x gtceu:bronze_foil")
        .inputFluids("gtceu:tin_alloy 144")
        .itemOutputs("1x gtceu:cupronickel_coil_block")
        .EUt(VA.LV);
});
