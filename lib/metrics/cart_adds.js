// Cart adds
//
// Emits aggregates per interval for the number of requests
// with a query parameter ?event=cart_add

var Metric = require('../metric');
var Event = require('../../models/shelves/event').Event;

var cartAdds = Object.create(Metric.prototype);

cartAdds.name = 'cart_adds';
cartAdds.event = 'cart_add';
cartAdds.initialData = 0;
cartAdds.interval = 1000; // ms
cartAdds.increment = function(request) {
    this.data += 1;
};
cartAdds.save = function(request) {
    Metric.getSession(request, function(session) {
        if(session.id) {
            var poo = new Event({
                type: cartAdds.event,
                session_id: session.id,
                payload: request.params.payload
            })
            .save();
        }
    });
};
cartAdds.shouldSave = true;
module.exports = cartAdds;
