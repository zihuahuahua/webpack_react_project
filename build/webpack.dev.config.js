const { merge: webpackMerge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const utils = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const APP_API = process.env.APP_API || 'TEST';

module.exports = webpackMerge(baseWebpackConfig, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: utils.resolve('./../dist/index.html'),
      template: 'index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.APP_API': JSON.stringify(APP_API)
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: false,
    compress: true,
    port: "3030",
    publicPath: "/",
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '*': {
        changeOrigin: true,
      }
    },
  }
});