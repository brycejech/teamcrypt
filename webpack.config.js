'use strict';

const path = require('path');

module.exports = {
    entry: './client/src/js/index.js',
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: 'bundle.min.js'
    },
    mode: 'production',
    devtool: 'source-map'
}
