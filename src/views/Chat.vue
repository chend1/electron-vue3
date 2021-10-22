<template>
  <div class="chat-wrap">
    <div class="tool-type">
      <Head></Head>
      <el-menu
        :default-active="isGroup ? '2' : '1'"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2e2e2e"
        @select="listSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <template #title>我的好友</template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <template #title>我的群聊</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="chat-list">
      <div class="search-wrap">
        <Search></Search>
      </div>
      <div class="list">
        <user-list
          v-show="!isGroup"
          :friendList="friendList"
          :userId="userId"
          @userClick="userClick"
        ></user-list>
        <group-list
          v-show="isGroup"
          :chatGroupList="chatGroupList"
          :groupId="groupId"
          @groupClick="groupClick"
        ></group-list>
      </div>
    </div>
    <div class="chat-msg">
      <div class="title">
        <div class="name">
          <p v-show="!isGroup">{{ user.name }}</p>
          <p v-show="isGroup">{{ group.group_name }}</p>
        </div>
        <div class="desc" @click="showUserMsg">
          <span>···</span>
          <div class="userMsg" :class="{ active: isShow ? true : false }">
            <user-msg
              :userMsg="isGroup ? group : user"
              :isGroup="isGroup"
            ></user-msg>
          </div>
        </div>
      </div>
      <div class="message" ref="scrollMsg">
        <chat-message
          :toId="!isGroup ? toUserId : toGroupId"
          @changeChatMsg="changeChatMsg"
          ref="chatMessage"
        ></chat-message>
      </div>
      <div class="enter" @click="cancelPointClick">
        <div class="enterType">
          <ul>
            <li>
              <UploadImg @getFileNmae="getFileNmae"></UploadImg>
            </li>
            <li>
              <LoadAudio></LoadAudio>
            </li>
            <li>
              <Look @getLook="getLook"></Look>
            </li>
          </ul>
        </div>
        <textarea
          name=""
          id=""
          class="textarea"
          v-model="enterMsg"
          @keyup.enter="sendMsg"
          ref="sendMsgRef"
        ></textarea>
        <!-- <div
          contenteditable="true"
          class="textarea"
          v-html="enterMsg"
          @keyup.enter="sendMsg"
          @input="handleInput"
          ref="sendMsgRef"
        > 
        </div>-->
        <div class="send">
          <div class="btn" @click="sendMsg">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import GroupList from '@/components/GroupList.vue'
