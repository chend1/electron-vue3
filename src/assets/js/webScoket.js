// let Scoket = null
import store from '@/store'

import { getInformationHistory, getGroupMessageList } from '@/api/message.js'
// 向服务器发送请求
export function onSend(msg) {
//   {
//     status: 0,
//     from_id: this.users.id,
//     msg: DataBindA(this.value),
//     to_id: this.isSelect == 1 ? this.selectUser.id : this.selectGroupMsg.id,
//     msg_type: judgeData(this.value),
//     channel_type: Number(this.isSelect)
// }
  console.log('send', msg)
}

//当WebSocket创建成功时，触发onopen事件
export function scoketStart() {
  console.log('onopen事件触发')
}

//当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
export function scoketOnMsg(e) {
  let userInfo = JSON.parse(e.data);
  if(userInfo.channel_type === 1){
    // 私聊用户信息
    getInformationHistory({
      to_id: userInfo.to_id
    }).then( res => {
      res.data
      console.log(123223);
      store.commit('getUserChatMsg', res.data)
    })
  } else {
    // 群聊信息
    getGroupMessageList({
      to_id: userInfo.to_id
    }).then( res => {
      res.data
      store.commit('getGroupChatMsg', res.data)
    })
  }
  // 通知用户更新消息
  
  console.log(e.data)
}

//当客户端收到服务端发送的关闭连接请求时，触发onclose事件

export function scoketClose() {
  console.log('close')
}
//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
export function scoketOnError() {
  console.log(222)
}
