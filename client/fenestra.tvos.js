FenestraTracker = {
  track: function(env) {
    if(typeof(env) == "undefined") { env = {}; }

    // send some miscellaneous info about the request
    env.u = document.location.href;
    env.navigator = App.userAgent || "TVOS";

      // Example of browser stats...
//    env.bw = window.innerWidth;
//    env.bh = window.innerHeight;

    // example of sending a cookie named 'guid'
    // env.guid = (document.cookie.match(/guid=([^\_]*)_([^;]*)/) || [])[2];

    if(document.referrer && document.referrer != "") {
      env.ref = document.referrer;
    }

    env.rnd = Math.floor(Math.random() * 10e12);

    var params = [];
    for(var key in env) {
      if(env.hasOwnProperty(key)) {
        if(typeof(env[key]) == 'object') {
            env[key] = JSON.stringify(env[key]);

        }
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(env[key]));
      }
    }
	
    var xhr = new XMLHttpRequest();
    xhr.open("GET'. '/fenestra/_.gif?' + params.join('&'));
    xhr.send();
  }
};
setTimeout(function() {
    FenestraTracker.track({'fenestra': 'ready'});
},1);
