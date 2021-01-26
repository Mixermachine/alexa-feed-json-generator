'use strict';

const {uuidv4} = require('uuid');

const fs = require('fs');
const util = require('util');
const {pipeline} = require('stream');
const pump = util.promisify(pipeline);

const {FastifyRequest, FastifyReply} = require('fastify');
const sequelize = require('../models').sequelize;

const {listMissingVariablesOfObj} = require('./helper');

const prefix = '/piece'
// Currently WIP
module.exports = fastify => {
    fastify.register(require('fastify-multipart'));

    fastify.post(prefix, {}, async (request: FastifyRequest, response: FastifyReply) => {
        const doc = request.body;
        listMissingVariablesOfObj(doc, ['title', 'redirectUrl']);

        const uuid = uuidv4();

        const data = await request.file();
        const outpath = fs.createWriteStream('./files/' + uuid + '.mp3')
        await pump(data.file, outpath);

        //doc.

        return response.send();
    });
}