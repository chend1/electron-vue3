<template>
  <div class="user-msg">
    <!-- 私聊用户 -->
    <div class="user" v-if="!isGroup">
      <ul>
        <li>
          <div class="photo add">
            +
          </div>
          <div class="name">
            添加
          </div>
        </li>
        <li>
          <div class="photo">
            <img :src="userMsg.avatar" alt="">
          </div>
          <div class="name">
            {{userMsg.name}}
          </div>
        </li>
      </ul>
    </div>
    <!-- 群聊用户 -->
    <div class="group" v-else>
      <ul>
        <li>
          <div class="photo add">
            +
          </div>
          <div class="name">
            添加
          </div>
        </li>
        <li v-for="item in userMsg.users" :key="item.id">
          <div class="photo">
            <img :src="item.avatar" alt="">
          </div>
          <div class="name">
            {{item.user_id}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userMsg: {
      type: Object,
      default(){
        return {}
      }
    },
    isGroup: Boolean
  },
  setup() {
    

  },
}
</script>

<style lang="less" scoped>
.user-msg{
  width: 100%;
  .user,.group{
    width: 100%;
    .add{
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      font-size: 36px;
      color: #999;
    }
    ul{
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px 10px;
      li{
        float: left;
        width: 25%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .photo{
          width: 40px;
          height: 40px;
          overflow: hidden;
        }
        .name{
          line-height: 30px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
