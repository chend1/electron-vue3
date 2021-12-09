/**
 * 桌面应用通知
 * @param {*} title 
 * @param {*} body 
 * @param {*} message 
 */
export function notice(title,body,message){
    new Notification(title, { body: body })
    .onclick = () => document.getElementById("output").innerText = message
  }