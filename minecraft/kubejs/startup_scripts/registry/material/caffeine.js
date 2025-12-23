// Materialだよ

GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("crude_caffeine_extract").liquid().color(color("#6f4e37"));

    event.create("unrefined_caffeine_solution").liquid().color(color("#b9a88a"));

    event.create("concentrated_caffeine_solution").liquid().color(color("#E8DDC8"));

    event.create("carbonated_water").liquid().color(color("#a0e7ff"));

    event
        .create("caffeine")
        .dust()
        .liquid()
        .components("8x carbon", "10x hydrogen", "4x nitrogen", "2x oxygen")
        .color(color("#fdfdec"))
        .secondaryColor(color("#ffffff"));

    event.create("energy_drink").liquid().color(color("#00a108"));
});
