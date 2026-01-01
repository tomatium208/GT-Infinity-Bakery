var SaplingBlock = Java.loadClass("net.minecraft.world.level.block.SaplingBlock");
var AbstractMegaTreeGrower = Java.loadClass("net.minecraft.world.level.block.grower.AbstractMegaTreeGrower");
var DarkOakTreeGrower = Java.loadClass("net.minecraft.world.level.block.grower.DarkOakTreeGrower");
var BlockBehaviour$Properties = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour$Properties");
var SoundType = Java.loadClass("net.minecraft.world.level.block.SoundType");
var BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem");
var ItemProperties = Java.loadClass("net.minecraft.world.item.Item$Properties");
var CreativeModeTabs = Java.loadClass("net.minecraft.world.item.CreativeModeTab");
var ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
var Registries = Java.loadClass("net.minecraft.core.registries.Registries");
var ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
var StructurePlaceSettings = Java.loadClass(
    "net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings"
);
var Rotation = Java.loadClass("net.minecraft.world.level.block.Rotation");
var Mirror = Java.loadClass("net.minecraft.world.level.block.Mirror");
var DirectionProperty = Java.loadClass("net.minecraft.world.level.block.state.properties.DirectionProperty");

/**
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @param {Internal.Block} myBlock
 * @returns {boolean}
 */
function sameSapling(level, pos, myBlock) {
    // 置かれているブロックが自分の苗木かどうかを判定するだけの薄いラッパー
    const st = level.getBlockState(pos);
    console.log(`[sameSapling] pos=${pos}, match=${st.getBlock() === myBlock}`);
    return st.getBlock() === myBlock;
}
/**
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @returns {boolean}
 */
function stageIs1(level, pos) {
    // STAGE は Java 側の enum なので数値化して比較する必要がある
    const st = level.getBlockState(pos);
    if (!st.hasProperty(SaplingBlock.STAGE)) return false;
    // おのれJava & Rhino
    const v = Number(st.getValue(SaplingBlock.STAGE)); // ←重要
    const result = v == 1; // ← == にする
    console.log(`[stageIs1] pos=${pos}, stage=${v}, isStage1=${result}`);
    return result;
}

/**
 * pos を含む NxN のアンカー（北西）を探す。見つかったら BlockPos を返す。
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos
 * @param {Internal.Block} myBlock
 * @param {number} N
 * @returns {BlockPos|null}
 */
function findAnchorNxN(level, pos, myBlock, N) {
    // pos が N×N 内のどこであっても北西角を見つけるため、pos からずらしながら総当たり
    console.log(`[findAnchorNxN] searching ${N}x${N} anchor starting from pos=${pos}`);
    for (let dx = 0; dx <= N - 1; dx++) {
        for (let dz = 0; dz <= N - 1; dz++) {
            var a = pos.west(dx).north(dz); // 候補アンカー
            let ok = true;
            for (let x = 0; x < N && ok; x++) {
                for (let z = 0; z < N && ok; z++) {
                    var p = a.east(x).south(z);
                    if (!sameSapling(level, p, myBlock)) ok = false;
                }
            }
            if (ok) {
                console.log(`[findAnchorNxN] found anchor at ${a}`);
                return a;
            }
        }
    }
    console.log(`[findAnchorNxN] no anchor found`);
    return null;
}
/**
 *
 * @param {Internal.Level} level
 * @param {BlockPos} anchor
 * @param {number} N
 */
function clearNxN(level, anchor, N) {
    // 必要なら設置前に足元を空気にするためのユーティリティ（現状未使用）
    console.log(`[clearNxN] clearing ${N}x${N} from anchor=${anchor}`);
    const AIR = Blocks.AIR.defaultBlockState();
    for (let x = 0; x < N; x++) {
        for (let z = 0; z < N; z++) {
            level.setBlock(anchor.east(x).south(z), AIR, 4);
        }
    }
    console.log(`[clearNxN] cleared ${N * N} blocks`);
}

/**
 * @param {Internal.ServerLevel} serverLevel
 * @param {BlockPos} placePos
 * @param {Internal.StructureTemplate} template
 */
function placeTemplate(serverLevel, placePos, template) {
    console.log(`[placeTemplate] placing template at ${placePos}`);
    const settings = new StructurePlaceSettings().setIgnoreEntities(true);
    const result = template.placeInWorld(serverLevel, placePos, placePos, settings, serverLevel.random, 2);
    console.log(`[placeTemplate] result=${result}`);
    return result;
}
/**
 * @param {Internal.ServerLevel} serverLevel
 * @param {ResourceLocation} templateId
 */
function getTemplate(serverLevel, templateId) {
    console.log(`[getTemplate] loading template: ${templateId}`);
    const mgr = serverLevel.getStructureManager();
    const template = mgr.get(templateId).orElseThrow();
    console.log(`[getTemplate] template loaded successfully`);
    return template;
}

