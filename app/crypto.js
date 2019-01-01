'use strict';

const crypto = require('crypto'),
      conf   = require('../conf');

const { IV_LENGTH, ALGORITHM } = conf.crypto;

function encrypt(key, text){
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
        if(!salt) salt = await _genSalt();
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


/*
    ===============
    PRIVATE HELPERS
    ===============
*/

// Generate cryptographically secure nonce
function _genSalt(){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buff) => {
            if(err) return reject(err);

            return resolve(buff.toString('hex'));
        });
    });
}

// Return a Buffer from hex string
function _hexBuffer(text){ return Buffer.from(text, 'hex') }


/*
    =======
    EXPORTS
    =======
*/
module.exports = { encrypt, decrypt, deriveKey };
