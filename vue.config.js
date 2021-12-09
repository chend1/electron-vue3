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
  pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [path.resolve(__dirname, './src/styles/variable.less')]
    // },
    electronBuilder: {
      builderOptions: {
        asar: false, // 关闭 打包成的asar文件
        appId: 'com.go.im',
        productName: 'Go-IM',
        copyright: 'Copyright © Go-IM All Rights Reserved',
        win: {
          target: {
            target: 'nsis',
            arch: ['ia32', 'x64']
          },
          icon: './public/icon.png'
        },
        nsis: {
          oneClick: false, // 是创建一键安装程序还是辅助安装程序。
          perMachine: true, // 是否显示辅助安装程序的安装模式安装程序页面（按计算机或按用户选择）。
          allowElevation: true, // 允许请求提升。 如果为false，则用户将不得不以提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 是否允许用户更改安装目录。
          include: './installer.nsh'
        }
        // 配置自动更新
        // publish: {
        //     provider: "generic",
        //     url: "", // 应用服务器地址
        //     channel: "latest",
        //     useMultipleRangeRequest: true,
        //     publishAutoUpdate: true,
        // },
      },
      nodeIntegration: true // 让主进程与渲染进程进行通信前提条件
    }
  }
}
