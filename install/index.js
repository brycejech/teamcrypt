'use strict';

const fs   = require('fs'),
      path = require('path');

const db = require('../db');

const queries = [
    {
        name: 'user',
        file: './queries/user.sql'
    },
    {
        name: 'user_db',
        file: './queries/keyfile.sql'
    }
].map(q => {
    try{
        q.sql = fs.readFileSync(path.resolve(q.file), 'utf8');
    }
    catch(e){
        console.error(`Error loading query file for ${ q.name }`);
        console.log(e);
    }
    return q;
});


const promises = [];

let last;

queries.forEach(async (q) => {

    try{
        setTimeout(async () => {
            last = db.q(q.sql, [], { rawQuery: true });

            await last

            promises.push(last);
        }, 1000)

    }
    catch(e){
        console.log(`Error with query "${ q.name }"`)
        console.log(e);
    }

});

// Promise.all(promises).then(() => db.disconnect());
