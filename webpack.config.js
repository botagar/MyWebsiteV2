const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshBabel = require('react-refresh/babel')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const DIST = path.resolve(__dirname, 'dist')
const ENV = process.env.NODE_ENV || 'development'
const isDev = ENV === 'development'

module.exports = {
  mode: ENV,
  devtool: 'source-map',
  target: 'web',

  entry: {
    main: [
      './src/main.jsx'
    ],
  },

  devServer: {
    static: [
      path.resolve(__dirname, 'dist'),
    ],
    compress: true,
    port: 9000,
    hot: true,
    open: 'firefox',
    host: 'localhost',
  },

  output: {
    path: DIST,
    publicPath: 'auto',
    filename: '[name].bundle.[hash:8].js',
    chunkFilename: '[name].bundle.[contenthash:8].js',
    sourceMapFilename: '[file].map',
  },

  resolve: {
    // https://webpack.js.org/configuration/resolve/
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {},
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDev && ReactRefreshBabel
              ].filter(Boolean)
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ids.HashedModuleIdsPlugin(),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wds'
      }
    }),
    new HtmlWebpackPlugin({    
      template: path.resolve(__dirname, './src/index.html'),     
      filename: 'index.html',
    }),  
  ].filter(Boolean),
}