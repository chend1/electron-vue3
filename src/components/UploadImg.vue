<template>
  <div class="upload">
    <div class="svg" @click="uploadClick">
      <svg
        class="icon"
        width="100%"
        height="100%"
        viewBox="0 0 1024 1024"
        version="1.1"
      >
        <path
          fill="#666666"
          d="M128 853.333333h768.064L896 170.666667H127.936L128 853.333333zM127.936 128h768.128C919.594667 128 938.666667 146.986667 938.666667 170.666667v682.666666c0 23.573333-19.029333 42.666667-42.602667 42.666667H127.936A42.56 42.56 0 0 1 85.333333 853.333333V170.666667c0-23.573333 19.029333-42.666667 42.602667-42.666667z m200.128 527.082667c22.890667-19.626667 68.48-36.416 98.794667-36.416h20.949333c40.533333 0 95.914667-20.437333 126.549333-46.698667l52.373334-44.885333c22.890667-19.626667 68.48-36.416 98.794666-36.416H810.666667a21.333333 21.333333 0 0 0 0-42.666667h-85.12c-40.533333 0-95.936 20.437333-126.570667 46.698667l-52.373333 44.885333C523.690667 559.210667 478.165333 576 447.786667 576h-20.949334c-40.490667 0-95.914667 20.437333-126.549333 46.698667L199.445333 709.12a21.333333 21.333333 0 1 0 27.776 32.384l100.842667-86.442667z"
        />
        <path
          fill="#666666"
          d="M352 373.333333m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z"
        />
      </svg>
    </div>
    <div class="input">
      <label for="file">文件</label>
      <input type="file" id="file" name="file" @change="fileChange" />
    </div>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload.js'
export default {
  emits: ['getFileNmae'],
  setup(props, { emit }) {
    function uploadClick() {
      console.log(222)
    }
    function fileChange(e) {
      let formData = new FormData()
      formData.append('Smfile', e.target.files[0])
      uploadImage(formData).then((res) => {
        console.log(res);
        emit('getFileNmae',res.url)
      })
    }

    return {
      uploadClick,
      fileChange,
    }
  },
}
</script>

<style scoped lang="less">
.upload {
  position: relative;
  .svg {
    width: 100%;
    height: 100%;
  }
  .input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
