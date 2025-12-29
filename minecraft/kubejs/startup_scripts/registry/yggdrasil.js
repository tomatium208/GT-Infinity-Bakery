var SaplingBlock = Java.loadClass("net.minecraft.world.level.block.SaplingBlock");
var AbstractMegaTreeGrower = Java.loadClass("net.minecraft.world.level.block.grower.AbstractMegaTreeGrower");
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
    const st = level.getBlockState(pos);
    return st.getBlock() === myBlock;
}
/**
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @returns {boolean}
 */
function stageIs1(level, pos) {
    const st = level.getBlockState(pos);
    return st.hasProperty(SaplingBlock.STAGE) && st.getValue(SaplingBlock.STAGE) === 1;
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
    for (let dx = 0; dx <= N - 1; dx++) {
        for (let dz = 0; dz <= N - 1; dz++) {
            var a = pos.west(dx).north(dz); // 候補アンカー
            let ok = true;
            for (let x = 0; x < N && ok; x++) {
                for (let z = 0; z < N && ok; z++) {
                    var p = a.east(x).south(z);
                    if (!sameSapling(level, p, myBlock) || !stageIs1(level, p)) ok = false;
                }
            }
            if (ok) return a;
        }
    }
    return null;
}
/**
 *
 * @param {Internal.Level} level
 * @param {BlockPos} anchor
 * @param {number} N
 */
function clearNxN(level, anchor, N) {
    const AIR = Blocks.AIR.defaultBlockState();
    for (let x = 0; x < N; x++) {
        for (let z = 0; z < N; z++) {
            level.setBlock(anchor.east(x).south(z), AIR, 4);
        }
    }
}

/**
 * @param {Internal.ServerLevel} serverLevel
 * @param {BlockPos} placePos
 * @param {Internal.StructureTemplate} template
 */
function placeTemplate(serverLevel, placePos, template) {
    const settings = new StructurePlaceSettings().setIgnoreEntities(true);
    return template.placeInWorld(serverLevel, placePos, placePos, settings, serverLevel.random, 2);
}
/**
 * @param {Internal.ServerLevel} serverLevel
 * @param {ResourceLocation} templateId
 */
function getTemplate(serverLevel, templateId) {
    const mgr = serverLevel.getStructureManager();
    return mgr.get(templateId).orElseThrow();
}

/**
 *「正面」を水平4方向で扱う（UP/DOWNはデフォルト扱いに落とす）
 * @param {Internal.Direction} dir
 * @returns {Internal.Rotation}
 */
function rotationFromFacing(dir) {
    if (dir === Direction.EAST) return Rotation.CLOCKWISE_90;
    if (dir === Direction.SOUTH) return Rotation.CLOCKWISE_180;
    if (dir === Direction.WEST) return Rotation.COUNTERCLOCKWISE_90;
    return Rotation.NONE; // NORTH, UP, DOWN
}
/** @param {Internal.Rotation} rotation */
function makePlaceSettings(rotation) {
    const s = new StructurePlaceSettings()
        .setRotation(rotation) // :contentReference[oaicite:2]{index=2}
        .setMirror(Mirror.NONE)
        .setIgnoreEntities(true);

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
    return template.getBoundingBox(settings, origin); // :contentReference[oaicite:3]{index=3}
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

    return bbox.minY() >= minY && bbox.maxY() <= maxY;
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
    for (let x = bbox.minX(); x <= bbox.maxX(); x++) {
        for (let y = bbox.minY(); y <= bbox.maxY(); y++) {
            for (let z = bbox.minZ(); z <= bbox.maxZ(); z++) {
                const p = new BlockPos(x, y, z);
                if (!isAllowedToOverwrite(level, p, mySaplingBlock)) {
                    return false;
                }
            }
        }
    }
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
    const template = getTemplate(serverLevel, templateId);
    const rotation = rotationFromFacing(facingDir);
    const settings = makePlaceSettings(rotation);

    const bbox = getPlacedBoundingBox(template, settings, origin);

    // 1) 建築上限チェック
    if (!checkBuildHeight(serverLevel, bbox)) return { ok: false, reason: "kubejs.tree_growth.too_high_or_low" };

    // 2) ブロック上書きチェック（邪魔があれば育たない）
    if (!checkClearance(serverLevel, bbox, mySaplingBlock))
        return { ok: false, reason: "kubejs.tree_growth.obstructed" };

    // OKなら配置（placeInWorldのシグネチャ） :contentReference[oaicite:4]{index=4}
    const ok = template.placeInWorld(serverLevel, origin, origin, settings, serverLevel.random, 2);
    if (ok) {
        return { ok: true };
    } else {
        return { ok: false, reason: "kubejs.tree_growth.placement_failed" };
    }
}

