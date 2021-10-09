import axios from 'axios';
console.log(process.env.VUE_APP_BASE_URL);
const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/api';
console.log(baseURL);
const request = axios.create({
  baseURL,
  timeout: 10000,
});
// 请求响应前拦截
request.interceptors.request.use( config => {
  return config
})

export default request