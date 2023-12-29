// 封装购物车模块

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 1. 定义 state
    const cartList = ref([])
    // 2. 定义action（方法）
    const addCart = (goods) => {
      // 添加购物车的逻辑
      // 已添加过同sku的商品：count+1
      // 未添加：push
      // 在cartList中匹配新商品对象中的skuId，找到就是添加过了
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到，是新商品
        cartList.value.push(goods)
      }
    }

    return {
      cartList,
      addCart
    }
  },
  {
    persist: true
  }
)
