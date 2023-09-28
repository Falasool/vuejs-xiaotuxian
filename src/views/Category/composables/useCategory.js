// 封装分类数据业务相关代码
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
    console.log(res)
  }
  onMounted(() => {
    getCategory()
  })
  // 希望路由参数变化时，可以把分类数据接口重新发送，banner不动
  onBeforeRouteUpdate((to) => {
    // 问题：要用最新的参数请求新数据，而route.params.id滞后，
    console.log(to)
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
