const webpack = require('webpack')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'qiankun-example'
      return args
    })
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })
    Object.assign(config.resolve.alias, {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@router': resolve('src/router'), // 路由
      '@utils': resolve('src/utils'), // 公用js
      '@views': resolve('src/views'),
      '@api': resolve('src/api')
    })
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      }
      const cdn = {
        css: [
        ],
        js: [
          process.env.VUE_APP_STATICS_PATH + '/public/js/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
          process.env.VUE_APP_STATICS_PATH + '/public/js/vue-router.min.js',
          process.env.VUE_APP_STATICS_PATH +
            '/public/js/axios.min.js?version=1.0.1'
        ]
      }
      config.plugins.push(
        new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 600000 // Minimum number of characters
        })
      )
      config.plugins.forEach((val) => {
        if (val.constructor.name === 'HtmlWebpackPlugin') {
          if (!val.options) val.options = {}
          val.options.cdn = cdn
          val.options.chunks = 'all'
        }
      })
    } else {
      const cdn = {
        css: [],
        js: []
      }
      config.plugins.forEach((val) => {
        if (val.constructor.name === 'HtmlWebpackPlugin') {
          if (!val.options) val.options = {}
          val.options.cdn = cdn
        }
      })
    }
  }
}
