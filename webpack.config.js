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
      {test: /\.js/, loader: "babel-loader?presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy"},
      {test: /\.vue/, loader: "babel-loader?presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy!vue-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader!postcss-loader?browsers=last 2 version"},
      {test: /\.json$/, loader: "json-loader"},
      {test: /\.html$/, loader: "html-loader"},
      {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader!postcss-loader?browsers=last 2 version"},
      {test: /\.less/, loader: "style-loader!css-loader!less-loader!postcss-loader?browsers=last 2 version"},
      {test: /\.png$/, loader: "url-loader?prefix=img/&limit=5000"},
      {test: /\.jpg$/, loader: "url-loader?prefix=img/&limit=5000"},
      {test: /\.gif$/, loader: "url-loader?prefix=img/&limit=5000"},
      {test: /\.woff|.woff2$/, loader: "url-loader?prefix=font/&limit=5000"},
      {test: /\.eot$/, loader: "file-loader?prefix=font/"},
      {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
      {test: /\.svg$/, loader: "file-loader?prefix=font/"}
    ]
  }
};
