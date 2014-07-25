// Cart adds
//
// Emits aggregates per interval for the number of requests
// with a query parameter ?event=cart_add

var Metric = require('../metric');

var cartAdds = Object.create(Metric.prototype);

cartAdds.name = 'cart_adds';
cartAdds.event = 'cart_add';
cartAdds.initialData = 0;
cartAdds.interval = 1000; // ms
cartAdds.increment = function(request) {
    this.data += 1;
    console.log('add to cart processed...');
};
cartAdds.save = function(request) {
    console.log('ready to save cartAdds');

    Metric.getSession(request, function(session) {
//            console.log("EVENT for SESSION "+session.id);
        if(session.user_id) console.log("FOR USER "+session.user_id);
    });

    console.log("This cart save event should have been written to the DB... ::FIXME::");
};
cartAdds.shouldSave = true;
module.exports = cartAdds;
