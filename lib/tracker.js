var http = require('http');
var url = require('url');
var dgram = require('dgram');
var Metric = require('./metric');
var pixel = require('./pixel');

var pixelHandler = function (req, res) {
    res.writeHead(200, pixel.headers);
    res.end(pixel.data);

    req.params = url.parse(req.url, true).query;

    Metric.insert(req);
};

exports.listen = function (server, address) {
    var port = server;
    http.createServer(pixelHandler).listen(port, address);
};


exports.listenUdp = function (port, address) {
    var server = dgram.createSocket("udp4");

    server.on("message", function (message, rinfo) {
        var data;
        try {
            data = message.toString();
        } catch (e) {
            return console.log("Error parsing UDP message: " + e.message);
        }
        var req = {
            ip: address,
            params: JSON.parse(data)
        };
        req.params.payload = JSON.stringify(req.params.payload);

        Metric.insert(req);
    });

    server.on("listening", function () {
        var address = server.address();
        console.log("UDP server listening " +
        address.address + ":" + address.port);
    });

    server.bind(port, address);

};
