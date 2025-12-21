// priority:101
/**
 *
 * @param {Internal.Collection<BlockPos>} cache
 * @returns
 */
function calcAABB(cache) {
    let minX = Infinity,
        minY = Infinity,
        minZ = Infinity;
    let maxX = -Infinity,
        maxY = -Infinity,
        maxZ = -Infinity;

    for (const pos of cache) {
        minX = Math.min(minX, pos.x);
        minY = Math.min(minY, pos.y);
        minZ = Math.min(minZ, pos.z);
        maxX = Math.max(maxX, pos.x);
        maxY = Math.max(maxY, pos.y);
        maxZ = Math.max(maxZ, pos.z);
    }

    return { minX: minX, minY: minY, minZ: minZ, maxX: maxX, maxY: maxY, maxZ: maxZ };
}

/**
 * @typedef {ReturnType<typeof calcAABB>} AABB
 */

/**
 *
 * @param {AABB} a
 * @param {AABB} b
 * @returns
 */
function isSameAABB(a, b) {
    if (!a || !b) return false;
    return (
        a.minX === b.minX &&
        a.minY === b.minY &&
        a.minZ === b.minZ &&
        a.maxX === b.maxX &&
        a.maxY === b.maxY &&
        a.maxZ === b.maxZ
    );
}

// var Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
// var BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
/**
 *
 * @param {Internal.Level} level
 * @param {AABB} aabb
 * @param {Block[]} blocks
 * @returns {BlockPos[]} Block positions
 */
function scanBlocks(level, aabb, blocks) {
    var result = [];
    // console.log("Scanning soils in AABB:", aabb);

    for (var x = aabb.minX; x <= aabb.maxX; x++) {
        for (var y = aabb.minY; y <= aabb.maxY; y++) {
            for (var z = aabb.minZ; z <= aabb.maxZ; z++) {
                var pos = new BlockPos(x, y, z);
                var block = level.getBlockState(pos).getBlock();
                if (blocks.some(blockInList => block === blockInList)) {
                    result.push(pos.immutable());
                }
            }
        }
    }
    // console.log("Found soils:");
    // console.log(result);

    return result;
}
