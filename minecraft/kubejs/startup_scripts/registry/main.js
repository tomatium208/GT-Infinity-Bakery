// Elementだよ

GTCEuStartupEvents.registry("gtceu:element", event => {

    event.create("valine3g")
        .protons(14)
        .neutrons(9)
        .symbol("Vl")

    event.create("meta_null")
        .protons(-1)
        .neutrons(-1)
        .symbol("N/A")

    event.create("tomatonium")
        .protons(10)
        .neutrons(18)
        .symbol("To")

    event.create("meow")
        .protons(3)
        .neutrons(3)
        .symbol(":3")

})

// IconSetだよ

GTCEuStartupEvents.registry('gtceu:material_icon_set', event => {

    event.create('nyaonium').parent(GTMaterialIconSet.RUBY)
    event.create("prismatic").parent(GTMaterialIconSet.METALLIC)
    event.create("tomatonium").parent(GTMaterialIconSet.DULL)

})

// Materialだよ

GTCEuStartupEvents.registry("gtceu:material", event => {

    const allMaterialFlag = [
        GTMaterialFlags.GENERATE_PLATE,
        GTMaterialFlags.GENERATE_DENSE,

        GTMaterialFlags.GENERATE_ROD,
        GTMaterialFlags.GENERATE_LONG_ROD,

        GTMaterialFlags.GENERATE_GEAR,
        GTMaterialFlags.GENERATE_SMALL_GEAR,

        GTMaterialFlags.GENERATE_SPRING,
        GTMaterialFlags.GENERATE_SPRING_SMALL,


        GTMaterialFlags.GENERATE_FINE_WIRE,
        GTMaterialFlags.GENERATE_FRAME,
        GTMaterialFlags.GENERATE_BOLT_SCREW
    ]

    event.create("energy_drink")
        .liquid()
        .color("0x00a108")

    event.create("tomato_sauce")
        .liquid()
        .color("0xdd0000")

    event.create("fission_fuel")
        .liquid()
        .color("0x3e573f")

    event.create("nuclear_waste")
        .liquid()
        .color("0x1d361e")


    event.create("bread")
        .dust()
        .liquid()
        .color("0xf0be86")


    event.create("valine3g")
        .element(GTElements.get("valine3g"))
        .iconSet(GTMaterialIconSet.METALLIC)
        .ingot()
        .ore()
        .liquid(750)
        .color("0x84848a")
        .secondaryColor("0x4d4d91")
        .blastTemp(750, 'low', 30)
        .flags(allMaterialFlag)

    event.create("refined_valine3g")
        .components("2x valine3g", "2x tritanium")
        .iconSet(GTMaterialIconSet.getByName("prismatic"))
        .ingot()
        .liquid(9223)
        .color("0x84848a")
        .secondaryColor("0x4d4d91")
        .blastTemp(9223, 'highest', GTValues.VA[GTValues.EV])
        .flags(allMaterialFlag)

    event.create("sds")
        .components("1x valine3g", "1x water")
        .iconSet(GTMaterialIconSet.METALLIC)
        .ingot()
        .ore()
        .liquid()
        .color("0x45281d")
        .blastTemp(18000, "highest", GTValues.VA[GTValues.LuV])
        .flags(allMaterialFlag)

    event.create("meta_null")
        .element(GTElements.get("meta_null"))
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .liquid()
        .color("0x340034")
        .secondaryColor("0xff00ff")
        .flags(allMaterialFlag)


    event.create("tomatonium")
        .element(GTElements.get("tomatonium"))
        .iconSet(GTMaterialIconSet.getByName("tomatonium"))
        .ingot()
        .color("0xee0000")
        .secondaryColor("0x009900")
        .blastTemp(5200, "mid", GTValues.VA[GTValues.IV])
        .flags(allMaterialFlag)

    event.create("cbbcvsg")
        .components("1x cobalt_brass", "1x bronze", "1x cupronickel", "1x vanadium", "1x steel", "1x gold")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0xdd5500")
        .blastTemp(1700, "mid", GTValues.VA[GTValues.HV])
        .flags(allMaterialFlag)

    event.create("red")
        .components("1x redstone", "1x red_alloy", "1x brick")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0xdd0000")
        .blastTemp(450, "low", GTValues.VA[GTValues.MV])
        .flags(allMaterialFlag)

    event.create("nyaonium")
        .element(GTElements.get("meow"))
        .iconSet(GTMaterialIconSet.getByName("nyaonium"))
        .gem()
        .ore()
        .color("0x798fb3")

    event.create("nyalloy")
        .components("1x nyaonium", "2x stainless_steel")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0x798fb3")
        .secondaryColor("0xffff00")
        .blastTemp(1750, "mid", GTValues.VA[GTValues.HV])
        .flags(allMaterialFlag)

    event.create("prismatic_nyaonium_alloy")
        .components("1x tomatonium", "1x nyaonium", "1x helium")
        .iconSet(GTMaterialIconSet.getByName("prismatic"))
        .ingot()
        .liquid()
        .color("0x798fb3")
        .secondaryColor("0x0000ff")
        .blastTemp(4000, "high", GTValues.VA[GTValues.EV])
        .flags(allMaterialFlag)

    // アミノ酸だよ

    const aminoAcids = [
        ["valine", ["5x carbon", "11x hydrogen", "1x nitrogen", "2x oxygen"], "0x0000ff"],
        ["leucine", ["6x carbon", "13x hydrogen", "1x nitrogen", "2x oxygen"], "0x774444"],
        ["isoleucine", ["6x carbon", "13x hydrogen", "1x nitrogen", "2x oxygen"], "0x440077"],
        ["methionine", ["5x carbon", "11x hydrogen", "1x nitrogen", "2x oxygen", "1x sulfur"], "0x777733"],
        ["lysine", ["6x carbon", "14x hydrogen", "2x nitrogen", "2x oxygen"], "0x447711"],
        ["phenylalanine", ["9x carbon", "11x hydrogen", "1x nitrogen", "2x oxygen"], "0x007700"],
        ["tryptophan", ["4x carbon", "9x hydrogen", "1x nitrogen", "3x oxygen"], "0x004444"],
        ["threonine", ["11x carbon", "12x hydrogen", "2x nitrogen", "2x oxygen"], "0xff7700"],
        ["histidine", ["6x carbon", "9x hydrogen", "3x nitrogen", "2x oxygen"], "0xff7777"]
    ]

    aminoAcids.forEach(a => {

        event.create(a[0])
            .iconSet(GTMaterialIconSet.METALLIC)
            .components(a[1])
            .dust()
            .color(a[2])

    })

})

