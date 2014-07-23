'use strict';

var Promise = require('bluebird'),
    FenestraBookshelf = require('../shelves/base');

// Knex Instance
var knex = FenestraBookshelf.knex;

// Table Creation Promises
var tablePromises = [];


// Events Table
tablePromises.push(new Promise(function (resolve) {
    knex.schema.hasTable('event').then(function (exists) {
        if (exists) {
            console.log('Events Table Already Exists');
            resolve();
        } else {
            knex.schema.createTable('event', function (t) {
                t.increments('id');
                t.string('type');
                t.string('action');
                t.string('payload');
                t.timestamps();
            }).then(function () {
                console.log('Events Table Created');
                resolve();
            });
        }
    });
}));

tablePromises.push(knex.migrate.latest(
    {directory: __dirname + '/migrations'}
));

// All Done
Promise.all(tablePromises).then(function () {
    // Report
    console.log('Tables Created Or Checked...');
    console.log('All done!');
    process.exit();
});
