'use strict';

import * as crypto from '../lib/crypto';

function Keyfile(key, file, salt){
    this.key       = key;
    this.data      = file || [];
    this.salt      = salt;
    this.encrypted = typeof file === 'string'

    return this;
}

Keyfile.prototype.add = function keyfileAdd(obj){
    if(this.encrypted) throw new Error('Must decrypt before adding items');
    if(!obj.title)     throw new Error('Must provide a title')

    let { title, type, parent, username, password, url, notes } = obj;

    type = type || 'entry';

    if(type === 'entry' && parent){
        let parentEntry = this.findEntry(parent);

        if(!parentEntry){
            parentEntry = { type:  'folder', title:  parent };

            this.data.push(parentEntry);
        }
    }

    const entry = {
        title,
        type,
        parent,
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

Keyfile.prototype.toTree = function keyfileToTree(){
    if(this.encrypted) throw new Error('Must decrypt before building tree');

    // Find entries without parents first
    const rootEntries  = [],
          childEntries = [];

    this.data.forEach(entry => {

        // Shallow clone
        entry = { ...entry };

        // ensure folders have children array
        if(entry.type === 'folder') entry.children = [];

        // if it has a parent it must be a child
        if(entry.parent) return childEntries.push(entry);

        // otherwise, it is a root entry
        rootEntries.push(entry);
    });

    const tree = [...rootEntries];

    for(const entry of childEntries){

        const parent = _findInTree(tree, entry.parent);

        if(!parent) console.log('Parent not found for', entry.title);
        parent.children.push(entry);
    }

    return tree;
}

Keyfile.prototype.findEntry = function keyfileFindEntry(title){
    return this.data.filter(entry => entry.title === title)[0];
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

function _findInTree(tree, title){
    let found;

    for(const entry of tree){
        if(entry.title === title) return entry;

        if(entry.type === 'folder') found = _findInTree(entry.children, title);

        if(found) break;
    }

    return found
}

export default Keyfile;
