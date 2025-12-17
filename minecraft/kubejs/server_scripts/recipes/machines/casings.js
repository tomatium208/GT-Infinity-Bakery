ServerEvents.recipes(event => {

    // Heatproof

    event.remove({ output: "gtceu:heatproof_machine_casing" })

    event.recipes.gtceu.chemical_reactor("kjs/casing_invar_heatproof")
        .inputFluids("gtceu:glue 100")
        .itemInputs("6x #forge:plates/invar", "4x #forge:screws/brass")
        .itemOutputs("1x gtceu:heatproof_machine_casing")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV])

    // Fission

    event.recipes.gtceu.assembler("kjs/fission_casing")
        .inputFluids("gtceu:glass 288")
        .itemInputs("8x #forge:plates/nyalloy", "5x #forge:bolts/stainless_steel")
        .itemOutputs("2x kubejs:fission_casing")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.HV])
        .cleanroom(CleanroomType.CLEANROOM)

    event.recipes.gtceu.assembler("kjs/fission_cell")
        .inputFluids("gtceu:energy_drink 144")
        .itemInputs("gtceu:hv_machine_casing", "4x #forge:rods/long/stainless_steel", "3x #forge:plates/steel")
        .itemOutputs("2x kubejs:fission_cell")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.assembler("kjs/fission_rod")
        .inputFluids("gtceu:glass 144")
        .itemInputs("gtceu:hv_machine_casing", "4x #forge:rods/stainless_steel", "3x #forge:plates/steel", "2x #gtceu:circuits/hv")
        .itemOutputs("2x kubejs:fission_rod")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.MV])

})