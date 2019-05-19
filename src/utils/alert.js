import notices from './notices.js';
let messageInstance;

// 函数用来获取实例，它不会重复创建 并且只有在第一次创建的时候才调用
function getMessageInstance () {
    messageInstance = messageInstance || notices.newInstance();
    return messageInstance;
}
  
function notice({ duration = 1.5, content = '' }){
    let instance = getMessageInstance();
    instance.add({
        content: content,
        duration: duration
    });
}
export default {
    //弹出效果（成功/失败/警告等）
    info (options) {
      return notice(options);
    }
}