import UserList from '@/components/UserList.vue'
import Search from '@/components/Search.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import UserMsg from '@/components/UserMsg.vue'
import UploadImg from '@/components/UploadImg.vue'
import LoadAudio from '@/components/LoadAudio.vue'
import Look from '@/components/Look.vue'
import { computed, reactive, ref, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { getUserList, getGroupList } from '@/api/list.js'
import { getInformationHistory, getGroupMessageList } from '@/api/message.js'

// import {
//   scoketOnMsg,
//   scoketStart,
//   scoketOnError,
// } from '@/assets/js/webScoket.js'
export default {
  name: 'Chat',
  components: {
    Head,
    GroupList,
    UserList,
    Search,
    ChatMessage,
    UserMsg,
    Look,
    UploadImg,
    LoadAudio
  },
  setup() {
    // store
    const store = useStore()
    let data = reactive({
      // 输入的信息
      enterMsg: '',
      // 是否选择好友列表 true: 好友  false: 群聊
      // isUser: !store.state.isGroup,
      // 好友列表
      friendList: [],
      // 群聊列表
      chatGroupList: [],
      // 选中的好友信息
      user: [],
      // 选中的群聊
      group: [],
      // 默认选中的用户
      userId: 0,
      // 默认选中的群聊
      groupId: 0,
      // 发送目标用户
      toUserId: -1,
      // 发送群聊
      toGroupId: -1,
      Scoket: null,
      // 是否展示用户信息
      isShow: false,
      // 图片
      imgUrl: '',
    })
    // 修改滚动距离
    let scrollMsg = ref(null)
    let chatMessage = ref(null)
    let sendMsgRef = ref(null)
    function onScrollMsg() {
      let height = chatMessage.value.$el.clientHeight
      console.log('onScrollMsg', height)
      scrollMsg.value.scrollTop = height
    }
    // 列表点击事件
    function listSelect(id) {
      if (Number(id) === 1) {
        store.commit('getChatType', false)
        console.log('好友')
      } else {
        console.log('群聊')
        store.commit('getChatType', true)
      }
    }
    // 获取用户聊天信息
    function getUserChatMsg() {
      console.log('getUserChatMsg')
      getInformationHistory({
        to_id: data.toUserId,
      }).then((res) => {
        console.log(res.data)
        store.commit('getUserChatMsg', res.data)
      })
    }
    // 获取群聊聊天信息
    function getGroupChatMsg() {
      console.log(data.toGroupId)
      getGroupMessageList({
        to_id: data.toGroupId,
        channel_type: 2,
      }).then((res) => {
        console.log(res)
        let mesList = {
          users: false,
          list: res.data,
        }
        store.commit('getGroupChatMsg', mesList)
      })
    }
    // 获取好友列表
    function getUserNewList() {
      getUserList().then((res) => {
        let userList = res.data.list.map((item) => {
          item.pointData = []
          return item
        })
        data.friendList = userList
        data.user = res.data.list[0]
        data.userId = data.user.id
        data.toUserId = data.userId
        // 初始化聊天信息
        getUserChatMsg()
      })
    }
    // 获取群聊列表
    function getGroupNewList() {
      getGroupList().then((res) => {
        console.log(222, res.data)
        let groupList = res.data.map((item) => {
          item.pointData = []
          return item
        })
        data.chatGroupList = groupList
        data.group = res.data[0]
        data.groupId = data.group.id
        data.toGroupId = data.group.id
        // 初始化聊天信息
        getGroupChatMsg()
      })
    }
    // 更新聊天列表 type true 用户  false 群聊
    function changChatList(list, type) {
      if (type) {
        let list_user = data.friendList.map((item) => {
          // 判断是不是接收者
          if (
            store.state.userInfo.id === list.to_id &&
            item.id === list.from_id
          ) {
            if (item.pointData[0] instanceof Object) {
              item.pointData = []
            }
            item.pointData.push(list.msg)
          }
          // 发送者
          if (
            store.state.userInfo.id !== list.to_id &&
            item.id === list.to_id
          ) {
            // item.pointData = ''
            item.pointData = [{ type: true, msg: list.msg }]
          }
          return item
        })
        data.friendList = list_user
        console.log(data.friendList)
      } else {
        let list_group = data.chatGroupList.map((item) => {
          // 判断是不是接收者
          if (
            item.id === list.to_id &&
            store.state.userInfo.id !== list.from_id
          ) {
            if (item.pointData[0] instanceof Object) {
              item.pointData = []
            }
            item.pointData.push(list.msg)
          }
          // 判断是不是发送者
          if (
            item.id === list.to_id &&
            store.state.userInfo.id === list.from_id
          ) {
            item.pointData = [{ type: true, msg: list.msg }]
          }
          return item
        })
        data.chatGroupList = list_group
      }
    }
    // 取消聊天列表提示信息
    function cancelPoint(id, type) {
      console.log(type, id)
      if (type) {
        let userList = data.friendList.map((item) => {
          // item.pointData = []
          if (item.id === id && !(item.pointData[0] instanceof Object)) {
            item.pointData[0] = {
              msg: item.pointData[item.pointData.length - 1],
            }
          }
          return item
        })
        data.friendList = userList
      } else {
        let groupList = data.chatGroupList.map((item) => {
          if (item.id === id && !(item.pointData[0] instanceof Object)) {
            item.pointData[0] = {
              msg: item.pointData[item.pointData.length - 1],
            }
          }
          return item
        })
        data.groupList = groupList
      }
    }

    // 聊天框点击事件
    function cancelPointClick() {}
    // 监听信息
    function scoketOnMsg(e) {
      let userInfo = JSON.parse(e.data)
      console.log('2222', userInfo)
      userInfo.msg = decodeURIComponent(userInfo.msg)
      console.log('2222', userInfo)
      if (userInfo.channel_type === 1) {
        // 更新聊天信息
        getUserChatMsg()
        changChatList(userInfo, true)
      } else {
        // 更新群聊信息
        console.log('更新群聊消息')
        getGroupChatMsg()
        changChatList(userInfo, false)
      }
      // 发送消息后清空
      data.enterMsg = ''
    }
    // 监听聊天信息是否改变
    function changeChatMsg() {
      // 更新滚动距离
      onScrollMsg()
    }
    // scoket 连接错误
    function scoketOnError() {
      console.log('error')
    }
    //当WebSocket创建成功时，触发onopen事件
    function scoketStart() {
      data.Scoket.send('HeartBeat')
      console.log('onopen事件触发')
    }
    onMounted(() => {
      scoketInit()
      getUserNewList()
      getGroupNewList()
      sendMsgRef.value.focus()
    })
    // 用户点击事件
    function userClick(user) {
      data.user = user
      data.toUserId = user.id
      getUserChatMsg()
      cancelPoint(user.id, true)
      // 文本输入获取焦点
      sendMsgRef.value.focus()
      data.enterMsg = ''
    }
    // 群聊点击事件
    function groupClick(group) {
      data.group = group
      data.toGroupId = group.id
      getGroupChatMsg()
      cancelPoint(group.id, false)
      // 文本输入获取焦点
      sendMsgRef.value.focus()
      data.enterMsg = ''
    }
    // webscoket  初始化连接
    function scoketInit() {
      if (typeof WebSocket === 'undefined') {
        console.log('您的浏览器不支持socket')
        return
      } else {
        data.Scoket = new WebSocket(
          process.env.VUE_APP_BASE_URL.replace('https', 'wss') +
            'im/connect?token=' +
            store.state.token
        )
        // 监听socket连接
        data.Scoket.onopen = scoketStart
        // 监听socket错误信息
        data.Scoket.onerror = scoketOnError
        // 监听socket消息
        data.Scoket.onmessage = scoketOnMsg
      }
    }
    // 发送信息
    function sendMsg(e,type) {
      data.enterMsg = data.enterMsg.replace(/^\s*|\s*$/g, '')
      data.isLook = false
      let msg = ''
      if (data.enterMsg === '' && data.imgUrl === '') {
        return
      }
      console.log(22222222,type);
      if(type === 'img'){
        console.log('data.imgUrl',data.imgUrl);
        msg = data.imgUrl
      }
      if(type === undefined){
        msg = data.enterMsg
      }

      let userInfo = {
        from_id: store.state.userInfo.id,
        msg: encodeURIComponent(msg),
        to_id: store.state.isGroup ? data.group.id : data.user.id,
        msg_type: 1,
        channel_type: store.state.isGroup ? 2 : 1,
        status: 0,
      }
      data.Scoket.send(JSON.stringify(userInfo))
    }
    // 用户信息点击事件
    function showUserMsg() {
      data.isShow = !data.isShow
    }
    // 获取表情
    function getLook(look) {
      sendMsgRef.value.focus()
      data.isLook = false
      data.enterMsg += look
    }
    // 获取图片地址
    function getFileNmae(file_url) {
      data.imgUrl = file_url;
      sendMsg('img')
    }
    // 文本改变事件
    // function handleInput($event) {
    //   data.enterMsg = $event.target.innerText
    // }
    return {
      ...toRefs(data),
      listSelect,
      userClick,
      groupClick,
      isGroup: computed(() => store.state.isGroup),
      sendMsg,
      showUserMsg,
      scrollMsg,
      chatMessage,
      changeChatMsg,
      getLook,
      sendMsgRef,
      cancelPointClick,
      getFileNmae,
      // handleInput,
    }
  },
}
</script>

<style scoped lang="less">
.chat-wrap {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .tool-type {
    width: 60px;
    background-color: #2e2e2e;
    color: #aaa;
    box-sizing: border-box;
    .el-menu-vertical-demo {
      width: 60px;
      border-right: none;
    }
  }
  .chat-list {
    width: 250px;
    background-color: #ebe9e8;
    border-right: 1px solid #ddd;
    .search-wrap {
      width: 100%;
      background-color: #f7f7f7;
      padding: 20px 0 10px;
    }
  }
  .chat-msg {
    flex: 1;
    background-color: #fff;
    position: relative;
    .title {
      width: 100%;
      height: 61px;
      line-height: 60px;
      font-size: 22px;
      box-sizing: border-box;
      padding: 0 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .desc {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        span {
          line-height: 30px;
        }
        .userMsg {
          position: absolute;
          top: 0;
          left: 100%;
          background-color: #fff;
          z-index: 999;
          width: 0;
          height: 800px;
          border-left: 1px solid #ddd;
          transition: all 0.5s;
          overflow: hidden;
          &.active {
            width: 300px;
          }
        }
      }
    }
    .message {
      position: absolute;
      width: 100%;
      overflow-y: auto;
      top: 61px;
      bottom: 151px;
    }
    .enter {
      width: 100%;
      min-height: 150px;
      border-top: 1px solid #ddd;
      position: absolute;
      left: 0;
      bottom: 0;
      .enterType {
        height: 30px;
        ul {
          display: flex;
          box-sizing: border-box;
          justify-content: flex-end;
          padding: 10px 20px 0;
          li {
            cursor: pointer;
            width: 20px;
            height: 20px;
            margin: 0 5px;
            position: relative;
          }
        }
      }
      .textarea {
        width: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 10px 20px 0 20px;
        font-size: 16px;
        line-height: 22px;
        color: #333;
        position: absolute;
        top: 30px;
        left: 0;
        bottom: 40px;
        overflow-x: hidden;
        resize: none;
        text-align: left;
      }
      .send {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        box-sizing: border-box;
        padding: 5px 20px;
        align-items: center;
        justify-content: flex-end;
        height: 40px;
        box-sizing: border-box;
        .btn {
          width: 50px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border: 1px solid #ddd;
          background-color: #f5f5f5;
          color: #666;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
.el-icon-user,
.el-icon-setting {
  color: #aaa;
}
::-webkit-scrollbar {
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  right: 10px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #afafaf;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: #ededed;
}
</style>
