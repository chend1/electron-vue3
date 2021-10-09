<template>
  <div class="group-list">
    <ul>
      <li class="active">
        <div class="photo">
          <div class="img">
            <img src="@/assets/image/photo.jpg" alt="" />
            <div class="point">1</div>
          </div>
        </div>
        <div class="user">
          <div class="top">
            <div class="name">zhangsan</div>
            <div class="time">19:56</div>
          </div>
          <div class="msg">nihaoa</div>
        </div>
      </li>
      <li>
        <div class="photo">
          <div class="img">
            <img src="@/assets/image/photo.jpg" alt="" />
            <div class="point">1</div>
          </div>
        </div>
        <div class="user">
          <div class="top">
            <div class="name">zhangsan</div>
            <div class="time">19:56</div>
          </div>
          <div class="msg">nihaoa</div>
        </div>
      </li>
      <li>
        <div class="photo">
          <div class="img">
            <img src="@/assets/image/photo.jpg" alt="" />
            <div class="point">1</div>
          </div>
        </div>
        <div class="user">
          <div class="top">
            <div class="name">zhangsan</div>
            <div class="time">19:56</div>
          </div>
          <div class="msg">nihaoa</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  emits: [],
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
.group-list {
  ul {
    padding: 15px 0;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      &.active{
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
