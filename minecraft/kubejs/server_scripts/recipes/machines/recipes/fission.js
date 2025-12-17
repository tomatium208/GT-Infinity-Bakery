ServerEvents.recipes(event => {

    event.recipes.gtceu.fission("kjs/normal_run")
        .circuit(1)
        .inputFluids("gtceu:fission_fuel 10000", "minecraft:water 20000")
        .outputFluids("gtceu:nuclear_waste 100", "gtceu:steam 20000")
        .duration(1200)

    event.recipes.gtceu.fission("kjs/sandwich")
        .circuit(2)
        .inputFluids("gtceu:fission_fuel 10000", "minecraft:water 20000")
        .outputFluids("gtceu:nuclear_waste 100", "gtceu:steam 20000")
        .itemInputs("16x kubejs:sandwich")
        .chancedOutput("16x kubejs:fission_sandwich", "9/10", 0)
        .chancedOutput("16x gtceu:ash_dust", "1/10", 0)
        .duration(1200)

})