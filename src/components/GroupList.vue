<template>
  <div class="group-list">
    <ul>
      <li
        v-for="item in groupList"
        :key="item.id"
        @click="groupClick(item)"
        :class="{
          active: isActive === item.id,
        }"
      >
        <div class="photo">
          <div class="img">
            <img :src="item.group_avatar" alt="" />
            <div
              class="point"
              v-if="
                item.pointData.length > 0 &&
                  !(item.pointData[0] instanceof Object)
              "
            >
              {{ item.pointData.length }}
            </div>
          </div>
        </div>
        <div class="user">
          <div class="top">
            <div class="name">{{ item.group_name }}</div>
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
import { reactive, toRefs, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from 'vue-demi'
export default {
  emits: ['groupClick'],
  props: {},
  setup(prop, context) {
    const store = useStore()
    let data = reactive({
      isActive: store.state.toGroupId,
      groupList: computed(() => store.state.group.groupList),
    })
    // 群聊点击
    function groupClick(group) {
      console.log(group)
      data.isActive = group.id
      context.emit('groupClick', group)
      store.commit('getGroupId', group.id)
    }
    onMounted(() => {
      if (data.isActive > 0) {
        let group = data.groupList.filter(item => {
          return item.id === data.isActive
        })
        context.emit('groupClick', group[0])
      }
    })
    return {
      ...toRefs(data),
      groupClick,
    }
  },
}
</script>

<style scoped lang="less">
.group-list {
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
          width: 100%;
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
        padding-left: 10px;
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
        }
      }
    }
  }
}
</style>
