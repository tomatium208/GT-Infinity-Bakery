ServerEvents.recipes(event => {
    // Bread

    event.smelting("kubejs:sliced_bread", "#forge:dusts/bread");

    event.recipes.gtceu
        .fluid_solidifier("kjs/bread")
        .notConsumable("gtceu:ingot_casting_mold")
        .inputFluids("gtceu:bread 144")
        .itemOutputs("1x kubejs:sliced_bread")
        .EUt(VHA.ULV);

    event.recipes.gtceu
        .macerator("kjs/macerate_bread")
        .itemInputs("1x kubejs:sliced_bread")
        .itemOutputs("1x gtceu:bread_dust")
        .EUt(VHA.LV);

    event.recipes.gtceu
        .extractor("extract_bread")
        .itemInputs("1x kubejs:sliced_bread")
        .outputFluids("gtceu:bread 144")
        .duration(100)
        .EUt(VHA.LV);

    // Tomatonium

    event.recipes.gtceu
        .ore_washer("kjs/tomatonium")
        .inputFluids("minecraft:water 1000")
        .itemInputs("kubejs:tomato")
        .itemOutputs("2x gtceu:tomatonium_dust")
        .duration(40)
        .EUt(VHA.MV);

    // Nyalloy

    event.recipes.gtceu
        .mixer("kjs/nyalloy")
        .itemInputs("1x #forge:dusts/nyaonium", "2x #forge:dusts/stainless_steel")
        .itemOutputs("3x gtceu:nyalloy_dust")
        .duration(300)
        .EUt(VHA.HV);

    // R.E.D

    event.recipes.gtceu
        .mixer("kjs/red")
        .itemInputs("#forge:dusts/redstone", "#forge:dusts/red_alloy", "#forge:dusts/brick")
        .itemOutputs("3x gtceu:red_dust")
        .EUt(VHA.MV);

    // CBBCVSG

    event.recipes.gtceu
        .mixer("kjs/cbbcvsg")
        .itemInputs(
            "#forge:dusts/cobalt_brass",
            "#forge:dusts/bronze",
            "#forge:dusts/cupronickel",
            "#forge:dusts/vanadium",
            "#forge:dusts/steel",
            "#forge:dusts/gold"
        )
        .itemOutputs("6x gtceu:cbbcvsg_dust")
        .EUt(VHA.LV);

    // Kanthal

    event.remove({ output: "gtceu:kanthal_ingot", type: "gtceu:chemical_bath" });

    // Wrought Iron

    event.remove({ output: "gtceu:smelting/wrought_iron_nugget" });

    event.recipes.gtceu
        .compressor("kjs/wrought_iron")
        .itemInputs("2x #forge:dusts/iron")
        .itemOutputs("1x gtceu:wrought_iron_dust")
        .EUt(VHA.LV)
        .duration(200);

    // Steel

    event.remove({ type: "gtceu:primitive_blast_furnace" });

    event.recipes.gtceu
        .primitive_blast_furnace("kjs/steel")
        .itemInputs("#forge:ingots/iron", "4x #gtbakery:materials/carbon")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .duration(600);
    event.recipes.gtceu
        .primitive_blast_furnace("kjs/steel_from_wrought_iron")
        .itemInputs("#forge:ingots/wrought_iron", "4x #gtbakery:materials/carbon")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .duration(400);

    event.recipes.gtceu
        .bakery("kjs/steel")
        .inputFluids("gtceu:oxygen 200")
        .itemInputs("#forge:ingots/iron")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .EUt(VA.MV)
        .duration(400);
    event.recipes.gtceu
        .bakery("kjs/steel_from_wrought_iron")
        .inputFluids("gtceu:oxygen 200")
        .itemInputs("#forge:ingots/wrought_iron")
        .itemOutputs("gtceu:steel_ingot")
        .chancedOutput("gtceu:ash_dust", "1/9", 0)
        .EUt(VA.MV)
        .duration(300);
});
