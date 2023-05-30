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
  url: '/base/sys/page',
  method: 'get',
  params
})

export const getById = (params) => request({
  url: '/base/sys/getById',
  method: 'get',
  params
})

export const list = (params) => request({
  url: '/base/sys/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/sys/remove',
  method: 'post',
  data: data
}
)

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/sys/save',
  method: 'post',
  data
})

