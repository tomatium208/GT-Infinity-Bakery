StartupEvents.registry("block", event => {
    event.create("dimensional_rift").glassSoundType();

    event.create("planter_block").soundType(SoundType.METAL).notSolid().opaque(false).renderType("translucent");

    event
        .create("yggdrasil_log")
        .woodSoundType()
        .resistance(3)
        .hardness(2)
        .tagBlock("mineable/axe")
        .tagBlock("forge:needs_netherite_tool")
        .requiresTool();
    event.create("yggdrasil_leaves").grassSoundType().resistance(0.2).hardness(0.2).notSolid().requiresTool();

    // SOLID CASINGS

    function casing(name, path) {
        return event
            .create(name)
            .soundType(SoundType.METAL)
            .textureAll(path)
            .resistance(6)
            .hardness(5)
            .tagBlock("gtceu:mineable/pickaxe_or_wrench")
            .requiresTool(true);
    }

    casing("multi_dimensional_machine_casing", "kubejs:block/casings/solid/multi_dimensional");

    casing("absolute_dimension_anchor_casing", "kubejs:block/casings/solid/anchor");
    casing("miracle_theoretical_meteor_casing", "kubejs:block/casings/solid/miracle_meteor");
    casing("miracle_theoretical_fumetsu_casing", "kubejs:block/casings/solid/miracle_fumetsu");
    casing("spacetime_stabilization_casing", "kubejs:block/casings/solid/spacetime");

    // PROOF CASINGS
    casing("explosion_proof_machine_casing", "kubejs:block/casings/proof/explosion");

    casing("collapse_proof_machine_casing", "kubejs:block/casings/proof/collapse");

    // NOUF CASINGS

    casing(
        "non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_casing",
        "kubejs:block/casings/nouf/general"
    );
    casing(
        "non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_starmatter_whirlpool_magical_casing",
        "kubejs:block/casings/nouf/magical"
    ).lightLevel(1);

    casing(
        "non_omnipotent_trancendent_industrial_infinity_tesseract_ultimate_overpower_general_psychotic_wave_forging_casing",
        "kubejs:block/casings/nouf/wave"
    ).lightLevel(1);

    // FISSION CASINGS
    casing("fission_casing", "kubejs:block/casings/fission/solid");

    event.create("fission_cell").soundType(SoundType.METAL).notSolid();

    event.create("fission_rod").soundType(SoundType.METAL).notSolid();

    // GREENHOUSE CASINGS

    casing("greenhouse_casing_mk2", "kubejs:block/casings/greenhouse/casing_mk2").displayName(
        "Greenhouse Machine Casing MK II"
    );
    casing("greenhouse_casing_mk3", "kubejs:block/casings/greenhouse/casing_mk3").displayName(
        "Greenhouse Machine Casing MK III"
    );
    casing("greenhouse_casing_mk4", "kubejs:block/casings/greenhouse/casing_mk4").displayName(
        "Greenhouse Machine Casing MK IV"
    );

    casing("dimension_connection_casing", "kubejs:block/casings/eoh/dimension_connection_casing");
    casing("dimension_creation_casing", "kubejs:block/casings/eoh/dimension_creation_casing");
    casing("containment_field_generator", "kubejs:block/casings/eoh/containment_field_generator");
    casing("dimensional_stability_casing", "kubejs:block/casings/eoh/dimensional_stability_casing");

    // COIL

    event
        .create("valine_coil_block", "gtceu:coil")
        .coilMaterial(() => GTMaterials.get("valine3g"))
        .temperature(14400)
        .level(16)
        .energyDiscount(16)
        .tier(8)
        .soundType(SoundType.METAL)
        .texture("kubejs:block/casings/coils/coil_valine")
        .hardness(5)
        .requiresTool(true)
        .tagBlock("gtceu:mineable/pickaxe_or_wrench");

    event
        .create("tomatonium_coil_block", "gtceu:coil")
        .coilMaterial(() => GTMaterials.get("tomatonium"))
        .temperature(16200)
        .level(32)
        .energyDiscount(16)
        .tier(9)
        .soundType(SoundType.METAL)
        .texture("kubejs:block/casings/coils/coil_tomatonium")
        .hardness(5)
        .requiresTool(true)
        .tagBlock("gtceu:mineable/pickaxe_or_wrench");

    event
        .create("sds_coil_block", "gtceu:coil")
        .coilMaterial(() => GTMaterials.get("sds"))
        .temperature(18000)
        .level(32)
        .energyDiscount(32)
        .tier(10)
        .soundType(SoundType.METAL)
        .texture("kubejs:block/casings/coils/coil_sds")
        .hardness(5)
        .requiresTool(true)
        .tagBlock("gtceu:mineable/pickaxe_or_wrench");
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
