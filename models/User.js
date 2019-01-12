'use strict';

const db = require('../db');

function User(o){
    for(const key in o){
        this[key] = o[key];
    }
    return this;
}

module.exports = User;
