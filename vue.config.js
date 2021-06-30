module.exports = {
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
