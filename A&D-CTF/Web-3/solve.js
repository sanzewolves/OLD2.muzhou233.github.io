var request = require('request');

request({
    url: 'http://104.248.222.130:5000/',
    method: "POST",
    body: 'change=change',
    headers : {
      'Cookie': 'PHPSESSID=cq5891ogi7mot68lhfvl98lq76',
      "content-type": "application/x-www-form-urlencoded"
    }
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    request({
        url: "http://104.248.222.130:5000/",
        method: "POST",
        headers: {
            'Cookie': 'PHPSESSID=cq5891ogi7mot68lhfvl98lq76',
            "content-type": "application/x-www-form-urlencoded"
        },
        body: 'answer='+eval(body.slice(body.search(/<h4>/)+4,body.search(/<\/h4>/)-2))
    }, function(error, response, body) {
        console.log(body)
    });
  }else console.log(error)
})