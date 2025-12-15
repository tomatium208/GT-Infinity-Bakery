GTCEuServerEvents.oreVeins(event => {

    // Overworld

    {

        event.add("kubejs:valine3g_vein", vein => {
            vein.weight(90)
            vein.density(1.0)
            vein.clusterSize(30)
            vein.layer("stone")
            vein.dimensions("minecraft:overworld")
            vein.heightRangeUniform(0, 60)
            vein.cuboidVeinGenerator(generator => generator
                .top(b => b.mat(GTMaterials.get("sds")).size(1))
                .middle(b => b.mat(GTMaterials.get("valine3g")).size(3))
                .bottom(b => b.mat(GTMaterials.get("valine3g")).size(3))
                .spread(b => b.mat(GTMaterials.get("meta_null")).size(1))
            )
            vein.surfaceIndicatorGenerator(indicator => indicator
                .surfaceRock(GTMaterials.get("valine3g"))
                .placement("above")
            )
        })

    }

    // Nether

    {

        event.add('kubejs:nyaonium_vein', vein => vein
            .layer('netherrack')
            .weight(40)
            .density(0.2)
            .clusterSize(60)
            .heightRangeUniform(35, 50)
            .layeredVeinGenerator(generator => generator
                .buildLayerPattern(pattern => pattern
                    .layer(l => l.mat(GTMaterials.get('nyaonium')))
                )
            )
            .surfaceIndicatorGenerator(indicator => indicator
                .surfaceRock(GTMaterials.get('nyaonium'))
            )
        )

    }

})