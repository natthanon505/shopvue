const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})


/*
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ignore-dts')
      .test(/\.d\.ts$/)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end();
  }
};
*/