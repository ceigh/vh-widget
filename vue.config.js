module.exports = {
  filenameHashing: false,
  productionSourceMap: false,

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `$path: '${process.env.VUE_APP_PATH || ''}';`
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
