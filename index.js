'use strict';

const fastify = require('fastify');

const server = fastify({
    logger: true,
    trustProxy: '172.17.0.1'
});

console.log('Registering routes');

require('./routes')(server)

server.listen(6565, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})