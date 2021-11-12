import { createStore } from 'vuex'
import { userModule } from './modules/user'
import { groupModule } from './modules/group'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || '',
      // 用户信息
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : {},
      // 是否是群聊
      isGroup: localStorage.getItem('isGroup')
        ? JSON.parse(localStorage.getItem('isGroup'))
        : false,
      // 发送目标用户
      toUserId: localStorage.getItem('toUserId')
        ? JSON.parse(localStorage.getItem('toUserId'))
        : -1,
      // 发送群聊
      toGroupId: localStorage.getItem('toGroupId')
        ? JSON.parse(localStorage.getItem('toGroupId'))
        : -1,
    }
  },
  mutations: {
    // 获取用户信息
    getUserInfo(state, userInfo) {
      localStorage.setItem('token', userInfo.token)
      state.token = userInfo.token
      state.userInfo.id = userInfo.id
      state.userInfo.name = userInfo.name
      state.userInfo.photo = userInfo.avatar
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    // 判断是否是群聊
    getChatType(state, isGroup) {
      console.log(isGroup)
      localStorage.setItem('isGroup', isGroup)
      state.isGroup = isGroup
    },
    // 获取发送用户id
    getUserId(state, toUserId){
      state.toUserId = toUserId
      localStorage.setItem('toUserId', toUserId)
    },
    // 获取发送用户id
    getGroupId(state, toGroupId){
      state.toGroupId = toGroupId
      localStorage.setItem('toGroupId', toGroupId)
    }
  },
  modules: {
    user: userModule,
    group: groupModule,
  },
})

export default store
