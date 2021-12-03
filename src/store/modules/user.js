import { getUserList } from '@/api/list.js'
import { getInformationHistory } from '@/api/message.js'
export const userModule = {
  state() {
    return {
      // 私聊记录
      userChatMsg: localStorage.getItem('userChatMsg')
        ? JSON.parse(localStorage.getItem('userChatMsg'))
        : {},
      // 好友列表
      userList: localStorage.getItem('userList')
        ? JSON.parse(localStorage.getItem('userList'))
        : [],
      // 好友聊天记录
      userChatList: localStorage.getItem('userChatList')
        ? JSON.parse(localStorage.getItem('userChatList'))
        : [],
    }
  },
  mutations: {
    // 获取当前用户聊天信息
    getUserChatMsg(state, userChatMsg) {
      localStorage.setItem('userChatMsg', JSON.stringify(userChatMsg))
      state.userChatMsg = userChatMsg
    },
    // 用户列表
    getUserList(state, userList) {
      state.userList = userList
      localStorage.setItem('userList', JSON.stringify(userList))
    },
    // 用户所有聊天消息列表
    getUserChatList(state, userChatList) {
      state.userChatList = userChatList
      localStorage.setItem('userChatList', JSON.stringify(userChatList))
    },
    // 清除聊天提醒
    clearPointMsg(state, toId) {
      let userList = state.userList.map((item) => {
        // item.pointData = []
        if (item.id === toId && !(item.pointData[0] instanceof Object)) {
          item.pointData[0] = {
            msg: item.pointData[item.pointData.length - 1],
          }
        }
        return item
      })
      state.userList = userList
      localStorage.setItem('userList', JSON.stringify(userList))
    },
  },
  actions: {
    // 获取用户聊天信息
    getUserChatMsg(context, id) {
      let userChatList = context.state.userChatList
      let userChatMsg = userChatList.filter((item) => {
        return item.user.id === id
      })
      if (userChatMsg.length > 0) {
        context.commit('getUserChatMsg', userChatMsg[0])
      } else {
        getInformationHistory({
          to_id: id,
        }).then((res) => {
          console.log(res.data)
          userChatList.push(res.data)
          localStorage.setItem('userChatList', JSON.stringify(userChatList))
          context.state.userChatList = userChatList
          context.commit('getUserChatMsg', res.data)
        })
      }
    },
    // 获取用户列表
    getUserList(context, user) {
      let userList = context.state.userList
      if (userList.length > 0) {
        if (user) {
          user.name = user.users.name
          user.id = user.users.id
          user.avatar = user.users.avatar
          user.pointData = ['好友添加成功']
          userList.unshift(user)
        }
        context.commit('getUserList', userList)
      } else {
        getUserList().then((res) => {
          let userList = res.data.list.map((user) => {
            user.pointData = []
            return user
          })
          context.commit('getUserList', userList)
        })
      }
    },
    // 添加聊天消息
    addUserChatMsg({ commit, state, rootState }, message) {
      // 查找存储在本地的聊天记录
      let chatList = state.userChatList
      let index = chatList.findIndex((item) => {
        // 判断是不是发送者
        if (rootState.userInfo.id === message.from_id) {
          return item.user.id === message.to_id
        } else {
          return item.user.id === message.from_id
        }
      })
      console.log(chatList, index, message)
      let chatMsg = {}
      if (index >= 0 && chatList[index].list.length > 0) {
        chatMsg.id =
          chatList[index].list[chatList[index].list.length - 1].id + 1
      } else {
        chatMsg.id = 1
      }
      chatMsg.msg = message.msg
      chatMsg.user_id = message.from_id
      chatMsg.msg_type = message.msg_type
      chatMsg.channel_type = message.channel_type
      chatList[index].list.push(chatMsg)
      // 所有聊天信息
      commit('getUserChatList', chatList)
      // 修改展示的聊天
      commit('getUserChatMsg', chatList[index])
      // 修改聊天列表
      let list_user = state.userList.map((item) => {
        // 判断是不是接收者
        if (
          rootState.userInfo.id === message.to_id &&
          item.id === message.from_id
        ) {
          if (item.pointData[0] instanceof Object) {
            item.pointData = []
          }
          if (message.msg_type === 1) {
            item.pointData.push(message.msg)
          }
          if (message.msg_type === 2) {
            item.pointData.push('[图片]')
          }
        }
        // 发送者
        if (
          rootState.userInfo.id !== message.to_id &&
          item.id === message.to_id
        ) {
          if (message.msg_type === 2) {
            item.pointData = [{ type: true, msg: '[图片]' }]
          }
          if (message.msg_type === 1) {
            item.pointData = [{ type: true, msg: message.msg }]
          }
        }
        return item
      })
      commit('getUserList', list_user)
    },
  },
  getters: {},
  namespaced: true,
}
