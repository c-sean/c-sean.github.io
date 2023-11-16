// const container = document.getElementById("swiper");
// container.addEventListener("wheel", mousewheel, false);

// const multiplier = 2;
// const center = 2500;
// const interesting = 500;

// function mousewheel(event) {
//   event.preventDefault();
//   let dx = event.deltaX * multiplier;
//   if (Math.abs(container.scrollTop - center) < interesting){
//     dx /= 25;
//   }
//   container.scrollLeft += dx;
  
// }

var $slider = $('.slider'),
    length = [];
var swiper = new Swiper(".mySwiper", {
      // direction: "vertical",
      slidesPerView: 1,
      speed: 500,
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '"> <span>'  + (index) + "</span></span>";
        // },

      mousewheel: true,
      keyboard: true,
      forceToAxis:true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on:{
          slideChangeTransitionEnd: function () {
          // console.log(swiper.activeIndex);
          if(swiper.activeIndex == 1 || swiper.activeIndex == 6) {
            // console.log('done');
            // swiper.changeDirection();
          }
          if(swiper.activeIndex == 0) {
            transNum(2023);
          }
          else if (swiper.activeIndex == 7) { 
            progressAnimate();
          }
        },
         slideChange: function (){
            if (swiper.activeIndex == 6 || swiper.activeIndex == 8) { 
            progressInit();console.log(swiper.activeIndex);
          }
          // if(swiper.activeIndex == 1) {
            // resetNum();
          // }
          // console.log(swiper.activeIndex);
         },
         reachBeginning: function (){
          //   if (swiper.activeIndex == 6 || swiper.activeIndex == 8) { 
          //   progressInit();
          // }
          // console.log($('.odometer-value'));
            // if(swiper.activeIndex == 0) {
              resetNum();
            // }
         }
      }
    });

$slider.each(function(i,e) {
      length[i] = 0;
      $(this).children().each(function() {
          length[i] += $(this).outerHeight(true);
      })
      $('<style />').html('@keyframes loop' + i + '{from {transform:translate3d(0,0,0);}to{transform:translate3d(0,' + -length[i] + 'px,0);}}').appendTo('head');

      $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this)).parent().css({
        'animation': 'loop' + i + ' linear '+ length[i]/80 +'s  infinite'
      });
      $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this));
});

  //   $slider.on({'mouseleave': function() {
  //    $(this).css({'animation-play-state':'running'});
    
  //   }, 'mouseenter': function(){
  //    $(this).css({'animation-play-state':'paused'});
  //   }
  // });
    $('.swiper').on({'mousedown': function(){
        $(this).css({'cursor':'url(img/closedhand.cur),move'});
      }, 'mouseup ': function(){
        $(this).css({'cursor':'url(img/openhand.cur),move'});
      }
  });

// $()
// var swiper2 = new Swiper(".mySwiper2", {
//   direction: "horizontal",
//   slidesPerView: 1,
//   // spaceBetween: 50,
//   // mousewheel: true,
//   keyboard: true,
//   forceToAxis:true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// $('.counter').counter({
// 	// autoStart: true, 
// 	// duration: 5000,
// 	// countFrom: 2005,              // start counting at this number, default: 0
//   	countTo: 2023,  
// });
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

function resetNum() {
  $('.odometer-value').each(function(i,val){
    // console.log($(val).html());
    $(val).html(numbers[i]);
  })
  od.value=1980;
}

transNum(2023);
// window.odometerOptions = {
//   selector: '.odometer', 
//   format: 'd'
// }

// swiper.on('orientationchange', function () {
//   console.log('slide changed');

// });


  var lineHtml = new ProgressBar.Line('.html', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#e54c20'});
  
  var lineCSS = new ProgressBar.Line('.css', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#264de4'});
  
  var lineJS = new ProgressBar.Line('.js', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#f0db4f'});
  

  var CirclePS = new ProgressBar.SemiCircle('.ps', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#001834'});
  
  var CircleCSS = new ProgressBar.SemiCircle('.ai', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#390000'});
  
  var CircleAE = new ProgressBar.SemiCircle('.ae', {easing: 'easeInOut', trailWidth: 1, strokeWidth: 4.5, color: '#00005b'});
  

  var lineEn = new ProgressBar.Line('.en', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#e54c20'});
  
  var lineJp = new ProgressBar.Line('.jp', {easing: 'easeInOut', trailWidth: .5, strokeWidth: 1.5, color: '#264de4'});
  
function progressAnimate(){
lineHtml.animate(.8);
lineCSS.animate(.8);
lineJS.animate(.7);
CirclePS.animate(.8);
CircleCSS.animate(.7);
CircleAE.animate(.7);
lineEn.animate(.6);
lineJp.animate(.4);
}

function progressInit(){
lineHtml.animate(0, {duration: 0});
lineCSS.animate(0, {duration: 0});
lineJS.animate(0, {duration: 0});
CirclePS.animate(0, {duration: 0});
CircleCSS.animate(0, {duration: 0});
CircleAE.animate(0, {duration: 0});
lineEn.animate(0, {duration: 0});
lineJp.animate(0, {duration: 0});
}



