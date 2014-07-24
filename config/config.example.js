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
    "dashboard_port" : 8811,


    // Should be verbose on stdIO?
    "debugIO" : true,

    // Sometimes we don't want to save stats...
    "dbSave" : "true",
    // And the details for saving...
    "dbUser" : "fenestra",
    "dbPass" : "you_secret_password",
    "dbName" : "fenestra_sitename",
    "dbHost" : "localhost",
    "dbPort" : 3306
}
// FenestraTracker.track=function (env){"undefined"==typeof env&&(env={}),env.u=document.location.href,env.bw=window.innerWidth,env.bh=window.innerHeight,document.referrer&&""!=document.referrer&&(env.ref=document.referrer),env.rnd=Math.floor(1e13*Math.random());var params=[];for(var key in env)env.hasOwnProperty(key)&&params.push(encodeURIComponent(key)+"="+encodeURIComponent(env[key]));var img=new Image;img.src="http://localhost:8801/fenestra/_.gif?"+params.join("&")} 
