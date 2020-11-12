const utils = require("./utils")
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const vConsolePlugin = require('vconsole-webpack-plugin');
const argv = require('yargs')
  .describe('debug', 'debug environment ') // use 'webpack --debug'
  .argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    app: "./src/index",
    app2: "./src/outPage/extra/index",
    vendor: ['react']
  },
  output: {
    path: utils.resolve("../dist"),
    filename: "js/[name].[hash].js",
    publicPath: "./"
  },
  plugins: [
    new vConsolePlugin({
      // enable: true
      enable: !!argv.debug
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: utils.resolve('./../dist/index.html'),
      template: 'index.html',
      chunks: ['app'],
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
    new HtmlWebpackPlugin({
      filename: utils.resolve('./../dist/extra.html'),
      template: "./src/outPage/extra/index.html",
      chunks: ['app2'],
      favicon: './favicon.ico',
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minimize: true,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        },
        {
          loader: 'css-loader',
        },
        { loader: "postcss-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]___[hash:base64:5]"
              },
            }
          },
          { loader: "postcss-loader" },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: "postcss-loader" },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: "postcss-loader" },
          { loader: 'stylus-loader' }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // publicPath: 'imgs/',
          outputPath: 'imgs/',
          esModule: false
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '..', "src")
    }
  }
}
