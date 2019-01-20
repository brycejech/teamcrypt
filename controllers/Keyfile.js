'use strict';

const { Keyfile } = require('../shared/controllers');
const crypto = require('../app/crypto');

Keyfile.prototype.decrypt = function keyfileDecrypt(key){

    if(!this.encrypted) return this;

    const decrypted = crypto.decrypt(key, this.keyfile);

    if(decrypted){
        try{
            const keyfile = JSON.parse(decrypted);

            this.keyfile   = keyfile;
            this.encrypted = false;

            return this;
        }
        catch(e){ throw e }
    }
    else{
        throw new Error('Incorrect encryption key');
    }
}

Keyfile.prototype.encrypt = function keyfileEncrypt(key){

    if(this.encrypted) return this;

    try{
        this.keyfile   = crypto.encrypt(key, JSON.stringify(this.keyfile));
        this.encrypted = true;

        return this;
    }
    catch(e){ throw e }
}

module.exports = Keyfile;
