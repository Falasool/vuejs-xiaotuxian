// 封装所有和用户有关的接口函数
import request from '@/utils/http'
// 解构赋值的例子，意味着这个函数期望接收一个对象作为参数，并从这个对象中提取 account 和 password 属性
export const loginAPI = ({ account, password }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
