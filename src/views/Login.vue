<template>
  <div
    class="login-app"
    v-loading="loginLoading"
    element-loading-text="授权登录中..."
    element-loading-spinner="el-icon-loading"
  >
    <el-container class="login-container" v-if="isLogin">
      <el-form
        :model="ruleForm"
        ref="formRef"
        :rules="rules"
        label-width="40px"
        class="login-form"
      >
        <el-header>
          <h1>IM<i class="el-icon-chat-dot-round"></i></h1>
        </el-header>
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            @keyup.enter="loginClick"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <!-- <div class="ouath-login">
          <svg
            @click="weiboLogin"
            t="1624525865244"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            p-id="5135"
            width="30"
            height="30"
          >
            <path
              d="M357.741904 600.362884c-25.69135 2.681895-44.090113 25.079456-44.090113 46.493689 0 21.467441 20.683644 36.29512 46.389319 33.291929 25.598235-2.921332 46.374994-22.71681 46.374994-44.104439C406.416104 614.548995 387.233544 597.545922 357.741904 600.362884z"
              p-id="5136"
              fill="#d81e06"
            ></path>
            <path
              d="M422.943374 582.668105c-8.807995 6.375769-10.615026 18.598294-5.81913 26.195804 4.596365 7.759181 15.304505 8.660649 23.990735 2.179488 8.503071-6.696041 11.810162-18.387508 7.200495-26.198874C443.719109 577.247014 433.145013 575.042968 422.943374 582.668105z"
              p-id="5137"
              fill="#d81e06"
            ></path>
            <path
              d="M512.319761 1.023234c-282.373596 0-511.741644 229.076426-511.741644 511.634204 0 282.453408 229.368048 511.342583 511.741644 511.342583 282.598707 0 511.621925-228.889175 511.621925-511.342583C1023.941686 230.09966 794.918468 1.023234 512.319761 1.023234zM791.997136 640.932051C735.590359 760.730196 549.621742 819.021769 411.837196 808.23484c-130.984136-10.307032-299.377692-53.801624-316.779826-212.284139 0 0-9.192731-71.789047 60.391248-164.673079 0 0 100.084527-139.805433 216.694276-179.683916 116.677283-39.720906 130.267872 27.499403 130.267872 67.191659-6.191587 33.689967-17.788916 53.484421 26.009575 39.88053 0 0 114.685047-53.190753 161.871466-6.005358 38.098057 38.126708 6.295956 90.493758 6.295956 90.493758s-15.807936 17.50855 16.711451 23.833157C745.871811 473.469637 848.375262 520.947677 791.997136 640.932051zM678.891961 309.96509c-12.48652 0-22.489652-10.097269-22.489652-22.478396 0-12.592936 10.002109-22.689182 22.489652-22.689182 0 0 140.576951-26.010599 123.785687 125.086217 0 0.902492-0.106416 1.594198-0.266041 2.391297-1.621825 10.680513-10.999761 18.890939-22.105939 18.890939-12.540751 0-22.690205-10.017457-22.690205-22.505C757.615463 388.660965 779.881026 287.699527 678.891961 309.96509zM916.391647 415.336665c-3.719454 54.413517-16.41983 35.363977-31.511503 35.363977-18.092817 0-32.679012-9.112919-32.679012-27.206759 0-15.70152 6.482185-28.853142 6.482185-28.853142 1.912424-6.615205 17.217952-46.229695-10.096246-107.524458-50.001334-83.983946-150.697754-84.515004-162.600008-79.705806-11.996391 4.676178-29.690147 7.439932-29.690147 7.439932-18.20128 0-32.787475-14.532987-32.787475-32.519388 0-15.091673 10.096246-27.60582 23.886366-31.510479 0 0 0.319249-0.053208 0.810401-0.159624 0.99663-0.211809 2.005538-0.371434 3.108584-0.476827 13.987604-2.710546 63.951078-21.840922 112.571047-10.468703 86.987136 20.298909 206.387244 112.385841 152.665433 275.624347L916.391647 415.339735z"
              p-id="5138"
              fill="#d81e06"
            ></path>
            <path
              d="M422.038835 439.088987c-136.802242 6.270376-247.368774 79.546182-247.368774 170.943455 0 91.290857 110.566532 159.890485 247.368774 153.513693 136.883077-6.216144 247.673697-91.928332 247.673697-183.190538C669.713556 489.144553 558.921912 432.765403 422.038835 439.088987zM515.215512 668.934885c-41.886068 54.094268-124.78027 80.476301-205.269873 36.904967-38.286332-20.805409-36.903944-61.586385-36.903944-61.586385s-15.888772-128.912087 121.684988-144.986064C532.512253 483.246634 557.114882 614.840617 515.215512 668.934885z"
              p-id="5139"
              fill="#d81e06"
            ></path>
          </svg>
        </div> -->
        <el-form-item class="login-btn">
          <el-button @click="loginClick" type="primary" style="width: 300px"
            >登录</el-button
          >
        </el-form-item>
        <div class="register">
          <el-button
            @click="registerClick"
            type="primary"
            plain
            style="width: 300px"
            >点击注册</el-button
          >
        </div>
      </el-form>
    </el-container>
    <div class="login-container register" v-else>
      <p>用户注册</p>
      <el-form
        :model="registerForm"
        ref="registerFormRef"
        :rules="registerRules"
        label-width="80px"
        class="register-form"
      >
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input
            type="password"
            v-model="registerForm.password_confirm"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="yzm">
            <el-input
              type="text"
              v-model="registerForm.code"
            ></el-input>
            <el-button
              @click="getEmailCode"
              @keyup.enter="handleRegister"
              :disabled="timeOut !== 0"
              type="primary"
              size="mini"
              class="code"
              >获取验证码<span v-if="timeOut>0">&nbsp;{{timeOut}}</span></el-button
            >
          </div>
        </el-form-item>
        <div class="register-btn">
          <el-button @click="goBackClick" type="primary">返回登录</el-button>
          <el-button @click="handleRegister" type="primary" plain
            >确认注册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入cookies
