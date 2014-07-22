// Hits
//
// Send back individual hits.  Warning: this will send
// a _lot_ of data if you have a high traffic site.

var Metric = require('../metric');

var hits = Object.create(Metric.prototype);

hits.name = 'hits';
//hits.event = 'hit';
hits.initialData = [];
hits.interval = 1000; // ms
hits.increment = function(request) {
    console.log('hit');
  this.data.push({
    url:       request.headers && request.headers.referer,
    timestamp: new Date(),
    ip:        request.ip
  });
};

module.exports = hits;
