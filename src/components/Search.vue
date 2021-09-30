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
    <div class="add">+</div>
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
.search{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .search-input{
    height: 30px;
    line-height: 30px;
    /deep/ input{
      line-height: 30px;
      height: 30px;
      width: 190px
    }
    /deep/ span{
      line-height: 30px;
      i{
        line-height: 30px;
      }
    }
  }
  .add{
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
  }
}
</style>

