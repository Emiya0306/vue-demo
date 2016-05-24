const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname,
    filename: "./public/javascripts/bundle.js"
  },
  plugins: [
  ],
  module: {
    loaders: [
      {test: /\.js|.vue/, loader: "babel-loader?presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy"},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader!postcss-loader?browsers=last 2 version"},
      {test: /\.eot$/, loader: "file-loader?prefix=font/"},
      {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
      {test: /\.svg$/, loader: "file-loader?prefix=font/"}
    ]
  }
};
