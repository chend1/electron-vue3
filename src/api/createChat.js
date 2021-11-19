import request from './request'
import qs from 'qs'

// 创建群聊
export function createGroup(params) {
  return request.post('/CreateGroup', qs.stringify(params))
}

// 非好友用户列表
export function selectUserList(params) {
  return request.get('/UsersList', { params })
}

// 发送添加好友请求
export function sendFriendRequest(params) {
  return request.post('/SendFriendRequest', qs.stringify(params))
}

// 同意好友请求
export function byFriendRequest(params) {
  return request.post('/ByFriendRequest', qs.stringify(params))
}
