const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const DIST = path.resolve(__dirname, 'dist')
const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: ENV,
  devtool: 'source-map',
  target: 'web',

  entry: {
    main: './src/App.tsx'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },

  output: {
    path: DIST,
    publicPath: 'auto',
    filename: '[name].bundle.[hash:8].js',
    chunkFilename: '[name].bundle.[contenthash:8].js',
    sourceMapFilename: '[file].map'
  },

  resolve: {
    // https://webpack.js.org/configuration/resolve/
    extensions: ['.js', '.ts', '.json', '.tsx'],
    alias: {}
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'typescript-loader'
        }]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ids.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({    
      template: path.resolve(__dirname, './src/index.html'),     
      filename: 'index.html',
    }),  
  ],
}