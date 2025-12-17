ServerEvents.recipes(event => {

    function circuitFromCircuitAssembler(output, itemIn, fluidAmount, EUt, duration, id) {

        event.recipes.gtceu.circuit_assembler(`kjs/${id}`)
            .inputFluids(`gtceu:tin ${fluidAmount}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration)

        event.recipes.gtceu.circuit_assembler(`kjs/${id}_soldering_alloy`)
            .inputFluids(`gtceu:soldering_alloy ${fluidAmount / 2}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration)

    }

    event.remove({ output: 'gtceu:basic_integrated_circuit' })

    circuitFromCircuitAssembler("2x gtceu:basic_integrated_circuit",
        [
            "gtceu:resin_printed_circuit_board",
            "gtceu:ilc_chip",
            "2x #gtceu:resistors",
            "2x #gtceu:diodes",
            "4x #forge:fine_wires/red",
            "4x #forge:bolts/tin"
        ],
        144, 24, 400, "integrated_circuit_lv"
    )

    event.remove({ output: 'gtceu:good_integrated_circuit' })

    circuitFromCircuitAssembler("2x gtceu:good_integrated_circuit",
        [
            "gtceu:phenolic_printed_circuit_board",
            "2x gtceu:basic_integrated_circuit",
            "2x gtceu:ram_chip",
            "kubejs:engraved_sandwich",
            "4x #forge:fine_wires/gold",
            "4x #forge:bolts/silver"
        ],
        144, 24, 400, "integrated_circuit_mv"
    )

    event.remove({ output: "gtceu:advanced_integrated_circuit" })

    circuitFromCircuitAssembler("gtceu:advanced_integrated_circuit",
        [
            "2x gtceu:good_integrated_circuit",
            "2x gtceu:cpu_chip",

            "4x #gtceu:transistors",
            "8x #forge:fine_wires/electrum",
            "8x #forge:bolts/annealed_copper"
        ],
        144, 24, 400, "integrated_circuit_hv"
    )
})