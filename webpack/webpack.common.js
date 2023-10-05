const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');
const path = require('path');


const DIST = path.resolve(__dirname, '../assets/dist/');


module.exports = {
  entry: ['./src/js/MonDourdannais.js'],
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader
    ]
  },
  output: {
    path: DIST,
    filename: 'MonDourdannais.bundle.js',
    library: 'MonDourdannais',
    libraryTarget: 'window',
    libraryExport: 'default'    
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin
  ]
};
