ServerEvents.recipes(event => {

    const normal = [
        ["lv","steel","tin","#forge:glass"],
        ["mv","aluminium","copper","#forge:glass"],
        ["hv","stainless_steel","gold","gtceu:tempered_glass"],
        ["ev","titanium","aluminium","gtceu:tempered_glass"],
        ["iv","tungsten_steel","platinum","gtceu:laminated_glass"],
        ["luv","rhodium_plated_palladium","niobium_titanium","gtceu:laminated_glass"],
        ["zpm","naquadah_alloy","vanadium_gallium","gtceu:fusion_glass"],
        ["uv","darmstadtium","yttrium_barium_cuprate","gtceu:fusion_glass"]
    ]

    console.log(normal)

    normal.forEach(v => {

        // GregTech Machine

        event.remove({ output: `gtceu:${v[0]}_assembler` })

        event.shaped(`gtceu:${v[0]}_assembler`, [
            "RCR",
            "MHM",
            "ECE"
        ], {
            C: `#gtceu:circuits/${v[0]}`,
            H: `gtceu:${v[0]}_machine_hull`,
            R: `gtceu:${v[0]}_robot_arm`,
            M: `gtceu:${v[0]}_conveyor_module`,
            E: "kubejs:energy_drink"
        })

        // GTBakery Machine

        event.shaped(`gtceu:${v[0]}_bakery`, [
            "RER",
            "GGG",
            "CHC"
        ], {
            H: `gtceu:${v[0]}_machine_hull`,
            C: `#gtceu:circuits/${v[0]}`,
            E: `gtceu:${v[0]}_emitter`,
            R: `gtceu:${v[0]}_robot_arm`,
            G: v[3]
        })

        event.shaped(`gtceu:${v[0]}_sieve`, [
            "GCG",
            "GHG",
            "FEF"
        ], {
            H: `gtceu:${v[0]}_machine_hull`,
            C: `#gtceu:circuits/${v[0]}`,
            G: v[3],
            F: '#forge:gems/flint',
            E: "kubejs:energy_drink"
        })

        event.shaped(`gtceu:${v[0]}_particle_accelerator`, [
            "GVG",
            "GVG",
            "CHC"
        ], {
            H: `gtceu:${v[0]}_machine_hull`,
            C: `#gtceu:circuits/${v[0]}`,
            G: v[3],
            V: "#forge:rods/long/valine3g"
        })

    })

    const all = normal.concat([
        "uhv", "uev", "uiv", "uxv", "opv", "max"
    ])

    console.log(all)

    all.forEach(v => {



    })

})