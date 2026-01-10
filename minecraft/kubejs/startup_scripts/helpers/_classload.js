//priority: 9001
var BlockInfo = Java.loadClass("com.lowdragmc.lowdraglib.utils.BlockInfo");
var ParallelLogic = Java.loadClass("com.gregtechceu.gtceu.api.recipe.modifier.ParallelLogic");
var ContentModifier = Java.loadClass("com.gregtechceu.gtceu.api.recipe.content.ContentModifier");
var I18n = Java.loadClass("net.minecraft.client.resources.language.I18n");
var WorkableElectricMultiblockMachine = Java.loadClass(
    "com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine"
);
var ArrayList = Java.loadClass("java.util.ArrayList");
var Integer = Java.loadClass("java.lang.Integer");
var PatternStringError = Java.loadClass("com.gregtechceu.gtceu.api.pattern.error.PatternStringError");
var ItemBlockRenderTypes = Java.loadClass("net.minecraft.client.renderer.ItemBlockRenderTypes");
var RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType");
var EURecipeCapability = Java.loadClass("com.gregtechceu.gtceu.api.capability.recipe.EURecipeCapability");
var IO = Java.loadClass("com.gregtechceu.gtceu.api.capability.recipe.IO");
var IRecipeHandler = Java.loadClass("com.gregtechceu.gtceu.api.capability.recipe.IRecipeHandler");
var IRecipeHandlerTrait = Java.loadClass("com.gregtechceu.gtceu.api.machine.trait.IRecipeHandlerTrait");
var Collections = Java.loadClass("java.util.Collections");
var EnergyContainerList = Java.loadClass("com.gregtechceu.gtceu.api.misc.EnergyContainerList");
var MetaMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.MetaMachine");
var ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos");
var ForgeChunkManager = Java.loadClass("net.minecraftforge.common.world.ForgeChunkManager");
var TickableSubscription = Java.loadClass("com.gregtechceu.gtceu.api.machine.TickableSubscription");
var Runnable = Java.loadClass("java.lang.Runnable");
var MachineTrait = Java.loadClass("com.gregtechceu.gtceu.api.machine.trait.MachineTrait");
var ManagedFieldHolder = Java.loadClass("com.lowdragmc.lowdraglib.syncdata.field.ManagedFieldHolder");
/** @type {typeof Internal.NotifiableRecipeHandlerTrait} */
var NotifiableRecipeHandlerTrait = Java.loadClass(
    "com.gregtechceu.gtceu.api.machine.trait.NotifiableRecipeHandlerTrait"
);
var IEnergyContainer = Java.loadClass("com.gregtechceu.gtceu.api.capability.IEnergyContainer");
/**
 * @template T
 * @param {T} base
 * @returns {Extendable<T>}
 */
function extendable(base) {
    return new Extendable(null, base || {});
}

/**
 * @template T
 */
function Extendable(parent, impls) {
    this.parent = parent || null;
    this.impls = impls || {};
    this.value = buildValue(this);
}
/**
 * @template {T} U
 * @param {U} next
 * @returns {Extendable<U>}
 */
Extendable.prototype.extend = function (next) {
    return new Extendable(this, next);
};

function buildValue(node) {
    var stacks = {};
    var obj = {};

    // 親チェーンを辿って impl を積む
    function collect(n) {
        if (n.parent) collect(n.parent);
        for (var k in n.impls) {
            var v = n.impls[k];
            if (typeof v === "function") {
                if (!stacks[k]) stacks[k] = [];
                stacks[k].push(v);
            } else {
                obj[k] = v;
            }
        }
    }

    collect(node);

    // dispatcher を作る
    for (var name in stacks) {
        obj[name] = makeDispatcher(name, stacks[name]);
    }

    return obj;
}

function makeDispatcher(name, stack) {
    return function () {
        var layer = stack.length - 1;
        var self = this;
        var oldSuper = this.__super;

        this.__super = function () {
            if (layer <= 0) {
                throw new Error("No super for " + name);
            }
            layer--;
            return stack[layer].apply(self, arguments);
        };

        try {
            return stack[layer].apply(self, arguments);
        } finally {
            if (oldSuper === undefined) {
                delete this.__super;
            } else {
                this.__super = oldSuper;
            }
        }
    };
}

const abstract = extendable({
    a() {
        console.log("A");
    },
});

const a = abstract.extend({
    a() {
        this.__super();
        console.log("A1");
    },
    b() {},
});

const b = a.extend({
    a() {
        this.__super();
        console.log("B1");
    },
});

const c = b.extend({
    a() {
        this.__super();
        console.log("C1");
    },
});
// A

a.value.a();
// A1
// A

b.value.a();
// B1
// A

c.value.a();
// C1
// B1
// A
