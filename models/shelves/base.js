var Bookshelf = require('bookshelf'),
    dbConfig = require('../database/config'),
    BaseModel;

// Initialise
BaseModel = Bookshelf.MySQL = Bookshelf.initialize(dbConfig.config());


// Base Model
BaseModel.Model = Bookshelf.MySQL.Model.extend({
    hasTimestamps: ['created_at', 'updated_at']
});

// Exports
module.exports = BaseModel;
