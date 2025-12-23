// var Molecule = Java.loadClass("com.rubenverg.moldraw.molecule.Molecule");
// var Element = Java.loadClass("com.rubenverg.moldraw.molecule.Element");
// var Bond = Java.loadClass("com.rubenverg.moldraw.molecule.Bond");
// var Atom = Java.loadClass("com.rubenverg.moldraw.molecule.Atom");

// var $MolDraw = Java.loadClass("com.rubenverg.moldraw.MolDraw");
// /** @type {Internal.Gson} */
// var gson = $MolDraw.gson;

// function moleculeToJson(obj) {
//     return gson.toJsonTree(obj);
// }

// ClientEvents.highPriorityAssets(event => {
//     const caffeine = moleculeToJson(
//         new Molecule()
//             .uv()
//             .invAtom(4.11, -0.65) // 0: C
//             .atom(Element.N.one(), null, null, null, null, 2.84, 0.11) // 1: N
//             .invAtom(3.12, 1.18) // 2: C
//             .atom(Element.N.one(), null, null, null, null, 1.52, 1.67) // 3: N
//             .invAtom(0.25, 0.91) // 4: C
//             .atom(Element.N.one(), null, null, null, null, -1.55, 0.97) // 5: N
//             .invAtom(-2.37, 1.93) // 6: C
//             .invAtom(-2.53, 0.06) // 7: C
//             .atom(Element.O.one(), null, null, null, null, -4.33, 0.12) // 8: O
//             .atom(Element.N.one(), null, null, null, null, -1.72, -0.9) // 9: N
//             .invAtom(-2.7, -1.81) // 10: C
//             .invAtom(0.08, -0.96) // 11: C
//             .atom(Element.O.one(), null, null, null, null, 0.89, -1.92) // 12: O
//             .invAtom(1.06, -0.06) // 13: C
//             .atom(Element.H.one(), null, null, null, null, 5.38, -1.42) // 14: H
//             .atom(Element.H.one(), null, null, null, null, 5.38, 0.11) // 15: H
//             .atom(Element.H.one(), null, null, null, null, 2.84, -1.42) // 16: H
//             .atom(Element.H.one(), null, null, null, null, 4.73, 1.67) // 17: H
//             .atom(Element.H.one(), null, null, null, null, -3.18, 2.89) // 18: H
//             .atom(Element.H.one(), null, null, null, null, -0.76, 2.42) // 19: H
//             .atom(Element.H.one(), null, null, null, null, -3.97, 1.44) // 20: H
//             .atom(Element.H.one(), null, null, null, null, -3.68, -2.71) // 21: H
//             .atom(Element.H.one(), null, null, null, null, -4.21, -1.22) // 22: H
//             .atom(Element.H.one(), null, null, null, null, -1.19, -2.4) // 23: H
//             .bond(0, 1, Bond.SINGLE)
//             .bond(1, 2, Bond.SINGLE)
//             .bond(2, 3, Bond.SINGLE)
//             .bond(3, 4, Bond.SINGLE)
//             .bond(4, 5, Bond.SINGLE)
//             .bond(5, 6, Bond.SINGLE)
//             .bond(5, 7, Bond.SINGLE)
//             .bond(7, 8, Bond.DOUBLE)
//             .bond(7, 9, Bond.SINGLE)
//             .bond(9, 10, Bond.SINGLE)
//             .bond(9, 11, Bond.SINGLE)
//             .bond(11, 12, Bond.DOUBLE)
//             .bond(11, 13, Bond.SINGLE)
//             .bond(13, 1, Bond.SINGLE)
//             .bond(13, 4, Bond.SINGLE)
//             .bond(0, 14, Bond.SINGLE)
//             .bond(0, 15, Bond.SINGLE)
//             .bond(0, 16, Bond.SINGLE)
//             .bond(2, 17, Bond.SINGLE)
//             .bond(6, 18, Bond.SINGLE)
//             .bond(6, 19, Bond.SINGLE)
//             .bond(6, 20, Bond.SINGLE)
//             .bond(10, 21, Bond.SINGLE)
//             .bond(10, 22, Bond.SINGLE)
//     );

//     console.log(caffeine);
//     event.add("kubejs:molecules/caffeine.json", caffeine);
// });

// /*
//         new $Molecule()
//             .uv()
//             // First ring (6-membered)
//             .invAtom(0, 0) // 0
//             .atom($Element.N, 1, 0) // 1
//             .invAtom(1, 1) // 2
//             .atom($Element.N, 2, 1) // 3
//             .invAtom(2, 2) // 4
//             .atom($Element.N, 1, 2) // 5
//             // Second ring (5-membered, fused)
//             .atom($Element.N, 0, 1) // 6
//             .invAtom(0, 2) // 7
//             // Bonds for the fused ring system
//             .bond(0, 1)
//             .bond(1, 2)
//             .bond(2, 3)
//             .bond(3, 4)
//             .bond(4, 5)
//             .bond(5, 6)
//             .bond(6, 7, $Bond.DOUBLE)
//             .bond(7, 0)
//             .bond(6, 1)
//             // Carbonyl groups
//             .atom($Element.O, 3, 1) // 8
//             .atom($Element.O, 2, 3) // 9
//             .bond(3, 8, true, $Bond.DOUBLE)
//             .bond(4, 9, true, $Bond.DOUBLE)
//             // Methyl groups
//             .invAtom(3, 0) // 10 - N-CH3 at position 1
//             .invAtom(1, 3) // 11 - N-CH3 at position 3
//             .invAtom(-1, 1) // 12 - N-CH3 at position 7
//             .bond(2, 10)
//             .bond(5, 11)
//             .bond(6, 12)
//             */
