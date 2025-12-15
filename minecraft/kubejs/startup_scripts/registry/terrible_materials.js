StartupEvents.registry("item", event => {

    event.create("boolean").texture("kubejs:item/terrible_materials/boolean")

    event.create("int").texture("kubejs:item/terrible_materials/int")
    event.create("long").texture("kubejs:item/terrible_materials/long")
    event.create("float").texture("kubejs:item/terrible_materials/float")
    event.create("double").texture("kubejs:item/terrible_materials/double")
    event.create("biginteger").texture("kubejs:item/terrible_materials/biginteger").displayName("BigInteger")

    event.create("char").texture("kubejs:item/terrible_materials/char")
    event.create("string").texture("kubejs:item/terrible_materials/string")

})