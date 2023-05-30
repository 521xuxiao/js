const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: require("./webpack.config.js")
})
