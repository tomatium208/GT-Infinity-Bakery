EmiPlusPlusEvents.registerGroups(event => {
    /**
     * @param {Special.ItemTag} tag
     */
    function tag(tag) {
        event.register(tag, "#" + tag);
    }
    /**
     *
     * @param {Special.Item} item
     */
    function item(item) {
        event.register(item, item);
    }
    tag("gtceu:abilities/input_energy");
    tag("gtceu:abilities/input_fluid");
    tag("gtceu:abilities/input_items");
    tag("gtceu:abilities/output_energy");
    tag("gtceu:abilities/output_fluid");
    tag("gtceu:abilities/output_items");
    // todo
    // tag("gtceu:item_pipes/restricted");
    // tag("gtceu:item_pipes/unrestricted");
    // tag("gtceu:fluid_pipes/restricted");
    // tag("gtceu:fluid_pipes/unrestricted");
    tag("ae2:p2p_attunements/fluid_p2p_tunnel");

    tag("forge:tools/wrenches");
    tag("forge:tools/wire_cutters");
    tag("forge:tools/butchery_knives");
    tag("forge:tools/saws");
    tag("forge:tools/hammers");
    tag("forge:tools/files");
    tag("forge:tools/crowbars");
    tag("forge:tools/knives");
    tag("minecraft:swords");
    tag("forge:tools/spades");
    tag("forge:tools/mining_hammers");
    tag("forge:tools/scythes");
    tag("minecraft:shovels");
    tag("forge:tools/axes");

    tag("minecraft:hoes");
    tag("forge:tools/mortars");
    tag("forge:tools/plungers");
    tag("forge:tools/screwdrivers");
    tag("forge:tiny_dusts");
    tag("forge:small_dusts");
    tag("forge:impure_dusts");
    tag("forge:pure_dusts");
    tag("forge:raw_materials");
    tag("forge:ores");
    item("ae2:facade");
    tag("forge:hot_ingots");
    tag("forge:crushed_ores");
    tag("forge:purified_ores");
    tag("forge:refined_ores");
    tag("forge:surface_rocks");
    item("gtceu:turbine_rotor");
});