StartupEvents.registry('block', event => {

    event.create("dimensional_rift")
        .glassSoundType()
    
    event.create("planter_block")
        .stoneSoundType()
        .notSolid()
    
    // SOLID CASINGS

    event.create("multi_dimensional_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/multi_dimensional")
    
    event.create("miracle-theoretical_meteor_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/miracle_meteor")
    
    event.create("miracle-theoretical_fumetsu_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/miracle_fumetsu")
    
    event.create("spacetime_stabilization_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/spacetime")

    // PROOF CASINGS

    event.create("explosion_proof_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/proof/explosion")

    event.create("collapse_proof_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/proof/collapse")

    // NOUF CASINGS

    event.create("non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/general")

    event.create("non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_starmatter_whirlpool_magical_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/magical")

    event.create("non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_psychotic_wave_forging_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/wave")

    // FISSION CASINGS

    event.create("fission_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/fission/solid")

    event.create("fission_cell")
        .stoneSoundType()
        .notSolid()

    event.create("fission_rod")
        .stoneSoundType()
        .notSolid()

    // GREENHOUSE CASINGS

    event.create("greenhouse_casing_mk2").displayName("Greenhouse Machine Casing MK II")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk2")

    event.create("greenhouse_casing_mk3").displayName("Greenhouse Machine Casing MK III")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk3")

    event.create("greenhouse_casing_mk4").displayName("Greenhouse Machine Casing MK IV")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk4")


    // COIL

    event.create('valine_coil_block', 'gtceu:coil')
        .stoneSoundType()
        .texture('kubejs:block/casings/coils/coil_valine')
        .coilMaterial(() => GTMaterials.get('valine3g'))
        .temperature(14400)
        .level(16)
        .energyDiscount(16)
        .tier(5)

    event.create('tomatonium_coil_block', 'gtceu:coil')
        .stoneSoundType()
        .texture('kubejs:block/casings/coils/coil_tomatonium')
        .coilMaterial(() => GTMaterials.get('tomatonium'))
        .temperature(16200)
        .level(32)
        .energyDiscount(16)
        .tier(5)

    event.create('sds_coil_block', 'gtceu:coil')
        .stoneSoundType()
        .texture('kubejs:block/casings/coils/coil_sds')
        .coilMaterial(() => GTMaterials.get('sds'))
        .temperature(18000)
        .level(32)
        .energyDiscount(32)
        .tier(5)

})

/* COILS

    Coil, Temperature, Level, Discount

    CUPRONICKEL, 1800, 1, 1
    KANTHAL, 2700, 2, 1
    NICHROME, 3600, 2, 2
    RTM_ALLOY, 4500, 4, 2
    HSS_G, 5400, 4, 4
    NAQUADAH, 7200, 8, 4
    TRINIUM, 9001, 8, 8
    TRITANIUM, 10800, 16, 8

    VALINE, 14400, 16, 16
    TOMATONIUM, 16200, 32, 16
    SDS, 18000, 32, 32

*/

