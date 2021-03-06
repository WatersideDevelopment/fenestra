var config = require('./lib/config'),
    tracker = require('./lib/tracker'),
    dashboard = null;

// Setup tracker port listener...
if (typeof config.dashboard != true) {
    dashboard = require('./lib/dashboard');
    // Setup dashboard port listener
    dashboard.listen(config.dashboard_port, config.dashboard_address);
    console.log("Dashboard listening on http://" + (config.dashboard_address || "*") + ":" + config.dashboard_port + ".");
}
// Tracker should listen on specified port
tracker.listen(config.tracking_port, config.tracking_address);

console.log("Tracker listening on http://" + (config.tracking_address || "*") + ":" + config.tracking_port + "/fenestra/_.gif.");

// Setup UDP tracking
if (typeof config.udp_tracking_port == 'number') {
    console.log("Starting up UDP server...");
    tracker.listenUdp(config.udp_tracking_port, config.udp_tracking_address);
}
