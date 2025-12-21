StartupEvents.registry("block", event => {
    event.create("dimensional_rift").glassSoundType();

    event.create("planter_block").stoneSoundType().notSolid().opaque(false).renderType("translucent");

    // SOLID CASINGS

    event
        .create("multi_dimensional_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/multi_dimensional");

    event
        .create("absolute_dimension_anchor_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/anchor");

    event
        .create("miracle-theoretical_meteor_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/miracle_meteor");

    event
        .create("miracle-theoretical_fumetsu_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/miracle_fumetsu");

    event
        .create("spacetime_stabilization_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/solid/spacetime");

    // PROOF CASINGS

    event.create("explosion_proof_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/proof/explosion");

    event.create("collapse_proof_machine_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/proof/collapse");

    // NOUF CASINGS

    event
        .create("non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_casing")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/general");

    event
        .create(
            "non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_starmatter_whirlpool_magical_casing"
        )
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/magical")
        .lightLevel(1);

    event
        .create(
            "non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_psychotic_wave_forging_casing"
        )
        .stoneSoundType()
        .textureAll("kubejs:block/casings/nouf/wave")
        .lightLevel(1);

    // FISSION CASINGS

    event.create("fission_casing").stoneSoundType().textureAll("kubejs:block/casings/fission/solid");

    event.create("fission_cell").stoneSoundType().notSolid();

    event.create("fission_rod").stoneSoundType().notSolid();

    // GREENHOUSE CASINGS

    event
        .create("greenhouse_casing_mk2")
        .displayName("Greenhouse Machine Casing MK II")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk2");

    event
        .create("greenhouse_casing_mk3")
        .displayName("Greenhouse Machine Casing MK III")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk3");

    event
        .create("greenhouse_casing_mk4")
        .displayName("Greenhouse Machine Casing MK IV")
        .stoneSoundType()
        .textureAll("kubejs:block/casings/greenhouse/casing_mk4");

    // COIL

    event
        .create("valine_coil_block", "gtceu:coil")
        .stoneSoundType()
        .texture("kubejs:block/casings/coils/coil_valine")
        .coilMaterial(() => GTMaterials.get("valine3g"))
        .temperature(14400)
        .level(16)
        .energyDiscount(16)
        .tier(5);

    event
        .create("tomatonium_coil_block", "gtceu:coil")
        .stoneSoundType()
        .texture("kubejs:block/casings/coils/coil_tomatonium")
        .coilMaterial(() => GTMaterials.get("tomatonium"))
        .temperature(16200)
        .level(32)
        .energyDiscount(16)
        .tier(5);

    event
        .create("sds_coil_block", "gtceu:coil")
        .stoneSoundType()
        .texture("kubejs:block/casings/coils/coil_sds")
        .coilMaterial(() => GTMaterials.get("sds"))
        .temperature(18000)
        .level(32)
        .energyDiscount(32)
        .tier(5);
});

/* COILS

    Coil, Temperature, Level, Discount

    CUPRONICKEL, 1800, 1, 1
    KANTHAL, 2700, 2, 1
    NICHROME, 3600, 2, 2
    RTM_ALLOY, 4500, 4, 2
    HSS_G, 5400, 4, 4
    NAQUADAH, 7200, 8, 4
    TRINIUM, 9001, 8, 8
    TRITANIUM, 10800, 16, 8

    VALINE, 14400, 16, 16
    TOMATONIUM, 16200, 32, 16
    SDS, 18000, 32, 32

*/
