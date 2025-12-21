ServerEvents.recipes(event => {

    const normal = [
        ["lv", "steel", "tin"],
        ["mv", "aluminium", "copper"],
        ["hv", "stainless_steel", "gold"],
        ["ev", "titanium", "aluminium"],
        ["iv", "tungsten_steel", "platinum"],
        ["luv", "rhodium_plated_palladium", "niobium_titanium"],
        ["zpm", "naquadah_alloy", "vanadium_gallium"],
        ["uv", "darmstadtium", "yttrium_barium_cuprate"]
    ]

    normal.forEach(v => {



    })

    const motor = normal.splice(0, 5)

    motor.forEach(v => {

        console.log(v)

        event.remove({ output: `gtceu:${v[0]}_electric_motor` })

        event.shaped(`2x gtceu:${v[0]}_electric_motor`, [
            "EWM",
            "WSW",
            "MWE"
        ], {
            E: `gtceu:${v[0]}_emitter`,
            W: `gtceu:${v[2]}_single_cable`,
            M: `#forge:rods/${v[1]}`,
            S: "#forge:rods/magnetic_steel"
        }).id(`kubejs:${v[0]}_electric_motor`)

    })


    event.recipes.gtceu.distillery("kjs/fission_fuel")
        .inputFluids("gtceu:uranium_hexafluoride 1000")
        .outputFluids("gtceu:fission_fuel 100")
        .duration(400)
        .EUt(GTValues.VHA[GTValues.HV])

    event.recipes.gtceu.bakery("kjs/energy_drink")
        .inputFluids("minecraft:water 1000")
        .itemInputs('1x #forge:gems/quartz', '1x #forge:slimeballs')
        .itemOutputs("6x kubejs:energy_drink")
        .EUt(GTValues.VHA[GTValues.ULV])

    event.recipes.gtceu.extractor("kjs/energy_drink")
        .itemInputs("kubejs:energy_drink")
        .outputFluids("gtceu:energy_drink 144")
        .EUt(GTValues.VHA[GTValues.ULV])


    event.recipes.gtceu.assembler("kjs/computation_system")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemInputs("4x #forge:plates/titanium", "8x #forge:plates/tungsten_steel", "32x kubejs:double", "32x kubejs:string", "16x #forge:fine_wires/prismatic_nyaonium_alloy")
        .itemOutputs("2x kubejs:computation_system")
        .duration(400)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.electric_blast_furnace("kjs/particle_star")
        .inputFluids("gtceu:oxygen 1000")
        .itemInputs('4x kubejs:particle_shard', "3x #forge:foils/zinc")
        .itemOutputs("kubejs:particle_star")
        .blastFurnaceTemp(1500)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.particle_collision("kjs/particle_shard")
        .itemInputs('#forge:plates/ender_pearl', "3x #forge:ingots/valine3g")
        .itemOutputs("2x kubejs:particle_shard")
        .duration(160)
        .EUt(GTValues.VHA[GTValues.LV])



    event.recipes.gtceu.particle_collision("kjs/tasty_valine3g")
        .itemInputs("#forge:ingots/valine3g", "#forge:dusts/sugar")
        .itemOutputs("2x kubejs:tasty_valine3g")
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.vacuum_freezer("kjs/frozen_valine3g")
        .itemInputs("kubejs:tasty_valine3g")
        .itemOutputs("kubejs:frozen_valine3g")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.assembly_line("kjs/valine3g_cake")
        .inputFluids("gtceu:molten_hsss 2147483647", "gtceu:molten_sds 2147483647")
        .itemInputs("64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g", "64x kubejs:tasty_valine3g")
        .itemOutputs("1x kubejs:valine3g_cake")
        .duration(72000)
        .EUt(GTValues.VA[GTValues.MAX])
        .stationResearch(b => b
            .researchStack('kubejs:tasty_valine3g')
            .CWUt(1)
            .EUt(GTValues.VA[GTValues.MAX])
        )



    event.recipes.gtceu.extractor("kjs/tomato_sauce")
        .itemInputs("1x kubejs:tomato")
        .outputFluids("gtceu:tomato_sauce 144")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.mixer("kjs/tomato_sauce")
        .inputFluids("minecraft:water 1000", "gtceu:energy_drink 144")
        .itemInputs("1x gtceu:silicon_wafer", "#forge:dusts/red")
        .outputFluids("gtceu:tomato_sauce 576")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.canner("kjs/tomato")
        .inputFluids("gtceu:tomato_sauce 144")
        .notConsumable("1x minecraft:bucket")
        .itemOutputs("1x kubejs:tomato")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.cutter("kjs/sliced_tomato")
        .itemInputs("1x kubejs:tomato")
        .itemOutputs("6x kubejs:sliced_tomato")
        .EUt(GTValues.VHA[GTValues.LV])



    event.recipes.gtceu.chemical_reactor("kjs/lettuce")
        .inputFluids("gtceu:ethylene 1000")
        .itemInputs("#forge:dusts/beryllium", "2x #forge:dusts/silicon")
        .itemOutputs("4x kubejs:lettuce")
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.cutter("kjs/sliced_lettuce")
        .itemInputs("1x kubejs:lettuce")
        .itemOutputs("6x kubejs:sliced_lettuce")
        .EUt(GTValues.VHA[GTValues.LV])



    event.recipes.gtceu.bakery("kjs/sandwich")
        .itemInputs("2x kubejs:sliced_bread", "1x kubejs:sliced_lettuce", "1x kubejs:sliced_tomato")
        .itemOutputs("kubejs:sandwich")
        .duration(400)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.laser_engraver("kjs/engraved_sandwich")
        .itemInputs("kubejs:sandwich")
        .notConsumable("1x kubejs:tasty_valine3g")
        .itemOutputs("kubejs:engraved_sandwich")
        .duration(600)
        .EUt(GTValues.VHA[GTValues.MV])


    event.recipes.gtceu.canner("kjs/energy_drink_item")
        .inputFluids("gtceu:energy_drink 144")
        .itemOutputs("1x kubejs:energy_drink")
        .EUt(GTValues.VHA[GTValues.ULV])


    event.recipes.gtceu.cutter("kjs/sliced_bread")
        .itemInputs("1x minecraft:bread")
        .itemOutputs("8x kubejs:sliced_bread")
        .EUt(GTValues.VHA[GTValues.ULV])


    event.smelting("kubejs:toast", "kubejs:sliced_bread")


    event.smelting("kubejs:burnt_toast", "kubejs:toast")


    event.recipes.gtceu.forge_hammer("kjs/coal_dust_from_burnt_toast")
        .itemInputs("1x kubejs:burnt_toast")
        .itemOutputs("8x gtceu:coal_dust")
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.coke_oven("kjs/coal_dust_from_burnt_toast")
        .itemInputs("1x kubejs:burnt_toast")
        .itemOutputs("8x gtceu:coke_gem")
        .outputFluids("gtceu:creosote 4000")
        .duration(900)



    event.remove({ output: "minecraft:furnace" })

    event.shaped("minecraft:furnace", [
        "CCC",
        "FFF",
        "CCC"
    ], {
        F: "#forge:gems/flint",
        C: "minecraft:cobblestone"
    })

    // Log -> Planks


    event.remove({ input: "#minecraft:logs", output: '#minecraft:planks' })

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
        ['#gtceu:rubber_logs', 'gtceu:rubber_planks', 'rubber_planks']
    ]

    treeTypes.forEach(l => {

        event.shapeless(`1x ${l[1]}`, [
            `1x ${l[0]}`
        ])

        event.shaped(`2x ${l[1]}`, [
            " S ",
            " L ",
            "   "
        ], {
            L: `1x ${l[0]}`,
            S: "#forge:tools/saws"
        }).damageIngredient("#forge:tools", 2)

        event.recipes.gtceu.cutter(`kjs/${l[2]}`)
            .itemInputs(`1x ${l[0]}`)
            .itemOutputs(`2x ${l[1]}`, "1x gtceu:wood_dust")
            .EUt(7)

    })


        event.shaped("gtceu:primitive_bakery", ["SES", "FTF", "SCS"], {
        S: "gtceu:steam_machine_casing",
        F: "gtceu:bronze_firebox_casing",
        T: "gtbakery:toast",
        C: "#gtceu:circuits/lv",
        E: "gtceu:lv_emitter",
    });
})