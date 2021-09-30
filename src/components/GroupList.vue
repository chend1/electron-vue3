<template>
  <div class="group-list">
    <ul>
      <li>
        <div class="phone">123</div>
        <div class="user">
          <div class="name">zhangsan</div>
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
      searchData: ''
    })

    return {
      ...toRefs(data)
    }
  },
}
</script>

<style scoped lang="less">

</style>

