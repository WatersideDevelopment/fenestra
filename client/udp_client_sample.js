var Buffer = require('buffer').Buffer;
var dgram = require('dgram');

var sock = dgram.createSocket("udp4");

var data = {
    event : 'login',
    payload : {
        e_id : 123345,
        user_key : 'd26084a6d3fbf7fd500128f9276d0e02',
        session_key : '0ffq64j1dn71a2tkp606rs37e6'
    }
};

var buf = new Buffer(JSON.stringify(data));

console.log('buf:' + buf);

sock.send(buf, 0, buf.length, 1337, "127.0.0.1", function(err, bytes) {
    sock.close();
});

