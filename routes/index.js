'use strict';

const fs = require('fs');

module.exports = fastify => {
    fs.readdirSync(__dirname)
        .filter(file => !file.endsWith('index.js') && !file.endsWith('helper.js'))
        .map(file => require('./' + file)(fastify))
}
