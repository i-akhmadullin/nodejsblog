if (!global.hasOwnProperty('db')) {
    var Sequelize   = require('sequelize-postgres').sequelize,
        sequelize   = null,
        HEROKU_DB_NAME = 'HEROKU_POSTGRESQL_ONYX_URL',
        POSTGRES_REGEX = /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;

    if (process.env[HEROKU_DB_NAME]) { // on heroku
        var match = process.env[HEROKU_DB_NAME].match(POSTGRES_REGEX);
    } else { // on the local machine
        var match = require('../db/config').getDevConnectionString().match(POSTGRES_REGEX);
    }

    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     match[4],
        host:     match[3],
        logging:  console.log //false
    });

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,

        Post: sequelize.define('Post', {
            title: Sequelize.STRING,
            content: Sequelize.TEXT
        })
        // Post:      sequelize.import(__dirname + '/post')

        // add your other models here
    };

    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
}

module.exports = global.db;