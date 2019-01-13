'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      path       = require('path');

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

server.listen(8080);
