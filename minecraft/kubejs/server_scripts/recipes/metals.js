ServerEvents.recipes(event => {

    // Nyalloy

    event.recipes.gtceu.mixer("kjs/nyalloy")
        .itemInputs("1x #forge:dusts/nyaonium", "2x #forge:dusts/stainless_steel")
        .itemOutputs("3x gtceu:nyalloy_dust")
        .duration(300)
        .EUt(GTValues.VHA[GTValues.HV])

    // R.E.D

    event.recipes.gtceu.mixer("kjs/red")
        .itemInputs("#forge:dusts/redstone", "#forge:dusts/red_alloy", "#forge:dusts/brick")
        .itemOutputs("3x gtceu:red_dust")
        .EUt(GTValues.VHA[GTValues.MV])

    // CBBCVSG

    event.recipes.gtceu.mixer("kjs/cbbcvsg")
        .itemInputs("#forge:dusts/cobalt_brass", "#forge:dusts/bronze", "#forge:dusts/cupronickel", "#forge:dusts/vanadium", "#forge:dusts/steel", "#forge:dusts/gold")
        .itemOutputs("6x gtceu:cbbcvsg_dust")
        .EUt(GTValues.VHA[GTValues.LV])
    
    
    // Kanthal

    event.remove({ output: "gtceu:kanthal_ingot", type: "gtceu:chemical_bath" })

    // Wrought Iron

    event.remove({ output: "gtceu:smelting/wrought_iron_nugget" })

    event.recipes.gtceu.compressor("kjs/wrought_iron")
        .itemInputs("2x #forge:dusts/iron")
        .itemOutputs("1x gtceu:wrought_iron_dust")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(200)

    // Steel

    event.remove({ type: "gtceu:primitive_blast_furnace" })

    event.recipes.gtceu.primitive_blast_furnace("kjs/steel")
        .itemInputs("#forge:ingots/iron", "4x #gtbakery:materials/carbon")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .duration(600)
    event.recipes.gtceu.primitive_blast_furnace("kjs/steel_from_wrought_iron")
        .itemInputs("#forge:ingots/wrought_iron", "4x #gtbakery:materials/carbon")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .duration(400)

    event.recipes.gtceu.bakery("kjs/steel")
        .inputFluids("gtceu:oxygen 200")
        .itemInputs("#forge:ingots/iron")
        .itemOutputs('gtceu:steel_ingot')
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(400)
    event.recipes.gtceu.bakery("kjs/steel_from_wrought_iron")
        .inputFluids("gtceu:oxygen 200")
        .itemInputs("#forge:ingots/wrought_iron")
        .itemOutputs('gtceu:steel_ingot')
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(300)

})