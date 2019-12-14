const fs = require('fs');

const filepath = './config/save.json';
var bind_data;
fs.readdir('./config', function(err){
  if(err)fs.mkdir('./config', function(err){
    console.log(err);
  });
})
fs.readFile(filepath, function(err, data){
  if(err)fs.writeFile(filepath,'', function(err){
    console.log(err);
    fs.readFile(filepath, readData);
  })
  else fs.readFile(filepath, readData);
});
function readData(err, data){
  data = data.toString();
  if(data == '')data = '{}';
  bind_data = JSON.parse(data);
}
function syncBindData(k, v){
  bind_data[k] = v;
  console.log(bind_data);
  fs.writeFile(filepath, JSON.stringify(bind_data), function(err){
    console.log(err);
  })
}
function getBindData(k){
  return bind_data[k];
}

module.exports = function(e,msg,tag,bot) {
    if(msg.message.search(/\/save/) != 0) return;
    var cmd = msg.message.slice(5)+' ';
    while(cmd.search(/ /) == 0) cmd = cmd.slice(1);
    var content = cmd.slice(cmd.search(/ /)+1, -1);
    cmd = cmd.slice(0, cmd.search(/ /));
    console.log(cmd+'|'+content+'|');

    
    var data = getBindData(msg.sender.user_id);
    if(data == undefined) data = {};
    if(cmd == 'help' || cmd.length == 0){
        return '\
/save list   显示记录\n\
/save del [名称]   删除记录\n\
/save [名称]   显示记录内容\n\
/save [名称] [内容]   存储'
    }
    if(cmd == 'list'){
        var res = '名称：内容摘要';
        console.log(data);
        for(var k in data)if(data[k]!=undefined)
            res += '\n'+k+'：'+(data[k].length>20?data[k].slice(0,20):data[k]);
        console.log(res);
        if(res.search('\n')==-1)res='我还没有帮你记任何信息呢'
        recall(res, 'private');
        if(msg.message_type != 'private')recall('已经私发给你啦');
    }
    else if(cmd == 'del'){
        if(data[content] == undefined)return '诶有这个吗我不记得';
        data[content] = undefined;
        syncBindData(msg.sender.user_id, data);
        return '删除啦';
    }else if(content.length > 0){
        data[cmd] = content;
        syncBindData(msg.sender.user_id, data);
        return '记住啦';
    }else{
        console.log(data)
        if(data[cmd] != undefined)recall(data[cmd]);
        else return '诶有这个吗我不记得';
    }

    function recall(retmsg, type){
        if(msg.message_type == 'private' || type == 'private')
            bot('send_private_msg',{
                user_id: msg.sender.user_id,
                message: retmsg
            })
        else
            bot('send_group_msg',{
                group_id: msg.group_id,
                message: '[CQ:at,qq='+msg.sender.user_id+']\n'+retmsg
            })
    }
}