import request from '@/utils/request'
/**
 * 状态
 */
export const statusMap =
    { '1': '启用',
      '0': '禁用'
    }

export function getInfo() {
  return request({
    url: '/base/user/my',
    method: 'get',
    params: { sid: process.env.VUE_APP_SID }
  })
}

export function logout() {
  return request({
    url: `${process.env.VUE_APP_OAUTH2_LOGOUT_URL}`,
    method: 'get'
  })
}

export const upload = (data) => request({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  url: '/base/sys/upload',
  method: 'post',
  data
})

export function page(params) {
  return request({
    url: '/base/user/page',
    method: 'get',
    params
  })
}

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/user/save',
  method: 'post',
  data
})
