<template>
  <div class="user-msg">
    <div class="user" v-if="!isGroup">
      <ul>
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
    <div class="group" v-else>
      <ul>
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
