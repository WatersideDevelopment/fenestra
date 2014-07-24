'use strict';

var FenestraBookshelf = require('./base');

var Event = FenestraBookshelf.Model.extend({
    tableName: 'event',
    // Constructor Override
    constructor: function () {
        // Call Parent
        FenestraBookshelf.Model.apply(this, arguments);
    }
});

var Events = FenestraBookshelf.Collection.extend({
    model: Event
});

module.exports = {
    Event: FenestraBookshelf.model('Event', Event),
    Events: FenestraBookshelf.collection('Events', Events)
};
