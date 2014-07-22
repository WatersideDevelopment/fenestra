$.fn.fenestraCount = function(socket, options) {
  if(this.length == 0) { return; }

  this.each(function() {
    new Fenestra.Count($(this), socket, options);
  });

  return this;
};


if(!Fenestra) { var Fenestra = {}; }

Fenestra.Count = function(element, socket, options) {
  this.element = element;
  this.socket = socket;

  var defaults = {
    averageOver: 1, // second
    ratePerSecond: 2,
    decimalPlaces: 0
  };

  this.options = $.extend(defaults, options);
  this.initialize();
};

Fenestra.Count.prototype = new Fenestra.Base();

$.extend(Fenestra.Count.prototype, {
  name: "Count",
  onMessage: function(value, average) {
    this.element.text(average.toFixed(this.options.decimalPlaces));
  },
});
