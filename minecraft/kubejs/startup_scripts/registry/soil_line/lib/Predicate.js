// priority:1

/**
 * @typedef {Internal.BlockEntry<Internal.Block> | Internal.Supplier<Internal.Block>} BlockEntryLike
 */

/**
 * 指定したブロック群にマッチするPredicateを作成とそのヘルパー
 * @param {string} key
 * @param {() => BlockEntryLike[]} blocks should be pure function
 * @param {`gtceu.multiblock.pattern.error.${string}`} errorString
 */
function createMatchingPredicate(key, blocks, errorString) {
    function predicate() {
        return Predicates.custom(
            blockWorldState => {
                var blockState = blockWorldState.getBlockState();
                for (var value of blocks()) {
                    var entryBlock = value.get();
                    if (blockState.is(entryBlock)) {
                        var stats = entryBlock;
                        // put number
                        var currentBlock = blockWorldState.getMatchContext().getOrPut(key, stats);
                        if (currentBlock !== stats) {
                            blockWorldState.setError(new PatternStringError(errorString));
                            return false;
                        }
                        return true;
                    }
                }
                return false;
            },
            // もしかしたらJavaのArrayじゃないとだめかもね
            () => {
                return convertToJavaArray(
                    blocks().map(entry => {
                        return BlockInfo.fromBlockState(entry.get().defaultBlockState());
                    }),
                    BlockInfo
                );
            }
        ).addTooltips(Component.translatable(errorString));
    }
    /**
     *
     * @param {Internal.WorkableMultiblockMachine} machine
     * @returns {Internal.Block}
     */
    function getBlock(machine) {
        return machine.getMultiblockState().getMatchContext().get(key);
    }

    return {
        predicate: predicate,
        getBlock: getBlock,
        blocks: blocks,
    };
}
/**
 * TieredなPredicateを作りやすいようにラップしたcreateMatchingPredicate
 * @param {string} key
 * @param {() => BlockEntryLike[]} blocks should be pure function
 * @param {`gtceu.multiblock.pattern.error.${string}`} errorString
 */
function createTieredPredicate(key, blocks, errorString) {
    const matchingPredicate = createMatchingPredicate(key, blocks, errorString);
    /**
     *  @param {Internal.WorkableMultiblockMachine} machine
     * @returns {number} tier number, 0-based, -1 if not matched
     */
    function getTier(machine) {
        const block = matchingPredicate.getBlock(machine);
        for (let i = 0; i < blocks().length; i++) {
            var entry = blocks()[i];
            if (block === entry.get()) {
                return i;
            }
        }
        return -1;
    }

    return {
        predicate: matchingPredicate.predicate,
        getTier: getTier,
        blocks: blocks,
    };
}

// https://discord.com/channels/303440391124942858/1454086705685467146/1454201219814785245
// The goal of this script is to create an empty array of a desired type.
// In order to create a List from varargs, but any Collection that has ["toArray(java.lang.Object[])"] will work
// Now, we **cannot** load java.lang.reflect.Array, since it's blocked by a class filter.
// But who said we need to use this directly?
// This is the perfect class to use:
// - It has an argument that takes in a class,
// - It has a method that outputs an array of class instances.
// Source: https://github.com/KubeJS-Mods/Rhino/blob/2001/common/src/main/java/dev/latvian/mods/rhino/util/wrap/ArrayTypeWrapperFactory.java
var $ArrayTypeWrapperFactory = Java.loadClass("dev.latvian.mods.rhino.util.wrap.ArrayTypeWrapperFactory");
/**
 * @param {any[]} jsArray
 * @param {Internal.Class} clazz
 * @returns
 */
function convertToJavaArray(jsArray, clazz) {
    // Constructor calls:
    // emptyArray = (T[]) Array.newInstance(target, 0);
    // And our target is the ItemStack class!
    const arrayFactory = new $ArrayTypeWrapperFactory(null, clazz, null);
    // null context and null object, so that `if (o == null)` branch is taken. Then we get an empty array of ItemStack.
    const seed = arrayFactory.wrap(null, null);
    console.log(seed);

    const list = new ArrayList();
    jsArray.forEach(v => {
        list.add(v);
    });
    const typedJavaArray = list["toArray(java.lang.Object[])"](seed);

    return typedJavaArray;
}
