ServerEvents.recipes(event => {

    event.recipes.gtceu.sieving('kjs/gravel_1')
        .inputFluids("gtceu:energy_drink 144")
        .itemInputs("minecraft:gravel")

        .itemOutputsRanged("gtceu:iron_ore", 1, 3)
        .itemOutputsRanged("gtceu:copper_ore", 1, 3)
        .itemOutputsRanged("gtceu:tin_ore", 1, 3)
        .itemOutputsRanged("gtceu:nickel_ore", 1, 3)
        .itemOutputsRanged("gtceu:redstone_ore", 1, 3)
        .itemOutputsRanged("gtceu:certus_quartz_ore", 1, 3)
        
        .itemOutputsRanged("gtceu:silver_ore", 1, 3)
        .itemOutputsRanged("gtceu:aluminium_ore", 1, 3)
        .itemOutputsRanged("gtceu:lead_ore", 1, 3)
        .itemOutputsRanged("gtceu:sulfur_ore", 1, 3)
        .itemOutputsRanged("gtceu:salt_ore", 1, 3)

        .itemOutputsRanged("gtceu:cobalt_ore", 1, 3)

        .EUt(GTValues.VHA[GTValues.LV])
        .circuit(1)

})