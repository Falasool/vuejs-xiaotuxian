// 懒加载
// 监视视口
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install(app) {
    //懒加载的逻辑
    // el:指令绑定的元素
    // binding：一个对象
    // 指令"="后面绑定的表达式 的值 => binding.value => img.URL
    app.directive('img-lazy', {
      mounted(el, binding) {
        console.log(el, binding.value)
        useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting)
          if (isIntersecting) {
            // 图片进入视口
            el.src = binding.value
          }
        })
      }
    })
  }
}
