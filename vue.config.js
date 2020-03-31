const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')

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
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        configFile: '.stylelintrc.js',
        files: ['./src/assets/**/*.less', './src/**/*.vue'],
        formatter: 'verbose',
        fix: true
      })
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
