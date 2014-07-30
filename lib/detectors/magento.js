/**
 * Created by darran on 24/07/2014.
 */
'use strict';

var cookieParse = function(req) {
    var obj = {};
    var str = req.headers.cookie;

    if(str) {
        str.split(/; */).forEach(function (pair) {
            var key, val; // do this here, prevent hoist above if
            var eq_idx = pair.indexOf('=')

            // skip things that don't look like key=value
            if (eq_idx < 0) {
                return;
            }

            key = pair.substr(0, eq_idx).trim();
            val = pair.substr(++eq_idx, pair.length).trim();

            // quoted values
            if ('"' == val[0]) {
                val = val.slice(1, -1);
            }

            // only assign once
            if (undefined == obj[key]) {
                try {
                    obj[key] = dec(val);
                } catch (e) {
                    obj[key] = val;
                }
            }
        });
    }

    req.cookies = obj;
};

var getSessionKey = function(req) {
    if(typeof req.cookies == "undefined") cookieParse(req);
    return (req.cookies.frontend);
};

var getUserKey = function(req) {
    if(typeof req.cookies == "undefined") cookieParse(req);
    return (req.cookies.CUSTOMER);
};


var isAuthed = function(req) {
    if(typeof req.cookies == "undefined") cookieParse(req);
    return (req.cookies.CUSTOMER_AUTH);
};

module.exports = {
    getSessionKey: getSessionKey,
    getUserKey: getUserKey,
    isAuthed: isAuthed
};
