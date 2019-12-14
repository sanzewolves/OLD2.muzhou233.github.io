var readyForRepeat = {};//for /repeat

var repeatCount = {};
var repeated = {};
var lastMessage = {};

module.exports = function(e,msg,tag,bot) {
    if(msg.message_type != 'group') return;

    if(msg.message.search(/\/repeat/) == 0){//set /repeat
        readyForRepeat[msg.sender.user_id] = msg.group_id;
        return;
    }
    if(readyForRepeat[msg.sender.user_id] == msg.group_id){//response /repeat
        readyForRepeat[msg.sender.user_id] = null;
        return msg.message;
    }

    if(msg.message == lastMessage[msg.group_id]){//repeat with others
        repeatCount[msg.group_id]++;
        if(repeatCount[msg.group_id] < 3 || repeated[msg.group_id] == true)return;
        repeated[msg.group_id] = true;
        var random = Math.random();
        if(random < 0.05 * repeatCount[msg.group_id])return ['打断'];
        if(random < 0.2 * repeatCount[msg.group_id])return msg.message;
    }else{
        lastMessage[msg.group_id] = msg.message;
        repeatCount[msg.group_id] = 1;
        repeated[msg.group_id] = false;
    }
    if(Math.random() < 0.005)//repeat by random
        return msg.message;
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
    }return;
}