StartupEvents.registry("item", event => {

    event.create("gt_coin").displayName("GT Coin")
    event.create("chapter_coin")

    event.create("marker_ulv").texture("kubejs:item/markers/ulv").displayName("ULV")
    event.create("marker_lv").texture("kubejs:item/markers/lv").displayName("LV")
    event.create("marker_mv").texture("kubejs:item/markers/mv").displayName("MV")
    event.create("marker_hv").texture("kubejs:item/markers/hv").displayName("HV")
    event.create("marker_ev").texture("kubejs:item/markers/ev").displayName("EV")
    event.create("marker_iv").texture("kubejs:item/markers/iv").displayName("IV")
    event.create("marker_luv").texture("kubejs:item/markers/luv").displayName("LuV")
    event.create("marker_zpm").texture("kubejs:item/markers/zpm").displayName("ZPM")
    event.create("marker_uv").texture("kubejs:item/markers/uv").displayName("UV")
    event.create("marker_uhv").texture("kubejs:item/markers/uhv").displayName("UHV")
    event.create("marker_uev").texture("kubejs:item/markers/uev").displayName("UEV")
    event.create("marker_uiv").texture("kubejs:item/markers/uiv").displayName("UIV")
    event.create("marker_uxv").texture("kubejs:item/markers/uxv").displayName("UXV")
    event.create("marker_opv").texture("kubejs:item/markers/opv").displayName("OpV")
    event.create("marker_max").texture("kubejs:item/markers/max").displayName("MAX")


    // Circuits

    global.circuitTypes = [
        ["cyber", ["zpm", "uv", "uhv", "uev"]],
        ["holocarbon", ["uv", "uhv", "uev", "uiv"]],
        ["grid", ["uhv", "uev", "uiv", "uxv"]],
        ["coreunit", ["uev", "uiv", "uxv", "opv"]],
        ["ender", ["uiv", "uxv", "opv", "max"]]
    ]

    global.circuitTypes.forEach(c => {

        event.create(`${c[0]}_processor`).tag("gtceu:circuits").tag(`gtceu:circuits/${c[1][0]}`).texture(`kubejs:item/circuits/${c[0]}`)
        event.create(`${c[0]}_processor_assembly`).tag("gtceu:circuits").tag(`gtceu:circuits/${c[1][1]}`).texture(`kubejs:item/circuits/${c[0]}_assembly`)
        event.create(`${c[0]}_processor_computer`).tag("gtceu:circuits").tag(`gtceu:circuits/${c[1][2]}`).texture(`kubejs:item/circuits/${c[0]}_computer`)
        event.create(`${c[0]}_processor_mainframe`).tag("gtceu:circuits").tag(`gtceu:circuits/${c[1][3]}`).texture(`kubejs:item/circuits/${c[0]}_mainframe`)

    })

    const normal = [
        "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv"
    ]

    normal.forEach(v => {

    })

    const extended = normal.concat([
        "uhv", "uev", "uiv", "uxv", "opv", "max"
    ])

    extended.forEach(v => {

    })

    // Misc

    event.create("computation_system")
    event.create("advanced_conputation_system")

    event.create("particle_star").textureJson({ layer0: "kubejs:item/particle_star", layer1: "kubejs:item/particle" })
    event.create("particle_shard")


    event.create("energy_drink").useAnimation("drink").food(food => {
        food.hunger(1).saturation(1)
    })


    event.create("tasty_valine3g")
    event.create("frozen_valine3g")

    event.create("valine3g_cake").food(food => {
        food.hunger(2147483647)
    }).tooltip(Text.translatable("item.kubejs.valine3g_cake.tooltip.0"))


    event.create("tomato").food(food => {
        food.hunger(7).saturation(0.1)
    })

    event.create("sliced_tomato").food(food => {
        food.hunger(3).saturation(0.1)
    })


    event.create("sliced_bread").food(food => {
        food.hunger(4).saturation(0.75)
    })
    event.create("toast").food(food => {
        food.hunger(6).saturation(0.75)
    })
    event.create("burnt_toast")

    event.create("ancient_toast")


    event.create("lettuce")

    event.create("sliced_lettuce").food(food => {
        food.hunger(1).saturation(0.25)
    })


    event.create("sandwich").food(food => {
        food.hunger(5).saturation(1)
    })

    event.create("engraved_sandwich")

    event.create("fission_sandwich").food(food => {
        food.hunger(1).saturation(1)
            .alwaysEdible()
            .effect('minecraft:wither', 24000, 9, 1)
    })

})