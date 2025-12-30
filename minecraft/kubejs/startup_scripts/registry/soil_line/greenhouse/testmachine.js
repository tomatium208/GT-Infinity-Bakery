const TieredPipe = createTieredPredicate(
    "PipeTier",
    () => [
        GTBlocks.CASING_BRONZE_PIPE,
        GTBlocks.CASING_STEEL_PIPE,
        GTBlocks.CASING_TITANIUM_PIPE,
        GTBlocks.CASING_TUNGSTENSTEEL_PIPE,
    ],
    "gtceu.multiblock.pattern.error.pipe_tier"
);

/**
 * カスタムマルチブロック機械
 * JavaAdapterでWorkableElectricMultiblockMachineを継承した匿名クラスを生成します
 * @param {Internal.IMachineBlockEntity} holder
 * @returns {Internal.WorkableElectricMultiblockMachine}
 */
function ExampleMachine(holder) {
    /**
     * @type {Internal.WorkableElectricMultiblockMachine &
     * {
     * getTier():number
     * nbt():Internal.CompoundTag
     * }}
     */
    const Logic = {
        ////////////////////////////////////////////////////////////////
        // why nbt? RecipeModifierを渡すコンテキストとLogicのコンテキストが同じじゃないので、
        // Tierを取得できるようにするにはこれしかなかった、苦肉の策です。
        // 普段のJavaではinstanceofで判定してキャストできるのですが、JavaAdapterでは独自のフィールドを生やすことができませんし
        // クラス自体を作成してるわけではありません。匿名クラスを逐次生成しています
        ////////////////////////////////////////////////////////////////
        // 注意: Javaクラスにこれが生成されるわけではない。Logicオブジェクト内でしか使えない
        nbt() {
            return this.holder.persistentData;
        },
        // 上と同じ。
        getTier() {
            return this.nbt().getDouble("tier");
        },
        // これらはoverrideしてるので生成される
        /** @override */
        onStructureFormed() {
            // Rhinoの特殊な記法であり、superを呼び出す
            this.super$onStructureFormed();
            // マルチブロックが形成されたときに呼び出される
            const tier = TieredPipe.getTier(this);
            // マルチブロックのNBTにtierを書き込む
            this.nbt().putDouble("tier", tier);
        },

        /** @override */
        addDisplayText(textList) {
            this.super$addDisplayText(textList);
            if (this.isFormed()) {
                var tier = this.getTier();
                textList.add(
                    Component.translatable(
                        "gtceu.multiblock.example_machine.tier",
                        I18n.get("gtceu.example_machine.tier." + tier)
                    )
                );
            }
        },
    };
    // (Class,Logic,...args)
    // 可変長引数は配列として扱われるので、空配列を渡す
    // 使ったことはないけど(Class,[...Interface],Logic,...args)も可能かも
    // public com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine(com.gregtechceu.gtceu.api.machine.IMachineBlockEntity,java.lang.Object[])
    return new JavaAdapter(WorkableElectricMultiblockMachine, Logic, holder, []);
}
/**
 * @returns {Internal.RecipeModifier}
 */
function ExampleMachineRecipeModifier() {
    return (machine, recipe) => {
        var nbt = machine.holder.persistentData;
        var tier = nbt.getDouble("tier");
        var recipeTier = recipe.data.getDouble("tier");
        //  tier low
        if (recipeTier > tier) {
            return ModifierFunction.NULL;
        }
        var tierDiff = tier - recipeTier;
        // 必要ティアよりティアが1高いごとに4倍の並列処理を許可
        var freeParallelAmount = 4 ** tierDiff;
        if (freeParallelAmount > 1) {
            /** @type {number} */
            var parallelAmount = ParallelLogic.getParallelAmount(machine, recipe, freeParallelAmount);
            // 並列処理に必要なものセット
            return ModifierFunction.builder()
                .modifyAllContents(ContentModifier.multiplier(parallelAmount))
                .eutMultiplier(parallelAmount)
                .parallels(parallelAmount)
                .build();
        }
        return ModifierFunction.IDENTITY;
    };
}

