const webpack = require('webpack');
const process = require('process');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(Object.assign({}, webpackConfig, { mode: 'development' }));

const watching = compiler.watch({}, (err, stats) => {
  err && console.error(err);
});

process.chdir('demo');
require('./demo/watch.js');
