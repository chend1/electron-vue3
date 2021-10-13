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
          <div class="userMsg" :class="{ active: isShow ? true : false}">
            <user-msg :userMsg="isGroup ? group : user " :isGroup="isGroup"></user-msg>
          </div>
        </div>
      </div>
      <div class="message">
        <chat-message :toId="!isGroup ? toUserId : toGroupId"></chat-message>
      </div>
      <div class="enter">
        <div class="enterType">
          <ul>
            <li>
              <svg
                class="icon"
                width="100%"
                height="100%"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  fill="#666666"
                  d="M128 853.333333h768.064L896 170.666667H127.936L128 853.333333zM127.936 128h768.128C919.594667 128 938.666667 146.986667 938.666667 170.666667v682.666666c0 23.573333-19.029333 42.666667-42.602667 42.666667H127.936A42.56 42.56 0 0 1 85.333333 853.333333V170.666667c0-23.573333 19.029333-42.666667 42.602667-42.666667z m200.128 527.082667c22.890667-19.626667 68.48-36.416 98.794667-36.416h20.949333c40.533333 0 95.914667-20.437333 126.549333-46.698667l52.373334-44.885333c22.890667-19.626667 68.48-36.416 98.794666-36.416H810.666667a21.333333 21.333333 0 0 0 0-42.666667h-85.12c-40.533333 0-95.936 20.437333-126.570667 46.698667l-52.373333 44.885333C523.690667 559.210667 478.165333 576 447.786667 576h-20.949334c-40.490667 0-95.914667 20.437333-126.549333 46.698667L199.445333 709.12a21.333333 21.333333 0 1 0 27.776 32.384l100.842667-86.442667z"
                />
                <path
                  fill="#666666"
                  d="M352 373.333333m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z"
                />
              </svg>
            </li>
            <li>
              <svg
                class="icon"
                width="100%"
                height="100%"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  fill="#666666"
                  d="M512 685.226667c172.373333-1.877333 173.738667-173.056 173.909333-173.226667L685.909333 216.576C685.738667 216.405333 684.373333 45.226667 512 43.349333c-172.373333 1.877333-173.738667 173.056-173.909333 173.226667L338.090667 512C338.261333 512.170667 339.626667 683.52 512 685.226667zM389.290667 216.576c1.536-0.170667-1.536-122.026667 122.709333-122.026667 65.536 0 95.573333 33.962667 109.568 66.048l-112.469333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6L634.88 211.797333l0 51.2L389.290667 262.997333 389.290667 216.576zM389.290667 314.197333 634.88 314.197333 634.88 512c-1.536 0.170667 1.536 122.026667-122.88 122.026667-124.416-0.170667-121.173333-122.026667-122.709333-122.026667L389.290667 314.197333zM834.389333 512c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6-1.536 0.170667 1.536 269.482667-271.189333 269.824C239.274667 781.482667 242.346667 512.170667 240.810667 512l0-0.170667c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6l0 0.170667c0.341333 0.170667 1.706667 301.738667 296.789333 320l0 97.450667-122.709333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6l296.789333 0c14.165333 0 25.6-11.434667 25.6-25.6 0-14.165333-11.434667-25.6-25.6-25.6L537.6 929.450667l0-97.450667C832.682667 813.738667 834.048 512.170667 834.389333 512z"
                />
              </svg>
            </li>
            <li>
              <svg
                class="icon"
                width="100%"
                height="100%"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  fill="#666666"
                  d="M511.997953 527.956414M511.997953 527.956414M512 958.708971c-246.320035 0-446.708971-200.38996-446.708971-446.708971S265.679965 65.290005 512 65.290005 958.708971 265.679965 958.708971 512 758.319012 958.708971 512 958.708971zM512 97.198739c-228.729401 0-414.801261 186.080046-414.801261 414.801261S283.269575 926.801261 512 926.801261s414.801261-186.080046 414.801261-414.801261S740.729401 97.198739 512 97.198739zM655.583163 384.371204A23.386 46.772 0 1 1 655.583163 385.394511ZM679.516248 448.184579c-23.105231 0-39.884382-26.836205-39.884382-63.815421s16.779152-63.815421 39.884382-63.815421c23.105231 0 39.884382 26.836205 39.884382 63.815421S702.620455 448.184579 679.516248 448.184579zM679.516248 353.395726c-3.100618 3.64604-7.976672 14.427594-7.976672 30.973432s4.877077 27.327392 7.976672 30.973432c3.100618-3.64604 7.976672-14.426571 7.976672-30.973432S682.615842 357.041766 679.516248 353.395726zM320.550667 384.371204A23.386 46.772 0 1 1 320.550667 385.394511ZM344.483752 448.184579c-23.105231 0-39.884382-26.836205-39.884382-63.815421s16.779152-63.815421 39.884382-63.815421 39.884382 26.836205 39.884382 63.815421S367.588983 448.184579 344.483752 448.184579zM344.483752 353.395726c-3.100618 3.64604-7.976672 14.427594-7.976672 30.973432s4.876054 27.327392 7.976672 30.973432c3.100618-3.64604 7.976672-14.426571 7.976672-30.973432S347.58437 357.041766 344.483752 353.395726zM783.214005 567.841819c0 127.760802-121.42756 231.331669-271.216052 231.331669S240.781902 695.602621 240.781902 567.841819M512 815.123762c-158.339238 0-287.170418-110.929462-287.170418-247.286036 0-8.810666 7.135514-15.954367 15.954367-15.954367s15.954367 7.143701 15.954367 15.954367c0 118.758778 114.51308 215.377302 255.262708 215.377302s255.262708-96.619548 255.262708-215.377302c0-8.810666 7.135514-15.954367 15.954367-15.954367s15.954367 7.143701 15.954367 15.954367C799.170418 704.1943 670.339238 815.123762 512 815.123762zM240.782925 551.884382l542.433126 0 0 31.907711-542.433126 0 0-31.907711Z"
                />
              </svg>
            </li>
          </ul>
        </div>
        <textarea
          name=""
          id=""
          class="textarea"
          v-model="enterMsg"
          @keyup.enter="sendMsg"
        ></textarea>
        <div class="send">
          <div class="btn">发送</div>
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
import { computed, reactive, toRefs } from '@vue/reactivity'
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
      isShow: false
    })
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
      getInformationHistory({
        to_id: data.toUserId,
      }).then((res) => {
        console.log(res.data)
        store.commit('getUserChatMsg', res.data)
      })
    }
    // 获取群聊聊天信息
    function getGroupChatMsg() {
      console.log(data.toGroupId);
      getGroupMessageList({
        to_id: data.toGroupId,
        channel_type: 2
      }).then((res) => {
        console.log(res)
        store.commit('getGroupChatMsg', res.data)
      })
    }
    // 获取好友列表
    function getUserNewList() {
      getUserList().then((res) => {
        console.log(res)
        data.friendList = res.data.list
        data.user = res.data.list[0]
        data.userId = data.user.id
        data.toUserId = data.userId
        getUserChatMsg()
      })
    }
    // 获取群聊列表
    function getGroupNewList() {
      getGroupList().then((res) => {
        console.log(222, res.data)
        data.chatGroupList = res.data
        data.group = res.data[0]
        data.groupId = data.group.id
        data.toGroupId = data.group.id
        getGroupChatMsg()
      })
    }
    // 监听信息
    function scoketOnMsg(e) {
      let userInfo = JSON.parse(e.data)
      if (userInfo.channel_type === 1) {
        // 更新聊天信息
        getUserChatMsg()
      } else {
        // 更新群聊信息
        console.log('更新群聊消息');
        getGroupChatMsg()
      }
    }
    // scoket 连接错误
    function scoketOnError(){
      console.log('error');
    }
    //当WebSocket创建成功时，触发onopen事件
    function scoketStart() {
      console.log('onopen事件触发')
    }
    onMounted(() => {
      scoketInit()
      getUserNewList()
      getGroupNewList()
    })
    // 用户点击事件
    function userClick(user) {
      data.user = user
      data.toUserId = user.id
    }
    // 群聊点击事件
    function groupClick(group) {
      console.log(group)
      data.group = group
      data.toGroupId = group.id
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
    function sendMsg() {
      console.log('次数11');
      data.enterMsg = data.enterMsg.replace(/^\s*|\s*$/g, '')
      let userInfo = {
        from_id: store.state.userInfo.id,
        msg: data.enterMsg,
        to_id:  store.state.isGroup ? data.group.id : data.user.id,
        msg_type: 1,
        channel_type: store.state.isGroup ? 2 : 1,
        status: 0,
      }
      console.log(userInfo);
      data.Scoket.send(JSON.stringify(userInfo))
      // 发送消息后清空
      data.enterMsg = ''
    }
    // 用户信息点击事件
    function showUserMsg(){
      data.isShow = ! data.isShow
    }
    return {
      ...toRefs(data),
      listSelect,
      userClick,
      groupClick,
      isGroup: computed(() => store.state.isGroup),
      sendMsg,
      showUserMsg
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
      .desc{
        width: 30px;
        height: 30px;  
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        span{
          line-height: 30px;
        }
        .userMsg{
          position: absolute;
          top: 0;
          left: 100%;
          background-color: #fff;
          z-index: 999;
          width: 0;
          height: 800px;
          border-left: 1px solid #ddd;
          transition: all .5s;
          overflow: hidden;
          &.active{
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
