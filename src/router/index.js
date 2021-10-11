import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
// 登录
const Login = () => import('../views/Login.vue')
// 聊天
const Chat = () => import('../views/Chat.vue')
// 视频
const Video = () => import('../views/Video.vue')

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/chat',
    name: 'Chat',
    meta: {
      title: 'chat',
    },
    component: Chat,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'login',
    },
    component: Login,
  },
  {
    path: '/video',
    name: 'Video',
    meta: {
      title: 'video',
    },
    component: Video,
  },
]

const router = createRouter({
  // hash 模式
  history: createWebHashHistory(),
  routes,
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login' && !store.state.token) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
