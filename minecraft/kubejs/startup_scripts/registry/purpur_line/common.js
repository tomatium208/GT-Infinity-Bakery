StartupEvents.registry("item", event => {

    event.create("purpur_scrap")

});

GTCEuStartupEvents.registry("gtceu:element", event => {
    event.create("purpur").protons(2).neutrons(6).symbol("Pp");
});

GTCEuStartupEvents.registry("gtceu:material", event => {

    event
        .create("purpur")
        .element(GTElements.get("purpur"))
        .iconSet(GTMaterialIconSet.DULL)
        .ingot()
        .dust()
        .color(color("#da98ea"))

    event
        .create("purpur_resin")
        .components("1x purpur", "1x aqua_regia")
        .iconSet(GTMaterialIconSet.GLASS)
        .ingot()
        .dust()
        .color(color("#c361db"))
        .secondaryColor(color("#3a41c3"))
        .flags(GTMaterialFlags.GENERATE_DENSE);

});

GTCEuStartupEvents.materialModification(event => {

    tag_ingot("purpur", () => Item.getItem("minecraft:popped_chorus_fruit"));

});