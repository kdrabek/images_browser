var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', "transform-object-rest-spread"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new ExtractTextPlugin('src/assets/stylesheets/app.css', { allChunks: true })
  ]
};
