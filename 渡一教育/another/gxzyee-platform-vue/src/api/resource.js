import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
  { '1': '启用',
    '0': '禁用'
  }

/**
 * 资源类型:menu-菜单、btn-操作项
 */
export const menuTypeMap =
    { 'menu': '菜单',
      'btn': '操作项'
    }

/**
 * 查询列表
 * @param params
 */
export const listBy = (params) => request({
  url: '/base/menu/listBy',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/menu/remove',
  method: 'post',
  data: data
})

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/menu/save',
  method: 'post',
  data
})

export const apiSync = (data) => request({
  url: '/base/menu/sync/api',
  method: 'post',
  data: data
})

export const listGranted = (data) => request({
  url: '/base/menu/listGranted',
  method: 'post',
  data: data
})

export const grantSave = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/menu/grant/save',
  method: 'post',
  data
})

export const grantAdd = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/menu/grant/add',
  method: 'post',
  data
})

export const grantRemove = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/menu/grant/remove',
  method: 'post',
  data
})
