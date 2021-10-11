import axios from 'axios';
// console.log(process.env.VUE_APP_BASE_URL);
const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/api';
// console.log(baseURL);
const request = axios.create({
  baseURL,
  timeout: 10000,
});
// 请求响应前拦截
request.interceptors.request.use( config => {
  // 每个请求携带token
  const token = localStorage.getItem('token')
  if(token != '' && token != undefined){
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})
// 请求返回结果拦截
request.interceptors.response.use( config => {
  return config.data
})

export default request