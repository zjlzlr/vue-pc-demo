'use strict'
// Template version: 1.2.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const dev = {
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {},
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
  autoOpenBrowser: false,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  useEslint: true,
  showEslintErrorsInOverlay: false,
  devtool: 'eval-source-map',
  cacheBusting: true,
  cssSourceMap: false,
  apiServer: 'http://www.easy-mock.com/mock/5a0ac9c5eace860402095188/rock'
}
const build = {
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: true,
  devtool: '#source-map',
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report,
  apiServer: ''
}
module.exports = {
  dev,
  build,
  // add by zlr:环境判断 调用:config.env.port...
  env: process.env.NODE_ENV === 'production' ? build : dev,
  // add by zlr:不同环境的公共变量 调用:config.common.
  common: {}
}
