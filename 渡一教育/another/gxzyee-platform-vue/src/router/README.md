路由/菜单说明
====

配置文件路径
----

`@/router/routes.js`
`@/router/modules/*.js`

格式和说明
----

```ecmascript6
/**
 * 路由配置说明：
 * 建议：sider menu 请不要超过三级菜单，若超过三级菜单，则应该设计为顶部主菜单 配合左侧次级菜单
 *
 **/
 {
  redirect: noredirect,
  name: 'router-name',
  meta: {
    title: 'title',
    icon: 'Icon',
    hidden：false,
    keepAlive: true,
    affix: false,
    breadcrumbLink: false
  }
}
```

`{ Route }` 对象

| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| redirect | 重定向地址, 访问这个路由时,自定进行重定向 | string  | -      |
| name     | 路由名称, 必须设置,且不能重名           | string  | -      |
| meta     | 路由元信息（路由附带扩展信息）            | object  | {}     |

`{ Meta }` 路由元信息对象

| 参数                | 说明                                                         | 类型    | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------- | ------ |
| title               | 路由标题, 用于显示面包屑, 页面标题 *推荐设置                 | string  | -      |
| icon                | 路由在 menu 上显示的图标                                    | string  | -      |
| keepAlive           | 缓存该路由                                                  | boolean | false  |
| hidden              | 隐藏菜单                                                   | boolean | false  |
| affix               | 是否固定,标签不可关闭                                       | boolean   | false     |
| breadcrumbLink      | 面包屑是否为跳转链接                                    | boolean   | false    |

路由例子
----

```ecmascript 6
const defaultRouterMap = [
   {
      path: '/permission',
      name: 'Permission',
      component: Layout,
      meta: {
            title: '权限管理',
            icon: '',
            hidden: false
      },
      children: [
        {
          path: '/resources',
          name: 'Resources',
          component: () => import('@/views/permission/resources'),
          meta: {
            title: '资源管理',
            icon: '',
            hidden: false
          }
        }
      ]
    }
]
```

> 1. 请注意 `component: () => import('..') ` 方式引入路由的页面组件为 懒加载模式。具体可以看 [Vue 官方文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
> 2. 子路由的父级路由必须有 `Layout` 才能让子路由渲染出来，请仔细查阅 vue-router 文档
> 3. 动态路由最终生成由接口返回数据生成,查看@store/modules/menu.js

