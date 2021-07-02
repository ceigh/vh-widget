module.exports = {
  filenameHashing: false,
  productionSourceMap: false,

  css: {
    extract: false
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
