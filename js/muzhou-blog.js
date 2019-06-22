$(document).ready(function () {
  $('button').click(function (jumpevent) {
    var jumpurl = $(this).attr('href');
    if (typeof jumpurl != 'undefined' && jumpurl[0] != '#') {
      jumpevent.preventDefault();
      var reg = RegExp(/^https://muzhou.tech.+/);
      if(jumpurl.match(reg)){
        jumpevent.preventDefault();
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
      var reg = RegExp(/^https://muzhou.tech.+/);
      if(jumpurl.match(reg)){
        jumpevent.preventDefault();
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
});
