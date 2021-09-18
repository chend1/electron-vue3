import { createRouter, createWebHashHistory } from 'vue-router'

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
    meta: {
      title: 'chat',
    },
    component: Chat,
  },
  {
    path: '/login',
    meta: {
      title: 'login',
    },
    component: Login,
  },
  {
    path: '/video',
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

export default router
