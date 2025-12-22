/**
 * Removes all tags from objects on the nukelists and deletes all recipes & uses for them.
 *
 * Also does the same for items matching the Unification Patterns.
 */
ServerEvents.tags("item", event => {
    event.removeAllTagsFrom(global.itemNukeList);
});
ServerEvents.tags("fluid", event => {
    event.removeAllTagsFrom(global.fluidNukeList);
});

ServerEvents.recipes(event => {
    global.itemNukeList.forEach(item => {
        event.remove([{ output: item }, { input: item }]);
    });

    global.fluidNukeList.forEach(fluid => {
        event.remove([{ output: fluid }, { input: fluid }]);
    });

    // Remove recipes that use items matching the unification patterns.
    // For definitions, see KubeJS/startup_scripts/unificationPatterns.js
    // event.remove([{ output: global.unificationPattern }, { input: global.unificationPattern }]);
});
