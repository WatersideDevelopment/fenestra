'use strict';

var BaseModel = require('./base');
var Promise = require('bluebird');

var User = BaseModel.Model.extend({
    tableName: 'user',
    // Constructor Override
    constructor: function () {
        // Call Parent
        BaseModel.Model.apply(this, arguments);

        // Post-Destroy Hook For Cleaning Up Pivot Table
        this.on('destroying', function (model) {
            return model.related('events').fetch().then(function (eventCollection) {
                return Promise.all(eventCollection.map(function (eventModel) {
                    return eventModel.destroy();
                }));
            });
        });
    }
});

var Users = BaseModel.Collection.extend({
    model: User
});

module.exports = {
    User: BaseModel.model('User', User),
    Users: BaseModel.collection('Users', Users)
};
