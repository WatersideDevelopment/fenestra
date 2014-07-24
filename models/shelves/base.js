var Bookshelf = require('bookshelf'),
    dbConfig = require('../database/config'),
    FenestraBookshelf;

// Initialise
FenestraBookshelf = Bookshelf.MySQL = Bookshelf.initialize(dbConfig.config());

// Registry Plugin
FenestraBookshelf.plugin('registry');

// Base Model
FenestraBookshelf.Model = Bookshelf.MySQL.Model.extend({
    hasTimestamps: ['created_at', 'updated_at']
});

// Exports
module.exports = FenestraBookshelf;
