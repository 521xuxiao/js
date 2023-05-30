"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const qs = require("qs");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === "production";

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios",
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js",
    "https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js",
    "https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js",
    "https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js",

    // "./src/assets/js/vue.min.js",
    // "./src/assets/js/vue-router.min.js",
    // "./src/assets/js/vuex.min.js",
    // "./src/assets/js/axios.min.js",
  ],
};

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527; // dev port
const proxy = process.env.VUE_APP_DEV_PROXY_URL;
const name = defaultSettings.title || "Vue Admin"; // page title
const publicPath = process.env.BASE_URL || "/";
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  runtimeCompiler: true,
  publicPath: publicPath,
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./mock/mock-server.js"),
    proxy: {
      "/api/": {
        // 这里最好有一个 /
        target: proxy, // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        onProxyReq: function (proxyReq, req, res, options) {
          // 解决post请求失败,参数丢失问题
          const contentType = proxyReq.getHeader("Content-Type");
          if (req.body && contentType) {
            if (contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
              // 代理 application/x-www-form-urlencoded req.body 为json对象 转为 a=1&b=2的形式
              proxyReq.write(qs.stringify(req.body, { indices: false }));
            }
            if (contentType.indexOf("application/json") !== -1) {
              // 代理 application/json req.body 为json对象 转为json字符串
              proxyReq.write(JSON.stringify(req.body));
            }
          }
        },
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        // If you are using less-loader@5 please spread the lessOptions to options directly
        modifyVars: {
          "primary-color": "#1890ff",
          "layout-color": "#e6a23c",
        },
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        "@": resolve("src"),
      },
    },
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
  },
  chainWebpack: (config) => {
    // assets require on cdn
    if (isProd) {
      config.plugin("html").tap((args) => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },
};
