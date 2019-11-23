module.exports = function(e,msg,tag) {
    if(msg.message.search(/\/\/osu/) != 0) return;
    return '功能下线'
}