(function(window,document,undefined){
  var hearts = [];
  window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback){
      setTimeout(callback,1000/60);
    }
  })();
  init();
  function init(){
    css(".lazer-click{width: 120px;height: 120px;position: fixed;pointer-events: none;}\
         .lazer-click::before{content:'';top:-40px;left:-40px;width:140px;height:140px;position:absolute;}\
         .lazer-click1::before{background: url(https://muzhou.tech/public/lazer_click/button1.svg);background-size:contain;}\
         .lazer-click2::before{background: url(https://muzhou.tech/public/lazer_click/button2.svg);background-size:contain;}\
         .lazer-click3::before{background: url(https://muzhou.tech/public/lazer_click/button3.svg);background-size:contain;}\
         .lazer-click4::before{background: url(https://muzhou.tech/public/lazer_click/button4.svg);background-size:contain;}\
         .lazer-click5::before{background: url(https://muzhou.tech/public/lazer_click/button5.svg);background-size:contain;}\
         .lazer-click6::before{background: url(https://muzhou.tech/public/lazer_click/button6.svg);background-size:contain;}\
         ");
    img();
    attachEvent();
    gameloop();
  }
  function img() {
    var imgsrc = [
      "https://muzhou.tech/public/lazer_click/button1.svg",
      "https://muzhou.tech/public/lazer_click/button2.svg",
      "https://muzhou.tech/public/lazer_click/button3.svg",
      "https://muzhou.tech/public/lazer_click/button4.svg",
      "https://muzhou.tech/public/lazer_click/button5.svg",
      "https://muzhou.tech/public/lazer_click/button6.svg",
    ];
    for(var i = 0; i < imgsrc.length; i++){
      var Img = new Image();
      Img.src = imgsrc[i];
    }
  }
  function gameloop(){
    for(var i=0;i<hearts.length;i++){
      if(hearts[i].alpha <=0){
        document.body.removeChild(hearts[i].el);
        hearts.splice(i,1);
        continue;
      }
      if(hearts[i].alpha <= 0.8)
        hearts[i].y--;
      else hearts[i].y++;
      hearts[i].scale += 0.02;
      hearts[i].alpha -= 0.02;
      hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+");filter:"+hearts[i].color;
    }
    requestAnimationFrame(gameloop);
  }
  function attachEvent(){
    var old = typeof window.οnclick==="function" && window.onclick;
    window.onclick = function(event){
      old && old();
      createHeart(event);
    }
  }
  function createHeart(event){
    var d = document.createElement("div");
    d.className = "lazer-click lazer-click"+(~~(Math.random()*6+1));
    hearts.push({
      el : d,
      x : event.clientX - 30,
      y : event.clientY - 30,
      scale : 1,
      alpha : 1,
      color : randomColor()
    });
    document.body.appendChild(d);
  }
  function css(css){
    var style = document.createElement("style");
    style.type="text/css";
    try{
      style.appendChild(document.createTextNode(css));
    }catch(ex){
      style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  function randomColor(){
    return "drop-shadow(rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+") 0px 0px);";
  }
})(window,document);