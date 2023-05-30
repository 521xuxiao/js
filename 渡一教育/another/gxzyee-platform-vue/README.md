## 预览地址
http://192.168.1.192:9527/home

账号:admin 密码:123456

## 目录结构

```
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directives             # 全局指令
│   ├── filters                # 全局 filter
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── index.js              # 路由守卫
│   └── main.js                # 入口文件 加载组件 初始化等
│   └── settings.js            # 项目设置 项目标题 等
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```

### 配置说明

````
# 发布目录,默认为:/.支持部署时如需多级目录.如:/console
BASE_URL = '/'
# 路由默认请求路径
VUE_APP_BATH_PATH = '/'
# 接口请求地址
VUE_APP_BASE_API = '/api'
# dev开发环境代理地址,非development不生效
VUE_APP_DEV_PROXY_URL = 'http://localhost:8888'
#当前系统ID,用于获取菜单资源
VUE_APP_SID = 'base-service'
# oauth2单点配置
# 应用ID
VUE_APP_OAUTH2_APP_KEY=20181112174845
# 登录跳转地址
VUE_APP_OAUTH2_AUTHORIZE_URL=http://localhost:8888/uaa/oauth/authorize
# 获取token地址
VUE_APP_OAUTH2_TOKEN_URL=http://localhost:8888/uaa/oauth/token
# 授权范围
VUE_APP_OAUTH2_SCOPE=user_info
# 单点退出地址
VUE_APP_OAUTH2_LOGOUT_URL=http://localhost:8888/uaa/logout
# 认证成功回调前端地址
VUE_APP_OAUTH2_REDIRECT_URI=http://localhost:9527/auth-redirect
````
### 新项目开发前准备

demo已集成OAuth2简单模式.SSO单点登录&用户中心&权限控制。其他页面需自行开发, 路由为后端动态生成。需做以下准备,即可使用。

1. 下载前端模板

   [前端模板地址]: 

2. 登录基础服务平台 > 权限管理 > 权限系统 > 创建权限系统 :开启SSO登录,填写前端认证成功重定向地址 http://{ip}:{port}/auth-redirect

3. 获取对应系统sid和appId

4. 创建资源 > 选择之前创建的权限系统(sid) > 页面权限(菜单&操作) > 分配资源给相关开发角色

5. 登录系统,开发页面

### 页面元素权限控制

> 使用指令v-has=[权限标识1,权限标识2],拥有任意一个即可.

## 快速开始

### 初始化
```
npm install
```
### 本地启动
```
npm dev
```

### 打包发布
```
npm build
```

### 代码检查
```
npm run lint
```


### 部署说明

> 开发环境:下使用 Vue.config.js配置代理方式,解决跨域和options预请求

> 生产环境: 使用nginx代理方式,解决跨域和options预请求
