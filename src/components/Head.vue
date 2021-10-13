<template>
  <div class="head" @click="headClick">
    <img :src="userInfo.photo" alt="" />
    <div @click.stop class="dialog" v-show="isDialog">
      <div class="bg">
        <img src="@/assets/image/cool.jpg" alt="" />
      </div>
      <div class="message">
        <div class="photo">
          <img :src="userInfo.photo" alt="" />
        </div>
        <div class="user">
          <div class="icon">
            <svg
              class="icon"
              width="100%"
              height="100%"
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path
                fill="#cdcdcd"
                d="M512 554.666667a234.666667 234.666667 0 1 1 0-469.333334 234.666667 234.666667 0 0 1 0 469.333334z m0-42.666667a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"
              />
              <path
                fill="#cdcdcd"
                d="M512 554.666667h-85.333333c-117.802667 0-213.333333 138.197333-213.333334 256v42.666666h298.666667v42.666667H170.666667v-85.333333c0-141.397333 114.602667-298.666667 256-298.666667h85.333333v42.666667z"
              />
              <path
                fill="#cdcdcd"
                d="M597.333333 640h256v42.666667h-256zM597.333333 682.666667h42.666667v42.666666h-42.666667zM810.666667 682.666667h42.666666v42.666666h-42.666666zM597.333333 725.333333h256v42.666667h-256zM512 853.333333h384v42.666667h-384z"
              />
            </svg>
          </div>
          <div class="name">{{userInfo.name}}</div>
        </div>
      </div>
      <div class="label">
        <div class="icon">
          <svg
            class="icon"
            width="100%"
            height="100%"
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path
              fill="#cdcdcd"
              d="M908.785955 492.415966c-11.04966 0-20.008706 8.958022-20.008706 20.008706l0 338.328565c0 38.614459-31.416524 70.030983-70.030983 70.030983L202.707748 920.78422c-38.614459 0-70.030983-31.416524-70.030983-70.030983l0-676.303067c0-38.614459 31.416524-70.030983 70.030983-70.030983l362.378308 0c11.04966 0 20.008706-8.958022 20.008706-20.008706 0-11.050684-8.959046-20.008706-20.008706-20.008706L202.707748 64.401776c-60.681034 0-110.049418 49.367361-110.049418 110.049418l0 676.303067c0 60.681034 49.367361 110.049418 110.049418 110.049418l616.038518 0c60.681034 0 110.049418-49.367361 110.049418-110.049418L928.795685 512.425695C928.795685 501.373988 919.836639 492.415966 908.785955 492.415966zM942.576549 117.985158 907.20597 82.614579c-23.405059-23.405059-61.486376-23.400966-84.891436 0l-422.369633 422.36861c-1.295506 1.296529-2.407839 2.76395-3.304256 4.363378L269.318842 736.416166c-4.457522 7.951089-2.977821 17.909905 3.598968 24.221658 3.830235 3.675716 8.823969 5.572926 13.859659 5.572926 3.613294 0 7.247054-0.977257 10.488889-2.973728l219.285309-135.104047c1.327228-0.816598 2.552126-1.784646 3.654226-2.885723l422.369633-422.36861C965.979562 179.471534 965.979562 141.390217 942.576549 117.985158zM418.556794 552.080857l55.42124 55.279001-132.025942 81.343633L418.556794 552.080857zM914.279063 174.579107 505.926678 582.930469l-63.748906-63.586201L850.612021 110.912066c7.798617-7.800663 20.493753-7.804756 28.29544 0l35.371602 35.371602C922.081773 154.084331 922.081773 166.777421 914.279063 174.579107z"
            />
          </svg>
        </div>
        <div class="msg">
          <input type="text" placeholder="编辑你的个性标签！" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  name: 'Head',
  setup() {
    const store = new useStore()

    const data = reactive({
      isDialog: false,
    })
    function headClick() {
      data.isDialog = !data.isDialog
    }
    
    return {
      ...toRefs(data),
      headClick,
      userInfo: computed(() => store.state.userInfo),
    }
  },
}
</script>

<style scoped lang="less">
.head {
  width: 50px;
  height: 50px;
  margin: 10px 5px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
  .dialog {
    width: 300px;
    position: absolute;
    top: 0;
    left: 60px;
    border: 1px solid #ddd;
    background-color: #fff;
    z-index: 999;
    border-radius: 5px;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: -9px;
      width: 10px;
      height: 10px;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      transform: rotate(-135deg);
      z-index: 9999;
    }
    .bg {
      width: 100%;
      height: 150px;
      position: relative;
      z-index: 9999;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
    .message {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px;
      display: flex;
      justify-content: flex-end;
      flex-direction: end;
      position: relative;
      .photo {
        width: 80px;
        height: 80px;
        position: absolute;
        top: -20px;
        left: 20px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .user {
        display: flex;
        margin-right: 100px;
        .icon {
          width: 25px;
          height: 25px;
        }
        .name {
          line-height: 25px;
          color: #666;
          padding-left: 10px;
        }
      }
    }
    .label {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 20px 10px 30px;
      margin: 20px 0;
      .icon {
        width: 25px;
        height: 25px;
      }
      .msg {
        line-height: 25px;
        font-size: 14px;
        padding-left: 6px;
        input {
          border: none;
          outline: none;
          color: #666
        }
      }
    }
  }
}
</style>
