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

    function circuitFromCircuitAssemblerWithCleanroom(output, itemIn, fluidAmount, EUt, duration, id) {

        event.recipes.gtceu.circuit_assembler(`kjs/${id}`)
            .inputFluids(`gtceu:tin ${fluidAmount}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration)
            .cleanroom(CleanroomType.CLEANROOM)

        event.recipes.gtceu.circuit_assembler(`kjs/${id}_soldering_alloy`)
            .inputFluids(`gtceu:soldering_alloy ${fluidAmount / 2}`)
            .itemInputs(itemIn)
            .itemOutputs(output)
            .EUt(EUt)
            .duration(duration)
            .cleanroom(CleanroomType.CLEANROOM)

    }

    // Micro Processorはないよ

    event.remove({ output: "gtceu:micro_processor_assembly" })

    circuitFromCircuitAssembler("2x gtceu:micro_processor_assembly",
        [
            "gtceu:plastic_printed_circuit_board",
            "2x gtceu:micro_processor",
            "4x #gtceu:inductors",
            "8x #gtceu:capacitors",
            "4x gtceu:lpic_chip",
            "8x #forge:fine_wires/cbbcvsg"
        ],
        144, GTValues.VA[GTValues.MV], 400, "micro_hv"
    )

    event.remove({ output: "gtceu:micro_processor_computer" })

    circuitFromCircuitAssemblerWithCleanroom("gtceu:micro_processor_computer",
        [
            "2x gtceu:micro_processor_assembly",
            "16x gtceu:ram_chip",
            "4x gtceu:ilc_chip",
            "4x gtceu:cpu_chip",
            "8x #forge:rods/long/electrum",
            "1x kubejs:fission_sandwich"
        ],
        288, GTValues.VA[GTValues.MV], 400, "micro_ev"
    )

    event.remove({ output: "gtceu:micro_processor_mainframe" })

    circuitFromCircuitAssemblerWithCleanroom("gtceu:micro_processor_mainframe",
        [
            "2x #forge:frames/aluminium",
            "2x gtceu:micro_processor_computer",
            "8x #gtceu:inductors",
            "16x #gtceu:capacitors",
            "2x kubejs:computation_system",
            "8x #forge:fine_wires/prismatic_nyaonium_alloy"
        ],
        288, GTValues.VA[GTValues.HV], 800, "micro_iv"
    )

})