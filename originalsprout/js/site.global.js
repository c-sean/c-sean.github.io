/*
 * SITE.Global
 * 
 * @author  hom
 * @copyright   Copyright (C) KICKcreative Co., All Rights Reserved.
 * 
 */

var SITE = SITE || {};

;(function(SITE) {

	/**
	 * SITE.Global
	 * @param   
	 * 
	 **/

	SITE.Global = function() {
		// set public value
		this.$win = {};
		
		// set private value
		var STEP_PRICE = 0;

		// set construct in object
		this.__construct = function() 
		{
			$(function() {
				var $btnLogoAndHome   = $('#logo, #bt_home');
				var $btnHome          = $('#bt_home');
				var $btnAbout         = $('#bt_about');
				var $btnProduct       = $('#bt_product');
				var $btnContact       = $('#bt_contact');
				var $target           = $('html, body');
				// $('#product-list img').imgpreload({
				// 	this.
				// })
				//-------------------- nicescroll start --------------------//
				$("html").niceScroll({
					cursorcolor: '#B8D8D4',
					cursorwidth: 10
				});
				//-------------------- nicescroll end --------------------//
				//-------------------- skrollr start --------------------//
				skrollr.init({
			    	forceHeight: false,
			    	render: function(wrap) {
			    		var curTop  = wrap.curTop;
						// home
						if(curTop >= this.relativeToAbsolute(document.getElementById('home'), 'top', 'top') && curTop < this.relativeToAbsolute(document.getElementById('about'), 'center', 'top')) {
							$btnHome.addClass('active');
						} else {
							$btnHome.removeClass('active');
						}

						// about
						if(curTop >= this.relativeToAbsolute(document.getElementById('about'), 'center', 'top') && curTop < this.relativeToAbsolute(document.getElementById('about'), 'center', 'bottom')) {
							$btnAbout.addClass('active');
						} else {
							$btnAbout.removeClass('active');
						}

						// product
						if(curTop >= this.relativeToAbsolute(document.getElementById('product'), 'center', 'top') && curTop < this.relativeToAbsolute(document.getElementById('product'), 'top', 'top')) {
							$btnProduct.addClass('active');
						} else {
							$btnProduct.removeClass('active');
						}

						// contact
						if(curTop >= this.relativeToAbsolute(document.getElementById('contact'), 'bottom', 'center')) {
							$btnContact.addClass('active');
						} else {
							$btnContact.removeClass('active');
						}
			    	}

			   	});
//-------------------- skrollr end --------------------//
//-------------------- fancybox start --------------------
				$("#buy_bt").fancybox({
					padding : 0,
					margin : 0,
					centerOnScroll : true,
					showCloseButton : false,
					overlayColor : "#f7f7f4",
					overlayOpacity : 0.85,
					onComplete : function() {
						$('html').niceScroll({horizrailenabled:false});
						var popHeader = get_header();
						$('#l_side h4').text(popHeader[0]).animate({'opacity':.5}, 1200, 'easeOutExpo');
						$('#l_side h5').text(popHeader[1]).animate({'opacity':.5}, 1200, 'easeOutExpo');
						var d = get_product_data();
						var popImg = 'img/product/product_' + d.p_src + '.png';
						$('#img_wrap img').attr('src', popImg).animate({'opacity':1}, 1500, 'easeOutExpo');
						var option_html;
						for (var i = 0; i < d.ml.length ; i++) {
							var opt_str = d.ml[i] + 'ml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NT ' + d.price[i];
							option_html += '<option value="' + i + '">' + opt_str + '</option>';
						}
					//-------------------- dropDown start --------------------//
						var $select_item = $("#select_item");
						var dd = get_product_data();
						function get_price() {
							STEP_PRICE = dd.price[0];
						};
						get_price();
						$select_item.html(option_html).selectbox({
							onChange: function() {
								STEP_PRICE = dd.price[$select_item[0].selectedIndex];
							}
						});
					//-------------------- dropDown end --------------------//
					//-------------------- quantity start --------------------//
						$("#count .btn").on("click", function() {
						  var $button = $(this);
						  var oldValue = $button.parent().find("input").val();

						  if ($button.text() == "+") {
							  var newVal = parseFloat(oldValue) + 1;
						  } else {
						   // Don't allow decrementing below zero
						    if (oldValue > 1) {
						      var newVal = parseFloat(oldValue) - 1;
						    } else {
						      newVal = 1;
						    }
						  }

						  $button.parent().find("input").val(newVal);

						});
					//-------------------- quantity end --------------------//
					//-------------------- total start --------------------//
						var calcTotal = function() {
							var $quantity = $('.quantity input').val();
							var $totalNT = addCommas(STEP_PRICE * $quantity);
							$('#total_price').html($totalNT);
						};
						calcTotal();
						$('.sbOptions li, .btn').on('click', function() {
							calcTotal();
						});
					//-------------------- total end --------------------//
					//-------------------- ajax order start --------------------//
						var $overlayer = $('#over_layer'),
							$form = $('#order_form'),
							uri = $form.attr('action'),
							submit_active = false;

						$form.removeAttr('action');

						var update_hidden_field = function()
						{
							var header = get_header(),
								d  = get_product_data();
								
							$form.find('input[name="product_id"]').val(d.p_id);
							$form.find('input[name="product_name_en"]').val(header[0]);
							$form.find('input[name="product_name_ch"]').val(header[1]);
							$form.find('input[name="product_img"]').val(get_img());
							$form.find('input[name="product_total_price"]').val((get_product_price()).replace(',', ''));
						};

						update_hidden_field();
						
						$form.bind('submit', function (e) {
							$.fancybox.showActivity();
							$overlayer.css('display', 'block');

							if (submit_active == false) {
								submit_active = true;
								update_hidden_field();
								
								var form_data = $form.serialize();

								$.ajax({
									url: uri,
									type: "POST",
									data: form_data + '&originalsprout_csrf_token=' + $.cookie('originalsproutcsrf'),
									success: function (r) {
										if (r == 'success') {
											window.location.href = SITE_URL;
										} else {
											alert(r);
										}
										submit_active = false;
										$overlayer.css('display', 'none');
										$.fancybox.hideActivity();
									}
								});
							}
							
							e.preventDefault();
						});
					//-------------------- ajax order end --------------------//
					},
					onCleanup : function() {
						STEP_PRICE = 0;
					}
			 	});
//-------------------- fancybox end --------------------//
//-------------------- scrollTo start --------------------//
	// $('#header a').click(function(e){
		// e.preventDefault();
		// var scrollToID = $(this).attr('href');
		// $target.stop().animate({
		// 	scrollTop: $(scrollToID).offset().top
		// },600, 'easeOutQuad');
		// $.scrollTo(scrollToID, 600, {axis:'y'});

		// var checkID = $(this).attr('id');
		// if (checkID == 'logo') {
		// 	$(this).parent().next().find('a').removeClass('active');
		// } else {
		// 	$(this).addClass('active').parent().siblings().children().removeClass('active');
		// }
		// return false;
	// });
				// $('#Btabout').click(function(e){
		// e.preventDefault();
		// console.log($btnAbout);
		// });
				$('#header a').on('click',function(e){
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1000,'easeOutExpo');
                    e.preventDefault();
                });

				// var speed = 1000;
				// var ease  = 'easeInOutExpo';
				// // home
				// $btnLogoAndHome.on('click', function(e) {
				// 	e.preventDefault();
		  //   		$.scrollTo("#home", speed, {
		  //   			axis:'y',
		  //   			easing: ease
				// 	});
		  //   	});

				// // about
				// $btnAbout.on('click', function(e) {
				// 	e.preventDefault();
		  //   		$.scrollTo("#about", speed, {
		  //   			axis:'y',
		  //   			easing: ease
				// 	});
		  //   	});

				// // product
				// $btnProduct.on('click', function(e) {
				// 	e.preventDefault();
		  //   		$.scrollTo("#product", speed, {
		  //   			axis:'y',
		  //   			easing: ease
				// 	});
		  //   	});	

				// // contact
				// $btnContact.on('click', function(e) {
				// 	e.preventDefault();
		  //   		$.scrollTo("#contact", speed, {
		  //   			axis:'y',
		  //   			easing: ease,
				// 	});
		  //   	});
//-------------------- scrollTo end --------------------//
//-------------------- bxslider start --------------------//
				var slider = $("#thumbnail ul").bxSlider({
				    slideWidth: 76,
				    minSlides: 8,
				    maxSlides: 8,
					moveSlides: 8,
					pager: false,
					infiniteLoop: false,
					onSlideNext: slideMove,
					onSlidePrev: slideMove,
					onSliderLoad: function(){
						$('.bx-prev', '#thumbnail').addClass('locked');
					}
				});

				function slideMove(ele, o, newIdx){
					if (newIdx == (Math.ceil(slider.getSlideCount() / 8) - 1)) {
						$('.bx-next', '#thumbnail').addClass('locked');
					} else {
						$('.bx-next', '#thumbnail').removeClass('locked');
					}

					if (newIdx == 0) {
						$('.bx-prev', '#thumbnail').addClass('locked');
					} else {
						$('.bx-prev', '#thumbnail').removeClass('locked');
					}
				};
//-------------------- bxslider end --------------------//
//-------------------- select product start --------------------//
				var pcontext = $('#main_text');
				$('.item').before('<img class="item">');
				var img = $('.item');

			    var transition_start = [ 250, 880 ];
			    var transition_end = [ 50, 250 ];
			    var opacity_start = [ 1, 0 ];
			    var opacity_end = [ 0, 1 ];

				$('#product-list').on('click', 'a', function(e){
					e.preventDefault();
					var $this = $(this);
					var url = $this.attr('href');
					var liIndex = $this.parent().index();
			        var liEnd = ($('.slide').length)-1;
			        var liSelected = $('.selected_thumb').index();
					var fadeInsrc = 'img/product/product_'+(liIndex+1)+'.png';
					var fadeOutsrc = 'img/product/product_'+(liSelected+1)+'.png';

					var targetImg = [ fadeOutsrc, fadeInsrc ];
					var targetNum = [ 0, 1 ];

					if(!$this.parent().hasClass('selected_thumb')) {
						img.eq(1).attr('src','');
						pcontext.stop().fadeOut('1000', function(){
							$('#product_set').append('<img class="ajaxLoader" src="css/bxslider/bx_loader.gif">');
							pcontext.delay(250).load(url, function(){
								$('.ajaxLoader').remove();
								pcontext.stop().fadeIn(1500);
							});
						});
						
						for (var i =0 ; i < targetNum.length; i++) {
							$('.item').eq(i).attr('src', targetImg[i]).css({'left': transition_start[i], 'opacity': opacity_start[i]}).stop().animate({'left': transition_end[i], 'opacity': opacity_end[i]}, 1200, 'easeOutQuart');		
						};
						$(this).parent().addClass('selected_thumb').siblings().removeClass('selected_thumb');
					}
				});
//-------------------- select product end --------------------//
			});
		};

		// set private function
		function get_product_data()
		{
			var d = $('#product_description').data('orderinfo');
			return d;
		}
		function get_header()
		{
			var h_en = $('#product_description h2').text();
			var h_ch = $('#product_description h3').text();
			var header = [h_en, h_ch];
			return header;
		}
		function get_img()
		{
			var src = $('#img_wrap').find('img').attr('src');
			return src;
		}
		function get_product_price()
		{
			var price = $('#total_price').text();
			return price;
		}
		function addCommas(nStr)
		{
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
		// set public function
		

		this.init = function() {};
		

		var _this = this;
		
		_this.__construct();
	};

})(SITE);