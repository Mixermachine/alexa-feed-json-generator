'use strict';
// @flow

function listMissingVariablesOfObj(myObj: {}, required: []) {
    const errorList = [];

    required.forEach(keyword => {
        if (!myObj.hasOwnProperty(keyword)) {
            errorList.push(keyword);
        }
    });

    return errorList;
}

module.exports = {
    listMissingVariablesOfObj
}