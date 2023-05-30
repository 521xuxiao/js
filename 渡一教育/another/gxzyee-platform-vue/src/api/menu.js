import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
  { '1': '启用',
    '0': '禁用'
  }

/**
 * 查询列表
 * @param params
 */
export const list = (params) => request({
  url: '/base/menu/list',
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

export const listRoleGrantedMenu = (data) => request({
  url: '/base/menu/list/role-granted',
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
