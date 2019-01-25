'use strict';

const express     = require('express'),
      bodyParser  = require('body-parser'),
      session     = require('express-session'),
      MemoryStore = require('memorystore')(session),
      path        = require('path');

const app = require('./app');

const { Keyfile } = require('./controllers'),
      { User }    = require('./models');

const server = express();

server.set('case sensitive routing', true);
server.enable('trust proxy'); // If running behind Nginx proxy

// Session setup
server.use(session({
    cookieName: 'teamcrypt_session',
    store: new MemoryStore({
        // Clear entries older than "checkPeriod"
        // Prevents memory leakage over time
        checkPeriod: 1000 * 60 * 60 * 24 // 86,400,000MS -> 1 day
    }),
    secret: app.crypto.genSaltSync(),
    // Set to true to trust reverse proxy
    // If not set, will accept server.enable('trust proxy'), set above
    proxy: true,
    saveUninitialized: true,
    resave: true,
    cookie: {
        // disallow JS access to cookie in browser
        // NEVER set this to false
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 86,400,000MS -> 1 day
        // Set this to true in production when running behind SSL
        secure: false,
        // default "/", change to limit session cookie to certain URL paths
        path: '/',
        sameSite: 'strict'
    }
}));

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

server.get('/user/:username', async (req, res, next) => {

    const username = req.params.username;

    try{
        const user = await User.get({ username });

        return res.json(user.getPublicObject());
    }
    catch(e){
        console.log(e);
        return res.json({ e: e.message });
    }
});

server.post('/login', async (req, res, next) => {
    const username = req.body.username || req.body.email,
          password = req.body.password;

    const user   = await User.get({ username }),
          authed = await app.crypto.verifyPassword(password, user.password);

    if(authed === true){
        const kf = new Keyfile(user.id, user.keyfile);

        const { key } = await app.crypto.deriveKey(password, user.salt);

        user.keyfile = kf.decrypt(key);

        res.json(user.getPublicObject());
    }
    else{
        res.json({ message: 'Incorrect username/password' });
    }
});

server.listen(8080);
