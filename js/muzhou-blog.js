$(document).ready(function () {
  $('button').click(function (jumpevent) {
    var jumpurl = $(this).attr('href');
    if (typeof jumpurl != 'undefined' && jumpurl[0] != '#') {
      jumpevent.preventDefault();
      var reg = RegExp('^https://muzhou.tech');
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
      var reg = RegExp('^https://muzhou.tech');
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