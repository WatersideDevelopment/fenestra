module.exports = config = {
    "name" : "Fenestra",

    // If you want to have the tracking pixel listen on a different port
    // (for instance in order to password-protect your dashboard) you can
    // specify the port to listen on (change from false to port number)
    "tracking_port" : 8801,
    "tracking_address" : "127.0.0.1",

    // Allow stats to be sent over UDP instead of HTTP.  This works best for
    // sending stats from backend servers within the same datacenter as
    // Fenestra.  Change to false to disable.
    "udp_tracking_port" : false,
    "udp_trackin_address" : "127.0.0.1",

    // Should I start the static server (dashboard, and client interface scripts)
    "dashboard": true,

    // What does the dashboard live upon?
    "dashboard_address" : "127.0.0.1",
    "dashboard_port" : 8811
}
