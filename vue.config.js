const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    // 配置 @ 路径
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://im.pltrue.top',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
        secure: true,
      },
    },
  },
}
