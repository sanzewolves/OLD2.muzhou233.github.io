$(document).ready(function () {
  $('button').click(function (jumpevent) {
    var jumpurl = $(this).attr('href');
    if (typeof jumpurl != 'undefined' && jumpurl[0] != '#') {
      jumpevent.preventDefault();
      var reg = RegExp('^/$');
      var reg2 = RegExp('^/[^/]');
      if(jumpurl.match(reg) || jumpurl.match(reg2)){
        $('#loading').fadeIn('fast');
        window.setTimeout(function () {
          window.location.href = jumpurl,
          1000
        });
      }else{
        window.open(jumpurl, '_blank').location;
      }
    }
  });
  $('a').click(function (jumpevent) {
    var jumpurl = $(this).attr('href');
    if (typeof jumpurl != 'undefined' && jumpurl[0] != '#') {
      jumpevent.preventDefault();
      var reg = RegExp('^/$');
      var reg2 = RegExp('^/[^/]');
      if(jumpurl.match(reg) || jumpurl.match(reg2)){
        $('#loading').fadeIn('fast');
        window.setTimeout(function () {
          window.location.href = jumpurl,
          1000
        });
      }else{
        window.open(jumpurl, '_blank').location;
      }
    }
  });

  $('img').click(function(){  
      if($(this).attr('id') != 'bigimg'){
        var _this = $(this);//将当前的pimg元素作为_this传入函数  
        imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);  
      }
  });  
});  

function imgShow(outerdiv, innerdiv, bigimg, _this){  
  var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
  $(bigimg).attr("src", src);//设置#bigimg元素的src属性  

      /*获取当前点击图片的真实大小，并显示弹出层及大图*/  
      $("<img/>").attr("src", src).load(function(){  
        var windowW = $(window).width();//获取当前窗口宽度  
        var windowH = $(window).height();//获取当前窗口高度  
        var imgWidth, imgHeight;  
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
          
        var img = new Image();
        img.src = src;
        img.onload = function(){
          var realWidth = img.width;//获取图片真实宽度  
          var realHeight = img.height;//获取图片真实高度 
  
        imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
        imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
        if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
            imgWidth = windowW*scale;//再对宽度进行缩放  
            imgHeight = imgWidth/realWidth*realHeight;
        }  
        $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
          
        var w = (windowW-imgWidth)/2;//计算图片与窗口左边距  
        var h = (windowH-imgHeight)/2;//计算图片与窗口上边距  
        $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性  
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
        $('body').css("overflow","hidden");//阻止滚动行为
        }
    });
    
  $(outerdiv).click(function(){//再次点击淡出消失弹出层  
      $(this).fadeOut("fast");  
      $('body').css("overflow","unset");//恢复滚动
  });  
}

$(document).ready(function(){
    
  var getMax = function(){
      return $(document).height() - $(window).height();
  }
  
  var getValue = function(){
      return $(window).scrollTop();
  }
  
  if('max' in document.createElement('progress')){
      // Browser supports progress element
      var progressBar = $('progress');
      
      // Set the Max attr for the first time
      progressBar.attr({ max: getMax() });

      $(document).on('scroll', function(){
          // On scroll only Value attr needs to be calculated
          progressBar.attr({ value: getValue() });
      });
    
      $(window).resize(function(){
          // On resize, both Max/Value attr needs to be calculated
          progressBar.attr({ max: getMax(), value: getValue() });
      });   
  }
  else {
      var progressBar = $('.progress-bar'), 
          max = getMax(), 
          value, width;
      
      var getWidth = function(){
          // Calculate width in percentage
          value = getValue();            
          width = (value/max) * 100;
          width = width + '%';
          return width;
      }
      
      var setWidth = function(){
          progressBar.css({ width: getWidth() });
      }
      
      $(document).on('scroll', setWidth);
      $(window).on('resize', function(){
          // Need to reset the Max attr
          max = getMax();
          setWidth();
      });
  }
});

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
    css(".heart{width: 120px;height: 120px;position: fixed;}\
         .heart::before{content:'';top:-40px;left:-40px;width:140px;height:140px;position:absolute;}\
         .heart1::before{background: url(/img/button/button1.svg);background-size:contain;}\
         .heart2::before{background: url(/img/button/button2.svg);background-size:contain;}\
         .heart3::before{background: url(/img/button/button3.svg);background-size:contain;}\
         .heart4::before{background: url(/img/button/button4.svg);background-size:contain;}\
         .heart5::before{background: url(/img/button/button5.svg);background-size:contain;}\
         .heart6::before{background: url(/img/button/button6.svg);background-size:contain;}\
         ");
    attachEvent();
    gameloop();
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
    d.className = "heart heart"+(~~(Math.random()*6+1));
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