'use strict';
// @flow

const {FastifyRequest, FastifyReply} = require('fastify');
const fs = require('fs');
const path = require("path");
const {uuidv4} = require('uuid');

const prefix = '/static';

const preFolder = path.join(__dirname, '../files/pre/')
const mainFolder = path.join(__dirname, '../files/main/')

let currentState = {}

function getPreForMainFile(mainFile) {
    return path.join(preFolder, path.basename(mainFile));
}

function createObjFromNameAndPath(name, pathUrl) {
    return {
        uid: uuidv4,
        updateDate: new Date(),
        titleText: name,
        mainText: '',
        streamUrl: '',
        redirectUrl: 'https://aarondietz.de'
    }
}

function generateNewEntry() {
    const newDate = new Date();
    newDate.setHours(0, 0, 1);

    //find new file to play
    return fs.promises.readdir(mainFolder)
        .then(mainFiles => {
            const mainFile = mainFiles[Math.round(Math.round() * mainFiles.length)];
            const preFile = getPreForMainFile(mainFile);
            const preFileExists = fs.existsSync(preFile);


        });


    currentState = {
        uid: uuidv4(),
        updateDate: newDate,

    }
}

module.exports = fastify => {
    fastify.get(prefix, {}, (request: FastifyRequest, response: FastifyReply) => {
        response.header('content-type', 'json');

        response.send([
            {
                "uid": "a51d9f4e-039f-4944-ae37–36f6adaa0028",
                "updateDate": "2021-01-19T21:26:01.721Z",
                "titleText": "Jocko Willink - Embrace darkness.mp3",
                "mainText": "",
                "streamUrl": "https://alexa-feed.9d3.de/files/Jocko%20Willink%20-%20Embrace%20darkness.mp3",
                "redirectionUrl": "https://aarondietz.de"
            }
        ])
    });
}