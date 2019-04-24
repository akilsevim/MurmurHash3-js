function testCpp() {
    $.each(verify, function(key, val) {
        var hash_JavaScript = MurmurHash3_32_Long(bigInt(key), 0);
        if(hash_JavaScript != val) {
            document.write("Wrong result for key="+key);
            return;
        }
    });
    document.write("All tests passed");
}