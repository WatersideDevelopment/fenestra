
config = require('./lib/config');

var dashboard = require('./lib/dashboard');
var tracker = require('./lib/tracker');

// Setup tracker port listener...
if (typeof config.dashboard != true) {
    // Setup dashboard port listener
    dashboard.listen(config.dashboard_port, config.dashboard_address);
    console.log("Dashboard listening on http://" + (config.dashboard_address || "*") + ":" + config.dashboard_port + ".");
}
// Tracker should listen on specified port
tracker.listen(config.tracking_port, config.tracking_address);

console.log("Tracker listening on http://" + (config.tracking_address || "*") + ":" + config.tracking_port + "/fenestra/_.gif.");

// Setup UDP tracking
if (typeof config.udp_tracking_port == 'number') {
  tracker.listenUdp(config.udp_tracking_port, config.udp_tracking_address);
}
