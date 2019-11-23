module.exports = function(e,msg,tag) {
    if(msg.message.search(/\/help/) != 0) return;
    return '\
//arc 使用arcaea相关功能\n\
/repeat 复读你的下一条消息\n\
//osu 已下线\n\
由第三方提供：追番|群追番|订阅|群订阅|追番列表|订阅列表|群追番列表|群订阅列表|追番转移\
    '
}