StartupEvents.registry("item", event => {
    event.create("gt_coin").displayName("GT Coin");
    event.create("chapter_coin");

    event.create("marker_ulv").texture("kubejs:item/markers/ulv").displayName("ULV");
    event.create("marker_lv").texture("kubejs:item/markers/lv").displayName("LV");
    event.create("marker_mv").texture("kubejs:item/markers/mv").displayName("MV");
    event.create("marker_hv").texture("kubejs:item/markers/hv").displayName("HV");
    event.create("marker_ev").texture("kubejs:item/markers/ev").displayName("EV");
    event.create("marker_iv").texture("kubejs:item/markers/iv").displayName("IV");
    event.create("marker_luv").texture("kubejs:item/markers/luv").displayName("LuV");
    event.create("marker_zpm").texture("kubejs:item/markers/zpm").displayName("ZPM");
    event.create("marker_uv").texture("kubejs:item/markers/uv").displayName("UV");
    event.create("marker_uhv").texture("kubejs:item/markers/uhv").displayName("UHV");
    event.create("marker_uev").texture("kubejs:item/markers/uev").displayName("UEV");
    event.create("marker_uiv").texture("kubejs:item/markers/uiv").displayName("UIV");
    event.create("marker_uxv").texture("kubejs:item/markers/uxv").displayName("UXV");
    event.create("marker_opv").texture("kubejs:item/markers/opv").displayName("OpV");
    event.create("marker_max").texture("kubejs:item/markers/max").displayName("MAX");

    event.create("computation_system").tooltip(Text.translatable("item.kubejs.computation_system.tooltip.0"));
    event
        .create("advanced_conputation_system")
        .tooltip(Text.translatable("item.kubejs.advanced_computation_system.tooltip.0"));

    event
        .create("particle_star")
        .textureJson({ layer0: "kubejs:item/particle_star", layer1: "kubejs:item/particle" })
        .tooltip(Text.translatable("item.kubejs.particle_star.tooltip.0"));
    event.create("particle_shard");

    event
        .create("energy_drink")
        .useAnimation("drink")
        .food(food => {
            food.hunger(1).saturation(1);
        });

    event.create("nubeeee").tooltip(Text.translatable("item.kubejs.nubeeee.tooltip.0"));
    event.create("tasty_valine3g");
    event.create("frozen_valine3g");

    event
        .create("valine3g_cake")
        .food(food => {
            food.hunger(2147483647);
        })
        .tooltip(Text.translatable("item.kubejs.valine3g_cake.tooltip.0"));

    event.create("tomato").food(food => {
        food.hunger(7).saturation(0.1);
    });

    event.create("sliced_tomato").food(food => {
        food.hunger(3).saturation(0.1);
    });

    event.create("sliced_bread").tag('forge:bread').food(food => {
        food.hunger(4).saturation(0.75);
    });
    event.create("toast").food(food => {
        food.hunger(6).saturation(0.75);
    });
    event.create("burnt_toast");

    event.create("ancient_toast");

    event.create("lettuce");

    event.create("sliced_lettuce").food(food => {
        food.hunger(1).saturation(0.25);
    });

    event.create("sandwich").food(food => {
        food.hunger(5).saturation(1);
    });

    event.create("engraved_sandwich");

    event.create("fission_sandwich").food(food => {
        food.hunger(1).saturation(1).alwaysEdible().effect("minecraft:wither", 24000, 9, 1);
    });

    // Circuits

    global.circuitTypes = [
        ["cyber", ["zpm", "uv", "uhv", "uev"]],
        ["holocarbon", ["uv", "uhv", "uev", "uiv"]],
        ["grid", ["uhv", "uev", "uiv", "uxv"]],
        ["coreunit", ["uev", "uiv", "uxv", "opv"]],
        ["ender", ["uiv", "uxv", "opv", "max"]],
    ];

    global.circuitTypes.forEach(c => {
        event
            .create(`${c[0]}_processor`)
            .tag("gtceu:circuits")
            .tag(`gtceu:circuits/${c[1][0]}`)
            .texture(`kubejs:item/circuits/${c[0]}`)
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor.tooltip.0`))
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor.tooltip.1`));
        event
            .create(`${c[0]}_processor_assembly`)
            .tag("gtceu:circuits")
            .tag(`gtceu:circuits/${c[1][1]}`)
            .texture(`kubejs:item/circuits/${c[0]}_assembly`)
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_assembly.tooltip.0`))
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_assembly.tooltip.1`));
        event
            .create(`${c[0]}_processor_computer`)
            .tag("gtceu:circuits")
            .tag(`gtceu:circuits/${c[1][2]}`)
            .texture(`kubejs:item/circuits/${c[0]}_computer`)
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_computer.tooltip.0`))
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_computer.tooltip.1`));
        event
            .create(`${c[0]}_processor_mainframe`)
            .tag("gtceu:circuits")
            .tag(`gtceu:circuits/${c[1][3]}`)
            .texture(`kubejs:item/circuits/${c[0]}_mainframe`)
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_mainframe.tooltip.0`))
            .tooltip(Text.translatable(`item.kubejs.${c[0]}_processor_mainframe.tooltip.1`));
    });

    const normal = ["lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv"];

    normal.forEach(v => { });

    const extended = normal.concat(["uhv", "uev", "uiv", "uxv", "opv", "max"]);

    extended.forEach(v => { });
});