// import { getCookie, setCookie, delCookie } from '@/assets/js/utils.js'
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { login, register, getCode } from '@/api/login.js'
import { ElMessage } from 'element-plus'
export default {
  name: 'Login',
  setup() {
    // 获取表单ref
    let formRef = ref(null)
    let registerFormRef = ref(null)
    let data = reactive({
      loginLoading: false,
      ruleForm: {
        account: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        code: '',
      },
      isLogin: true,
      registerRules: {},
      timeOut: 0
    })
    // 登录验证
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (data.ruleForm.account !== '') {
          if (
            data.ruleForm.account.length < 3 ||
            data.ruleForm.account.length > 20
          ) {
            callback(new Error('长度在 3 到 20 个字符'))
          } else {
            formRef.value.validateField('account')
          }
          callback()
        }
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (
          data.ruleForm.password.length < 3 ||
          data.ruleForm.password.length > 20
        ) {
          callback(new Error('长度在 3 到 20 个字符'))
        } else {
          formRef.value.validateField('password')
        }
        callback()
      }
    }
    let rules = {
      account: [{ validator: validateAccount, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }],
    }
    // 注册规则
    let password_confirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else {
        if (data.registerForm.password !== data.registerForm.password_confirm) {
          callback(new Error('请检查密码是否正确'))
        } else {
          registerFormRef.value.validateField('password_confirm')
        }
        callback()
      }
    }
    data.registerRules = {
      name: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 20,
          message: '用户名长度需要在3~20之间',
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 20,
          message: '密码长度需要在6~20之间',
          trigger: 'blur',
        },
      ],
      password_confirm: [
        {
          required: true,
          message: '请确认密码',
          trigger: 'blur',
        },
        { validator: password_confirm, trigger: 'blur' },
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
      ],
    }
    // 获取路由
    const router = useRouter()
    // 获取store
    const store = useStore()
    // 登录方法
    function loginClick() {
      formRef.value.validate((valid) => {
        if (valid) {
          // 发起登录请求
          login({
            name: data.ruleForm.account,
            password: data.ruleForm.password,
            client_type: 0,
          }).then((res) => {
            store.commit('getUserInfo', res.data)
            ElMessage({
              showClose: true,
              message: '登录成功',
              type: 'success',
            })
            router.push({
              path: '/chat',
            })
          })
        }
      })
    }
    //注册
    function registerClick() {
      data.isLogin = false
    }
    // 确认注册
    function handleRegister() {
      registerFormRef.value.validate((valid) => {
        if (valid) {
          register(data.registerForm).then((res) => {
            console.log(res)
            ElMessage({
              showClose: true,
              message: '注册成功，请重新登录',
              type: 'success',
            })
            goBackClick()
          })
        }
      })
    }
    // 返回登录
    function goBackClick() {
      data.isLogin = true
    }
    // 获取邮箱验证码
    function getEmailCode() {
      if (!data.registerForm.email) {
        ElMessage({
          showClose: true,
          message: '请填写邮箱！',
          type: 'warning',
        })
        return;
      }
      data.timeOut = 60;
      let timer = setInterval(() => {
        data.timeOut--
        if(data.timeOut === 0){
          clearInterval(timer)
        }
      }, 1000);
      getCode({
        email: data.registerForm.email,
      }).then((res) => {
        console.log(res)
      })
    }
    return {
      ...toRefs(data),
      rules,
      formRef,
      registerFormRef,
      loginClick,
      registerClick,
      goBackClick,
      handleRegister,
      getCode,
      getEmailCode,
    }
  },
}
</script>

<style scoped lang="less">
.ouath-login {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-app {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -270px;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  background-color: #fff;
  width: 380px;
  height: 380px;
  box-shadow: 0 2px 10px #999;
  -moz-box-shadow: #999 0 2px 10px;
  -webkit-box-shadow: #999 0 2px 10px;
  box-sizing: border-box;
  padding: 20px 0;
}
@media screen and (max-width: 750px) {
  .login-app {
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    background-color: #fff;
    width: 380px;
    height: 540px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
  }
}

.el-container {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  box-sizing: border-box;
  min-width: 0px;
  justify-content: center;
}

.login-form {
  width: 80%;
}

.el-button--login.is-active,
.el-button--login:active {
  opacity: 0.8;
  color: #fff;
}
.el-button--login:focus,
.el-button--login:hover {
  opacity: 0.8;
  color: #fff;
}
.el-button--login {
  opacity: 0.8;
  background-color: #5c6bc6;
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  color: #fff;
  transition: left 0.3s ease;
  text-transform: uppercase;
  border-radius: 3px;
}
.footer {
  color: #fff;
  margin: auto;
  position: relative;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
}
.footer a {
  color: #fff;
}
.login-btn {
  margin-top: 50px;
}
.register {
  box-sizing: border-box;
  padding: 0 10px;
  p {
    font-size: 1.6em;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .register-form {
    width: 96%;
    margin: 0px 2%;
  }

  /deep/.el-input,
  .el-form-item__content {
    line-height: 30px;
  }
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /deep/.el-form-item {
    margin-bottom: 10px;
  }
  /deep/.el-form-item__error {
    padding-top: 0;
  }
  .register-btn {
    display: flex;
    width: 100%;
    margin-top: 20px;
    justify-content: space-around;
  }
}
.yzm {
  display: flex;
  margin-top: 5px;
  .code {
    margin-left: 20px;
  }
}
</style>
