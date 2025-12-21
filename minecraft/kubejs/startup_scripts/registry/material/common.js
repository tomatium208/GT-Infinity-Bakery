// Elementだよ

GTCEuStartupEvents.registry("gtceu:element", event => {
    event.create("valine3g").protons(14).neutrons(9).symbol("Vl");
    // should be not minus :(
    event.create("meta_null").protons(1).neutrons(1).symbol("N/A");

    event.create("tomatonium").protons(10).neutrons(18).symbol("To");

    event.create("meow").protons(3).neutrons(3).symbol(":3");
});

// IconSetだよ

GTCEuStartupEvents.registry("gtceu:material_icon_set", event => {
    event.create("nyaonium").parent(GTMaterialIconSet.RUBY);
    event.create("prismatic").parent(GTMaterialIconSet.METALLIC);
    event.create("tomatonium").parent(GTMaterialIconSet.DULL);
});

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
        GTMaterialFlags.GENERATE_BOLT_SCREW,
    ];

    event.create("energy_drink").liquid().color("0x00a108");

    event.create("tomato_sauce").liquid().color("0xdd0000");

    event.create("fission_fuel").liquid().color("0x3e573f");

    event.create("nuclear_waste").liquid().color("0x1d361e");

    event.create("bread").dust().liquid().color("0xf0be86");

    event
        .create("valine3g")
        .element(GTElements.get("valine3g"))
        .iconSet(GTMaterialIconSet.METALLIC)
        .ingot()
        .ore()
        .liquid(750)
        .color("0x84848a")
        .secondaryColor("0x4d4d91")
        .blastTemp(750, "low", 30)
        .flags(allMaterialFlag);

    event
        .create("refined_valine3g")
        .components("2x valine3g", "2x tritanium")
        .iconSet(GTMaterialIconSet.getByName("prismatic"))
        .ingot()
        .liquid(9223)
        .color("0x84848a")
        .secondaryColor("0x4d4d91")
        .blastTemp(9223, "highest", VA.EV)
        .flags(allMaterialFlag);

    event
        .create("sds")
        .components("1x valine3g", "1x water")
        .iconSet(GTMaterialIconSet.METALLIC)
        .ingot()
        .ore()
        .liquid()
        .color("0x45281d")
        .blastTemp(18000, "highest", VA.LuV)
        .flags(allMaterialFlag);

    event
        .create("meta_null")
        .element(GTElements.get("meta_null"))
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .liquid()
        .color("0x340034")
        .secondaryColor("0xff00ff")
        .flags(allMaterialFlag);

    event
        .create("tomatonium")
        .element(GTElements.get("tomatonium"))
        .iconSet(GTMaterialIconSet.getByName("tomatonium"))
        .ingot()
        .color("0xee0000")
        .secondaryColor("0x009900")
        .blastTemp(5200, "mid", VA.IV)
        .flags(allMaterialFlag);

    event
        .create("cbbcvsg")
        .components("1x cobalt_brass", "1x bronze", "1x cupronickel", "1x vanadium", "1x steel", "1x gold")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0xdd5500")
        .blastTemp(1700, "mid", VA.HV)
        .flags(allMaterialFlag);

    event
        .create("red")
        .components("1x redstone", "1x red_alloy", "1x brick")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0xdd0000")
        .blastTemp(450, "low", VA.MV)
        .flags(allMaterialFlag);

    event
        .create("nyaonium")
        .element(GTElements.get("meow"))
        .iconSet(GTMaterialIconSet.getByName("nyaonium"))
        .gem()
        .ore()
        .color("0x798fb3");

    event
        .create("nyalloy")
        .components("1x nyaonium", "2x stainless_steel")
        .iconSet(GTMaterialIconSet.BRIGHT)
        .ingot()
        .color("0x798fb3")
        .secondaryColor("0xffff00")
        .blastTemp(1750, "mid", VA.HV)
        .flags(allMaterialFlag);

    event
        .create("prismatic_nyaonium_alloy")
        .components("1x tomatonium", "1x nyaonium", "1x helium")
        .iconSet(GTMaterialIconSet.getByName("prismatic"))
        .ingot()
        .liquid()
        .color("0x798fb3")
        .secondaryColor("0x0000ff")
        .blastTemp(4000, "high", VA.EV)
        .flags(allMaterialFlag);

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
        ["histidine", ["6x carbon", "9x hydrogen", "3x nitrogen", "2x oxygen"], "0xff7777"],
    ];

    aminoAcids.forEach(a => {
        event.create(a[0]).iconSet(GTMaterialIconSet.METALLIC).components(a[1]).dust().color(a[2]);
    });
});
