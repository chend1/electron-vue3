import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: {
        id: 0,
        name: '',
        photo: ''
      }
    }
  },
  mutations: {
    getUserInfo(state, userInfo) {
      localStorage.setItem('token', userInfo.token)
      state.token = userInfo.token
      state.userInfo.id = userInfo.id
      state.userInfo.name = userInfo.name
      state.userInfo.photo = userInfo.avatar
    },
  },
})

export default store
