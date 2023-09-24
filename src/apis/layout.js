import httpInstance from '@/utils/http'
export function getCategoryAPI() {
  // return的是一个promise对象
  return httpInstance({ url: '/home/category/head' })
}
