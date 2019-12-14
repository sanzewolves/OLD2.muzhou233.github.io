module.exports = function(e,msg,tag,owner) {
    if(msg.sender.user_id == owner && msg.message == '86')
        return ['86'];
}