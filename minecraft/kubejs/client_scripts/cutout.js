// IF IT WORK , DONT TOUCH IT!
const $ItemBlockRenderTypes = Java.loadClass('net.minecraft.client.renderer.ItemBlockRenderTypes')
const $RenderType = Java.loadClass('net.minecraft.client.renderer.RenderType')
const $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')

ClientEvents.init(event => {
    $ItemBlockRenderTypes.setRenderLayer('kubejs:block/yggdrasil_sapling', $RenderType.cutout())
})