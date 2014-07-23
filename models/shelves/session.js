'use strict';

var BaseModel = require('./base');

var Session = BaseModel.Model.extend({
    tableName: 'session',
    // Constructor Override
    constructor: function () {
        // Call Parent
        BaseModel.Model.apply(this, arguments);
    }
});

var Sessions = BaseModel.Collection.extend({
    model: Session
});

module.exports = {
    Session: BaseModel.model('Session', Session),
    Sessions: BaseModel.collection('Sessions', Sessions)
};
