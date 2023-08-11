const { name } = require('../../package.json')

module.exports = {
  publicPath: '/subapp/sub-vue-2',
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      library: {
        name: `${name}-[name]`,
        type: 'umd' // Set library output type to UMD
      },
      chunkLoadingGlobal: `webpackJsonp_${name}`
    },
    // externals: {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter'
    // },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
