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

GTRenderJSEvents.registerDynamicRender(event => {
    event.create(
        "kubejs:eye_of_harmony",
        /**
         * @param {Internal.RenderBuilder<Internal.WorkableElectricMultiblockMachine>} builder
         */
        builder => {
            builder.render(ctx => {
                const poseStack = ctx.poseStack;
                const buffer = ctx.buffer;

                poseStack.pushPose();

                poseStack.translate(0.5, 0.5, 12.5);

                var scale = 0.01 * 12;
                renderSpace(poseStack, buffer.getBuffer(RenderType.solid()), scale);

                poseStack.popPose();
            });
            builder.viewDistance(256);
            builder.shouldRender(machine => machine.isFormed());
            builder.renderBoundingBox(machine => {
                // 意味はない でかいだけ
                return AABB.of(-32, -32, -32, 32, 32, 32);
            });
        }
    );
});
/**
 *
 * @param {Internal.PoseStack} poseStack
 * @param {Internal.VertexConsumer} consumer
 * @param {number} scale
 */
function renderSpace(poseStack, consumer, scale) {
    poseStack.pushPose();
    poseStack.scale(scale, scale, scale);

    const pose = poseStack.last();

    BakedModelRenderer.renderModel(pose, consumer, getBakedModel("kubejs:obj/space"));

    poseStack.popPose();
}

/**
 * @param {ResourceLocation_} id
 */
function getBakedModel(id) {
    return Client.getModelManager().getModel(id);
}
