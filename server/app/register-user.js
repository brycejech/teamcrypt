'use strict';

const uuid = require('uuid');
const { encrypt, hashPassword, deriveKey } = require('./crypto');

const db = require('../db');

module.exports = async function registerUser(name, email, username, password, salt){

    let user, hash;

    try{
        // Hash the users password
        hash = await hashPassword(password);

        const params = [ name, email, username, hash, uuid() ];

        user = await db.query('user-create', params);

        user.keyfile = await db.query('keyfile-create', [ user.id, null, salt ]);

        return user;

    }
    catch(e){
        if(e.detail){
            const detail = e.detail.toLowerCase();

            if(/key.*already.*exists/.test(detail)){
                const field = detail.match(/key\s\((.*?)\)=/);

                if(field.length > 1){
                    const err = new Error('duplicate-key');
                    err.field = field[1];

                    throw err;
                }
            }
        }

        throw e;
    }
}
