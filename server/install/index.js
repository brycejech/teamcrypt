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
        q.sql = fs.readFileSync(path.resolve(__dirname, q.file), 'utf8');
    }
    catch(e){
        console.error(`Error loading query file for ${ q.name }`);
        console.log(e);
    }
    return q;
});


(async () => {
    let last;
    for(const q of queries){
        try{
            last = await db.q(q.sql, [], { rawQuery: true });
        }
        catch(e){
            console.log(`Error with install query "${ q.name }"`);
        }
    }
    await last;

    console.log('Installation complete');

    db.disconnect();
})();
