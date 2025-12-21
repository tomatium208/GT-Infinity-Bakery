// priority: 9001
var $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
var $TagKey = Java.loadClass("net.minecraft.tags.TagKey");
/**
 *
 * @param {MaterialEntry | Internal.TagKey<Item> | Internal.ItemStack} obj
 * @param {number} [amount=1]
 * @returns {InputItem} ItemStackもIngredientなのでInputItemです
 */
function toInputItem(obj, amount) {
    if (amount === 0) {
        console.warn("Illegal amount 0 in recipe component helper, falling back to 1");
        amount = 1;
    }
    // Default
    amount = amount || 1;

    if (obj instanceof $ItemStack) {
        return Item.of(obj, amount);
    }

    if (obj instanceof MaterialEntry) {
        return ChemicalHelper["get(com.gregtechceu.gtceu.api.data.chemical.material.stack.MaterialEntry,int)"](
            obj,
            amount
        );
    }
    if (obj instanceof $TagKey) {
        return InputItem.of(Ingredient.of(obj));
    }
}

var _craftingComponentCache = new Map();
/**
 * @param {number} tier
 * @returns {{
 *   helpers: { voltage: string },
 *   circuit: InputItem,
 *   better_circuit: InputItem,
 *   cable: InputItem,
 *   coil_heating: InputItem,
 *   pump: InputItem,
 *   sawblade: InputItem,
 *   small_spring_transformer: InputItem,
 *   circuit_upper: InputItem,
 *   wire_hex: InputItem,
 *   rod_distillation: InputItem,
 *   coil_electric: InputItem,
 *   cable_tier_up_oct: InputItem,
 *   wire_quad: InputItem,
 *   rod_electromagnetic: InputItem,
 *   emitter: InputItem,
 *   coil_heating_double: InputItem,
 *   robot_arm: InputItem,
 *   voltage_coil: InputItem,
 *   pipe_normal: InputItem,
 *   sensor_emitter_gem: InputItem,
 *   motor: InputItem,
 *   plate: InputItem,
 *   rod_radioactive: InputItem,
 *   cable_double: InputItem,
 *   glass: InputItem,
 *   cable_tier_up_hex: InputItem,
 *   hull_plate: InputItem,
 *   crate: InputItem,
 *   grinder: InputItem,
 *   casing: InputItem,
 *   drum: InputItem,
 *   cable_tier_up_double: InputItem,
 *   wire_electric: InputItem,
 *   field_generator: InputItem,
 *   cable_quad: InputItem,
 *   cable_oct: InputItem,
 *   wire_oct: InputItem,
 *   pipe_large: InputItem,
 *   cable_tier_up: InputItem,
 *   hull: InputItem,
 *   rotor: InputItem,
 *   conveyor: InputItem,
 *   pipe_nonuple: InputItem,
 *   rod_magnetic: InputItem,
 *   frame: InputItem,
 *   cable_tier_up_quad: InputItem,
 *   power_component: InputItem,
 *   spring_transformer: InputItem,
 *   sensor: InputItem,
 *   piston: InputItem,
 *   cable_hex: InputItem,
 *   spring: InputItem
 * }}
 */
