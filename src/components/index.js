// 全局注册components里的所有组件
// 用插件的方式
import { ImageView } from './ImageView/index.vue'
import { XtxSku } from './XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    // app.component('组件名', 配置对象)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}
