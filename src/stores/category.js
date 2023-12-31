import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  //  管理导航列表数据
  const categoryList = ref([])
  // action 获取数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log(res.result)
    categoryList.value = res.result
  }

  return {
    categoryList,
    getCategory
  }
})
