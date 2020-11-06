const utils = require("./utils")
const path = require('path')
const vConsolePlugin = require('vconsole-webpack-plugin');
const argv = require('yargs')
  .describe('debug', 'debug environment ') // use 'webpack --debug'
  .argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    app: "./src/index",
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
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader' }
      //   ]
      // },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         // you can specify a publicPath here
      //         // by default it use publicPath in webpackOptions.output
      //         publicPath: '../'
      //       }
      //     },
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         modules: {
      //           localIdentName: "[local]___[hash:base64:5]"
      //         },
      //       }
      //     },
      //     {
      //       loader: 'less-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   publicPath: '../'
            // }
          },
          { loader: "postcss-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          publicPath: 'imgs/',
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
