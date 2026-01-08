// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info("Hello, World! (Loaded client scripts)");
const OverlayTexture = Java.loadClass("net.minecraft.client.renderer.texture.OverlayTexture");
const RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType");
const Axis = Java.loadClass("com.mojang.math.Axis");
const RandomSource = Java.loadClass("net.minecraft.util.RandomSource");
const $Direction = Java.loadClass("net.minecraft.core.Direction");
const ModelData = Java.loadClass("net.minecraftforge.client.model.data.ModelData");
const LightTexture = Java.loadClass("net.minecraft.client.renderer.LightTexture");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
const $AABB = Java.loadClass("net.minecraft.world.phys.AABB");

GTRenderJSEvents.registerDynamicRender(event => {
    event.create(
        "kubejs:eye_of_harmony",
        /**
         *@param {Internal.RenderBuilder<Internal.WorkableElectricMultiblockMachine,unknown>} builder
         */
        builder => {
            builder.render(ctx => {
                ctx.binding;
                const poseStack = ctx.poseStack;
                const buffer = ctx.buffer;
                var tick = ctx.machine.getOffsetTimer() + ctx.partialTick;
                RenderSystem.disableDepthTest();

                poseStack.pushPose();
                var x = 0.5,
                    y = 0.5,
                    z = -15.5;
                poseStack.translate(x, y, z);

                renderStar(tick, poseStack, buffer);
                renderOrbitObjects(tick, poseStack, buffer, x, y, z);
                renderOuterSpaceShell(poseStack, buffer.getBuffer(RenderType.solid()));

                poseStack.popPose();
                RenderSystem.enableDepthTest();
            });
            builder.viewDistance(256);

            const shouldRender = machine => machine.isFormed();
            builder.shouldRender(shouldRender);
            builder.shouldRenderOffScreen(shouldRender);

            builder.renderBoundingBox(() => {
                // todo ちゃんとやる
                const rad = 2 ** 6;
                return AABB.of(-rad, -rad, -rad, rad, rad, rad);
            });
            builder.isBlockEntityRenderer(false);
        }
    );
});
/**
 * @default64
 * @param {Internal.PoseStack} poseStack
 * @param {Internal.VertexConsumer} consumer
 * @param {number} scale
 */
function renderOuterSpaceShell(poseStack, consumer) {
    const scale = 0.01 * 17.5;
    poseStack.pushPose();
    poseStack.scale(scale, scale, scale);

    const pose = poseStack.last();

    BakedModelRenderer.renderModel(pose, consumer, getBakedModel("kubejs:obj/space"), RenderType.solid());

    poseStack.popPose();
}
/**
 * @param {number} tick
 * @param {Internal.PoseStack} poseStack
 * @param {Internal.MultiBufferSource} buffer
 */
function renderStar(tick, poseStack, buffer) {
    const scale = 0.01 * 2;
    poseStack.pushPose();
    poseStack.scale(scale, scale, scale);
    poseStack.mulPose(new Quaternionf().fromAxisAngleDeg(0, 1, 1, tick / 2 / 360));
    BakedModelRenderer.renderModel(
        poseStack.last(),
        buffer.getBuffer(RenderType.translucent()),
        getBakedModel("kubejs:obj/star"),
        RenderType.translucent()
    );
    poseStack.popPose();
}
var orbit_models = [
    () => getBakedModel("kubejs:obj/the_nether"),
    () => getBakedModel("kubejs:obj/overworld"),
    () => getBakedModel("kubejs:obj/the_end"),
];
/**
 * @param {number} tick
 * @param {Internal.PoseStack} poseStack
 * @param {Internal.MultiBufferSource} buffer
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function renderOrbitObjects(tick, poseStack, buffer, x, y, z) {
    for (let a = 1; a < 4; a++) {
        var scale = 0.007 + 0.003 * a;
        poseStack.pushPose();
        poseStack.scale(scale, scale, scale);
        poseStack.mulPose(new Quaternionf().fromAxisAngleDeg(1.0, 0.0, 1.0, ((tick * 1.5) / a) % 360.0));
        poseStack.translate(
            x + (a * 100 + 160) * Math.sin((tick * a) / 80 + 0.4),
            y,
            z + (a * 100 + 160) * Math.cos((tick * a) / 80 + 0.4)
        );
        BakedModelRenderer.renderModel(
            poseStack.last(),
            buffer.getBuffer(RenderType.solid()),
            orbit_models[a - 1](),
            RenderType.solid()
        );
        poseStack.popPose();
    }
}

/**
 * @param {ResourceLocation_} id
 */
function getBakedModel(id) {
    return Client.getModelManager().getModel(id);
}
