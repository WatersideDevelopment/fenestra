'use strict';

var BaseModel = require('./base');

var Event = BaseModel.Model.extend({
    tableName: 'event',
    // Constructor Override
    constructor: function () {
        // Call Parent
        BaseModel.Model.apply(this, arguments);
    }
});

var Events = BaseModel.Collection.extend({
    model: Event
});

module.exports = {
    Event: BaseModel.model('Event', Event),
    Events: BaseModel.collection('Events', Events)
};
