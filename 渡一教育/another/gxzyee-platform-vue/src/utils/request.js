import qs from 'qs'
import axios from 'axios'
import store from '../store'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  // 设置请求超时时间6s
  timeout: 6000,
  // 默认post请求为表单请求
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data, { indices: false })
    }
    if (config.method === 'get') {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { indices: false })
      }
    }
    const token = getToken()
    if (token) {
      // let each request carry token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    if (res.code === 20000) {
      return res
    } else {
      // 使用Promise.reject 响应
      message.error({ content: res.message })
      return Promise.reject(res)
    }
  },
  error => {
    let msg = ''
    if (error && error.response) {
      const res = error.response.data
      if (error.response.status === 401) {
        store.dispatch('user/removeToken').then(() => {
          location.reload()
        })
      } else {
        msg = res.message ? `${res.message} 错误代码[${res.code}]` : error.message
      }
      message.error({ content: msg })
      // 请求错误处理
      return Promise.reject(error)
    } else {
      msg = '连接服务器失败'
      message.error({ content: msg })
    }
    return Promise.reject(error)
  }
)

export default service
