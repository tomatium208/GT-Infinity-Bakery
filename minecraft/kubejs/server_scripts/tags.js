ServerEvents.tags("item", event => {

    event.add('gtceu:manasteel_ingot',"botania:manasteel_ingots")
    event.add('gtceu:manasteel_nugget',"botania:manasteel_nuggets")
    event.add('gtceu:manasteel_block',"botania:manasteel_blocks")

    let makeTag = (name, list) => {
        event.add(`gtbakery:${name}`, list)
    }

    // Materials

    {

        // Steel

        {

            makeTag("materials/solid/carbon",
                [
                    "#minecraft:coals",
                    "#forge:gems/coke"
                ]
            )
            makeTag("materials/dust/carbon",
                [
                    "#forge:dusts/coal",
                    "#forge:dusts/charcoal",
                    "#forge:dusts/coke"
                ]
            )

            makeTag("materials/carbon",
                [
                    "#gtbakery:materials/solid/carbon",
                    "#gtbakery:materials/dust/carbon"
                ]
            )
            makeTag("materials/block/carbon",
                [
                    "#forge:storage_blocks/coal",
                    "#forge:storage_blocks/charcoal",
                    "#forge:storage_blocks/coke"
                ]
            )

        }

        // Bronze

        {

            makeTag("materials/tin",
                [
                    "#forge:ingots/tin",
                    "#forge:dusts/tin"
                ]
            )

            makeTag("materials/solid/copper",
                [
                    "#forge:ingots/copper",
                    "#forge:ingots/annealed_copper"
                ]
            )
            makeTag("materials/dust/copper",
                [
                    "#forge:dusts/copper",
                    "#forge:dusts/annealed_copper"
                ]
            )

            makeTag("materials/copper",
                [
                    "#gtbakery:materials/solid/copper",
                    "#gtbakery:materials/dust/copper"
                ]
            )

        }

    }

})