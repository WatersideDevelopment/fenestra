'use strict';

var FenestraBookshelf = require('./base');

var Session = FenestraBookshelf.Model.extend({
    tableName: 'session',
    // Constructor Override
    constructor: function () {
        // Call Parent
        FenestraBookshelf.Model.apply(this, arguments);
    }

});

var Sessions = FenestraBookshelf.Collection.extend({
    model: Session
});

module.exports = {
    Session: FenestraBookshelf.model('Session', Session),
    Sessions: FenestraBookshelf.collection('Sessions', Sessions)
};
