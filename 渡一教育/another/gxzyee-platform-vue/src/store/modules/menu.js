import { dynamicRoutes } from '@/router/routes'
import router from '@/router'
import { BlankLayout } from '@/layout'

import XEUtils from 'xe-utils'

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

/**
 * 格式化路由菜单
 * @param array
 * @returns {Array}
 */
function filterAsyncRouter(array) {
  array = array || []
  const opt = {
    key: 'id',
    parentKey: 'parentId',
    children: 'children'
  }
  const list = array.filter(item => item.type !== 'btn')
  const menus = XEUtils.toArrayTree(list, opt)
  const routers = filterRouter(menus, [])
  return routers
}

// 大驼峰命名
function strToCamel(str) {
  return str.replace(/(^|_)(\w)/g, (m, $1, $2) => $2.toUpperCase())
}

function filterRouter(array, routers) {
  const list = array.map(item => {
    let path = ''
    if (XEUtils.startsWith(item.path, '/')) {
      path = item.path
    } else if (!XEUtils.startsWith(item.path, 'http://') && !XEUtils.startsWith(item.path, 'https://')) {
      path = '/' + item.path
    } else {
      path = item.path
    }
    const component = XEUtils.get(item, 'meta.component', '')

    const hasChild = !XEUtils.isEmpty(item.children)

    // 将名字转换为驼峰
    const name = strToCamel(item.code.replace(':', '_'))
    path = path === '/' ? '/' + name : path
    const router = {
      // 使用菜单id不使用code防止修改后,刷新后缓存的页面无法找到
      name: name,
      path: path,
      component: BlankLayout,
      meta: {
        hidden: item.type !== 'menu',
        title: item.name,
        icon: XEUtils.get(item, 'meta.icon', ''),
        keepAlive: XEUtils.get(item, 'meta.keepAlive', true)
      }
    }
    if (hasChild) {
      router.children = filterRouter(item.children, [])
    } else {
      if (XEUtils.startsWith(path, '/')) {
        // 内部组件
        router.component = (resolve) => {
          if (component) {
            require([`@/views${component}`], resolve)
          } else {
            require([`@/views/error-page/404.vue`], resolve)
          }
        }
      } else {
        // 外部链接
        router.meta.target = path
      }
    }
    return router
  }
  )
  routers.push(...list)
  return routers
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const layout = dynamicRoutes.find((v) => v.path === '/dynamicRoutes')
      // 动态生成路由
      const routes = filterAsyncRouter(menus)
      layout.children = routes
      dynamicRoutes.forEach((r) => router.addRoute(r))
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

const getters = {
  routes: () => state.routes
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
