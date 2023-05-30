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
  url: '/base/dict/page',
  method: 'get',
  params
})

export const getById = (params) => request({
  url: '/base/dict/getById',
  method: 'get',
  params
})

export const list = (params) => request({
  url: '/base/dict/list',
  method: 'get',
  params
})

export const remove = (data) => request({
  url: '/base/dict/remove',
  method: 'post',
  data: data
}
)

export const save = (data) => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/base/dict/save',
  method: 'post',
  data
})

