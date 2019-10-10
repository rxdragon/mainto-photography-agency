const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,
  integrity: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}