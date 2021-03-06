'use strict';

const crypto = require('crypto'),
      bcrypt = require('bcrypt'),
      conf   = require('../conf');

const { IV_LENGTH, ALGORITHM } = conf.crypto;

function encrypt(key, text){
    if(key.length !== 32) throw new Error('Invalid encryption key length, expected 32 characters');

    const iv      = crypto.randomBytes(IV_LENGTH),
          cipher  = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);

    let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${ iv.toString('hex') }:${ encrypted.toString('hex') }`;
}


function decrypt(key, text){
    try{
        const [ iv, encrypted ] = text.split(':').map(_hexBuffer);

        const decipher  = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);

        let decrypted = decipher.update(encrypted);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
    catch(e){ return null }
}

// Generate a 32 character AES encryption key from password
// For decryption to work, salt must be stored and reused

// To generate a key for the first time, call deriveKey without
// the salt argument
async function deriveKey(password, salt){
    try{
        if(!salt) salt = await genSalt();
    }
    catch(e){ throw e }

    return new Promise((resolve, reject) => {

        const { ROUNDS, OUTPUT_LENGTH, ALGORITHM } = conf.pbkdf2;

        crypto.pbkdf2(password, salt, ROUNDS, OUTPUT_LENGTH, ALGORITHM, (err, key) => {
            if(err) return reject(err);

            key = key.toString('hex');

            resolve({ key, salt });
        });
    });
}

function hashPassword(password){
    const rounds = conf.bcrypt.ROUNDS;

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, rounds, (err, hash) => {
            if(err) return reject(err);

            return resolve(hash);
        });
    });
}

function verifyPassword(password, hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

// Generate cryptographically secure nonce
function genSalt(){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buff) => {
            if(err) return reject(err);

            return resolve(buff.toString('hex'));
        });
    });
}

function genSaltSync(){
    try{
        const buf = crypto.randomBytes(32);

        return buf.toString('hex');
    }
    catch(e){ throw e }
}

/*
    ===============
    PRIVATE HELPERS
    ===============
*/

// Return a Buffer from hex string
function _hexBuffer(text){ return Buffer.from(text, 'hex') }


/*
    =======
    EXPORTS
    =======
*/
module.exports = { encrypt, decrypt, deriveKey, hashPassword, verifyPassword, genSalt, genSaltSync };
