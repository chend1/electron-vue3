import request from './request';
import qs from 'qs'

// 登录接口
export function login(params) {
  return request.post('/login', qs.stringify(params));
}