var YGGDRASIL_OFFSET_X = 0;
var YGGDRASIL_OFFSET_Z = 0;
/** @type {WeakMap< Internal.ServerLevel,Map<string,{player: Internal.Player, time: number}>>>} */
const lastUserMap = new WeakMap();
const TTL_TICK = 20 * 2;

const FACING = DirectionProperty.create("facing", Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST);

/**
 * @param {Internal.ServerLevel} serverLevel
 * @param {BlockPos} pos
 * @param {Internal.Player} player
 */
function rememberLastUser(serverLevel, pos, player) {
    if (!lastUserMap.has(serverLevel)) {
        lastUserMap.set(serverLevel, new Map());
    }
    const m = lastUserMap.get(serverLevel);
    const key = `${pos.getX()},${pos.getY()},${pos.getZ()}`;

    m.set(key, {
        player: player,
        time: serverLevel.levelData.getGameTime(),
    });
}
/**
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos
 * @returns
 */
function consumeLastUser(level, pos) {
    const m = lastUserMap.get(level);
    if (!m) return null;

    const key = `${pos.getX()},${pos.getY()},${pos.getZ()}`;
    const e = m.get(key);
    if (!e) return null;

    // TTL チェック
    if (level.getGameTime() - e.time > TTL_TICKS) {
        m.delete(key);
        return null;
    }

    m.delete(key); // 使い切り
    return e.player;
}

StartupEvents.registry("block", event => {
    event.createCustom("kubejs:yggdrasil_sapling", () => {
        // 明示的な無
        const NullTreeGrower = new JavaAdapter(AbstractMegaTreeGrower, {
            getConfiguredFeature(p_222924_, p_222925_) {
                return null;
            },
            getConfiguredMegaFeature(p_255891_) {
                return null;
            },
        });
        /** @type {Internal.SaplingBlock} */
        const yggdrasilSaplingBlock = new JavaAdapter(
            SaplingBlock,
            /** @type {Internal.SaplingBlock} */ ({
                advanceTree(serverLevel, blockPos, blockState, random) {
                    // copy of saplings method
                    if (blockState.getValue(SaplingBlock.STAGE) === 0) {
                        serverLevel.setBlock(blockPos, blockState.cycle(SaplingBlock.STAGE), 4);
                    } else {
                        const anchor = findAnchorNxN(serverLevel, blockPos, this, 3);
                        if (anchor == null) {
                            return;
                        }
                        const offsetPos = anchor.offset(YGGDRASIL_OFFSET_X, 0, YGGDRASIL_OFFSET_Z);
                        const result = tryPlaceTemplateAsTree(
                            serverLevel,
                            offsetPos,
                            new ResourceLocation("kubejs", "yggdrasil_tree"),
                            blockState.getValue(FACING),
                            this
                        );
                        if (result.ok) {
                        } else {
                            const player = consumeLastUser(serverLevel, blockPos);
                            if (player) {
                                player.sendSystemMessage(Component.translatable(result.reason));
                            }
                        }
                    }
                },
                use(state, level, pos, player, hand, hitResult) {
                    if (
                        !level.isClientSide() &&
                        hand === InteractionHand.MAIN_HAND &&
                        player.getMainHandItem()["is(net.minecraft.world.item.Item)"](Items.BONE_MEAL)
                    ) {
                        const face = hitResult.getDirection();
                        level.setBlock(pos, state.setValue(FACING, face), 4);

                        rememberLastUser(level, pos, player);
                    }
                    this.super$use(state, level, pos, player, hand, hitResult);
                },

                createBlockStateDefinition(builder) {
                    this.super$createBlockStateDefinition(builder);
                    builder.add(FACING);
                },

                getStateForPlacement(context) {
                    return this.defaultBlockState().setValue(SaplingBlock.STAGE, 0).setValue(FACING, Direction.NORTH);
                },
            }),
            NullTreeGrower,
            // 意図してrandomTicks()を有効化してない
            BlockBehaviour$Properties.of().noCollission().instabreak().sound(SoundType.GRASS)
        );
        yggdrasilSaplingBlock.registerDefaultState;
        return yggdrasilSaplingBlock;
    });
});

StartupEvents.registry("item", event => {
    event.createCustom("kubejs:yggdrasil_sapling", () => {
        return new BlockItem(Block.getBlock("kubejs:yggdrasil_sapling"), new ItemProperties());
    });
});
