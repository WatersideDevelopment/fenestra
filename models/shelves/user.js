'use strict';

var FenestraBookshelf = require('./base');
var Promise = require('bluebird');

var User = FenestraBookshelf.Model.extend({
    tableName: 'user',
    // Constructor Override
    constructor: function () {
        // Call Parent
        FenestraBookshelf.Model.apply(this, arguments);

        // Post-Destroy Hook For Cleaning Up Pivot Table
        this.on('destroying', function (model) {
            return model.related('sessions').fetch().then(function (sessionCollection) {
                return Promise.all(sessionCollection.map(function (sessionModel) {
                    return sessionModel.destroy();
                }));
            });
        });
    }
});

var Users = FenestraBookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: FenestraBookshelf.model('User', User),
    Users: FenestraBookshelf.collection('Users', Users)
};
