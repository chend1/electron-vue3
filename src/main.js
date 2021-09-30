import { createApp } from 'vue'
// 引入路由router
import router from './router'
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/normalize.css'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
