'use strict';
// @flow

/*
DISCLAIMER:
This file contains some short cuts to get a random file picker to work as quick as possible.
I will replace it with an DB system as soon as I have time
 */

const {FastifyRequest, FastifyReply} = require('fastify');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const prefix = '/static';

const preFolder = path.join(__dirname, '../files/pre/');
const mainFolder = path.join(__dirname, '../files/main/');

const serverBaseUrl = 'https://alexa-feed.9d3.de/';
const fileApiPostFix = 'files/';

let currentState = undefined;
let currentStateIsChanging = false;

function getPreForMainFile(mainFileName) {
    return path.join(preFolder, mainFileName);
}

function escapeUrlSpaces(url) {
    return url.replaceAll(' ', '%20');
}

function createObjFromNameAndPath(name, pathUrl, date) {
    return {
        uid: uuidv4(),
        updateDate: date,
        titleText: name,
        mainText: '',
        streamUrl: pathUrl,
        redirectUrl: 'https://aarondietz.de'
    };
}

function generateNewEntry() {
    const newDate = new Date();
    newDate.setHours(0, 0, 1);

    //find new file to play
    return fs.promises.readdir(mainFolder)
        .then(mainFiles => {
            const newState = [];

            const mainFileName = mainFiles[Math.round(Math.random() * (mainFiles.length - 1))];
            const preFile = getPreForMainFile(mainFileName);
            const preFileExists = fs.existsSync(preFile);

            const date = new Date();
            date.setHours(0, 0, 1);

            if (preFileExists) {
                const preFileName = path.basename(preFile);

                newState.push(createObjFromNameAndPath(
                    preFileName.split('.')[0],
                    escapeUrlSpaces(serverBaseUrl + fileApiPostFix + 'pre/' + preFileName),
                    date
                ));
                date.setMinutes(1);
            }

            newState.push(createObjFromNameAndPath(
                mainFileName.split('.')[0],
                escapeUrlSpaces(serverBaseUrl + fileApiPostFix + 'main/' + mainFileName),
                date
            ));

            return newState;
        });
}

module.exports = fastify => {
    fastify.get(prefix, {}, (request: FastifyRequest, response: FastifyReply) => {
        response.header('content-type', 'json');

        const currentDate = new Date();

        // resets everyday or after startup
        if (!currentState || currentState[0].updateDate.toDateString() !== currentDate.toDateString()) {
            currentStateIsChanging = true;

            generateNewEntry()
                .then(newState => {
                    currentState = newState;
                    currentStateIsChanging = false;

                    response.send(currentState);
                });
        } else {
            if (currentStateIsChanging) {
                // wait 500 ms for state change
                setTimeout(() => response.send(currentState), 500);
            } else {
                response.send(currentState);
            }
        }
    });
}