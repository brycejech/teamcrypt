'use strict';

const db = require('../db');

const pick = require('../lib/pick');

function User(o){
    this.id       = o.id;
    this.uuid     = o.uuid;
    this.email    = o.email;
    this.username = o.username;
    this.password = o.password;
    this.salt     = o.salt;

    this.keyfile = {
        id:           o.keyfileID,
        data:         o.keyfile,
        lastModified: o.keyfileLastModified
    }

    this.registered = o.registered;

    return this;
}

User.prototype.getPublicObject = function getPublicUserObject(){
    const publicProps = [
        'id', 'name', 'uuid', 'registered', 'keyfile'
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

module.exports = User;
