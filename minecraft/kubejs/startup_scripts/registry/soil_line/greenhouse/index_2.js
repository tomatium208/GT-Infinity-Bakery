// priority:100
var $TagKey = Java.loadClass("net.minecraft.tags.TagKey");
var $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
var $Integer = Java.loadClass("java.lang.Integer");
/**
 * @param {Internal.Level} level
 * @param {AABB} aabb
 * @returns {BlockPos[]} dirtlike block positions
 */
function scanDirtLike(level, aabb) {
    return scanBlocks(level, aabb, [
        Blocks.DIRT,
        Blocks.COARSE_DIRT,
        Blocks.PODZOL,
        Blocks.GRASS_BLOCK,
        Blocks.MYCELIUM,
        Blocks.FARMLAND,
    ]);
}

/**
 *
 * @param {Internal.Level} level
 * @param {Internal.BlockPos} pos
 */
function toWetFarmland(level, pos) {
    const farmland = Blocks.FARMLAND.defaultBlockState().setValue(BlockProperties.MOISTURE, $Integer.valueOf("7"));
    // pos,farmland,clientSync,recrusionDepoth
    level.setBlock(pos, farmland, 2, 512);
}
/**
 *
 * @param {Internal.CompoundTag} nbt
 * @param {AABB} aabb
 */
function writeAABB(nbt, aabb) {
    nbt.putIntArray("soil_aabb", [
        $Integer.valueOf(aabb.minX.toFixed(0)),
        $Integer.valueOf(aabb.minY.toFixed(0)),
        $Integer.valueOf(aabb.minZ.toFixed(0)),
        $Integer.valueOf(aabb.maxX.toFixed(0)),
        $Integer.valueOf(aabb.maxY.toFixed(0)),
        $Integer.valueOf(aabb.maxZ.toFixed(0)),
    ]);
}
/**
 *
 * @param {Internal.CompoundTag} nbt
 * @returns {AABB | null}
 */
function readAABB(nbt) {
    if (!nbt.contains("soil_aabb")) return null;
    const a = nbt.getIntArray("soil_aabb");
    return {
        minX: a[0],
        minY: a[1],
        minZ: a[2],
        maxX: a[3],
        maxY: a[4],
        maxZ: a[5],
    };
}
