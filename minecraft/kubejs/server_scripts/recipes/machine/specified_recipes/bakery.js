ServerEvents.recipes(event => {
    // Primitive Bakery Controller
    event.shaped("gtceu:primitive_bakery", ["SES", "FTF", "SCS"], {
        S: "gtceu:steam_machine_casing",
        F: "gtceu:bronze_firebox_casing",
        T: "gtbakery:toast",
        C: "gtceu:lp_steam_furnace",
        E: "gtceu:bronze_pipe_casing",
    });

    event.recipes.gtceu
        .bakery("kjs/bread")
        .itemInputs("2x #forge:dough")
        .itemOutputs("3x minecraft:bread")
        .duration(100)
        .EUt(VHA.ULV);
});
