'use strict';

const fastify = require('fastify');

const server = fastify({
    logger: true
});

console.log('Registering routes');

require('./routes')(server)

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})