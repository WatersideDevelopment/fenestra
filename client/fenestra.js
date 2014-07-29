FenestraTracker = {
  track: function(env) {
    if(typeof(env) == "undefined") { env = {}; }

    // send some miscellaneous info about the request
    env.u = document.location.href;
    env.navigator = window.navigator;

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
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(env[key]));
      }
    }

    var img = new Image();
    img.src = '/fenestra/_.gif?' + params.join('&');
  }
};
setTimeout(function() {
    FenestraTracker.track({'fenestra': 'ready'});
},1);
