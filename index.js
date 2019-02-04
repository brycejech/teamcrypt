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

server.post('/user/:username/keyfile', async (req, res, next) => {

    if(!req.session.user){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const keyfile = req.body.keyfile;

    res.json({ keyfile });
});

server.get('/users', async (req, res, next) => {
    try{
        const users = (await User.getAll()).map(u => u.getPublicObject());

        return res.json([...users]);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ e: e.message })
    }
});

server.post('/login', async (req, res, next) => {
    const username = req.body.username || req.body.email,
          password = req.body.password;

    const user   = await User.get({ username }),
          authed = await app.crypto.verifyPassword(password, user.password);

    if(authed === true){
        res.json(user.getPublicObject());
    }
    else{
        res.json({ message: 'Incorrect username/password' });
    }
});

server.post('/register', async (req, res, next) => {

    const {
        name, email, username, password, confirm
    } = req.body;

    console.log(req.body);

    if(!(
           name
        && email
        && username
        && password
        && confirm
    )){
        return res.status(400).json({
            message: 'Missing required parameters'
        });
    }

    if(password !== confirm){
        return res.status(400).json({
            message: 'Passwords do not match'
        });
    }

    try{
        const user = await app.registerUser(name, email, username, password);

        return res.json(user);
    }
    catch(e){
        if(e.message === 'duplicate-key'){

            res.status(400);

            switch(e.field){
                case 'email':
                    return res.send({ message: 'email-exists' });
                case 'username':
                    return res.send({ message: 'username-exists' });
                default:
                    return res.send({ message: `${ field }-exists` });
            }
        }
        return res.status(500).send({ message: 'Server error' });
    }

});

server.use((req, res, next) => {
    return res.redirect('/');
});

server.listen(8080);
