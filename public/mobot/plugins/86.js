module.exports = function(e,msg,tag,owner) {return;
    if(msg.sender.user_id == owner && msg.message.search(/86/) >= 0)
        return ['86'];
}