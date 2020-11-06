const { merge: webpackMerge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const utils = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const APP_API = process.env.APP_API || 'TEST';
module.exports = webpackMerge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      filename: utils.resolve('./../dist/index.html'),
      template: 'index.html',
      inject: true,
      favicon: './favicon.ico',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minimize: true,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_API': JSON.stringify(APP_API)
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      // minChunks: 1,
      maxSize: 0,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10
        },
        default: {
          test: /[\\/]src[\\/]js[\\/]/,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        antdui: {
          priority: 2,
          test: /[\\/]node_modules[\\/](antd)[\\/]/,  //(module) => (/antd/.test(module.context)),
        },
        basic: {
          priority: 3,
          test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|mobx|mobx-react|axios)[\\/]/,
        },
        styles: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        lib1: {
          chunks: "initial",
          name: "antd-mobile",
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: 'all'
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        // cssProcessorOptions: cssnanoOptions,
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
            normalizeUnicode: false
          }]
        },
        canPrint: true
      })
    ]
  }
})