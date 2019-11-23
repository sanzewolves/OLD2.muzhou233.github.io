var readyForRepeat = {};

module.exports = function(e,msg,tag,bot) {
    if(msg.message.search(/\/repeat/) != 0){
        if(msg.message_type == 'group' && readyForRepeat[msg.sender.user_id] == msg.group_id){
            readyForRepeat[msg.sender.user_id] = null;
            return msg.message;
        }
        if(Math.random() < 0.01)
            return msg.message;
    }else{
        readyForRepeat[msg.sender.user_id] = msg.group_id;
    }
    function recall(retmsg){
        if(msg.message_type == 'private')
            bot('send_private_msg',{
                user_id: msg.sender.user_id,
                message: retmsg
            })
        else if(msg.message_type == 'group')
            bot('send_group_msg',{
                group_id: msg.group_id,
                message: '[CQ:at,qq='+msg.sender.user_id+']\n'+retmsg
            })
    }
}