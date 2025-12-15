ServerEvents.recipes(event => {

    event.recipes.gtceu.particle_collision("kjs/bool")
        .notConsumable("kubejs:frozen_valine3g")
        .notConsumable("kubejs:particle_shard")
        .itemOutputs("1x kubejs:boolean")
        .duration(1)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.bender("kjs/int")
        .itemInputs("8x kubejs:boolean")
        .itemOutputs("1x kubejs:int")
        .duration(10)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.bender("kjs/float")
        .itemInputs("2x kubejs:int")
        .itemOutputs("1x kubejs:float")
        .duration(10)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.chemical_reactor("kjs/long")
        .inputFluids("gtceu:liquid_nether_air", "gtceu:ruthenium")
        .itemInputs("4x kubejs:float")
        .itemOutputs("4x kubejs:long")
        .duration(10)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.bakery("kjs/double")
        .inputFluids("gtceu:nitrogen 2000", "gtceu:tungsten 144")
        .itemInputs("8x kubejs:long")
        .itemOutputs("2x kubejs:double")
        .duration(10)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.assembler("kjs/char")
        .itemInputs("1x kubejs:int", "2x #forge:plates/brass")
        .itemOutputs("2x kubejs:char")
        .duration(30)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.assembler("kjs/string")
        .inputFluids("gtceu:copper 144")
        .itemInputs("8x kubejs:char")
        .itemOutputs("2x kubejs:string")
        .duration(30)
        .EUt(GTValues.VHA[GTValues.EV])

})