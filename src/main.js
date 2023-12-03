// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入懒加载指令插件
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'

const pinia = createPinia(App)

// 测试接口函数
import { getCategory } from '@/apis/testAPI'
const app = createApp(App)
getCategory().then((res) => {
  console.log(res)
})

// 注册插件
app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use()
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
