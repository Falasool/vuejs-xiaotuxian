// axios 基础封装

import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

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
    // 统一错误提示
    return (
      Promise.reject(e),
      ElMessage({
        type: 'warning',
        message: e.response.data.message //无效的密码
      })
    )
  }
)

// 暴露实例
export default httpInstance

// 这段代码主要做了以下几个事情：

// 创建 Axios 实例：
// 使用 axios.create 方法创建了一个名为 httpInstance 的 Axios 实例，
// 该实例已经预设了一些配置，包括根域名和超时时间。

// 请求拦截器：
// 使用 httpInstance.interceptors.request.use 添加了一个请求拦截器。
// 这个拦截器在每个请求发送之前执行，可以用来对请求进行一些处理，比如在请求头中添加 token。

// 响应拦截器：
// 使用 httpInstance.interceptors.response.use 添加了一个响应拦截器。
// 这个拦截器在每个响应接收之后执行，用来处理响应数据。在这里，它只返回响应的数据部分。

// 导出实例：
// 最后，通过 export default httpInstance 导出了创建好的 Axios 实例，
// 这样其他地方就可以直接引入并使用这个实例进行 HTTP 请求。

// 这个封装可以让你在项目中更方便地使用 Axios，并且通过拦截器可以实现一些全局的请求和响应处理。如果你有任何问题，随时问我！
