<template>
  <div class="user-list">
    <ul>
      <li
        v-for="item in userList"
        :key="item.id"
        @click="userClick(item)"
        :class="{
          active: isActive === item.id,
        }"
      >
        <div class="photo">
          <div class="img">
            <img :src="item.avatar" alt="" />
            <div
              class="point"
              v-if="
                item.pointData.length > 0 &&
                  !(item.pointData[0] instanceof Object) &&
                  isActive !== item.id
              "
            >
              {{ item.pointData.length }}
            </div>
          </div>
        </div>
        <div class="user">
          <div class="top">
            <div class="name">{{ item.name }}</div>
            <div class="time">{{ item.send_time }}</div>
          </div>
          <div class="msg">
            {{
              item.pointData[0] instanceof Object
                ? item.pointData[0].msg
                : item.pointData[item.pointData.length - 1]
            }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from 'vue-demi'
export default {
  emits: ['userClick'],
  props: {},
  setup(props, context) {
    const store = useStore()
    let data = reactive({
      isActive: store.state.toUserId,
      userList: computed(() => store.state.user.userList)
    })
    // 好友点击事件
    function userClick(user) {
      data.isActive = user.id
      context.emit('userClick', user)
      store.commit('getUserId', user.id)
      store.commit('user/clearPointMsg', user.id)
    }
    
    onMounted(() => {
      if (data.isActive > 0) {
        let user = data.userList.filter(item => {
          return item.id === data.isActive
        })
        context.emit('userClick', user[0])
      }
    })
    return {
      ...toRefs(data),
      userClick,
    }
  },
}
</script>

<style scoped lang="less">
.user-list {
  height: 740px;
  overflow-y: auto;
  ul {
    padding: 15px 0;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 9.5px 10px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &.active {
        background-color: #cbcbcb;
      }
      .photo {
        width: 40px;
        height: 40px;
        .img {
          width: 40px;
          position: relative;
          img {
            width: 100%;
          }
          .point {
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            color: #fff;
            background-color: red;
            position: absolute;
            top: -5px;
            right: -5px;
            border-radius: 50%;
          }
        }
      }
      .user {
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        .top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .time {
            color: #999;
            font-size: 12px;
          }
        }
        .msg {
          width: 100%;
          color: #999;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
