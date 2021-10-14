<template>
  <div class="look" @click.stop>
    <VuemojiPicker @emojiClick="handleEmojiClick"></VuemojiPicker>
  </div>
</template>

<script>
// 表情包插件
import { VuemojiPicker } from 'vuemoji-picker'
export default {
  emits: ["getLook"],
  name: 'Look',
  components: {
    VuemojiPicker,
  },
  setup(props,{emit}) {
    // // 表情包
    function handleEmojiClick(data){
      console.log(data);
      emit('getLook', data.unicode)
    }

    return {
      handleEmojiClick,
    }
  },
}
</script>

<style scoped lang="less">
  :deep(.search-row){
    display: none !important;
  }
</style>
