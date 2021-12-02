<template>
  <div class="search">
    <div class="input">
      <el-input
        v-model="searchData"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        class="search-input"
      />
    </div>
    <div class="add" @click="addChatClik">
      +
      <div class="tool_chat" v-show="isChat">
        <ul>
          <li @click="addFriend">添加好友</li>
          <li @click="addGroup">创建群聊</li>
        </ul>
      </div>
    </div>
    <!-- 添加好友 -->
    <el-dialog v-model="isAddFriend" top="30%" title="添加好友">
      <div class="search-top">
        <div class="friend_input">
          <el-input
            v-model="friendNmae"
            size="small"
            placeholder="请输入用户名！"
          />
        </div>
        <el-button type="primary" size="mini" @click="lookupClick"
          >立即查找</el-button
        >
      </div>
      <div class="search-data">
        <ul>
          <li v-for="item in searchUsers" :key="item.id">
            <div class="photo">
              <img :src="item.avatar" alt="" />
              <div class="name">{{ item.name }}</div>
            </div>
            <el-button
              type="primary"
              size="mini"
              class="target"
              @click="addClick(item)"
              >立即添加</el-button
            >
          </li>
        </ul>
      </div>
    </el-dialog>
    <!-- 创建群聊 -->
    <el-dialog v-model="isAddGroup" width="600px" top="15%" title="创建群聊">
      <div class="box">
        <div class="left" style="text-align: left">
          <!-- <el-input
            v-model="searchName"
            size="small"
            placeholder="请输入用户名"
          /> -->
          <el-checkbox v-model="checkAll" @change="checkAllClick"
            >全选</el-checkbox
          >
          <div class="userList">
            <el-checkbox-group
              v-model="checkedLists"
              @change="handleCheckedChange"
            >
              <el-checkbox
                v-for="user in userList"
                :key="user.id"
                :label="user.id"
                >{{ user.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div class="right">
          <p>
            <span>群名称：</span
            ><el-input
              v-model="groupName"
              size="mini"
              placeholder="请输入群名称"
              class="groupNmae"
            />
          </p>
          <ul>
            <li v-for="item in users" :key="item.id">
              <div class="photo">
                <img :src="item.avatar" alt="" />
              </div>
              <div class="name">{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <el-button plain size="mini" @click="isAddGroup = false"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="createGroupClick"
          >创建</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { createGroup } from '@/api/createChat.js'
import { ElMessage } from 'element-plus'
import { selectUserList, sendFriendRequest } from '@/api/createChat.js'
export default {
  emits: [],
  setup(props, { emit }) {
    const store = useStore()
    let data = reactive({
      searchData: '',
      isChat: false,
      isAddFriend: false,
      friendNmae: '',
      isAddGroup: false,
      userList: store.state.user.userList,
      // 选中的好友列表
      checkedLists: [],
      // 全选
      checkAll: false,
      groupName: '',
      // 查找的好友
      searchUsers: [],
    })

    // 添加聊天点击事件
    function addChatClik() {
      data.isChat = !data.isChat
    }
    // 添加好友
    function addFriend() {
      data.isAddFriend = true
      lookupClick()
    }
    // 添加群聊
    function addGroup() {
      data.isAddGroup = true
    }
    // checkAllClick
    function checkAllClick(val) {
      console.log(val, data.userList)
      let selectArr = data.userList.map((item) => {
        return item.id
      })
      data.checkedLists = val ? selectArr : []
    }
    // checkAllClick
    function handleCheckedChange(value) {
      console.log(value)
      const checkedCount = value.length
      data.checkAll = checkedCount === data.userList.length
    }
    // 查找好友
    function lookupClick() {
      console.log(data.friendNmae)
      selectUserList().then((res) => {
        data.searchUsers = res.data.list
      })
    }
    const users = computed(() => {
      let userList = data.userList.filter((item) => {
        return data.checkedLists.indexOf(item.id) >= 0
      })
      return userList
    })
    // 创建群聊
    function createGroupClick() {
      if (data.groupName === '') {
        ElMessage({
          showClose: true,
          message: '请填写群聊名！',
          type: 'warning',
        })
        return
      }
      if (data.checkedLists.length <= 0) {
        ElMessage({
          showClose: true,
          message: '请先选择群聊用户！',
          type: 'warning',
        })
        return
      }
      createGroup({
        group_name: data.groupName,
        user_id: data.checkedLists,
      })
        .then((res) => {
          console.log(res)
          data.isAddGroup = false
          if (res.code === 200) {
            ElMessage({
              showClose: true,
              message: res.message,
              type: 'success',
            })
            emit('createGroupSuccess')
          } else {
            ElMessage({
              showClose: true,
              message: res.message,
              type: 'success',
            })
          }
        })
        .cahch((err) => {
          console.log(err)
        })
    }
    // 添加好友
    function addClick(user) {
      console.log(user)
      sendFriendRequest({
        information: data.information ? data.information : '好友请求',
        f_id: user.id,
      }).then((res) => {
        console.log(res)
        ElMessage({
          showClose: true,
          message: '好友请求发送成功',
          type: 'success',
        })
      })
    }
    return {
      ...toRefs(data),
      addChatClik,
      addFriend,
      addGroup,
      checkAllClick,
      handleCheckedChange,
      users,
      createGroupClick,
      lookupClick,
      addClick,
    }
  },
}
</script>

<style scoped lang="less">
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .search-input {
    height: 30px;
    line-height: 30px;
    :deep(input) {
      line-height: 30px;
      height: 30px !important;
      width: 190px;
    }
    :deep(span) {
      line-height: 30px;
      i {
        line-height: 30px;
      }
    }
  }
  .add {
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #e2e2e2;
    background-color: #fff;
    line-height: 30px;
    text-align: center;
    font-weight: 300;
    margin-right: 8px;
    cursor: pointer;
    position: relative;
    user-select: none;
    .tool_chat {
      width: 100px;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: #35393e;
      position: absolute;
      top: 40px;
      right: -10px;
      font-size: 14px;
      color: #fff;
      user-select: none;
      ul {
        padding: 5px 0;
        li {
          line-height: 40px;
          &:hover {
            background-color: #5c5e61;
          }
        }
      }
    }
  }
  .search-top {
    display: flex;
    // justify-content: space-between;
    .friend_input {
      width: 60%;
      margin-right: 10px;
    }
  }
  .search-data {
    ul {
      overflow: hidden;
      padding: 15px 0px;
      li {
        width: 20%;
        float: left;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        box-sizing: border-box;
        padding: 0 5px;
        .photo {
          width: 80%;
          margin: 0 auto;
          height: 72px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          img {
            width: 100%;
            height: auto;
          }
          .name {
            width: 100%;
            line-height: 25px;
            font-size: 16px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: #000;
            opacity: 0.6;
            color: #fff;
          }
        }
        .target {
          width: 100%;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
}
.box {
  display: flex;
  margin-top: -20px;
  margin-bottom: 20px;
  .left {
    flex: 1;
    overflow: hidden;
    .userList {
      height: 360px;
      overflow-y: auto;
    }
  }
  .right {
    flex: 2.5;
    box-sizing: border-box;
    padding: 0 10px 0 20px;
    p {
      width: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      display: flex;
      span {
        line-height: 28px;
      }
      .groupNmae {
        width: 200px;
      }
    }
    ul {
      height: 360px;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 20px 0px;
      li {
        width: 20%;
        float: left;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        .photo {
          width: 40px;
          height: 40px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
          }
        }
        .name {
          width: 100%;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
