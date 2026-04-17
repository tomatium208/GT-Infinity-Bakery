ServerEvents.recipes(event => {

    event.recipes.gtceu
        .electric_blast_furnace("kjs/rusk")
        .itemInputs("kubejs:toast","#forge:small_dusts/sugar")
        .itemOutputs("kubejs:rusk")
        .chancedOutput("gtceu:ash_dust","1/9",1)
        .EUt(VHA.LV)
        .blastFurnaceTemp(1000)
    
    event.recipes.gtceu
        .laser_engraver("kjs/ruskboard")
        .itemInputs("#forge:double_plates/rusk")
        .notConsumable("#forge:lenses/white")
        .itemOutputs("kubejs:ruskboard")
        .EUt(VHA.LV)
    
    event.replaceInput({output:"gtceu:phenolic_circuit_board"},
        "#forge:dusts/wood",
        "kubejs:ruskboard"
    )

})