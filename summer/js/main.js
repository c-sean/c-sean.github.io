$(document).ready(function(){
    // scrollToTop
    $('.footer .back_top').click(function(event){
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000,'easeInOutExpo');
		event.preventDefault();
	});
    // qanda slide
    $('.qanda li:even').click(function(){
	    $(this).next().slideToggle(500,'easeOutExpo');
	});
    // scrollToCourse
    function scrollToAnchor() {
        $('html, body').stop().animate({
            scrollTop: $('#'+sessionStorage.getItem('anchor')).offset().top-50
        }, 1000,'easeInOutExpo');
    }
    $('li a','.dropdown-menu').click(function(event){
        event.preventDefault();
        var $target = $(this).attr('class'),
            pageName = $('h2').text();
        sessionStorage.setItem('anchor', $target);
        if(pageName == '課程一覽'){
           scrollToAnchor();
        }
        else{
            location.href = 'index.html';
        }
    });
    $(window).load(function(){
        scrollToAnchor();
    });

    $(".block").click(function(e) {
    e.preventDefault();
    });
            
});