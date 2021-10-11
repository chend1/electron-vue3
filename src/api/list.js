import request from './request'
// 获取好友列表
export function getUserList(params) {
  return request.get('/UsersList', { params })
}
// 获取群聊列表
export function getGroupList(params) {
  return request.get('/GetGroupList', { params })
}
