<template>
  <div class="chat-wrap">
    <div class="tool-type">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2e2e2e"
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
        <group-list></group-list>
        <user-list></user-list>
      </div>
    </div>
    <div class="chat-msg">
      <div class="title">
        <p>张三</p>
      </div>
      <div class="message">
        <chat-message></chat-message>
      </div>
      <div class="enter">
        <div class="enterType">
          <ul>
            <li>图片</li>
            <li>语音</li>
          </ul>
        </div>
        <textarea name="" id="" class="textarea" v-model="enterMsg"></textarea>
        <div class="send">
          <div class="btn">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupList from '@/components/GroupList.vue'
import UserList from '@/components/UserList.vue'
import Search from '@/components/Search.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { reactive, toRefs } from '@vue/reactivity'
export default {
  name: 'Chat',
  components: {
    GroupList,
    UserList,
    Search,
    ChatMessage,
  },
  setup() {
    let data = reactive({
      // 输入的信息
      enterMsg: '',
    })

    return {
      ...toRefs(data),
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
      width: 61px;
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
      overflow: hidden;
      text-align: left;
      border-bottom: 1px solid #ddd;
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
          padding: 10px 20px 0;
          li {
            cursor: pointer;
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
        padding: 5px 20px 0;
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
