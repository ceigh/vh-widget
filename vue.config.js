const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

module.exports = {
  publicPath,

  filenameHashing: false,
  productionSourceMap: false,

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `
$path: '${process.env.VUE_APP_PATH || ''}${publicPath}';
@import './src/assets/styles/variables';
@import './src/assets/styles/mixins';
`
      }
    }
  },

  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },

  pluginOptions: {
    lintStyleOnBuild: true
  }
}
