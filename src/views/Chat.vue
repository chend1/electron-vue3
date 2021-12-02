<template>
  <div class="chat-wrap">
    <div class="tool-type">
      <Head></Head>
      <el-menu
        :default-active="isGroup ? '2' : '1'"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2e2e2e"
        text-color="#8a8a8a"
        @select="listSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <template #title>我的好友</template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>我的群聊</template>
        </el-menu-item>
      </el-menu>
      <div class="tool">
        <NavFooter></NavFooter>
      </div>
    </div>
    <div class="chat-list">
      <div class="search-wrap">
        <Search @createGroupSuccess="createGroupSuccess"></Search>
      </div>
      <div class="list">
        <user-list v-show="!isGroup" @userClick="userClick"></user-list>
        <group-list v-show="isGroup" @groupClick="groupClick"></group-list>
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
          <div class="userMsg" :class="{ active: isShow }" @click.stop>
            <user-msg
              :userMsg="isGroup ? group : user"
              :isGroup="isGroup"
            ></user-msg>
          </div>
        </div>
      </div>
      <div class="message" ref="scrollMsg">
        <div class="msg-mask" v-if="isMask">
          <p>点击左侧开始聊天</p>
          <img src="@/assets/image/chat.gif" alt="">
        </div>
        <chat-message
          :toId="!isGroup ? toUserId : toGroupId"
          @changeChatMsg="changeChatMsg"
          ref="chatMessage"
        ></chat-message>
      </div>
      <div class="enter" @click="cancelPointClick">
        <div class="mask" v-if="isMask"></div>
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
        <div class="send">
          <div class="btn" @click="sendMsg">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import NavFooter from '@/components/NavFooter.vue'
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
export default {
  name: 'Chat',
  components: {
    Head,
    NavFooter,
    GroupList,
    UserList,
    Search,
    ChatMessage,
    UserMsg,
    Look,
    UploadImg,
    LoadAudio,
  },
  setup() {
    // store
    const store = useStore()
    let data = reactive({
      // 输入的信息
      enterMsg: '',
      // 选中的好友信息
      user: [],
      // 选中的群聊
      group: [],
      // 发送目标用户
      toUserId: -1,
      // 发送群聊
      toGroupId: -1,
      Scoket: null,
      // 是否展示用户信息
      isShow: false,
      // 图片
      imgUrl: '',
      // 是否显示遮罩
      isMask: false,
    })
    // 修改滚动距离
    let scrollMsg = ref(null)
    let chatMessage = ref(null)
    let sendMsgRef = ref(null)
    function onScrollMsg() {
      let height = chatMessage.value.$el.clientHeight
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
    // 获取好友列表
    function getUserList() {
      store.dispatch('user/getUserList')
    }
    // 获取群聊列表
    function getGroupNewList() {
      store.dispatch('group/getGroupList')
    }
    // 更新聊天列表 type true 用户  false 群聊
    // function changChatList(list, type) {
    //   console.log(222222222222, list)
    //   if (type) {
    //     // console.log(111);
    //   } else {
    //     let list_group = data.chatGroupList.map((item) => {
    //       // 判断是不是接收者,接收者添加提示信息
    //       if (
    //         item.id === list.to_id &&
    //         store.state.userInfo.id !== list.from_id
    //       ) {
    //         if (item.pointData[0] instanceof Object) {
    //           item.pointData = []
    //         }
    //         if (list.msg_type === 1) {
    //           item.pointData.push(list.msg)
    //         }
    //         if (list.msg_type) {
    //           item.pointData.push('[图片]')
    //         }
    //       }
    //       // 判断是不是发送者 发送者覆盖提示信息
    //       if (
    //         item.id === list.to_id &&
    //         store.state.userInfo.id === list.from_id
    //       ) {
    //         if (list.msg_type === 2) {
    //           item.pointData = [{ type: true, msg: '[图片]' }]
    //         }
    //         if (list.msg_type === 1) {
    //           item.pointData = [{ type: true, msg: list.msg }]
    //         }
    //       }
    //       return item
    //     })
    //     data.chatGroupList = list_group
    //   }
    // }
    // 取消聊天列表提示信息
    // function cancelPoint(id, type) {
    //   console.log(type, id)
    //   if (type) {
    //     // let userList = data.friendList.map((item) => {
    //     //   // item.pointData = []
    //     //   if (item.id === id && !(item.pointData[0] instanceof Object)) {
    //     //     item.pointData[0] = {
    //     //       msg: item.pointData[item.pointData.length - 1],
    //     //     }
    //     //   }
    //     //   return item
    //     // })
    //     // data.friendList = userList
    //   } else {
    //     let groupList = data.chatGroupList.map((item) => {
    //       if (item.id === id && !(item.pointData[0] instanceof Object)) {
    //         item.pointData[0] = {
    //           msg: item.pointData[item.pointData.length - 1],
    //         }
    //       }
    //       return item
    //     })
    //     data.groupList = groupList
    //   }
    // }
    // 监听信息
    function scoketOnMsg(e) {
      let userInfo = JSON.parse(e.data)
      userInfo.msg = decodeURIComponent(userInfo.msg)
      switch (userInfo.code) {
        case 0:
          // data.Scoket.send('HeartBeat')
          setTimeout(() => {
            data.Scoket.send('HeartBeat')
          }, 30000)
          break
        case 200:
          if (userInfo.channel_type === 1) {
            // 更新聊天信息
            // getUserChatMsg()
            console.log(2222, userInfo)
            store.dispatch('user/addUserChatMsg', userInfo)
            // changChatList(userInfo, true)
          } else {
            // 更新群聊信息
            console.log('更新群聊信息', userInfo)
            store.dispatch('group/addGroupChatMsg', userInfo)
            // getGroupChatMsg()
            // changChatList(userInfo, false)
          }
          break
        case 401:
          console.log('敏感词汇')
          break
        case 1000:
          console.log('用户上线了')
          break
        case 5000:
          console.log('用户离线了')
          break
      }
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
      getUserList()
      getGroupNewList()
      sendMsgRef.value.focus()
    })
    // 判断遮罩是否显示
    data.isMask = computed( () => {
      let res = (data.toUserId == -1 && !store.state.isGroup) || (data.toGroupId == -1 && store.state.isGroup);
      if(res){
        sendMsgRef.value && sendMsgRef.value.blur()
      }
      return res;
    })
    // 用户点击事件
    function userClick(user) {
      data.user = user
      // 点击自己不需要清空输入内容
      if (data.toUserId !== user.id) {
        data.enterMsg = ''
      }
      data.toUserId = user.id
      // 获取对应用户历史记录
      store.dispatch('user/getUserChatMsg', user.id)
      // getUserChatMsg()
      // cancelPoint(user.id, true)
      // 文本输入获取焦点
      sendMsgRef.value.focus()
    }
    // 群聊点击事件
    function groupClick(group) {
      // 点击自己不需要清空输入内容
      if (data.toGroupId !== group.id) {
        data.enterMsg = ''
      }
      data.group = group
      data.toGroupId = group.id
      // getGroupChatMsg()
      // cancelPoint(group.id, false)
      store.dispatch('group/getGroupChatMsg', group.id)
      // 文本输入获取焦点
      sendMsgRef.value.focus()
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
    function sendMsg(msg_type) {
      console.log(typeof msg_type === 'object')
      data.enterMsg = data.enterMsg.replace(/^\s*|\s*$/g, '')
      data.isLook = false
      if (data.enterMsg === '') {
        return
      }
      let userInfo = {
        from_id: store.state.userInfo.id,
        msg: encodeURIComponent(data.enterMsg),
        to_id: store.state.isGroup ? data.group.id : data.user.id,
        msg_type: typeof msg_type !== 'object' ? msg_type : 1,
        channel_type: store.state.isGroup ? 2 : 1,
        status: 0,
      }
      data.Scoket.send(JSON.stringify(userInfo))
      // 发送消息后清空
      data.enterMsg = ''
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
      data.enterMsg = file_url
      sendMsg(2)
    }
    // 创建群聊成功事件
    function createGroupSuccess() {
      getGroupNewList()
    }
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
      getFileNmae,
      createGroupSuccess,
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
    position: relative;
    .el-menu-vertical-demo {
      width: 60px;
      border-right: none;
    }
    .tool{
      width: 100%;
      position: absolute;
      bottom: 10px;
      left: 0;
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
          transition: all 0.3s;
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
    .mask {
      position: absolute;
      background-color: #000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      opacity: .1;
      z-index: 999;
    }
    .msg-mask {
      position: absolute;
      background-color: #fff;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      p{
        line-height: 40px;
        height: 40px;
        font-size: 22px;
        text-align: center;
      }
      img{
        width: 80%;
        height: auto;
      }
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
