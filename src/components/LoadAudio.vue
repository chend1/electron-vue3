<template>
  <div class="audio">
    <div class="svg" @click="audioClick">
      <svg
        class="icon"
        width="100%"
        height="100%"
        viewBox="0 0 1024 1024"
        version="1.1"
      >
        <path
          fill="#666666"
          d="M512 685.226667c172.373333-1.877333 173.738667-173.056 173.909333-173.226667L685.909333 216.576C685.738667 216.405333 684.373333 45.226667 512 43.349333c-172.373333 1.877333-173.738667 173.056-173.909333 173.226667L338.090667 512C338.261333 512.170667 339.626667 683.52 512 685.226667zM389.290667 216.576c1.536-0.170667-1.536-122.026667 122.709333-122.026667 65.536 0 95.573333 33.962667 109.568 66.048l-112.469333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6L634.88 211.797333l0 51.2L389.290667 262.997333 389.290667 216.576zM389.290667 314.197333 634.88 314.197333 634.88 512c-1.536 0.170667 1.536 122.026667-122.88 122.026667-124.416-0.170667-121.173333-122.026667-122.709333-122.026667L389.290667 314.197333zM834.389333 512c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6-1.536 0.170667 1.536 269.482667-271.189333 269.824C239.274667 781.482667 242.346667 512.170667 240.810667 512l0-0.170667c0-14.165333-11.434667-25.6-25.6-25.6-14.165333 0-25.6 11.434667-25.6 25.6l0 0.170667c0.341333 0.170667 1.706667 301.738667 296.789333 320l0 97.450667-122.709333 0c-14.165333 0-25.6 11.434667-25.6 25.6 0 14.165333 11.434667 25.6 25.6 25.6l296.789333 0c14.165333 0 25.6-11.434667 25.6-25.6 0-14.165333-11.434667-25.6-25.6-25.6L537.6 929.450667l0-97.450667C832.682667 813.738667 834.048 512.170667 834.389333 512z"
        />
      </svg>
    </div>
    <div class="audio-box" v-show="isAudio">
      <div class="close"></div>
      <p>{{audioPoint}}</p>
      <div class="tool">
        <el-button type="primary" size="mini">开始录音</el-button>
        <el-button type="info" size="mini">暂停录音</el-button>
        <el-button type="warning" size="mini">继续录音</el-button>
        <el-button type="success" size="mini">结束录音</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
import { reactive, toRefs } from 'vue-demi'
export default {
  emits: ['getFileNmae'],
  setup() {
    const data = reactive({
      recorder: new Recorder(),
      isAudio: false,
      audioPoint: '点击下方按钮开始录音'
    })
    function audioClick() {
      data.isAudio = !data.isAudio
    }
    // 录音事件
    function startAudio(){
      data.recorder.start().then(
        () => {
          // 开始录音
        },
        (error) => {
          // 出错了
          console.log(`${error.name} : ${error.message}`)
        }
      )
    }

    return {
      audioClick,
      startAudio,
      ...toRefs(data)
    }
  },
}
</script>

<style scoped lang="less">
.audio-box{
  width: 500px;
  height: 300px;
  margin-left: 160px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  P{
    width: 100%;
    line-height: 40px;
    font-size: 22px;
    text-align: center;
    margin: 20px 0;
    color: cornflowerblue;
  }
}
.close{
  width : 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  &::before{
    content: '';
    width: 2px;
    height: 25px;
    transform: rotate(-45deg);
    background-color: #000;
  }
  &::after{
    content: '';
    width: 2px;
    height: 25px;
    transform: rotate(-45deg);
    background-color: #000;
  }
}
.tool{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  left: 0;
  bottom: 15px;
}
</style>
