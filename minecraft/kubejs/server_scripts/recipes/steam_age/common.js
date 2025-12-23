ServerEvents.recipes(event => {
    // ベーカリーでしか焼けない、Gregだもの
    event.remove({ output: "minecraft:bread" });
    event.recipes.kubejs.shaped("3x kubejs:sliced_bread", [" K ", " B ", "   "], {
        K: "#forge:tools/knives",
        B: "minecraft:bread",
    });

    event.recipes.minecraft.campfire_cooking("kubejs:breadboard", "gtceu:sliced_bread_plate", 0, 200);
    event.replaceInput(
        {
            output: "gtceu:resin_circuit_board",
            or: { output: "gtceu:resin_printed_circuit_board" },
        },
        "gtceu:wood_plate",
        "kubejs:breadboard"
    );
});
