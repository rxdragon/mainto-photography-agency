const path = require('path')

function resolve (dir) {
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
  css: {
    loaderOptions: {
      less: {
        // antd主题色配置, 需要在main.js中引入的antd.less
        modifyVars: {
          'primary-color': '#1769FF'
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
