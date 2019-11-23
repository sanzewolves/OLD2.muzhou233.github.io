const WebSocket = require('ws');
const fs = require('fs');
const BrotliDecompress = require('brotli/decompress');

var bind_data;
fs.readdir('./config', function(err){
  if(err)fs.mkdir('./config', function(err){
    console.log(err);
  });
})
fs.readFile('./config/arcaea.json', function(err, data){
  if(err)fs.writeFile('./config/arcaea.json','', function(err){
    console.log(err);
    fs.readFile('./config/arcaea.json', readData);
  })
  else fs.readFile('./config/arcaea.json', readData);
});
function readData(err, data){
  data = data.toString();
  if(data == '')data = '{}';
  bind_data = JSON.parse(data);
}
function syncBindData(qqid, code){
  bind_data[qqid] = code;
  fs.writeFile('./config/arcaea.json', JSON.stringify(bind_data), function(err){
    console.log(err);
  })
}
function getBindData(qqid){
  return bind_data[qqid] > 0?bind_data[qqid]:undefined;
}


module.exports = function(e,msg,tag,bot) {
    if(msg.message.search(/\/\/arc/) != 0) return;
    var cmd = msg.message.slice(5);
    while(cmd.search(/ /) == 0) cmd = cmd.slice(1);
    cmd = cmd + ' ';
    console.log(cmd+'|')
    parseCmd(cmd);
    function parseCmd(cmd){
      switch (cmd.slice(0, Math.min(cmd.search(/ /), 6))) {
          case 'name':
              cmd = 'lookup ' + cmd.slice(cmd.search(/ /) + 1);
              getData(cmd, handleLookUp, handleUserInfo);
              break;
          case 'id':
              cmd = cmd.slice(cmd.search(/ /) + 1);
              getData(cmd, handleUserInfo);
              break;
          case 'bind':
              cmd = cmd.slice(cmd.search(/ /) + 1);
              if(cmd.search(/[0-9]{9}/) < 0){
                cmd = 'lookup ' + cmd;
                getData(cmd, handleLookUp, handleBind);
              }else getData(cmd, handleBind);
              break;
          case 'unbind':
              syncBindData(msg.sender.user_id, 0);
              recall('[解绑完成]你是谁，我不认识你');
              break;
          case '[CQ:at':
              var code = getBindData(cmd.match(/qq=[0-9]+/)[0].slice(3));
              if(code) getData(code, handleUserInfo);
              else recall(cmd.slice(0, cmd.search(/ /)) + ' 还没有绑定Arc账户呢');
              break;
          case '':
              var code = getBindData(msg.sender.user_id);
              if(code) getData(code, handleUserInfo);
              else recall('你还没有绑定Arc账户\n输入/arc help获取使用帮助');
              break;
          case 'help':
              recall('\
v0.1.0   ！暂不支持查询成绩\n\
//arc   查询自己的Arc信息\n\
//arc name [用户名]   通过用户名查询\n\
//arc bind [用户名或好友码]   绑定Arc账户\n\
//arc unbind   解绑Arc账户\n\
//arc id [好友码]   通过好友码查询用户\n\
//arc [@某个人]   通过绑定信息查询他人信息\n\
不符合上述指令我就自己猜咯(つд`ﾟ)\
              ');
              break;
          default:
              console.log(cmd);
              if(cmd.search(/\[CQ:at/) > 0)parseCmd(cmd.slice(cmd.search(/\[CQ:at/)));
              else if(cmd.search(/\[0-9\]{9}/) > 0)parseCmd('id' + cmd.match(/\[0-9\]{9}/));
              else parseCmd('name '+cmd);
      }
    }
    function getData(cmd, callBack, dataForCallBack) {
      console.log('getting',cmd)
      running = true;
      console.log('正在查询...')
      ws = new WebSocket('wss://arc.estertion.win:616');
      ws.binaryType = 'arraybuffer';
      ws.onerror = function (e) {
        console.log('查询失败')
        running = false;
      };
      ws.onmessage = function (e) {
        var data = e.data;
        if (data.byteLength) {
          data = BrotliDecompress(new Uint8Array(data));
          data = String.fromCharCode.apply(String, data);
          data = JSON.parse(decodeURIComponent(escape(data)));
          callBack(data, cmd, dataForCallBack);
        } else {
          if (data === 'invalid id') {
            console.log('Invalid code')
            recall('没有找到呢');
            running = false;
            ws.close();
          } else if (data === 'queried') {
            console.log('Queried, waiting for results...')
          } else if (data.substr(0, 5) === 'error') {
            var reason = data.substr(6);
            console.log('Error: '+errors[reason] || reason)
            running = false;
          }
        }
      };
      ws.onclose = function (e) {
        if (running) {
          console.log('Completed')
          running = false;
        }
      };
      ws.onopen = function (e) {
        ws.send(cmd);
      };
    }
    function handleUserInfo(data){
        if(data.cmd != 'userinfo') return;
        console.log(data);
        data = data.data;
        data.rating = data.rating/100;
        var date_diff = new Date(Date.parse(new Date()) - data.join_date)
    
        var retmsg = '是入坑'
        if(date_diff.getFullYear() - 1970 > 0) retmsg += date_diff.getFullYear() - 1970 + '年';
        if(date_diff.getMonth() > 0) retmsg += date_diff.getMonth() + '个月';
        else retmsg += date_diff.getDate() + '天';
        retmsg += '的';
        if(data.rating <= 3.49)retmsg += '蓝框萌新！\n'
        else if(data.rating <= 6.99)retmsg += '绿框人！\n'
        else if(data.rating <= 9.99)retmsg += '紫框人！\n'
        else if(data.rating <= 10.99)retmsg += '花紫框人！\n'
        else if(data.rating <= 11.99)retmsg += '红框人！\n'
        else retmsg = '您\n'
        data.rating = data.rating*100;
        retmsg += parseUserInfo(data);
        console.log(retmsg);
        recall(retmsg);
    }
    function handleLookUp(data, cmd, callBack){
        if(data.cmd != 'lookup_result') return;
        console.log(data);
        if(data.data.length == 0)recall('没有找到 ' + cmd.slice(8) + '呢，用好友码试试吧')
        else getData(data.data[0].code, callBack);
    }
    function handleBind(data, cmd){
      if(data.cmd != 'userinfo') return;
      data = data.data;
      console.log(data);
      syncBindData(msg.sender.user_id, data.user_code);
    
      var retmsg = '[CQ:at,qq='+msg.sender.user_id+'] 绑定成功\n--------\n'
      retmsg += parseUserInfo(data);
      retmsg += '\n++++++++\n如果绑错了可以再bind一次呦~';
      recall(retmsg);
    }
    function parseUserInfo(data){
      data.rating = data.rating/100;
      var date = new Date(data.join_date);
      var ret = data.name + ' | ' + data.user_id + '\n';
      ret += '葡萄糖浓度：' + data.rating + '\n';
      ret += '好友码：' + data.user_code + '\n';
      ret += '入坑时间：' + date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
      return ret;
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