function craftingComponent(tier) {
    if (_craftingComponentCache.has(tier)) {
        return _craftingComponentCache.get(tier);
    }
    var components = {
        helpers: { voltage: voltages[tier] },
        circuit: toInputItem(GTCraftingComponents.CIRCUIT.get(tier)),
        better_circuit: toInputItem(GTCraftingComponents.BETTER_CIRCUIT.get(tier)),
        cable: toInputItem(GTCraftingComponents.CABLE.get(tier)),
        coil_heating: toInputItem(GTCraftingComponents.COIL_HEATING.get(tier)),
        pump: toInputItem(GTCraftingComponents.PUMP.get(tier)),
        sawblade: toInputItem(GTCraftingComponents.SAWBLADE.get(tier)),
        small_spring_transformer: toInputItem(GTCraftingComponents.SMALL_SPRING_TRANSFORMER.get(tier)),
        wire_hex: toInputItem(GTCraftingComponents.WIRE_HEX.get(tier)),
        rod_distillation: toInputItem(GTCraftingComponents.ROD_DISTILLATION.get(tier)),
        coil_electric: toInputItem(GTCraftingComponents.COIL_ELECTRIC.get(tier)),
        cable_tier_up_oct: toInputItem(GTCraftingComponents.CABLE_TIER_UP_OCT.get(tier)),
        wire_quad: toInputItem(GTCraftingComponents.WIRE_QUAD.get(tier)),
        rod_electromagnetic: toInputItem(GTCraftingComponents.ROD_ELECTROMAGNETIC.get(tier)),
        emitter: toInputItem(GTCraftingComponents.EMITTER.get(tier)),
        coil_heating_double: toInputItem(GTCraftingComponents.COIL_HEATING_DOUBLE.get(tier)),
        robot_arm: toInputItem(GTCraftingComponents.ROBOT_ARM.get(tier)),
        voltage_coil: toInputItem(GTCraftingComponents.VOLTAGE_COIL.get(tier)),
        pipe_normal: toInputItem(GTCraftingComponents.PIPE_NORMAL.get(tier)),
        sensor_emitter_gem: toInputItem(GTCraftingComponents.SENSOR_EMITTER_GEM.get(tier)),
        motor: toInputItem(GTCraftingComponents.MOTOR.get(tier)),
        plate: toInputItem(GTCraftingComponents.PLATE.get(tier)),
        rod_radioactive: toInputItem(GTCraftingComponents.ROD_RADIOACTIVE.get(tier)),
        cable_double: toInputItem(GTCraftingComponents.CABLE_DOUBLE.get(tier)),
        glass: toInputItem(GTCraftingComponents.GLASS.get(tier)),
        cable_tier_up_hex: toInputItem(GTCraftingComponents.CABLE_TIER_UP_HEX.get(tier)),
        hull_plate: toInputItem(GTCraftingComponents.HULL_PLATE.get(tier)),
        crate: toInputItem(GTCraftingComponents.CRATE.get(tier)),
        grinder: toInputItem(GTCraftingComponents.GRINDER.get(tier)),
        casing: toInputItem(GTCraftingComponents.CASING.get(tier)),
        drum: toInputItem(GTCraftingComponents.DRUM.get(tier)),
        cable_tier_up_double: toInputItem(GTCraftingComponents.CABLE_TIER_UP_DOUBLE.get(tier)),
        wire_electric: toInputItem(GTCraftingComponents.WIRE_ELECTRIC.get(tier)),
        field_generator: toInputItem(GTCraftingComponents.FIELD_GENERATOR.get(tier)),
        cable_quad: toInputItem(GTCraftingComponents.CABLE_QUAD.get(tier)),
        cable_oct: toInputItem(GTCraftingComponents.CABLE_OCT.get(tier)),
        wire_oct: toInputItem(GTCraftingComponents.WIRE_OCT.get(tier)),
        pipe_large: toInputItem(GTCraftingComponents.PIPE_LARGE.get(tier)),
        cable_tier_up: toInputItem(GTCraftingComponents.CABLE_TIER_UP.get(tier)),
        hull: toInputItem(GTCraftingComponents.HULL.get(tier)),
        rotor: toInputItem(GTCraftingComponents.ROTOR.get(tier)),
        conveyor: toInputItem(GTCraftingComponents.CONVEYOR.get(tier)),
        pipe_nonuple: toInputItem(GTCraftingComponents.PIPE_NONUPLE.get(tier)),
        rod_magnetic: toInputItem(GTCraftingComponents.ROD_MAGNETIC.get(tier)),
        frame: toInputItem(GTCraftingComponents.FRAME.get(tier)),
        cable_tier_up_quad: toInputItem(GTCraftingComponents.CABLE_TIER_UP_QUAD.get(tier)),
        power_component: toInputItem(GTCraftingComponents.POWER_COMPONENT.get(tier)),
        spring_transformer: toInputItem(GTCraftingComponents.SPRING_TRANSFORMER.get(tier)),
        sensor: toInputItem(GTCraftingComponents.SENSOR.get(tier)),
        piston: toInputItem(GTCraftingComponents.PISTON.get(tier)),
        cable_hex: toInputItem(GTCraftingComponents.CABLE_HEX.get(tier)),
        spring: toInputItem(GTCraftingComponents.SPRING.get(tier)),
    };
    _craftingComponentCache.set(tier, components);
    return components;
}
