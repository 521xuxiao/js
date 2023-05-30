import Vue from 'vue'
import VueBus from 'vue-bus'
import Antd from 'ant-design-vue'
import VueClipboard from 'vue-clipboard2'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import directives from './directives'
import XEUtils from 'xe-utils'
import request from './utils/request'
import regex from './utils/regex'

import './utils/xe-utils-ext'

import 'ant-design-vue/dist/antd.less'
import './assets/global.less'

// 框架公共组件注册
import '@/components/index'
// 业务公共组件注册
import '@/views/public/index'

// 注册指令
Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))

Vue.config.productionTip = false

Vue.prototype.$utils = XEUtils
Vue.prototype.$http = request
Vue.prototype.$regex = regex

Vue.use(Antd)
Vue.use(VueBus)
Vue.use(VueClipboard)

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n
}).$mount('#app')
