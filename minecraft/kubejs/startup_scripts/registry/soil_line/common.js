GTCEuStartupEvents.registry("gtceu:material", event => {
    function soil(tier, color) {
        event
            .create("soil_" + tier)
            .liquid()
            // todo
            //    .block()
            .color(color);
        event
            .create("depleted_soil_" + tier)
            .liquid()
            .color(darkenColor(color));
    }

    event.create("soil").liquid().color(color("#966C4B"));
    // todo
    // .block()
    soil("t1", color("#966C4B"));
    soil("t2", color("#7B5238"));
    soil("t3", color("#5E3A26"));
    soil("t4", color("#422613"));
    soil("t5", color("#261407"));
    soil("t6", color("#1A0D03"));
    soil("t7", color("#0D0601"));
    soil("t8", color("#050200"));
});
// うごかない
// GTCEuStartupEvents.materialModification(event => {
//     tag_block(GTMaterials.get("soil"), () => Items.DIRT);
// });

/**
 * rgbをちょっと暗く
 * @param {number} color
 * @param {number} [factor=0.9] 0.9 = 10%暗く
 *
 */
function darkenColor(color, factor) {
    factor || (factor = 0.9);
    const clamp = v => Math.max(0, Math.min(255, Math.round(v)));

    const r = clamp(((color >> 16) & 0xff) * factor);
    const g = clamp(((color >> 8) & 0xff) * factor);
    const b = clamp((color & 0xff) * factor);

    return (r << 16) | (g << 8) | b;
}
