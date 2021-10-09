import request from './request';


// 登录接口
export function login(params) {
  return request.post('/login', params);
}