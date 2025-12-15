ItemEvents.tooltip(event => {

    global.circuitTypes.forEach(c => {

        event.add(`kubejs:${c[0]}_processor`, [
            Text.translatable(`item.kubejs.${c[0]}_processor.tooltip.0`), Text.translatable(`item.kubejs.${c[0]}_processor.tooltip.1`)])
        event.add(`kubejs:${c[0]}_processor_assembly`, [
            Text.translatable(`item.kubejs.${c[0]}_processor_assembly.tooltip.0`), Text.translatable(`item.kubejs.${c[0]}_processor_assembly.tooltip.1`)])
        event.add(`kubejs:${c[0]}_processor_computer`, [
            Text.translatable(`item.kubejs.${c[0]}_processor_computer.tooltip.0`), Text.translatable(`item.kubejs.${c[0]}_processor_computer.tooltip.1`)])
        event.add(`kubejs:${c[0]}_processor_mainframe`, [
            Text.translatable(`item.kubejs.${c[0]}_processor_mainframe.tooltip.0`), Text.translatable(`item.kubejs.${c[0]}_processor_mainframe.tooltip.1`)])

    })

    function addTooltip(modId, itemName) {

        event.add(`${modId}:${itemName}`, Text.translatable(`item.${modId}.${itemName}.tooltip.0`))

    }

    addTooltip("kubejs", "computation_system")
    addTooltip("kubejs", "particle_star")

})