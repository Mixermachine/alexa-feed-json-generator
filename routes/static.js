'use strict';
// @flow

const {FastifyRequest, FastifyReply} = require('fastify');

const prefix = '/static';

module.exports = fastify => {
    fastify.get(prefix, {}, (request: FastifyRequest, response: FastifyReply) => {
        response.header('content-type', 'json');

        response.send([
            {
                "uid": "b51d9f4e-029f-4944-ae37–36f6adaa0028",
                "updateDate": "2021-01-13T21:26:01.721Z",
                "titleText": "This is a test",
                "mainText": "",
                "streamUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                "redirectionUrl": "https://aarondietz.de"
            }
        ])
    });
}