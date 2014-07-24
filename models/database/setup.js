'use strict';

var Promise = require('bluebird'),
    FenestraBookshelf = require('../shelves/base');

// Knex Instance
var knex = FenestraBookshelf.knex;

// Table Creation Promises
var tablePromises = [];

// Users > Sessions > Events, so first...
//
// Table: Users
tablePromises.push(new Promise(function (resolve) {
    knex.schema.hasTable('user').then(function (exists) {
        if (exists) {
            resolve();
        } else {
            knex.schema.createTable('user', function (t) {
                t.increments('id');
                t.integer('entity_id');
                t.string('key');
                t.timestamps();
            }).then(function () {
                console.log('Users Table Created');
                resolve();
            });
        }
    });
}));


// Table: Sessions
tablePromises.push(new Promise(function (resolve) {
    knex.schema.hasTable('session').then(function (exists) {
        if (exists) {
            resolve();
        } else {
            knex.schema.createTable('session', function (t) {
                t.increments('id');
                t.integer('user_id');
                t.boolean('authed');
                t.timestamps();
            }).then(function () {
                console.log('Users Table Created');
                resolve();
            });
        }
    });
}));

// Events Table
tablePromises.push(new Promise(function (resolve) {
    knex.schema.hasTable('event').then(function (exists) {
        if (exists) {
            resolve();
        } else {
            knex.schema.createTable('event', function (t) {
                t.increments('id');
                t.integer('session_id');
                t.string('type');
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