GTCEuStartupEvents.registry("gtceu:machine", event => {
    GTRecipeTypes.get("example_machine").addDataInfo(data => {
        var str = "";
        // I18nから直接翻訳後の文字列を取得
        // client-onlyなので呼ぶ場所に注意。
        const tier = I18n.get("gtceu.example_machine.tier." + data.getDouble("tier"));
        // Tier: %sのような感じで定義しているので、置換文字列を渡す
        str += I18n.get("emi_info.kubejs.example_machine.tier", tier);
        return str;
    });

    event
        .create("example_machine", "multiblock")
        // WorkableElectricMultiblockMachineの代わりに使うクラス
        .machine(holder => ExampleMachine(holder))
        // 上/下以外の向きを向く (like かまど)
        .rotationState(RotationState.NON_Y_AXIS)
        // 使用できるレシピ
        .recipeTypes("example_machine")
        // もしRecipeModifierで何かを変更する必要があるなら、これは重要です
        // 普通のマルチブロック機械はfalse
        .alwaysTryModifyRecipe(true)
        // 最初に並列を試みてから他の修飾子を適用します
        .recipeModifiers(true, [
            ExampleMachineRecipeModifier(),
            GTRecipeModifiers.OC_NON_PERFECT,
            GTRecipeModifiers.BATCH_MODE,
        ])
        // 基本はworkableCasingModelの一つ目の引数と同じ
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        // マルチブロックの形成パターン
        .pattern(
            /** @param {Internal.MachineDefinition} definition */
            definition =>
                FactoryBlockPattern.start()
                    .aisle("AAA", "CCC", "CCC", "AAA")
                    .aisle("AAA", "C C", "C C", "AMA")
                    .aisle("A@A", "CCC", "CCC", "AAA")
                    // コントローラーとしてマークされたブロック
                    .where("@", Predicates.controller(Predicates.blocks(definition.get())))
                    .where("M", Predicates.ability(PartAbility.MUFFLER))
                    .where(" ", Predicates.air())
                    .where(
                        "A",
                        Predicates.blocks("gtceu:solid_machine_casing")
                            .setMinGlobalLimited(5)
                            // レシピタイプからI/Oバス/ハッチを許可
                            .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                            // メンテナンスハッチ
                            .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                    )
                    .where("C", TieredPipe.predicate())
                    .build()
        )
        .shapeInfos(definition => {
            var shapeInfo = new ArrayList();
            // preview for GUI
            var LV = GTValues.LV;
            const builder = MultiblockShapeInfo.builder()
                .aisle("I@O", "CCC", "CCC", "XMX")
                .aisle("FXD", "C#C", "C#C", "XHX")
                .aisle("EEX", "CCC", "CCC", "XXX")
                ["where(char,net.minecraft.world.level.block.state.BlockState)"](
                    "X",
                    GTBlocks.CASING_STEEL_SOLID.getDefaultState()
                )
                .where("@", definition, Direction.NORTH)
                ["where(char,net.minecraft.world.level.block.state.BlockState)"]("#", Blocks.AIR.defaultBlockState())
                .where("E", GTMachines.ENERGY_INPUT_HATCH[LV], Direction.SOUTH)
                .where("I", GTMachines.ITEM_IMPORT_BUS[LV], Direction.NORTH)
                .where("O", GTMachines.ITEM_EXPORT_BUS[LV], Direction.NORTH)
                .where("F", GTMachines.FLUID_IMPORT_HATCH[LV], Direction.WEST)
                .where("D", GTMachines.FLUID_EXPORT_HATCH[LV], Direction.EAST)
                .where("H", GTMachines.MUFFLER_HATCH[LV], Direction.UP)
                .where("M", GTMachines.MAINTENANCE_HATCH, Direction.NORTH);
            // コピーしてティアごとに生成
            TieredPipe.blocks().forEach(block =>
                shapeInfo.add(
                    builder.shallowCopy()["where(char,net.minecraft.world.level.block.Block)"]("C", block.get()).build()
                )
            );
            return shapeInfo;
        })
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/multiblock/implosion_compressor"
        );
});

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event
        .create("example_machine")
        .category("multiblock")
        .setEUIO("in")
        .setMaxIOSize(3, 9, 3, 2)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ELECTROLYZER)
        .setMaxTooltips(6);
});
