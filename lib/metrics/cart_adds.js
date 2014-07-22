// Cart adds
//
// Emits aggregates per interval for the number of requests
// with a query parameter ?event=cart_add

var Metric = require('../metric');

var cartAdds = Object.create(Metric.prototype);

cartAdds.name = 'cart_adds';
cartAdds.initialData = 0;
cartAdds.interval = 1000; // ms
cartAdds.increment = function(request) {
  if(request.params.event === "cart_add") {
    this.data += 1;
  }
};

module.exports = cartAdds;
