'use strict';
// @flow

const {FastifyRequest, FastifyReply} = require('fastify');
const fs = require("fs");
const path = require('path');

const folder = path.join(__dirname, '../files/')
const prefix = '/files';

module.exports = fastify => {
    fastify.get(prefix + '/:filename', {}, (request: FastifyRequest, response: FastifyReply) => {
        const stream = fs.createReadStream(folder + request.params.filename)

        stream.on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            response.type('audio/mpeg').send(stream);
        });

        stream.on('error', function (err) {
            response.code(404).send({msg: 'Not found'});
        });
    });
}