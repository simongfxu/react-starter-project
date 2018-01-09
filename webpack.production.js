/*eslint-disable*/
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var _ = require('lodash')
var pkg = require('./package.json')
var deps = Object.keys(pkg.dependencies)

_.pull(deps, 'babel-polyfill', 'antd')

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '/assets/components'),
      containers: path.join(__dirname, '/assets/containers'),
      utils: path.join(__dirname, '/assets/utils'),
      constants: path.join(__dirname, '/assets/constants'),
      images: path.join(__dirname, '/assets/images'),
      styles: path.join(__dirname, '/assets/styles'),
      stores: path.join(__dirname, '/assets/stores')
    }
  },
  entry: {
    vendor: deps,
    app: ['./assets/index.js'],
  },
  output: {
    filename: './assets-dist/app.js',
    // 设置为根目录
    publicPath: ''
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&plugins[]=transform-decorators-legacy',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
          // 设置为相对loader的输出路径的路径
          publicPath: '../../'
        })
      },
      {
        test: /\.cssx$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          // 设置为相对loader的输出路径的路径
          publicPath: '../../'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
          // 设置为相对loader的输出路径的路径
          publicPath: '../../'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // 设置为输出路径
        loader: `url-loader?limit=1024&name=./assets-dist/images/[name]-[hash:8].[ext]`
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./assets-dist/fonts/[name]-[hash:8].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": `"production"`
      }
    }),
    new ExtractTextPlugin({
      filename: './assets-dist/styles/bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './assets-dist/common.js'
    })
  ]
}
