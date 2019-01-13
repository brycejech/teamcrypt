'use strict';

const app = {};

app.crypto       = require('./crypto');
app.registerUser = require('./register-user');
app.makePublic   = require('./make-public');

module.exports = app;
