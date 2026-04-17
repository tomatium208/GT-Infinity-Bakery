ServerEvents.recipes(event => {
    
    // 叩き潰すことしか許さない
    event.remove({ id: "gtceu:bender/bend_sliced_bread_to_plate" });
    event.remove({ id: "gtceu:fluid_solidifier/solidify_sliced_bread_to_plate" });
    event.remove({ id: "gtceu:extruder/extrude_sliced_bread_to_plate" });
    
});
