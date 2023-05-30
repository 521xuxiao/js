import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import { getToken, getPageTitle } from '@/utils'

const basePath = process.env.VUE_APP_BATH_PATH || '/'
const createRouter = () => new Router({
  base: basePath,
  mode: 'history',
  routes: routes
})

const router = createRouter()

// 单点登录地址,使用implicit方式直接返回token
const loginPath = encodeURI(`${process.env.VUE_APP_OAUTH2_AUTHORIZE_URL}?response_type=token&scope=${process.env.VUE_APP_OAUTH2_SCOPE}&client_id=${process.env.VUE_APP_OAUTH2_APP_KEY}&redirect_uri=${process.env.VUE_APP_OAUTH2_REDIRECT_URI}`)
const whiteList = ['/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to?.meta?.title ?? '')
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      // determine whether the user has obtained his permission access through getInfo
      const auth = store.getters['user/getAuth']
      if (auth) {
        next()
      } else {
        try {
          // get user info
          const { menus } = await store.dispatch('user/getInfo')
          // init routes
          await store.dispatch('menu/generateRoutes', menus)
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 单点登录跳转
      location.href = `${loginPath}`
    }
  }
})

router.afterEach((to, from) => {
})

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
