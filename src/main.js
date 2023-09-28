// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入插件
import { lazyPlugin } from '@/directives'

// 测试接口函数
import { getCategory } from '@/apis/testAPI'
const app = createApp(App)
getCategory().then((res) => {
  console.log(res)
})

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')



