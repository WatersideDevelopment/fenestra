if(!Fenestra) { var Fenestra = {}; }

Fenestra.Raw = function(element, socket, callback) {
  this.element = element;
  this.socket = socket;
  this.callback = callback;

  this.options = {};

  this.initialize();
};

Fenestra.Raw.prototype = new Fenestra.Base();

$.extend(Fenestra.Raw.prototype, {
  name: "Raw",
  onMessage: function(message) {
    this.callback(message);
  },
});
