import request from './request';
import qs from 'qs'

// 获取群聊历史消息
export function getGroupMessageList(params) {
  return request.get('/GetGroupMessageList', {params});
}

// 获取用户历史消息
export function getInformationHistory(params) {
  return request.get('/InformationHistory', {params});
}

// 获取用户信息接口
export function getUser(params) {
  return request.post('/me', qs.stringify(params));
}