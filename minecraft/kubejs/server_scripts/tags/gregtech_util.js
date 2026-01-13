ServerEvents.tags("item", event => {
    /**
     *
     * @param {Special.ItemTag} tagName
     * @param {PartAbility} abillty
     */
    function addTagForAbillities(tagName, abillty) {
        abillty.allBlocks.forEach(b => event.add(tagName, b.id));
    }

    addTagForAbillities("gtceu:abilities/input_energy", PartAbility.INPUT_ENERGY);
    addTagForAbillities("gtceu:abilities/output_energy", PartAbility.OUTPUT_ENERGY);
    addTagForAbillities("gtceu:abilities/input_fluid", PartAbility.IMPORT_FLUIDS);
    addTagForAbillities("gtceu:abilities/output_fluid", PartAbility.EXPORT_FLUIDS);
    addTagForAbillities("gtceu:abilities/input_items", PartAbility.IMPORT_ITEMS);
    addTagForAbillities("gtceu:abilities/output_items", PartAbility.EXPORT_ITEMS);
});
