ServerEvents.recipes(event => {
    event.recipes.gtceu
        .distillery("kjs/fission_fuel")
        .inputFluids("gtceu:uranium_hexafluoride 1000")
        .outputFluids("gtceu:fission_fuel 100")
        .duration(400)
        .EUt(VHA.HV);

    event.recipes.gtceu
        .bakery("kjs/energy_drink")
        .inputFluids("minecraft:water 1000")
        .itemInputs("1x #forge:gems/quartz", "1x #forge:slimeballs")
        .itemOutputs("6x kubejs:energy_drink")
        .EUt(VHA.ULV);

    event.recipes.gtceu
        .extractor("kjs/energy_drink")
        .itemInputs("kubejs:energy_drink")
        .outputFluids("gtceu:energy_drink 144")
        .EUt(VHA.ULV);

    event.recipes.gtceu
        .assembler("kjs/computation_system")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemInputs(
            "4x #forge:plates/titanium",
            "8x #forge:plates/tungsten_steel",
            "32x kubejs:double",
            "32x kubejs:string",
            "16x #forge:fine_wires/prismatic_nyaonium_alloy"
        )
        .itemOutputs("2x kubejs:computation_system")
        .duration(400)
        .EUt(VHA.EV);

    event.recipes.gtceu
        .electric_blast_furnace("kjs/particle_star")
        .inputFluids("gtceu:oxygen 1000")
        .itemInputs("4x kubejs:particle_shard", "3x #forge:foils/zinc")
        .itemOutputs("kubejs:particle_star")
        .blastFurnaceTemp(1500)
        .EUt(VHA.MV);

    event.recipes.gtceu
        .particle_collision("kjs/particle_shard")
        .itemInputs("#forge:plates/ender_pearl", "3x #forge:ingots/valine3g")
        .itemOutputs("2x kubejs:particle_shard")
        .duration(160)
        .EUt(VHA.LV);

    event.recipes.gtceu
        .particle_collision("kjs/tasty_valine3g")
        .itemInputs("#forge:ingots/valine3g", "#forge:dusts/sugar")
        .itemOutputs("2x kubejs:tasty_valine3g")
        .EUt(VHA.MV);

    event.recipes.gtceu
        .vacuum_freezer("kjs/frozen_valine3g")
        .itemInputs("kubejs:tasty_valine3g")
        .itemOutputs("kubejs:frozen_valine3g")
        .duration(200)
        .EUt(VHA.EV);

    event.recipes.gtceu
        .stellar_core("kjs/valine3g_cake")
        .inputFluids("gtceu:molten_hsss 2147483647", "gtceu:molten_sds 2147483647")
        .itemInputs(
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g",
            "64x kubejs:tasty_valine3g"
        )
        .itemOutputs("1x kubejs:valine3g_cake")
        .duration(72000)
        .EUt(VA.MAX)
        .stationResearch(b => b.researchStack("kubejs:tasty_valine3g").CWUt(1).EUt(VA.MAX));

    event.recipes.gtceu
        .extractor("kjs/tomato_sauce")
        .itemInputs("1x kubejs:tomato")
        .outputFluids("gtceu:tomato_sauce 144")
        .duration(100)
        .EUt(VHA.LV);

    event.recipes.gtceu
        .mixer("kjs/tomato_sauce")
        .inputFluids("minecraft:water 1000", "gtceu:energy_drink 144")
        .itemInputs("1x gtceu:silicon_wafer", "#forge:dusts/red")
        .outputFluids("gtceu:tomato_sauce 576")
        .duration(100)
        .EUt(VHA.MV);

    event.recipes.gtceu
        .canner("kjs/tomato")
        .inputFluids("gtceu:tomato_sauce 144")
        .notConsumable("1x minecraft:bucket")
        .itemOutputs("1x kubejs:tomato")
        .duration(100)
        .EUt(VHA.MV);

    event.recipes.gtceu
        .cutter("kjs/sliced_tomato")
        .itemInputs("1x kubejs:tomato")
        .itemOutputs("6x kubejs:sliced_tomato")
        .EUt(VHA.LV);

    event.recipes.gtceu
        .chemical_reactor("kjs/lettuce")
        .inputFluids("gtceu:ethylene 1000")
        .itemInputs("#forge:dusts/beryllium", "2x #forge:dusts/silicon")
        .itemOutputs("4x kubejs:lettuce")
        .EUt(VHA.MV);

    event.recipes.gtceu
        .cutter("kjs/sliced_lettuce")
        .itemInputs("1x kubejs:lettuce")
        .itemOutputs("6x kubejs:sliced_lettuce")
        .EUt(VHA.LV);

    event.recipes.gtceu
        .bakery("kjs/sandwich")
        .itemInputs("2x kubejs:sliced_bread", "1x kubejs:sliced_lettuce", "1x kubejs:sliced_tomato")
        .itemOutputs("kubejs:sandwich")
        .duration(400)
        .EUt(VHA.MV);

    event.recipes.gtceu
        .laser_engraver("kjs/engraved_sandwich")
        .itemInputs("kubejs:sandwich")
        .notConsumable("1x kubejs:tasty_valine3g")
        .itemOutputs("kubejs:engraved_sandwich")
        .duration(600)
        .EUt(VHA.MV);

    event.recipes.gtceu
        .canner("kjs/energy_drink_item")
        .inputFluids("gtceu:energy_drink 144")
        .itemOutputs("1x kubejs:energy_drink")
        .EUt(VHA.ULV);

    event.recipes.gtceu
        .cutter("kjs/sliced_bread")
        .itemInputs("1x minecraft:bread")
        .itemOutputs("8x kubejs:sliced_bread")
        .EUt(VHA.ULV);

    event.smelting("kubejs:toast", "kubejs:sliced_bread");

    event.smelting("kubejs:burnt_toast", "kubejs:toast");

    event.recipes.gtceu
        .forge_hammer("kjs/coal_dust_from_burnt_toast")
        .itemInputs("1x kubejs:burnt_toast")
        .itemOutputs("8x gtceu:coal_dust")
        .EUt(VHA.LV);

    event.recipes.gtceu
        .coke_oven("kjs/coal_dust_from_burnt_toast")
        .itemInputs("1x kubejs:burnt_toast")
        .itemOutputs("8x gtceu:coke_gem")
        .outputFluids("gtceu:creosote 4000")
        .duration(900);

    event.remove({ output: "minecraft:furnace" });

    event.shaped("minecraft:furnace", ["CCC", "FFF", "CCC"], {
        F: "#forge:gems/flint",
        C: "minecraft:cobblestone",
    });

    // Log -> Planks

    event.remove({ input: "#minecraft:logs", output: "#minecraft:planks" });
    /** @type { [log:string,plank:string,shortenPlank:string][] } */
    let treeTypes = [
        ["#minecraft:oak_logs", "minecraft:oak_planks", "oak_planks"],
        ["#minecraft:spruce_logs", "minecraft:spruce_planks", "spruce_planks"],
        ["#minecraft:birch_logs", "minecraft:birch_planks", "birch_planks"],
        ["#minecraft:jungle_logs", "minecraft:jungle_planks", "jungle_planks"],
        ["#minecraft:acacia_logs", "minecraft:acacia_planks", "acacia_planks"],
        ["#minecraft:dark_oak_logs", "minecraft:dark_oak_planks", "dark_oak_planks"],
        ["#minecraft:mangrove_logs", "minecraft:mangrove_planks", "mangrove_planks"],
        ["#minecraft:cherry_logs", "minecraft:cherry_planks", "cherry_planks"],
        ["#minecraft:pale_oak_logs", "minecraft:pale_oak_planks", "pale_oak_planks"],
        ["#minecraft:crimson_stems", "minecraft:crimson_planks", "crimson_planks"],
        ["#minecraft:warped_stems", "minecraft:warped_planks", "warped_planks"],
        ["#gtceu:rubber_logs", "gtceu:rubber_planks", "rubber_planks"],
    ];

    treeTypes.forEach(l => {
        var log = l[0],
            plank = l[1],
            shortenPlank = l[2];
        event.shapeless(plank, [log]);

        event
            .shaped(Item.of(plank, 2), [" S ", " L ", "   "], {
                L: log,
                S: "#forge:tools/saws",
            })
            .damageIngredient("#forge:tools", 2);

        event.recipes.gtceu
            .cutter(`kjs/${shortenPlank}`)
            .itemInputs(`1x ${log}`)
            .itemOutputs(`2x ${plank}`, "1x gtceu:wood_dust")
            .EUt(VA.ULV);
    });
});