/**
 *「正面」を水平4方向で扱う（UP/DOWNはデフォルト扱いに落とす）
 * @param {Internal.Direction} dir
 * @returns {Internal.Rotation}
 */
function rotationFromFacing(dir) {
    // テンプレートを水平 4 方向にだけ回す（上下は回転なし）
    console.log(`[rotationFromFacing] direction=${dir}`);
    if (dir === Direction.EAST) {
        console.log(`[rotationFromFacing] -> CLOCKWISE_90`);
        return Rotation.CLOCKWISE_90;
    }
    if (dir === Direction.SOUTH) {
        console.log(`[rotationFromFacing] -> CLOCKWISE_180`);
        return Rotation.CLOCKWISE_180;
    }
    if (dir === Direction.WEST) {
        console.log(`[rotationFromFacing] -> COUNTERCLOCKWISE_90`);
        return Rotation.COUNTERCLOCKWISE_90;
    }
    console.log(`[rotationFromFacing] -> NONE`);
    return Rotation.NONE;
}
/** @param {Internal.Rotation} rotation */
function makePlaceSettings(rotation) {
    console.log(`[makePlaceSettings] rotation=${rotation}`);
    const s = new StructurePlaceSettings().setRotation(rotation).setMirror(Mirror.NONE).setIgnoreEntities(true);

    // 回転の支点が欲しいならここ（テンプレ座標系）
    // 例: 3x3の中心を支点にしたい等（テンプレ設計に合わせて）
    // s.setRotationPivot(new BlockPos(px, py, pz));

    return s;
}

// 回転・ミラー・pivot込みの最終AABB（BoundingBox）を取得
/**
 *
 * @param {Internal.StructureTemplate} template
 * @param {Internal.StructurePlaceSettings} settings
 * @param {BlockPos} origin
 * @returns
 */
function getPlacedBoundingBox(template, settings, origin) {
    console.log(`[getPlacedBoundingBox] origin=${origin}`);
    const bbox = template.getBoundingBox(settings, origin);
    console.log(
        `[getPlacedBoundingBox] bbox: min=(${bbox.minX()},${bbox.minY()},${bbox.minZ()}), max=(${bbox.maxX()},${bbox.maxY()},${bbox.maxZ()})`
    );
    return bbox;
}
/**
 *
 * @param {Internal.Level} level
 * @param {Internal.BoundingBox} bbox
 * @returns
 */
function checkBuildHeight(level, bbox) {
    const minY = level.getMinBuildHeight();
    const maxY = level.getMaxBuildHeight() - 1;
    const ok = bbox.minY() >= minY && bbox.maxY() <= maxY;
    console.log(
        `[checkBuildHeight] minY=${minY}, maxY=${maxY}, bbox.minY=${bbox.minY()}, bbox.maxY=${bbox.maxY()}, ok=${ok}`
    );
    return ok;
}
/**
 *
 * @param {Internal.Level} level
 * @param {BlockPos_} pos
 * @param {Internal.Block} mySaplingBlock
 * @returns
 */
function isAllowedToOverwrite(level, pos, mySaplingBlock) {
    const st = level.getBlockState(pos);
    // 苗木自身は当然OK（NxNの足元で引っかかるのを防ぐ）
    if (st.getBlock() === mySaplingBlock) return true;

    // バニラ木っぽい判定：空気 or 置換可能ならOK
    // ※水/葉を許可したいならここで追加
    return st.isAir() || st.canBeReplaced();
}
/**
 *
 * @param {Internal.Level} level
 * @param {Internal.BoundingBox} bbox
 * @param {Internal.Block} mySaplingBlock
 * @returns
 */
function checkClearance(level, bbox, mySaplingBlock) {
    console.log(
        `[checkClearance] checking bbox from (${bbox.minX()},${bbox.minY()},${bbox.minZ()}) to (${bbox.maxX()},${bbox.maxY()},${bbox.maxZ()})`
    );
    for (let x = bbox.minX(); x <= bbox.maxX(); x++) {
        for (let y = bbox.minY(); y <= bbox.maxY(); y++) {
            for (let z = bbox.minZ(); z <= bbox.maxZ(); z++) {
                const p = new BlockPos(x, y, z);
                if (!isAllowedToOverwrite(level, p, mySaplingBlock)) {
                    console.log(`[checkClearance] blocked at ${p}`);
                    return false;
                }
            }
        }
    }
    console.log(`[checkClearance] clearance OK`);
    return true;
}

// 事前審査→配置
/**
 *
 * @param {Internal.Level} serverLevel
 * @param {BlockPos_} origin
 * @param {ResourceLocation} templateId
 * @param {Internal.Direction} facingDir
 * @param {Internal.Block} mySaplingBlock
 * @returns {{ ok: true} | { ok: false; reason:string}}
 */
