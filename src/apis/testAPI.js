import httpInstance from '@/utils/http'

export function getCategory() {
  // return的是一个promise对象
  return httpInstance({ url: 'home/category/head' })
}
