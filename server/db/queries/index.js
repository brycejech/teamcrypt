'use strict';

const fs   = require('fs'),
      path = require('path');

const queries = [
    {
        name: 'user-create',
        file: './user-create.sql',
        firstRow:  true
    },
    {
        name: 'user-get',
        file: './user-get.sql',
        firstRow: true
    },
    {
        name: 'user-get-all',
        file: './user-get-all.sql'
    },
    {
        name: 'keyfile-create',
        file: './keyfile-create.sql',
        firstRow:  true
    },
    {
        name:  'keyfile-update',
        file: './keyfile-update.sql',
        firstRow: true
    }
].map(q => {
    try{
        q.sql = fs.readFileSync(path.resolve(__dirname, q.file), 'utf8');
    }
    catch(e){
        console.error(`Error loading query file "${ q.name }"`);
        console.error(e);
    }

    return q;
});

module.exports = queries;
