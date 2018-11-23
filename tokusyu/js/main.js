$(document).ready(function() {
 
  $("#owl-example").owlCarousel({
    items : 3,
    itemsDesktop : false,
    pagination : true
  });

  $("#owl-example2").owlCarousel({
    autoPlay: true,
    pagination : false
  });

  $(".block").click(function(e) {
  	e.preventDefault();
  });
});