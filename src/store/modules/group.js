import { getGroupList } from '@/api/list.js'
import { getGroupMessageList } from '@/api/message.js'
export const groupModule = {
  state() {
    return {
      // 群聊记录
      groupChatMsg: localStorage.getItem('groupChatMsg')
        ? JSON.parse(localStorage.getItem('groupChatMsg'))
        : {},
      // 群聊列表
      groupList: localStorage.getItem('groupList')
        ? JSON.parse(localStorage.getItem('groupList'))
        : [],
      // 所有群聊聊天记录
      groupChatList: localStorage.getItem('groupChatList')
        ? JSON.parse(localStorage.getItem('groupChatList'))
        : [],
    }
  },
  mutations: {
    // 获取当前群聊聊天信息
    getGroupChatMsg(state, groupChatMsg) {
      localStorage.setItem('groupChatMsg', JSON.stringify(groupChatMsg))
      state.groupChatMsg = groupChatMsg
    },
    // 群聊列表
    getGroupList(state, groupList) {
      state.groupList = groupList
      localStorage.setItem('groupList', JSON.stringify(groupList))
    },
    // 群聊所有聊天消息列表
    getGroupChatList(state, groupChatList) {
      state.groupChatList = groupChatList
      localStorage.setItem('groupChatList', JSON.stringify(groupChatList))
    },
  },
  actions: {
    // 获取群聊聊天信息
    getGroupChatMsg({ commit, state }, id) {
      console.log(id);
      let groupChatList = state.groupChatList
      let groupChatMsg = groupChatList.filter((item) => {
        console.log(item)
        return item.group.id === id
      })
      console.log(groupChatMsg);
      if (groupChatMsg.length > 0) {
        commit('getGroupChatMsg', groupChatMsg[0])
      } else {
        getGroupMessageList({
          to_id: id,
          channel_type: 2,
        }).then((res) => {
          console.log(state.groupList, id)
          let users = state.groupList.filter((item) => {
            return item.id === id
          })
          console.log(users)
          let mesList = {
            group: users[0],
            list: res.data,
          }
          groupChatList.push(mesList)
          commit('getGroupChatMsg', mesList)
          commit('getGroupChatList', groupChatList)
        })
      }
    },
    // 获取群聊列表
    getGroupList({ commit }) {
      // let groupList = state.groupList
      getGroupList().then((res) => {
        console.log(res)
        let groupList = res.data.map((user) => {
          user.pointData = []
          return user
        })
        commit('getGroupList', groupList)
      })
    },
    // 添加群聊聊天消息
    addGroupChatMsg({ commit, state,rootState }, message) {
      // 查找存储在本地的聊天记录 索引
      let chatList = state.groupChatList
      let index = chatList.findIndex((item) => {
        return item.group.id === message.to_id
      })
      // 获取当前聊天用户信息
      console.log(message.from_id);
      let userMsg = chatList[index].group.users.filter( item => {
        console.log(item);
        return message.from_id === item.user_id
      })
      console.log(chatList[index].group.users,userMsg);
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
      chatMsg.users = userMsg[0]
      chatList[index].list.push(chatMsg)

      console.log(chatList, message,chatList[index])
      // 所有聊天信息
      commit('getGroupChatList', chatList)
      // 修改展示的聊天
      commit('getGroupChatMsg', chatList[index])
      // 修改群聊聊天列表
      let list_group = state.groupList.map((item) => {
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
          if (message.msg_type) {
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
      commit('getGroupList', list_group)
    },
  },
  getters: {},
  namespaced: true,
}
