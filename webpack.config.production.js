'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config.base.js');

const publicPath = '/';

config.output.publicPath = publicPath;

if (!config.module) {
    config.module = {};
}

config.mode = 'production';

if (!config.plugins) {
    config.plugins = [];
}

config.plugins.push(
    new CleanWebpackPlugin(['dist'], { verbose: true })
);

module.exports = config;

