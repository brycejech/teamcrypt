'use strict';

import * as crypto from '../lib/crypto';

function Keyfile(key, file, salt){
    this.key       = key;
    this.data      = file || [];
    this.salt      = salt;
    this.encrypted = typeof file === 'string';

    Object.defineProperty(this, 'tags', {
        get(){
            if(this.encrypted) return [];
            if(!this.data)     return new Set();

            const tags = new Set();

            this.data.forEach(entry => {
                entry.tags.forEach(tag => {
                    tags.add(tag);
                });
            });

            return tags;
        }
    });

    return this;
}

Keyfile.prototype.add = function keyfileAdd(obj){
    if(this.encrypted) throw new Error('Must decrypt before adding items');
    if(!obj.title)     throw new Error('Must provide a title')

    let { title, type, tags, username, password, url, notes } = obj;

    if(!tags) tags = [];

    if(typeof tags === 'string') tags = [ tags ];

    type = type || 'entry';

    const entry = {
        title,
        type,
        tags,
        username,
        password,
        url,
        notes
    }

    if(this.data === null || this.data === undefined){
        this.data = [];
    }

    this.data.push(entry);

    return this;
}

Keyfile.prototype.remove = function keyfileRemove(title){
    if(this.encrypted) throw new Error('Must decrypt before removing items');

    const entry = this.findEntry(title);

    if(!entry) return this;

    const idx = this.data.indexOf(entry);

    this.data.splice(idx, 1);

    return this;
}

Keyfile.prototype.findEntry = function keyfileFindEntry(title){
    return this.data.filter(entry => entry.title === title)[0];
}

Keyfile.prototype.findEntriesByTag = function findEntriesByTag(str){
    if(this.encrypted) return [];

    const entries = [];

    this.data.forEach(entry => {
        entry.tags.forEach(tag => {
            if(tag === str) entries.push(entry);
        });
    });

    return entries;
}

Keyfile.prototype.toTagArray = function toTagArray(){
    const arr = [];

    this.tags.forEach(tag => {
        arr.push({
            tag,
            entries: this.findEntriesByTag(tag)
        });
    });

    return arr;
}

Keyfile.prototype.setKey = async function setKey(pw, salt){
    try{
        this.salt = salt;
        this.key  = await crypto.deriveKey(pw, salt);
    }
    catch(e){ throw e }

    return this;
}

Keyfile.prototype.encrypt = async function encrypt(){
    if(this.encrypted) return this;
    if(!this.key) throw new Error('Must call setKey before encrypting');

    try{
        const text = JSON.stringify(this.data);

        const encrypted = await crypto.encrypt(this.key, text);

        this.data   = encrypted;
        this.encrypted = true;

        return this;
    }
    catch(e){ throw e }
}

Keyfile.prototype.decrypt = async function decrypt(){
    if(!this.encrypted) return this;
    if(!this.key) throw new Error('Must call setKey before decrypting');

    const decrypted = await crypto.decrypt(this.key, this.data);

    if(decrypted){
        try{
            const keyfile = JSON.parse(decrypted);

            this.data   = keyfile;
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
