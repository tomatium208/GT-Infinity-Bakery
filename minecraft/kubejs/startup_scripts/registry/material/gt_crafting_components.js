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

    event
        .create("corn_alloy")
        .iconSet(GTMaterialIconSet.METALLIC)
        .ingot()
        .liquid(16600)
        .color(color("#ffe58f"))
        .secondaryColor(color("#ffab2d"))
        .flags(allMaterialFlag);
})
GTCEuStartupEvents.craftingComponents(event => {

    event.setMaterialEntries("plate", {
        UIV: "plate:corn_alloy"
    })

})