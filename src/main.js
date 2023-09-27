// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'

// 测试接口函数
import { getCategory } from '@/apis/testAPI'
const app = createApp(App)
getCategory().then((res) => {
  console.log(res)
})

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令
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
