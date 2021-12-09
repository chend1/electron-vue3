import request from './request';
import qs from 'qs'

// 登录接口
export function login(params) {
  return request.post('/login', qs.stringify(params));
}

// 注册
export function register(params) {
  return request.post('/registered', qs.stringify(params));
}

// 送注册邮箱验证码接口
export function getCode(params) {
  return request.get('/seedRegisteredEmail', {params});
}