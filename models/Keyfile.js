'use strict';

function Keyfile(userID, file=[]){
    this.userID  = userID;
    this.keyfile = file;

    return this;
}

Keyfile.prototype.add = function keyfileAdd(obj){

    if(!obj.title) throw new Error('Must provide a title')

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

    const entry = this.findEntry(title);

    if(!entry) return this;

    const idx = this.keyfile.indexOf(entry);

    this.keyfile.splice(idx, 1);

    return this;
}

Keyfile.prototype.findEntry = function keyfileFindEntry(title){
    return this.keyfile.filter(entry => entry.title === title)[0];
}


module.exports = Keyfile;
