import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
  { '1': '启用',
    '0': '禁用'
  }

/**
 * 开发者类型
 */
export const developerTypeMap =
    { '0': '企业自有',
      '1': '第三方企业',
      '2': '第三方个人'
    }

/**
 * 应用类型 server-服务应用 app-手机应用 pc-PC网页应用 wap-手机网页应用
 */
export const appTypeMap =
    { 'server': '服务应用',
      'app': '手机应用',
      'pc': 'PC网页应用',
      'wap': '手机网页应用'
    }

/**
 * 列表页
 * @param params
 */
export const getPage = (params) => request({
  url: '/base/application/page',
  method: 'get',
  params
})

export const getById = (params) => request({
  url: '/base/application/getByAppId',
  method: 'get',
  params
})

export const list = (params) => request({
  url: '/base/application/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/application/remove',
  method: 'post',
  data: data
}
)

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/application/save',
  method: 'post',
  data
})

export const resetSecret = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/application/resetSecret',
  method: 'post',
  data
})

export const upload = (data) => request({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  url: '/base/application/upload',
  method: 'post',
  data
})
