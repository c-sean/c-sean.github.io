$(document).ready(function(){
  $('.bxslider').bxSlider({
 	  auto: true,
  	minSlides: 2,
  	maxSlides: 3,
  	slideWidth: 330,
  	slideMargin: 5
  });
  $('.fancybox a').fancybox();
  // scrollToAnchor start
    $('h2 a').bind('click',function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top -10
        }, 1000,'easeInOutExpo');
        event.preventDefault();
    });
    // scrollToTop start
    $('.footer .back_top').bind('click',function(event){
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000,'easeInOutExpo');
		event.preventDefault();
	});

  $(".block").click(function(e) {
    e.preventDefault();
  });
});