// 管理用户数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. 定义管理用户数据的State
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    // 3. 以对象格式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  // 持久化:
  // 这个存储的配置中包含了 persist: true，
  // 这意味着 userInfo 的状态将会在页面刷新后保持，
  // 通过本地存储（localStorage）实现。
  {
    persist: true
  }
)
