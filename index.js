'use strict';

const express     = require('express'),
      bodyParser  = require('body-parser'),
      session     = require('express-session'),
      MemoryStore = require('memorystore')(session),
      path        = require('path');

const server = express(),
      routes = require('./routes');

const { genSaltSync } = require('./app').crypto;

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
    // Invalidate sessions on server restart
    secret: genSaltSync(),
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

// Serve Vue build files
server.use(express.static(path.join(__dirname, 'dist')));

// Accept form data
const jsonBody = bodyParser.json(),
      urlBody  = bodyParser.urlencoded({ extended: true });
server.use(jsonBody, urlBody);

// Remove "X-Powered-By" header
server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// Mount routes
server.use(routes);

server.listen(8080, () => console.log('Express server listening on 8080'));
