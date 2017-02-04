var path = require('path');

var config = require('./webpack.config.js');

module.exports = Object.assign({}, config, {
  entry: './test/test.js',
  output: {
    filename: 'test.bundle.js',
    path: path.join(__dirname, 'test'),
  },
  resolve: {
    modules: [
      '.',
      'node_modules',
    ],
  }
});
