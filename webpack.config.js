'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const webpackConfig = {
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: '[name].min.js'
    },
    mode: 'production',
    devtool: 'source-map'
}

const jsConfig = Object.assign({}, webpackConfig, {
    entry: './client/src/js/main.js'
});

const sassConfig = Object.assign({}, webpackConfig, {
    entry: [ './client/src/sass/main.sass' ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ]
});

module.exports = [ jsConfig, sassConfig ];
