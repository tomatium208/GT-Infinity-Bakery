ServerEvents.recipes(event => {

    event.shaped('gtceu:primitive_bakery', [
        "SES",
        "FTF",
        "SCS"
    ], {
        S: 'gtceu:steam_machine_casing',
        F: 'gtceu:bronze_firebox_casing',
        T: "gtbakery:toast",
        C: "#gtceu:circuits/lv",
        E: "gtceu:lv_emitter"
    })

    event.shaped('gtceu:fission_reactor', [
        "cCc",
        "PPP",
        "cCc"
    ], {
        c: "#gtceu:circuits/hv",
        C: "kubejs:fission_casing",
        P: "gtceu:hv_electric_pump"
    })

})