'use strict';

const path = require('path');

module.exports = {
    entry: './client/src/js/app/index.js',
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: 'app.min.js'
    },
    mode: 'production',
    devtool: 'source-map'
}
