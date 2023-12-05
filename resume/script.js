
var swiper = new Swiper(".mySwiper", {
      // direction: "vertical",
   forceToAxis: true,
      slidesPerView: 1,
      speed: 500,
      grabCursor: true,
      mousewheel: true,
      keyboard: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  }
    });
swiper.on('slideChangeTransitionEnd', anime);
swiper.on('scrollbarDragEnd', anime);

function anime() {
        if(swiper.activeIndex == 0) {
              transNum(2023);
          }
            else  { 
              resetNum(1980);
            }
            if (swiper.activeIndex == 7) { 
              progressAnimate();
            }
            else{
              progressInit();
            }
}

var myElement = document.getElementById('swiper');
var hammer = new Hammer(myElement);
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammer.on('swipeup', function() {
  swiper.slideNext();
});
hammer.on('swipedown', function() {
  swiper.slidePrev();
});


$(function(){
  var length = [];
$('.slider').each(function(i,e) {
      length[i] = 0;
      $(this).children().each(function() {
          length[i] += $(this).outerHeight(true);
      })
      $('<style>').html('@keyframes loop' + i + '{from {transform:translate3d(0,0,0);}to{transform:translate3d(0,' + -length[i] + 'px,0);}}').appendTo('head');
      $('<style>').html('@keyframes loop' + i + '{from {top:0;}to{top:' + -length[i] + 'px;}}').appendTo('head');

      $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this)).parent().css({
        'animation': 'loop' + i + ' linear '+ length[i]/80 +'s  infinite'
      });
      $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this));
});
})



var el = document.querySelector('.odometer');
 
var od = new Odometer({
  el: el,
  value: 1980,
  // duration:0,
  // Any option (other than auto and selector) can be passed in here
  format: '',
  theme: 'car'
});
 
function transNum(num) {
  setTimeout(function(){
  od.update(num);
}, 200);
}

const numbers = [1, 9, 8, 0];

function resetNum(num) {
  $('.odometer-value').each(function(i,val){
    $(val).html(numbers[i]);
  })
  od.value=num;
}

transNum(2023);


  var lineHtml = new ProgressBar.Line('.html', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#e54c20'});
  
  var lineCSS = new ProgressBar.Line('.css', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#264de4'});
  
  var lineJS = new ProgressBar.Line('.js', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#f0db4f'});
  

  var CirclePS = new ProgressBar.SemiCircle('.ps', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#001834'});
  
  var CircleCSS = new ProgressBar.SemiCircle('.ai', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#390000'});
  
  // var CircleAE = new ProgressBar.SemiCircle('.ae', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#00005b'});
  

  var lineEn = new ProgressBar.Line('.en', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#e54c20'});
  
  var lineJp = new ProgressBar.Line('.jp', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#264de4'});
  
function progressAnimate(){
lineHtml.animate(.8);
lineCSS.animate(.8);
lineJS.animate(.7);
CirclePS.animate(.8);
CircleCSS.animate(.7);
// CircleAE.animate(.7);
lineEn.animate(.6);
lineJp.animate(.4);
}

function progressInit(){
lineHtml.animate(0, {duration: 0});
lineCSS.animate(0, {duration: 0});
lineJS.animate(0, {duration: 0});
CirclePS.animate(0, {duration: 0});
CircleCSS.animate(0, {duration: 0});
// CircleAE.animate(0, {duration: 0});
lineEn.animate(0, {duration: 0});
lineJp.animate(0, {duration: 0});
}



