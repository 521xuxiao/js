import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
    { '1': '启用',
      '0': '禁用'
    }

export const getById = (params) => request({
  url: '/base/org/getById',
  method: 'get',
  params
})

export const list = (params) => request({
  url: '/base/org/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/org/remove',
  method: 'post',
  data: data
}
)

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/org/save',
  method: 'post',
  data
})

export const listUsersByOrgId = (params) => request({
  url: '/base/org/listUsersByOrgId',
  method: 'get',
  params
})

export const addOrgUsers = (data) => request({
  url: '/base/org/addOrgUsers',
  method: 'post',
  data
})

export const removeOrgUser = (data) => request({
  url: '/base/org/removeOrgUser',
  method: 'post',
  data
})
