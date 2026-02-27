ServerEvents.recipes(event => {
    var stonecutting_machines = [
        "electric_furnace",
        "alloy_smelter",
        "arc_furnace",
        "assembler",
        "autoclave",
        "bender",
        "brewery",
        "canner",
        "centrifuge",
        "polarizer",
        "sifter",
        "thermal_centrifuge",
        "wiremill",
        "macerator",
        "gas_collector",
        "rock_crusher",
        "air_scrubber",
        "fluid_heater",
        "fluid_solidifier",
        "forge_hammer",
        "forming_press",
        "lathe",
        "mixer",
        "ore_washer",
        "packer",
        "chemical_bath",
        "chemical_reactor",
        "compressor",
        "distillery",
        "electrolyzer",
        "electromagnetic_separator",
        "extractor",
        "extruder",
        "fermenter",
    ];
    // circuit assembler,cutter,laser_engraver,scanner
    GTValues.tiersBetween(GTValues.LV, GTValues.OpV).forEach(tier => {
        var c = craftingComponent(tier);
        var voltage = c.helpers.voltage;
        event.remove({ output: `gtceu:${voltage}_machine_hull` });
        event.recipes.gtceu
            .shaped(`gtceu:${voltage}_machine_hull`, ["MCM", "PAP", "NCU"], {
                M: c.motor,
                C: c.circuit,
                P: c.piston,
                A: c.casing,
                N: c.conveyor,
                U: c.pump,
            })
            .addMaterialInfo();

        stonecutting_machines.forEach(machine => {
            var id = `gtceu:${voltage}_${machine}`;
            event.remove({ output: id });
            event.recipes.minecraft.stonecutting(id, `gtceu:${voltage}_machine_hull`);
        });
    });
});
