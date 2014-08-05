// Cart adds
//
// Emits aggregates per interval for the number of requests
// with a query parameter ?event=cart_add

var Metric = require('../metric');
var User = require('../../models/shelves/user').User;
var Session = require('../../models/shelves/session').Session;

var logins = Object.create(Metric.prototype);

logins.name = 'logins';
logins.event = 'login';
logins.interval = 0; // No builtin clock. This is common for admin events.
logins.save = function(request) {
    var userdata = JSON.parse(request.params.payload);

    if(!userdata.e_id) {
        console.log("logins.save: No e_id!");
        console.log(userdata);
        return;
    } else if(!userdata.session_key) {
        console.log("logins.save: No session_key!");
        console.log(userdata);
        return;
    } else if(!userdata.user_key) {
        console.log("logins.save: No user_key!");
        console.log(userdata);
        return;
    }

    var weldToSession = function (user) {
        console.log('ready to weld to '+userdata.session_key);
        console.log(user);

        Session.forge({key: userdata.session_key}).fetch().then(function(session) {
            if (!session) {
                // this is the first time Fenestra this session ID, so am gonna
                // make sure that we store it...
                Session.forge({
                    key: userdata.session_key,
                    user_id: user.id
                }).save();
            } else {
                if(!session.get('user_id')) {
                    session.set('user_id', user.id);
                    session.save();
                }
            }
        });
    };

    User.forge({key: userdata.user_key}).fetch().then(function(user) {
        if (!user) {
            // this is the first time Fenestra has seen you as a logged in user
            // so I better create you a user account...
            User.forge({
                key: userdata.user_key,
                entity_id: userdata.e_id
            }).save().then(weldToSession);
        } else {
            if(!user.get('entity_id')) {
                user.set('entity_id', userdata.e_id);
                user.save().then(weldToSession);
            } else {
                weldToSession(user);
            }
        }
    });
};
logins.shouldSave = true;
module.exports = logins;
