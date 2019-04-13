function MurmurHash(key, seed) {
    //key needs to be an instance of bigInt and Long type
    if(!bigInt.isInstance(key) || key.bitLength().gt(64)) return false;

    var c1 = bigInt(-862048943);
    console.log("c1:"+c1);
    var c2 = bigInt(461845907);
    console.log("c2 461845907 :"+c2);
    var h1 = seed;

    console.log(key + ":" + key.toString(2));

    console.log(key.bitLength());
    var low = key.and("0x00000000ffffffff");
    var high = key.shiftRight(32);

    console.log("low ("+low.bitLength()+")"+ low.toString(2));
    console.log("high ("+high.bitLength()+")"+ high.toString(2));
    
    var k1 = (bigInt(low) * c1) & 0xffffffff;
    k1 = bigInt(rotateL(k1, 15));
    console.log("k1 -350192530 = " + k1);
    k1 = bigInt((k1 * c2) & 0xffffffff);



    console.log("h1 = " + h1);
    console.log("k1 = " + k1);
    h1 ^= k1;
    console.log("-1420803475 = " + h1);
    h1 = rotateLeft(h1, 13); 
    h1 = (h1 * 5) + (-430675100);

    console.log("-1978710843 = " + h1);

    h1 ^= 8;
    h1 = mix_32(h1);

    return truncate(h1, 32);


}

function rotateLeft(number, bits) {
    //key needs to be an instance of bigInt and Long type
    if(!bigInt.isInstance(number)) return false;

    var length = number.bitLength();
    
    //console.log(bitString);
    var x = number.shiftLeft(bits).or(number.shiftRight(32-bits));
    //console.log(x.toString(2));
    
    return truncate(x, length);
}

function rotateL(number, bits) {
    return (number << bits) | (number >>> (32 - bits));
}

function mix_32(h) {
    h = h.shiftRight(16).xor(h);
    console.log(h.toString(2));
    h = h.times("0x85ebca6b");
    h = h.shiftRight(13).xor(h);
    h = h.times("0xc2b2ae35");
    h = h.shiftRight(16).xor(h);
    return h;
}

function truncate(number, bits) {
    var bitString = "";
    for(var i = number.bitLength(); i > 0; i--) {
        if(i < bits) bitString += "1";
        else bitString += "0"; 
    }
    return number.and(bigInt(bitString,2));
}

function encode(z, x, y) {
    return bigInt(1).shiftLeft(bigInt(1).times(z)).or(bigInt(x).shiftLeft(z).or(y));
}

console.log("JavaScript: " + MurmurHash(bigInt(123), 0));
console.log("Java: 379378780");