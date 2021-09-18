const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    // 配置 @ 路径
    config.resolve.alias.set('@', resolve('src'))
  },
}
