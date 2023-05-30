import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { BasicLayout } from '@/layout'

export const dynamicRoutes = [
  {
    path: '/dynamicRoutes',
    name: 'DynamicRoutes',
    redirect: '/home',
    component: BasicLayout,
    meta: {
      title: '动态路由',
      icon: '',
      hidden: true
    },
    children: [
      //  动态路由添加在此位置
    ]
  },
  {
    path: '*',
    name: '*',
    redirect: '/404'
  }
]

/**
 * 默认路由
 */
const routes =
[
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: BasicLayout,
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
          title: '主页',
          icon: '',
          affix: true
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/account'),
        meta: {
          title: '个人设置',
          icon: '',
          hidden: true
        },
        children: [
          {
            path: '/account/base',
            name: 'AccountBase',
            component: () => import('@/views/account/components/profile'),
            meta: {
              title: '个人设置',
              icon: '',
              hidden: true
            }
          },
          {
            path: '/account/security',
            name: 'AccountSecurity',
            component: () => import('@/views/account/components/security'),
            meta: {
              title: '安全设置',
              icon: '',
              hidden: true
            }
          }
        ]
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/error-page/403'),
        meta: {
          title: '403',
          icon: '',
          hidden: true
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404'),
        meta: {
          title: '404',
          icon: '',
          hidden: true
        }
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/error-page/500'),
        meta: {
          title: '500',
          icon: '',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    meta: {
      title: '登陆',
      icon: '',
      hidden: true
    }
  }

]

export default routes
