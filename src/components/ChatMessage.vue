<template>
  <div class="msg-list">
    <ul :class="isGroup ? 'group' : ''">
      <!-- <ul class="group"> -->
      <li>
        <div class="photo">
          <img src="@/assets/image/photo.jpg" alt="" />
        </div>
        <div class="user">
          <div class="name" v-if="isGroup">zhangsan</div>
          <div class="msg">
            <p>nihaoa</p>
          </div>
        </div>
      </li>
      <li>
        <div class="photo"><img src="@/assets/image/photo.jpg" alt="" /></div>
        <div class="user">
          <div class="name">zhangsan</div>
          <div class="msg">
            <p>nihaoa</p>
          </div>
        </div>
      </li>
      <li class="own">
        <div class="photo"><img src="@/assets/image/photo.jpg" alt="" /></div>
        <div class="user">
          <div class="name">zhangsan</div>
          <div class="msg">
            <p>nihaoa</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  emits: [],
  props: { isGroup: Boolean },
  setup() {
    let data = reactive({
      searchData: '',
    })

    return {
      ...toRefs(data),
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
      &.own {
        flex-direction: row-reverse;
        .user {
          text-align: right;
          .msg {
            margin-right: 10px;
          }
        }
      }
      .photo {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .user {
        width: 40%;
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
          p {
            display: inline-block;
            border: 1px solid #ddd;
            padding: 0 10px;
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
