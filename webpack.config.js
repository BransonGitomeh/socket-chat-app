var path = require('path');

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'assets/build'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
