ServerEvents.recipes(event => {
    const normal = [
        ["lv", "steel", "tin", "#forge:glass"],
        ["mv", "aluminium", "copper", "#forge:glass"],
        ["hv", "stainless_steel", "gold", "gtceu:tempered_glass"],
        ["ev", "titanium", "aluminium", "gtceu:tempered_glass"],
        ["iv", "tungsten_steel", "platinum", "gtceu:laminated_glass"],
        ["luv", "rhodium_plated_palladium", "niobium_titanium", "gtceu:laminated_glass"],
        ["zpm", "naquadah_alloy", "vanadium_gallium", "gtceu:fusion_glass"],
        ["uv", "darmstadtium", "yttrium_barium_cuprate", "gtceu:fusion_glass"],
    ];

    console.log(normal);

    normal.forEach(v => {
        var voltage = v[0];
        var plate = v[1];
        var wire = v[2];
        var glass = v[3];

        // GregTech Machine

        event.remove({ output: `gtceu:${voltage}_assembler` });

        event.shaped(`gtceu:${voltage}_assembler`, ["RCR", "MHM", "ECE"], {
            C: `#gtceu:circuits/${voltage}`,
            H: `gtceu:${voltage}_machine_hull`,
            R: `gtceu:${voltage}_robot_arm`,
            M: `gtceu:${voltage}_conveyor_module`,
            E: "kubejs:energy_drink",
        });

        // GTBakery Machine

        event.shaped(`gtceu:${voltage}_bakery`, ["RER", "GGG", "CHC"], {
            H: `gtceu:${voltage}_machine_hull`,
            C: `#gtceu:circuits/${voltage}`,
            E: `gtceu:${voltage}_emitter`,
            R: `gtceu:${voltage}_robot_arm`,
            G: glass,
        });

        event.shaped(`gtceu:${voltage}_sieve`, ["GCG", "GHG", "FEF"], {
            H: `gtceu:${voltage}_machine_hull`,
            C: `#gtceu:circuits/${voltage}`,
            G: glass,
            F: "#forge:gems/flint",
            E: "kubejs:energy_drink",
        });

        event.shaped(`gtceu:${voltage}_particle_accelerator`, ["GVG", "GVG", "CHC"], {
            H: `gtceu:${voltage}_machine_hull`,
            C: `#gtceu:circuits/${voltage}`,
            G: glass,
            V: "#forge:rods/long/valine3g",
        });
    });

    const extended = normal.concat(["uhv", "uev", "uiv", "uxv", "opv", "max"]);

    console.log(extended);

    extended.forEach(v => { });
});
