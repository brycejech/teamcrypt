'use strict';

const uuid = require('uuid');
const { encrypt, hashPassword, deriveKey } = require('./crypto');

const db = require('../db');

module.exports = async function registerUser(name, email, username, password){

    let user, hash, key, salt;

    // Empty JSON keyfile
    let keyfile = '[]';

    try{
        // Hash the users password
        hash = await hashPassword(password);

        // Generate an encryption key and salt for the user
        ({ key, salt } = await deriveKey(password));

        // Encrypt the empty keyfile
        keyfile = await encrypt(key, keyfile);

    }
    catch(e){ throw e }

    // Insert the new user and keyfile into db
    try{
        user = await db.query('user-create', [name, email, username, hash, uuid(), salt]);

        user.keyfile = await db.query('keyfile-create', [user.id, keyfile]);
    }
    catch(e){ throw e }

    return user;
}
