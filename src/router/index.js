// 引入{创建路由实例、创建history模式的路由}
import { createRouter, createWebHistory } from 'vue-router'
// 引入组件
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          // path为'' =》 加载主页时也会渲染Home页
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        // Detail 组件的路由
        {
          path: 'detail/:id',
          component: Detail
        }
      ]
    },
    // 登录页路由
    {
      path: '/login',
      component: Login

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
