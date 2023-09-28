import httpInstance from '@/utils/http'

// 获取Banner
export function getBannerAPI(params = {}) {
  // 默认为1
  const { distributionSite = '1' } = params
  // return的是一个promise对象
  return httpInstance({
    url: '/home/banner',
    params: { distributionSite }
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({ url: 'home/hot' })
}

/**
 * @description: 获取产品列表
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({ url: '/home/goods' })
}
