var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: 'dist',
    inline: true,
    port: 1104
  },
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader'],
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      enforce: 'pre',
      include: /src/,
      use: [{
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      }],
      test: /\.js?$/,
    }],
  },
  output: {
    filename: 'index.bundle.js',
    libraryTarget: 'umd',
    library: 'enumfactory',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
  }
}