function tryPlaceTemplateAsTree(serverLevel, origin, templateId, facingDir, mySaplingBlock) {
    console.log(`[tryPlaceTemplateAsTree] origin=${origin}, templateId=${templateId}, facingDir=${facingDir}`);
    const template = getTemplate(serverLevel, templateId);
    const rotation = rotationFromFacing(facingDir);
    const settings = makePlaceSettings(rotation);

    const bbox = getPlacedBoundingBox(template, settings, origin);

    // 1) 建築上限チェック
    if (!checkBuildHeight(serverLevel, bbox)) {
        console.log(`[tryPlaceTemplateAsTree] failed: too high or low`);
        return { ok: false, reason: "kubejs.tree_growth.too_high_or_low" };
    }

    // 2) ブロック上書きチェック（邪魔があれば育たない）
    if (!checkClearance(serverLevel, bbox, mySaplingBlock)) {
        console.log(`[tryPlaceTemplateAsTree] failed: obstructed`);
        return { ok: false, reason: "kubejs.tree_growth.obstructed" };
    }

    const ok = template.placeInWorld(serverLevel, origin, origin, settings, serverLevel.random, 2);
    if (ok) {
        console.log(`[tryPlaceTemplateAsTree] success`);
        return { ok: true };
    } else {
        console.log(`[tryPlaceTemplateAsTree] failed: placement_failed`);
        return { ok: false, reason: "kubejs.tree_growth.placement_failed" };
    }
}

var YGGDRASIL_OFFSET_X = -22;
var YGGDRASIL_OFFSET_Z = -20;
StartupEvents.registry("block", event => {
    console.log(`[StartupEvents.registry] registering yggdrasil_sapling block`);
    event.createCustom("kubejs:yggdrasil_sapling", () => {
        mark_as_generate_loot_table("kubejs:yggdrasil_sapling");
        // 明示的な無
        const NullTreeGrower = new JavaAdapter(AbstractMegaTreeGrower, {
            getConfiguredFeature() {
                return null;
            },
            getConfiguredMegaFeature() {
                return null;
            },
        });
        /** @type {Internal.SaplingBlock} */
        const Logic = {
            /**
             * advanceTree m_222000_
             * @param {Internal.ServerLevel} serverLevel
             * @param {BlockPos} blockPos
             * @param {Internal.BlockState} blockState
             * @param {Internal.RandomSource} random
             */
            m_222000_(serverLevel, blockPos, blockState, random) {
                // STAGE は 0→1→生成の二段階。ここは成長判定が来た時に呼ばれる。
                console.log(`[advanceTree] blockPos=${blockPos}, stage=${blockState.getValue(SaplingBlock.STAGE)}`);
                if (blockState.getValue(SaplingBlock.STAGE) === 0) {
                    // 1回目はステージを進めるだけで終了
                    console.log(`[advanceTree] advancing to stage 1`);
                    serverLevel.setBlock(blockPos, blockState.cycle(SaplingBlock.STAGE), 4);
                    return;
                }

                // ステージ1になったら 3×3 検出してテンプレ配置を試みる
                console.log(`[advanceTree] stage is 1, searching for 3x3 anchor`);
                const anchor = findAnchorNxN(serverLevel, blockPos, this, 3);
                if (anchor == null) {
                    console.log(`[advanceTree] no anchor found, canceling`);
                    return;
                }
                const offsetPos = anchor.offset(YGGDRASIL_OFFSET_X, 0, YGGDRASIL_OFFSET_Z);
                // YGGDRASIL_OFFSET_* でテンプレ原点をずらせる
                console.log(`[advanceTree] placing tree at offsetPos=${offsetPos}`);
                const result = tryPlaceTemplateAsTree(
                    serverLevel,
                    offsetPos,
                    new ResourceLocation("kubejs", "yggdrasil"),
                    Direction.NORTH,
                    this
                );
                if (result.ok) {
                    console.log(`[advanceTree] tree placed successfully`);
                } else {
                    console.log(`[advanceTree] tree placement failed: ${result.reason}`);
                }
            },
        };

        /** @type {Internal.SaplingBlock} */
        const yggdrasilSaplingBlock = new JavaAdapter(
            SaplingBlock,
            Logic,
            new DarkOakTreeGrower(),
            // 意図してrandomTicks()を有効化してない
            BlockBehaviour$Properties.of().noCollission().instabreak().sound(SoundType.GRASS)
        );
        return yggdrasilSaplingBlock;
    });
});

StartupEvents.registry("item", event => {
    event.createCustom("kubejs:yggdrasil_sapling", () => {
        return new BlockItem(Block.getBlock("kubejs:yggdrasil_sapling"), new ItemProperties());
    });
});

ClientEvents.init(event => {
    ItemBlockRenderTypes[
        "setRenderLayer(net.minecraft.world.level.block.Block,net.minecraft.client.renderer.RenderType)"
    ](Block.getBlock("kubejs:yggdrasil_sapling"), RenderType.cutout());
});
