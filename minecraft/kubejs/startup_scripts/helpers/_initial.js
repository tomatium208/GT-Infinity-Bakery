// priority: 9001
/**
 * @typedef {"ULV" | "LV" | "MV" | "HV" | "EV" | "IV" | "LuV" | "ZPM" | "UV" | "UHV" | "UEV" | "UIV" | "UXV" | "OPV" | "MAX"} UpperVoltageTier
 * @typedef {Lowercase<UpperVoltageTier>} LowerVoltageTier
 */
/** @type {UpperVoltageTier[]} */
const upper_voltages = [
    "ULV",
    "LV",
    "MV",
    "HV",
    "EV",
    "IV",
    "LuV",
    "ZPM",
    "UV",
    "UHV",
    "UEV",
    "UIV",
    "UXV",
    "OpV",
    "MAX",
];
/** @type {LowerVoltageTier[]} */
const voltages = upper_voltages.map(v => v.toLowerCase());

/** @type {Record<UpperVoltageTier, number>} */
const VA = {};
/** @type {Record<UpperVoltageTier, number>} */
const VHA = {};
for (var tier of GTValues.ALL_TIERS) {
    VA[upper_voltages[tier]] = GTValues.VA[tier];
    VHA[upper_voltages[tier]] = GTValues.VHA[tier];
}

/**
 * Input a hex color string like "#RRGGBB", returns the integer color value.
 * @param {`#${string}`} hex
 * @returns number
 */
function color(hex) {
    return parseInt(hex.slice(1), 16);
}

/**
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {() => Internal.ItemLike} item
 * @returns
 */
function tag_ingot(material, item) {
    console.log(`material:ingot:${material} linked to ${item}`);

    TagPrefix.ingot[
        "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,java.util.function.Supplier[])"
    ](GTMaterials.get(material), item);
}
/**
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {() => Internal.ItemLike} item
 * @returns
 */
function tag_block(material, item) {
    console.log(`material:block:${material} linked to ${item}`);

    TagPrefix.block[
        "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,java.util.function.Supplier[])"
    ](GTMaterials.get(material), item);
}
/**
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {() => Internal.ItemLike} item
 * @returns
 */
function tag_nugget(material, item) {
    console.log(`material:nugget:${material} linked to ${item}`);

    TagPrefix.nugget[
        "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,java.util.function.Supplier[])"
    ](GTMaterials.get(material), item);
}
/**
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {() => Internal.ItemLike} item
 * @returns
 */
function tag_dust(material, item) {
    console.log(`material:dust:${material} linked to ${item}`);

    TagPrefix.dust[
        "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,java.util.function.Supplier[])"
    ](GTMaterials.get(material), item);
}
/**
 *
 * @param {com.gregtechceu.gtceu.api.data.chemical.material.Material} material
 * @param {() => Internal.ItemLike} item
 * @returns
 */
function tag_gem(material, item) {
    TagPrefix.gem[
        "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,java.util.function.Supplier[])"
    ](GTMaterials.get(material), item);
}

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
