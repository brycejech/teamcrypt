'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      path       = require('path');

const app = require('./app'),
      db  = require('./db');

const { Keyfile } = require('./models');

const server = express();

server.set('case sensitive routing', true);
server.enable('trust proxy'); // If running behind Nginx proxy

server.use(express.static(path.join(__dirname, 'client')));

// Accept form data
const jsonBody = bodyParser.json(),
      urlBody  = bodyParser.urlencoded({ extended: true });
server.use(jsonBody, urlBody);

// Remove "X-Powered-By" header
server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

server.get('/', (req, res, next) => {
    return res.json({ message: 'Running' });
});

server.post('/login', async (req, res, next) => {
    const username = req.body.username || req.body.email,
          password = req.body.password;

    const user   = await db.q('user-get', [username]),
          authed = await app.crypto.verifyPassword(password, user.password);

    if(authed === true){
        const kf = new Keyfile(user.id, user.keyfile);

        const { key } = await app.crypto.deriveKey(password, user.salt);

        user.keyfile = kf.decrypt(key);

        const publicUser = app.makePublic.user(user);

        res.json(publicUser);
    }
    else{
        res.json({ message: 'Incorrect username/password' });
    }
});

server.listen(8080);
