var sys = require('sys'),
    path = require('path'),
    fs = require('fs'),
    // and a 'detector' for session sniffing, etc.
    detector = require('./detectors/magento'),
    // Database models
    SessionShelf = require('../models/shelves/session'),
    UserShelf = require('../models/shelves/user');

var Metric = function() {};

Metric.prototype = {
  interval: 5000, // ms
  name: '##NONAME##',
  event: '*',
  initialData: {},
  shouldSave: false,

  start: function() {
    this.resetData();
    this.job = setInterval(this.run.bind(this), this.interval);
  },

  run: function() {
    if(this.ignoreOnEmpty && this.data === this.initialData) { return; }
    this.emit('data', this.name, this.data || this.initialData);

    this.resetData();
  },

  resetData: function() {
    this.data = this.prepareInitialData();
  },

  prepareInitialData: function() {
    return JSON.parse(JSON.stringify(this.initialData));
  },

  stop: function() {
    clearInterval(this.job);
  },

  // Override if the metric needs to check if it can load.
  load: function(callback) {
    callback(null);
  },

  do: function(request) {
      if((this.event === '*') || (request.params.event === this.event)) {
          if (this.increment) {
              this.increment(request);
          }
          if ((this.shouldSave) && (this.save)) {
              this.save(request);
          }
      }
  },

  register: function() {
    for(metric in Metric.all) {
      if(this == Metric.all[metric]) { return; }
    }
    console.log("Loaded metric " + this.name);

    Metric.all.push(this);
  }
};

// Inherit from EventEmitter
var events = Object.create(require('events').EventEmitter.prototype);
for(var o in events) { Metric.prototype[o] = events[o]; }

Metric.all = [];

Metric.loadMetrics = function(callback) {
  Metric.availableMetricPaths(function(path) {
    var metric = require(path);
    metric.load(function(err) {
      if(err) {
        console.log(err.message);
      } else {
        metric.register();
        if(callback) { callback(metric); }
      }
    });
  });
};

Metric.availableMetricPaths = function(callback) {
  var files = fs.readdirSync(path.join(__dirname, 'metrics'));

  for(var i = 0; i < files.length; i++) {
    var file = files[i];
    var filename = file.replace(/\.(js|coffee)$/, '');
    callback(path.join(__dirname, 'metrics', filename));
  }
};

Metric.insert = function(req) {
  for(var i = 0, l = Metric.all.length; i < l; i++) {
    var metric = Metric.all[i];
    metric.do(req);
  }
};

// Support routines used by higher metrics...
Metric.getSession = function(req, callback) {
    var sessionKey = detector.getSessionKey(req);

    console.log("\n\n Metric.getSession");
    console.log("got a sessionKey: "+sessionKey);
    if(sessionKey) {
        SessionShelf.Session.forge({key: sessionKey}).fetch().then(function(session) {
            if (!session) {

                var userKey = detector.getUserKey(req);

                console.log("no sessionKey found (userKey=="+userKey+")");
                session = {authed: 0};
                session.key = sessionKey;

                if(userKey) {
                    // get user, do callback
                    if(detector.isAuthed(req))
                        session.authed = 1;

                    Metric.getUser(req, function(user) {
                        console.log(user);
                        if(user)
                            session.user_id = user.id;
                        SessionShelf.Session.forge(session).save().then(callback);
                    });
                } else {
                    console.log('not even looking for a user');

                    SessionShelf.Session.forge(session).save().then(callback);
                }
            } else {
                callback(session);
            }
        });
    } else {
        callback();
    }
};

Metric.getUser = function(req, callback) {
    var userKey = detector.getUserKey(req);

    if(userKey) {
        UserShelf.User.forge({key: userKey}).fetch().then(function(user) {
            if (!user) {
                user = {};
                user.key = userKey;
                UserShelf.User.forge(user).save().then(callback)
            } else {
                callback(user);
            }
        });
    } else {
        callback();
    }
};

module.exports = Metric;
