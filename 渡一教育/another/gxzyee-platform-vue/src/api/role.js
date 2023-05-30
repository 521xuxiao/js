import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
    { '1': '启用',
      '0': '禁用'
    }

/**
 * 列表页
 * @param params
 */
export const page = (params) => request({
  url: '/base/role/page',
  method: 'get',
  params
})

export const getById = (params) => request({
  url: '/base/role/getById',
  method: 'get',
  params
})

export const list = (params) => request({
  url: '/base/role/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/role/remove',
  method: 'post',
  data: data
}
)

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/role/save',
  method: 'post',
  data
})

export const listUsersByRoleId = (params) => request({
  url: '/base/role/listUsersByRoleId',
  method: 'get',
  params
})

export const listRolesByUserId = (params) => request({
  url: '/base/role/listRolesByUserId',
  method: 'get',
  params
})

/**
 * 成员覆盖添加角色
 * @param data
 */
export const saveUserRoles = (data) => request({
  url: '/base/role/saveUserRoles',
  method: 'post',
  data
})

/**
 * 成员添加角色
 * @param data
 */
export const addUserRoles = (data) => request({
  url: '/base/role/addUserRoles',
  method: 'post',
  data
})

/**
 * 角色添加成员
 * @param data
 */
export const addRoleUsers = (data) => request({
  url: '/base/role/addRoleUsers',
  method: 'post',
  data
})

/**
 * 移除成员
 * @param data
 */
export const removeUser = (data) => request({
  url: '/base/role/removeUser',
  method: 'post',
  data
})

/**
 *
 * @param data
 */
export const listRoleGrantedMenu = (data) => request({
  url: '/base/menu/list/role-granted',
  method: 'post',
  data
})