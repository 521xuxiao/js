import request from '@/utils/request'

/**
 * 状态
 */
export const statusMap =
  {
    '1': '已发布',
    '0': '未发布'
  }
export const authMap =
    {
      '1': 'OAuth2(客户端模式) AK/SK',
      '0': '无认证'
    }

/**
 * 列表页
 * @param params
 */
export const page = (params) => request({
  url: '/base/api/page',
  method: 'get',
  params
})

/**
 * 查询列表
 * @param params
 */
export const list = (params) => request({
  url: '/base/api/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/api/remove',
  method: 'post',
  data: data
})

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/api/save',
  method: 'post',
  data
})

// 导入swagger文档
export const importSwagger = (data) => request({
  url: '/base/api/import/swagger',
  method: 'post',
  data: data
})

export const listRoleGrantedMenu = (data) => request({
  url: '/base/api/list/role-granted',
  method: 'post',
  data: data
})

export const grantSave = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/api/grant/save',
  method: 'post',
  data
})

export const grantAdd = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/api/grant/add',
  method: 'post',
  data
})

export const grantRemove = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/api/grant/remove',
  method: 'post',
  data
})

export const accessLogsPage = (params) => request({
  url: '/base/api/access-logs/page',
  method: 'get',
  params
})
