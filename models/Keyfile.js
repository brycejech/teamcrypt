'use strict';

const crypto = require('../app/crypto');

function Keyfile(userID, file=[]){
    this.userID    = userID;
    this.keyfile   = file;
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

            this.keyfile.push(parentEntry);
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

    this.keyfile.push(entry);

    return this;
}

Keyfile.prototype.remove = function keyfileRemove(title){
    if(this.encrypted) throw new Error('Must decrypt before removing items');

    const entry = this.findEntry(title);

    if(!entry) return this;

    const idx = this.keyfile.indexOf(entry);

    this.keyfile.splice(idx, 1);

    return this;
}

Keyfile.prototype.toTree = function keyfileToTree(){
    // Find entries without parents first
    const rootEntries  = [],
          childEntries = [];

    this.keyfile.forEach(entry => {
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
    return this.keyfile.filter(entry => entry.title === title)[0];
}

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


function _findInTree(tree, title){
    let found;

    for(const entry of tree){
        if(entry.title === title) return entry;

        if(entry.type === 'folder') found = _findInTree(entry.children, title);

        if(found) break;
    }

    return found
}

module.exports = Keyfile;
