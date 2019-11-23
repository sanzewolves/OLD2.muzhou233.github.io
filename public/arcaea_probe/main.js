var decompress = require('brotli/decompress');

console.log('hello');

document.getElementById('btn').addEventListener('click', function(){
    var ws = new WebSocket("wss://arc.estertion.win:616");
    ws.onopen = function(e){
        console.log(ws.send(document.getElementById('input1').value));
    }
    ws.onmessage = function(e){
        console.log(e.data);
        console.log(decompress(e.data.slice(0)));
        var reader = new FileReader();
        reader.readAsText(e.data);
        reader.onload = function (e) {
        //    console.info(decompress(reader.result));
        }
        var p = document.createElement('p');
        p.innerText = e.data.songtitle;
        //document.getElementById('body').appendChild(p);
    }
    ws.onclose = function(e){
        console.log("connect close");
    }
})