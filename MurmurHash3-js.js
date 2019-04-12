function MurmurHash(key, seed) {
    var c1 = bigInt(0xcc9e2d51);
    var c2 = bigInt(0x1b873593);

    /*var low = 
    int high = (int)(input >>> 32);

    int k1 = mixK1(low);
    int h1 = mixH1(this.seed, k1);
    k1 = mixK1(high);
    h1 = mixH1(h1, k1);*/


}

function encode(z, x, y) {
    return bigInt(1).shiftLeft(bigInt(1)*z).or(x.shiftLeft(z).or(y));
}
var encoded = encode(bigInt(50),bigInt(1000000000),bigInt(1000000000));
console.log(encoded);

var k = bigInt("123456789123456789");
console.log(k);