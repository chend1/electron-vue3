<template>
  <div class="msg-list" v-if="chatMsg.list.length > 0">
    <ul :class="isGroup ? 'group' : ''">
      <li
        v-for="item in chatMsg.list"
        :key="item.id"
        :class="{ own: userInfo ? item.user_id === userInfo.id : false }"
      >
        <div class="photo">
          <div v-if="!isGroup">
            <img
              :src="userInfo.photo"
              alt=""
              v-if="item.user_id === userInfo.id"
            />
            <img :src="chatMsg.user.avatar" alt="" v-else />
          </div>
          <div v-else>
            <img :src="item.users.avatar" alt="" />
          </div>
        </div>
        <div class="user">
          <div class="name" v-if="isGroup">{{ item.users.name }}</div>
          <div class="msg">
            <img
              v-if="item.msg_type === 2"
              :src="imgIsInvalid(item.msg) ? item.msg : defaultImg"
              @load="imgLoad"
            />
            <p v-if="item.msg_type === 1">{{ item.msg }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { onUpdated, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { judgeImgUrl } from '@/assets/js/utils.js'
export default {
  emits: ['changeChatMsg'],
  props: {
    toId: Number,
  },
  setup(props, context) {
    const store = useStore()
    let data = reactive({
      chatMsg: {},
      chatType: !store.state.isGroup,
      defaultImg: require('@/assets/image/invalid.jpg'),
    })
    // 聊天类型
    const isGroup = computed(() => store.state.isGroup)
    // 聊天消息
    const userChatMsg = computed(() => store.state.userChatMsg)
    const groupChatMsg = computed(() => store.state.groupChatMsg)
    data.chatMsg = data.chatType ? userChatMsg : groupChatMsg
    // 监听聊天类型
    watch(
      () => store.state.isGroup,
      (newVal) => {
        data.chatType = !newVal
        data.chatMsg = data.chatType ? userChatMsg : groupChatMsg
      }
    )
    // 信息改变完成后修改滚动距离
    onUpdated(() => {
      context.emit('changeChatMsg')
    })
    function imgLoad() {
      context.emit('changeChatMsg')
    }
    // 判断图片是否失效
    async function imgIsInvalid(url) {
      return await judgeImgUrl(url)
    }
    computed(() => {})
    return {
      ...toRefs(data),
      userInfo: computed(() => store.state.userInfo),
      isGroup,
      imgLoad,
      imgIsInvalid,
    }
  },
}
</script>

<style scoped lang="less">
.msg-list {
  width: 100%;
  ul {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 10px;
    li {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      .photo {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .user {
        width: 60%;
        text-align: left;
        .name {
          display: inline-block;
          line-height: 26px;
          color: #666;
          font-size: 14px;
          padding: 0 10px;
        }
        .msg {
          margin-left: 10px;
          line-height: 30px;
          img {
            max-width: 90%;
            width: auto;
            height: auto;
          }
          p {
            display: inline-block;
            padding: 0 10px;
            background-color: #e5e5e5;
            border-radius: 2px;
            position: relative;
            max-width: 100%;
            text-align: justify;
            text-justify: newspaper;
            word-break: break-all;
            box-sizing: border-box;
            &::before {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              background-color: #e5e5e5;
              position: absolute;
              top: 10px;
              left: -5px;
              z-index: 999;
              transform: rotate(-45deg);
            }
          }
        }
      }
    }
    li.own {
      flex-direction: row-reverse;
      .user {
        text-align: right;
        .msg {
          margin-right: 10px;
          p {
            background-color: #b2e281;
            border-radius: 2px;
            position: relative;
            &::before {
              content: '';
              display: none;
            }
            &::after {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              background-color: #b2e281;
              position: absolute;
              top: 10px;
              right: -5px;
              z-index: 999;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }
  .group {
    li {
      .photo {
        width: 40px;
        height: 60px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
