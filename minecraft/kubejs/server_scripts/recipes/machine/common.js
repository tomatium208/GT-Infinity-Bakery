ServerEvents.recipes(event => {

    GTValues.tiersBetween(GTValues.LV, GTValues.OpV).forEach(tier => {

        var c = craftingComponent(tier);
        var voltage = c.helpers.voltage;
        // GregTech Machine
        event.remove({ output: `gtceu:${voltage}_assembler` });

        event.recipes.gtceu
            .shaped(`gtceu:${voltage}_assembler`, ["RCR", "MHM", "ECE"], {
                C: c.circuit,
                H: c.hull,
                R: c.robot_arm,
                M: c.conveyor,
                E: "kubejs:energy_drink",
            })
            .addMaterialInfo();

        // GTBakery Machine

        event.recipes.gtceu
            .shaped(`gtceu:${voltage}_bakery`, ["GGG", "GHG", "CPC"], {
                H: c.hull,
                C: c.circuit,
                G: c.glass,
                P: c.plate
            })
            .addMaterialInfo();

        event.recipes.gtceu
            .shaped(`gtceu:${voltage}_sieve`, ["GCG", "GHG", "FEF"], {
                H: c.hull,
                C: c.circuit,
                G: c.glass,
                F: "#forge:gems/flint",
                E: "kubejs:energy_drink",
            })
            .addMaterialInfo();

        event.recipes.gtceu
            .shaped(`gtceu:${voltage}_particle_accelerator`, ["GVG", "GVG", "CHC"], {
                H: c.hull,
                C: c.circuit,
                G: c.glass,
                V: "#forge:rods/long/valine3g",
            })
            .addMaterialInfo();
    });

    event.remove({ output: "farmersdelight:stove" })

    event.shaped("farmersdelight:stove", ["STS", "BWB", "BCB"], {
        S: "#forge:plates/steel",
        T: "minecraft:iron_trapdoor",
        W: "#forge:tools/wrenches",
        B: "#forge:storage_blocks/brick",
        C: "minecraft:campfire"
    });

    event.remove({ output: "farmersdelight:cooking_pot" })

    event.shaped("farmersdelight:cooking_pot", ["BSB", "IHI", "III"], {
        B: "#forge:ingots/brick",
        S: "minecraft:wooden_shovel",
        I: "#forge:plates/steel",
        H: "#forge:tools/hammers"
    });

    event.remove({ output: "farmersdelight:skillet" })

    event.shaped("farmersdelight:skillet", [" SS", "WSS", "B  "], {
        S: "#forge:plates/steel",
        W: "#forge:tools/hammers",
        B: "#forge:ingots/brick"
    });

});
