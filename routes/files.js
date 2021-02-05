'use strict';
// @flow

const {FastifyRequest, FastifyReply} = require('fastify');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '../files/');
const prefix = '/files';

function process(type: string, request: FastifyRequest, response: FastifyReply) {
    const stream = fs.createReadStream(folder + '/' + type + '/' + request.params.filename);

    stream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        response.type('audio/mpeg').send(stream);
    });

    stream.on('error', function (err) {
        response.code(404).send({msg: 'Not found'});
    });
}

module.exports = fastify => {
    const postfix = '/:filename';

    fastify.get(prefix + '/main' + postfix, {}, (request, response) => process('main', request, response));
    fastify.get(prefix + '/pre' + postfix, {}, (request, response) => process('pre', request, response));
};