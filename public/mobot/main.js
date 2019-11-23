const { CQWebSocket } = require('cq-websocket');
const mri = require('mri')
const options = mri(process.argv.slice(2), {
  alias: {
    help: 'h'
  },
  boolean: [ 'help' ]
})
const plugins = [{
    'evt':'message',
    'handler':require('./plugins/arcaea.js')
},{
    'evt':'message',
    'handler':require('./plugins/osu.js')
},{
    'evt':'message',
    'handler':require('./plugins/86.js')
},{
    'evt':'message',
    'handler':require('./plugins/repeat.js')
},{
    'evt':'message',
    'handler':require('./plugins/help.js')
}]

if (options.help) {
  console.log('Options:')
  console.log('    -h,--help Show usage\n')
  console.log('    --host CQHttp ws server host')
  console.log('    --port CQHttp ws server port')
  console.log('    --url CQHttp ws server base URL')
  console.log('    --token CQHttp ws server access token')
  console.log('    --qq QQ account of the bot, used to determine whether someone "@" the bot or not')
  console.log('    --owner set which one to send the key messages')
} else {
  let bot = new CQWebSocket({
    host: options.host,
    port: options.port,
    baseUrl: options.url,
    qq: options.qq,
    accessToken: options.token
  })

  function to_owner(msg){
    bot('send_private_msg',{
        user_id: options.owner,
        message: msg
    })
  }
  
  // 設定訊息監聽
  bot
    // 連線例外處理
    .on('socket.error', console.error)
    .on('socket.connecting', (wsType) => console.log('[%s] 建立连接中, 请稍后...', wsType))
    .on('socket.connect', (wsType, sock, attempts) => console.log('[%s] 连接成功 ヽ(✿ﾟ▽ﾟ)ノ 蛆蛆%d次尝试', wsType, attempts))
    .on('socket.failed', (wsType, attempts) => console.log('[%s] 连接失败 。･ﾟ･(つд`ﾟ)･ﾟ･ [丑%d] 对噗起', wsType, attempts))
    .on('api.response', (resObj) => console.log('服务器响应: %O', resObj))
    .on('socket.close', (wsType, code, desc) => console.log('[%s] 连接关闭(%d: %s)', wsType, code, desc))
    .on('ready', () => to_owner('今天又是复读复读的一天 ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡'))
    // 聽取私人信息
    .on('message.private', (e, context) => {
      console.log('叮咚 ✿');
      console.log(context.message.slice(0,10)+'...');
      if(context.message.search(/\/echo/) == 0)
      // 以下提供三種方式將原訊息以原路送回
      switch (Date.now() % 3) {
        case 0:
          // 1. 調用 CoolQ HTTP API 之 send_msg 方法
          bot('send_msg', context)
          break
        case 1:
          // 2. 或者透過返回值快速響應
          return context.message
        case 2:
          // 3. 或者透過CQEvent實例，先獲取事件處理權再設置響應訊息
          e.stopPropagation()
          e.setMessage(context.message)
      }
    })
  
  plugins.forEach(plugin => {
      bot.on(plugin.evt, function(e,m,t){
          return plugin.handler(e,m,t,bot,options.owner);
      });
  })

  bot.connect()
}