$(function(){
<!--fadeIn page start-->
      $('body').fadeIn(1000,'easeInQuint');
      $('#workDetail').fadeIn(1000);
<!--fadeOut page start-->		   
	$("#work a", ".fadeOut").click(function(e){
    var self = $(this);
    $("#navi,#container").fadeOut(500, function() {
        window.location.href = self.attr('href'); 
		// go to href after the slide animation completes
        });
    e.preventDefault();
  // And also make sure you return false from your click handler.
    });
<!--gallery cycle start-->    
     $("#detail").cycle({
      fx:      'fade',
      speedIn:  3500,
      fastOnEvent:   1000,
      pager:   '#slideNavSet',
      pagerEvent: 'mouseover',
      pause: 1,
      pauseOnPagerHover: 1
  });
<!--hoverSlider start-->
  $(".artist").on("hover",function(){
  $(this).children("dd").stop().slideToggle(900,'easeOutQuart');
  });

<!--scrollToAnchor start-->
    $('#navi a').bind('click',function(event){
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top -130
                    }, 1000,'easeInOutExpo');
                    event.preventDefault();
                });
<!--scrollToTop start-->
    $('#footer a').bind('click',function(event){
			        $('html, body').stop().animate({
                        scrollTop: 0
                    }, 1000,'easeInOutExpo');
					event.preventDefault();
					});
<!--workFade start-->
    $("#work li").hover(function(){
       $(this).children('a').stop().fadeTo(900,0.2,'easeOutCubic');
       },function(){
       $(this).children('a').stop().fadeTo(900,1,'easeInOutSine');
    }).click(function(){
       $(this).children('a').stop().css("opacity",1);
    });
<!--footerFade start-->
    $(window).scroll(function() {
        if ($(this).scrollTop() + $(this).height() > $(document).height() - 490) {
            $("#footer").fadeIn(300);
        }
        else {
            $("#footer").fadeOut(300);
        }
    });
});