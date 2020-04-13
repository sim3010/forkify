const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package  = require('./package.json');


  module.exports = {

    entry: {pageOne : './starter/src/js/index.js',
            pageTwo : './starter/src/js/index2.js',
            vendor: Object.keys(package.dependencies)
           },

    output: {

      path: path.resolve(__dirname, './starter/dist'),

      filename: '[name].js'

    },
    devServer: {
        contentBase: './starter/dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './starter/src/index.html',
            chunks: ['pageOne','vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: './starter/src/index2.html',
            chunks: ['pageTwo','vendor']
        })
    ]
  };