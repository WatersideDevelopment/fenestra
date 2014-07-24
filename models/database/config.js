'use strict';

var config = require('../../lib/config');

/**
 * Database Config
 * @returns {{client: string, connection: {host: *, user: *, password: *, database: *, charset: string}}}
 */
module.exports.config = function() {
    return {
        client: 'mysql',
        debug: false,
        connection: {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPass,
            database: config.dbName,
            charset: 'utf8'
        }
    };
};
