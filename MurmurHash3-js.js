/**
 * @return {number}
 */
function MurmurHash(key, seed) {
    //key needs to be an instance of bigInt and Long type
    if(!bigInt.isInstance(key) || key.bitLength().gt(64)) return 0;

    var c1 = bigInt(0xcc9e2d51); //-862048943 3432918353 -3432918353 cc9e2d51 3432918353
    var c2 = bigInt(0x1b873593); //461845907 461845907

    var low = key.and("0xffffffff");
    var high = key.shiftRight(32);
    
    var k1 = low.times(c1).and(0xFFFFFFFF);

    k1 = rotateLeft(k1, 15);
    k1 = k1.times(c2).and(0xFFFFFFFF);

    var h1 = bigInt(seed).xor(k1);
    h1 = rotateLeft(h1, 13);
    h1 = h1.times(5).add(0xe6546b64).and(0xFFFFFFFF);

    k1 = high.times(c1).and(0xFFFFFFFF);
    k1 = rotateLeft(k1, 15);
    k1 = k1.times(c2).and(0xFFFFFFFF);

    h1 = h1.xor(k1);
    h1 = rotateLeft(h1, 13);

    h1 = h1.times(5).add(0xe6546b64).and(0xFFFFFFFF);

    h1 = h1.xor(8);

    h1 = mix_32(h1);
    if(h1.bitLength().gt(31)) return -(~(h1.and(0xFFFFFFFF))+ 1)
    else return h1.and(0xFFFFFFFF) + 0;

}

function rotateLeft(number, bits) {
    //key needs to be an instance of bigInt and Long type
    if(!bigInt.isInstance(number)) return false;
    var length = number.bitLength();
    var x = number.shiftLeft(bits).or(number.shiftRight(32-bits));
    return x.and(0xFFFFFFFF);
}

function mix_32(h) {
    h = h.shiftRight(16).xor(h);
    h = h.times(0x85ebca6b).and(0xFFFFFFFF);
    h = h.shiftRight(13).xor(h);
    h = h.times(0xc2b2ae35).and(0xFFFFFFFF);
    h = h.shiftRight(16).xor(h);
    return h;
}
