// priority:1
/**
 *
 * @param {string} key
 * @param {() => Internal.Supplier<Internal.Block>[]} blocks
 */
function createTieredMachineHelper(key, blocks) {
    function predicate() {
        return new TraceabilityPredicate(
            blockWorldState => {
                var blockState = blockWorldState.getBlockState();
                var index = 0;
                for (var value of blocks()) {
                    console.log(value);
                    if (blockState.is(value.get())) {
                        var stats = index;
                        // put number
                        var currentBlock = blockWorldState.getMatchContext().getOrPut(index, stats);
                        if (currentBlock !== stats) {
                            blockWorldState.setError(new PatternStringError("gtceu.multiblock.pattern.error.pipes"));
                            return false;
                        }
                        return true;
                    }

                    index++;
                }
                return false;
            },
            // もしかしたらJavaのArrayじゃないとだめかもね
            () => {
                return toJavaArray(
                    blocks().map(entry => {
                        BlockInfo.fromBlockState(entry.get().defaultBlockState());
                    }),
                    BlockInfo
                );
            }
        ).addTooltips(Component.translatable("gtceu.multiblock.pattern.error.pipes"));
    }
    /**
     *
     * @param {Internal.WorkableElectricMultiblockMachine} that
     * @returns {number}
     */
    function getTier(that) {
        return that.getMultiblockState().getMatchContext().get(key) || 0;
    }

    return {
        predicate: predicate,
        getTier: getTier,
    };
}
/**
 *
 * @param {any[]} jsArray
 * @param {Internal.Class} clazz
 * @returns
 */
function toJavaArray(jsArray, clazz) {
    var RawJArray = global.toRawClass(JArray);
    console.log(JArray);
    JArray.__javaObject__.getDeclaredMethods().forEach(m => {
        console.log(m.toGenericString());
    });
    console.log(RawJArray);
    console.log("keys", Object.keys(JArray));
    console.log("anothor raw keys", Object.keys(JArray.__javaObject__));
    console.log("raw keys", Object.keys(RawJArray));
    const arr = RawJArray.newInstance(global.toRawClass(clazz), Integer.valueOf(jsArray.length.toFixed(0)));

    console.log(arr);
    for (let i = 0; i < jsArray.length; i++) {
        arr[i] = jsArray[i];
    }
    console.log(arr);
    return arr;
}
