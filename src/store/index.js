
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : {},
      userChatMsg: localStorage.getItem('userChatMsg')
        ? JSON.parse(localStorage.getItem('userChatMsg'))
        : [],
      groupChatMsg: localStorage.getItem('groupChatMsg')
        ? JSON.parse(localStorage.getItem('groupChatMsg'))
        : [],
      // 是否是群聊
      isGroup: JSON.parse(localStorage.getItem('isGroup')) || false,
      // 好友列表
      userList: JSON.parse(localStorage.getItem('userList')) || [],
      // 群聊列表
      groupList: JSON.parse(localStorage.getItem('groupList')) || [],
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
    // 获取当前用户聊天信息
    getUserChatMsg(state, userChatMsg) {
      console.log('用户聊天信息');
      localStorage.setItem('userChatMsg', JSON.stringify(userChatMsg))
      state.userChatMsg = userChatMsg
    },
    // 获取当前群聊信息
    getGroupChatMsg(state, groupChatMsg) {
      console.log('用户群聊信息');
      localStorage.setItem('groupChatMsg', JSON.stringify(groupChatMsg))
      state.groupChatMsg = groupChatMsg
    },
    // 判断是否是群聊
    getChatType(state, isGroup) {
      console.log(isGroup);
      localStorage.setItem('isGroup', isGroup)
      state.isGroup = isGroup
    },
    // 用户列表
    // 群聊列表
  },
})

export default store
