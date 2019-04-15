var firstIncrement = 0;

function start() {
    for(var i = parseInt($("#start").val()); i < parseInt($("#stop").val()); i++) {
        for(var j = parseInt($("#seedStart").val()); j < parseInt($("#seedStop").val()); j ++) {
            $.getJSON( "http://localhost:8890/murmur?key="+i+"&seed="+j, function(data) {
                verify(data);
            });
        }
        setTimeout(10);
    }
    if(firstIncrement === 0) firstIncrement = parseInt($("#stop").val()) - parseInt($("#start").val());
    $("#start").val(parseInt($("#stop").val()));
    $("#stop").val(parseInt($("#start").val()) + firstIncrement);
}

var count = 0;
function verify(hash_Java) {
    var hash_JavaScript = MurmurHash(bigInt(hash_Java[0]), parseInt(hash_Java[1]));
    if(parseInt(hash_Java[2]) === hash_JavaScript) $("#output").prepend(hash_Java[0] + ": OK, ");
    else $("#output").prepend(hash_Java[0] + ", " + hash_Java[1] + ": <b style:'color:red'>BAD!!!</b>, ");
    count++;
    if(count % 10 === 0) $("#output").prepend("<br/>");
}


function encode(z, x, y) {
    return bigInt(1).shiftLeft(bigInt(1).times(z)).or(bigInt(x).shiftLeft(z).or(y));
}

function testCpp() {
    $.getJSON( "verify.json", function(data) {
        $.each(data, function(key, val) {
            console.log(val);
        })
    });
}