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
