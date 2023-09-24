import httpInstance from '@/utils/http'
export function getBannerAPI() {
  // return的是一个promise对象
  return httpInstance({ url: '/home/banner' })
}
