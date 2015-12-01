FenestraTracker = {
    track: function (env) {
        if (typeof(env) == "undefined") {
            env = {};
        }

        // send some miscellaneous info about the request
        env.navigator = App.userAgent || "TVOS";

        env.rnd = Math.floor(Math.random() * 10e12);

        var params = [];
        JSON.stringify(env)
        for (var key in env) {
            if (env.hasOwnProperty(key)) {
                if (typeof(env[key]) == 'object') {
                    env[key] = JSON.stringify(env[key]);

                }
                params.push(encodeURIComponent(key) + "=" + encodeURIComponent(env[key]));
            }
        }

        var xhr = new XMLHttpRequest();
//        App.options.BASEURL = "https://my-fenestra-server.xalior.com/";  // when testing on loopback tvos simulator
        var url = `${App.options.BASEURL}fenestra/_.gif?` + params.join("&");
        console.log(url);
//        console.log(xhr);

        xhr.open("GET", url);
        xhr.send();
    }
};
setTimeout(function () {
    FenestraTracker.track(
        {
            'event': 'DTNS',
            'payload': {
                    'action': 'loading'
            }
        }
    );
}, 1);
