$(function(){
	var $container = $('.container'),
	    $slider = $('.slider'),
	    $wrap = $('.wrap'),
	    $filter_wrap = $('.filter_wrap'),
  		length = [],
	    $slider_origin = $('.slider_origin'),
	    offsetX_R, offsetX_L, offsetX_T, offsetX_B,
	    imgArray = $slider_origin.children().toArray();

	$container.shapeshift({
		enableDrag: false,
    	gutterX: 20,
    	gutterY: 15,
    	animateOnInit: true,
    	animationSpeed: 1000
	});

	$filter_wrap.shapeshift({
		enableDrag: false,
		animateOnInit: true,
		animationSpeed: 600,
		enableCrossDrop: false,
    	minHeight: 85
	});

	navi_adapt();
	$(window).resize(function(){
		navi_adapt();
	})
	function navi_adapt() {
	    if($(window).width() < 780) {
	    	// $filter_wrap.delay(600).css('position','static').slideUp(400);
			$wrap.draggable( "disable" );
		} else {
			$wrap.draggable( "enable" );
		}
	}
 //    if($(window).width()<768){
 //    	$filter_wrap.delay(600).slideUp(400);
	// 	$wrap.draggable( "disable" );
	// }
	$('.item').on('mousedown', function( event ) {
		offsetX_L = event.pageX - $(this).offset().left;
        offsetX_R = $('html').width() - offsetX_L - 15;
		offsetX_T = event.pageY - $(this).offset().top;
        offsetX_B = $('html').height() - offsetX_T;
		$wrap.draggable({
			scroll: true,
			containment: [ -offsetX_L, -offsetX_T, offsetX_R, offsetX_B ]
		});
	});

	$wrap.on('drag', function (event, ui) {
        if($(this).offset().top >= ($('html').height() - offsetX_T)) {
    		$wrap.draggable("option", "scroll", false );
        } else {
        	$wrap.draggable("option", "scroll", true );
        }
	});

	$wrap.draggable({
		cancel: '.title'
	});


	$slider.each(function(i,e) {
	    length[i] = 0;
	    $(this).children().each(function() {
	        length[i] += $(this).outerHeight(true);
	    })
	    $('<style />').html('@keyframes loop' + i + '{from {transform:translate3d(0,0,0);}to{transform:translate3d(0,' + -length[i] + 'px,0);}}').appendTo('head');

	    $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this)).parent().css({
	      'animation': 'loop' + i + ' linear '+ length[i]/30 +'s  infinite'
	    });
	});
	imgArray = imgArray.sort(function(a, b){return 0.5 - Math.random()});
	$.each(imgArray, function(index, el) {
		 var intervalT = Math.floor(Math.random() * 2000);
		 setTimeout(function(){
			$(el).animate({opacity: 1}, 1200);
		}, intervalT);
	});
	$('.filter_trigger').tagSort({
     	items:'.filter_item',
     	tagElement: 'a'
	});

    // $slider.on({'mouseleave': function() {
    // 	$(this).css({'animation-play-state':'running'});
    // }, 'mousedown': function(){
    // 	$(this).css({'cursor':'url(img/closedhand.cur),move'});
    // }, 'mouseenter': function(){
    // 	$(this).css({'animation-play-state':'paused', 'cursor':'url(img/openhand.cur),move'});
    // }, 'mouseup ': function(){
    // 	$(this).css({'cursor':'url(img/openhand.cur),move'});
    // }});
	$('.filter').on('click', function(event) {
		event.preventDefault();
		if (!$(this).siblings().hasClass('active')) {
			var $filter_id = $(this).attr('id');
			$(' .filter_trigger a:contains(' + $filter_id + ')').trigger('click');
			$container.shapeshift({
				animateOnInit: true,
				animationSpeed: 600
			});
			$(this).toggleClass('active').siblings().toggleClass('disable');
		};
	});
	$('.back_top').click(function(event){
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000,'easeInOutExpo');
		event.preventDefault();
	});
})
