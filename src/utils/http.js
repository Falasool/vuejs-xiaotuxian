// axios 基础封装

import axios from 'axios'

// 创建axios实例
const httpInstance = axios.create({
  // 根域名
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout: 5000
})

// **************************** //
// ***** 拦截器看官方文档 ******** //
// **************************** //

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

// 暴露实例
export default httpInstance

