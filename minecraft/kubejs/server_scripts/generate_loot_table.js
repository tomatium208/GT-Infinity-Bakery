ServerEvents.blockLootTables(event => {
    for (const block of global.block_generate_loot_tables) {
        event.addSimpleBlock(block);
    }
});
