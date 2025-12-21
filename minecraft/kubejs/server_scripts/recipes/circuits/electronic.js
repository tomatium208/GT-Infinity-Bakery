ServerEvents.recipes(event => {
    function circuitFromCircuitAssembler(output, itemIn, fluidAmount, EUt, duration, id) {
        event.recipes.gtceu
            .circuit_assembler(`kjs/${id}`)
            .inputFluids(`gtceu:tin ${fluidAmount}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration);

        event.recipes.gtceu
            .circuit_assembler(`kjs/${id}_soldering_alloy`)
            .inputFluids(`gtceu:soldering_alloy ${fluidAmount / 2}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration);
    }

    // Basic Electronic Circuitはないよ

    event.remove({ output: "gtceu:good_electronic_circuit" });

    event.recipes.gtceu
        .assembler("kjs/electronic_mv")
        .inputFluids("gtceu:tin 144")
        .itemInputs(
            "3x gtceu:basic_electronic_circuit",
            "2x gtceu:diode",
            "1x gtceu:phenolic_printed_circuit_board",
            "8x #forge:fine_wires/steel"
        )
        .itemOutputs("gtceu:good_electronic_circuit")
        .EUt(VHA.LV);

    event.recipes.gtceu
        .assembler("kjs/electronic_mv_soldering_alloy")
        .inputFluids("gtceu:soldering_alloy 72")
        .itemInputs(
            "3x gtceu:basic_electronic_circuit",
            "2x gtceu:diode",
            "1x gtceu:phenolic_printed_circuit_board",
            "8x #forge:fine_wires/steel"
        )
        .itemOutputs("gtceu:good_electronic_circuit")
        .EUt(VHA.LV);

    circuitFromCircuitAssembler(
        "gtceu:good_electronic_circuit",
        ["3x gtceu:basic_electronic_circuit", "2x gtceu:diode", "1x gtceu:phenolic_printed_circuit_board"],
        144,
        VHA.LV,
        200,
        "electronic_mv"
    );
});
