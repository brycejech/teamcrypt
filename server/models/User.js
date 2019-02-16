'use strict';

const db = require('../db');

const pick = require('../../lib/pick');

function User(o){
    this.id       = o.id;
    this.uuid     = o.uuid;
    this.name     = o.name;
    this.email    = o.email;
    this.username = o.username;
    this.password = o.password;

    this.keyfile = {
        id:           o.keyfileID,
        data:         o.keyfile,
        salt:         o.keyfileSalt,
        lastModified: o.keyfileLastModified
    }

    this.registered = o.registered;

    return this;
}

User.prototype.getPublicObject = function getPublicUserObject(){
    const publicProps = [
        'id', 'name', 'username', 'email', 'uuid', 'registered', 'keyfile'
    ];

    return pick(publicProps, this);
}


// Static get method for searching DB
User.get = async function getUser(o){
    const username = o.username || o.email;

    if(!username) throw new Error('Must provide username or email');

    const user = await db.q('user-get', [username]);

    return new User(user);
}

User.getAll = async function getAllUsers(){
    const users = await db.q('user-get-all');

    return users.map(u => new User(u));
}

User.updateKeyfile = async function updateKeyfile(user, data, salt){
    if(!(user && data && salt)){
        throw new Error('userID, data, and salt arguments required');
    }

    const keyfile = await db.q('keyfile-update', [user, data, salt]);

    return keyfile;
}

module.exports = User;
