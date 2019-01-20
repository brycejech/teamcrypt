'use strict';

import { Keyfile } from '../../../../shared/controllers';

import * as crypto from '../lib/crypto';

Keyfile.prototype.setKey = async function setKey(pw, salt){
    try{
        this.key = await crypto.deriveKey(pw, salt);
    }
    catch(e){ throw e }

    return this;
}

Keyfile.prototype.encrypt = async function encrypt(){
    if(this.encrypted) return this;
    if(!this.key) throw new Error('Must call setKey before encrypting');

    try{
        const text = JSON.stringify(this.keyfile);

        const encrypted = await crypto.encrypt(this.key, text);

        this.keyfile   = encrypted;
        this.encrypted = true;

        return this;
    }
    catch(e){ throw e }
}

Keyfile.prototype.decrypt = async function decrypt(){
    if(!this.encrypted) return this;
    if(!this.key) throw new Error('Must call setKey before decrypting');

    const decrypted = await crypto.decrypt(this.key, this.keyfile);

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

export default Keyfile;
