/*
 * SITE.Global
 * 
 * @author  Jay
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
		//-- set public value --//		
		
		//-- set private value --//
		// this class's global var
		var $scrollBody = $('#skrollr-body'),
			$projectCon = $('.projectCon'),
			$content = $('.content'),
            $workBgnCon = $('.workBgnCon'),
			$win = $(window),
			_winW = 0,
			_winH = 0,
			$body = $('body'),
			$html = $('html'),
			$header = $('#header'),
			$nav = $('.nav'),
			$box = $('.box'),
			$works_content = $('#works_items'),
			$calBlock = $('.calBlock'),
			$down_arrow = $('.down_arrow'),			
			$navItem = $('#nav_set a'),
			_workType = 'CHOICE',
			$navAbout = $('#nav_about span'),
			$navWorks = $('#nav_works span'),
			$navContact = $('#nav_contact span'),
			$down_arrow = $('.down_arrow'),
			choiceClick = false,
			speed = 1000,
			ease  = 'easeInOutExpo',
			itemArr = [],
			typeArr = [],
			itemTotal = 0,
			itemRange = [],
			interval = {},
			parallax = {},
			view = 60,
			boxW = 0,
			_repeat = false,
			headerHeight = 0, // init main menu parallax data end's value
			boxW = 0, // this width value for main menu & sub menu & about item box set size
			multipleW = [0, 1, 2, 1], // for main menu & sub menu & about item box position left
			multipleH = [0, 0, 0, 0]; // for main menu & sub menu & about item box position top

		// this var for sub menu
	    var $submenu_back_wrapper = $('.js-submenu_back_wrapper'),
			$submenuFlipSet = $('.submenuFlipSet'),
			rotateAngle,
			positive = true;

		
		//-- set private function --//
		// $('.about_content_wrapper' ).hover(function() {
				// var $this = $('.about_content_wrapper' );console.log('try');
				// $this.parent().css('z-index', '+=2');
				// $this.find('.detail').stop().animate({'width': '200%'}, 400, 'easeInOutExpo', function(){
				// 	$(this).children('.detail_wrapper').show(100);
				// 	$(this).children('.detail_icon').show(100);
				// });
			// }, function() {
			// 	var $this = $(this);
			// 	$this.parent().css('z-index', '-=1');
			// 	$this.find('.detail').children('.detail_icon').hide(100);
			// 	$this.find('.detail').children('.detail_wrapper').hide(100, function(){
			// 		$(this).parent().stop().animate({'width': '0'}, 400, 'easeInOutExpo',function(){
			// 			$(this).parent().parent().css('z-index', '0');
			// 		});
			// 	});
			// });
		// init parallax plugin
		function initParallax() {
			parallax = skrollr.init({
				forceHeight:false,
				render: function(wrap) {
		    		var curTop  = wrap.curTop;

					// about
					if(curTop >= this.relativeToAbsolute(document.getElementById('about'), 'center', 'top') && curTop < this.relativeToAbsolute(document.getElementById('about'), 'center', 'bottom')) {
						$navAbout.addClass('nav_active');
					} else {
						$navAbout.removeClass('nav_active');
					}

					// works
					if(curTop >= this.relativeToAbsolute(document.getElementById('works'), 'center', 'top') && curTop < this.relativeToAbsolute(document.getElementById('contact'), 'bottom', 'center')) {
						$navWorks.addClass('nav_active');
						randomTransitions($('.flipWorld'), 0, 1);
					} else {
						$navWorks.removeClass('nav_active');
					}

					// contact
					if(curTop >= this.relativeToAbsolute(document.getElementById('contact'), 'bottom', 'center') && curTop <= this.relativeToAbsolute(document.getElementById('contact'), 'bottom', 'bottom')) {
						$navContact.addClass('nav_active');
 					} else {
						$navContact.removeClass('nav_active');
					}
				}
			});			
		}

		// init nicescroll plugin
		function init_nicescroll() {
			$html.niceScroll({
				zindex :99999,
				scrollspeed :100,
				railpadding: {top:3, right:3, left:0, bottom:3}
			});

			$html.niceScroll().scrollstart(function(info) {
				if(interval) clearInterval(interval);
				interval = setInterval (getViewPort, 50);
			});

			$html.niceScroll().scrollend(function(info) {
				if(interval) clearInterval(interval);
			});
		}
		
		// get camera shot move position
		function getViewPort() {
			var scrollTop = document.documentElement.scrollTop + document.body.scrollTop,
				myTop = scrollTop + view;
				// console.log(myTop);
			TweenMax.set($content, {css : {perspective : _winW / 2, transformOrigin : '50% ' + myTop + 'px'}});
		}

		// set main menu & sub menu & about box size and position
		function calculateBox(items) {
			$.each(items, function(key, item) {
				var $item = $(item),
					boxLeft = boxW * multipleW[key],
					boxTop = boxW * multipleH[key];

				$item.css({'left': boxLeft, 'top': boxTop});
				$item.width(boxW);
				$item.height(boxW);

			});
		}

		// set item animate flip
		function setItemFlip() {
			if(_workType == 'CHOICE') {
				$flipCon.attr('data--' + view + '-bottom', 'transform:rotateX(-90deg); -webkit-transform:rotateX(-90deg); opacity:0; filter: alpha(opacity=0)";').attr('data-center', 'transform:rotateX(-0deg); -webkit-transform:rotateX(0deg); opacity:1;filter: alpha(opacity=100)"');

				TweenMax.set($flipCon, {css : {transformOrigin : 'left top', rotationX : -90}});
				TweenMax.set($scrollBody, {css : {'height' : _winH}});
			}
		}

		// set sub menu animate flip
		function submenu_flip() {
			if(positive == true) {
				rotateAngle = 180;
				TweenMax.to($submenuFlipSet, .6, {rotationY:rotateAngle});
				positive = false;
			} else {
				rotateAngle = 0;
				TweenMax.to($submenuFlipSet, .6, {rotationY:rotateAngle});
				positive = true;
			}
		}

		// get header height
		function getHeaderH() {
			headerHeight = _winH - view; // get main menu parallax data end's value

			return headerHeight;
		}

		// reset content height
		function resetContentH() {
		    var contentH = ((_itemPosControler.getQuantityH() + 1) * (_winW / 6) - 70) + 800 + "px";

		    $content.css({"height" : contentH});
		    $workBgnCon.css({ "height": contentH});
		}

		// work type item transition
		function randomTransitions(item, init_item_opa, fade_item_opa) {	
			// init item opacity
			// item.css('opacity', init_item_opa);
			item.each(function() {
				var delayTime = Math.random() * 1000,
					obj = this;				
				setTimeout(function() {
				    // fade out item				   
					$(obj).animate({opacity: fade_item_opa}, 1000);
				}, delayTime)
			});

		}

		// set scroll to
		function scroll_to(id) {
			$.scrollTo(id, speed, {
    			axis:'y',
    			easing: ease
			});
		}

		// set show detail
		function showDetail() {
			$('.works_item_wrapper, .about_content_wrapper').hover(function() {
				var $this = $(this);
				$this.parent().css('z-index', '+=2');
				$this.find('.detail').stop().animate({'width': '200%'}, 400, 'easeInOutExpo', function(){
					$(this).children('.detail_wrapper').show(100);
					$(this).children('.detail_icon').show(100);
				});
			}, function() {
				var $this = $(this);
				$this.parent().css('z-index', '-=1');
				$this.find('.detail').children('.detail_icon').hide(100);
				$this.find('.detail').children('.detail_wrapper').hide(100, function(){
					$(this).parent().stop().animate({'width': '0'}, 400, 'easeInOutExpo',function(){
						$(this).parent().parent().css('z-index', '0');
					});
				});
			});
		}

		// set item position-width-height & call setItemFlip resetContentH
		function setItems() {
			var itemTotal = $flipWorld.length;
				itemArr=[];

			for(var i = 1; i <= itemTotal; i++)
			{
				itemArr.push($(".projectCon li:nth-child(" + i + ")"));
			}

			// console.log("itemArr:"+itemArr);
			_itemPosControler.init(itemArr, itemRange, typeArr, _repeat, $projectCon);
			
			_itemPosControler.setItemPos();
			resetContentH();
			$html.getNiceScroll().resize();

			setTimeout(function () {
			    // setItemFlip();
				parallax.refresh();
				getViewPort();
			}, 500);
		}
// $.getJSON('content/ajax/works.json', function(data){
// 	console.log(data);
// })
		// get json & append to html
		function GetItems(url, callback) {
			//loading show
			
			//hide content
			$works_content.empty().hide();

 			$.getJSON(url, function(data){
				
				for(var i in data) {
					var item = data[i];

					var contStr = '<li class="flipWorld"><div id="project_' + item.id + '" class="flipCon works_item_wrapper">' +
					'<div class="popup"><div class="works_item" data-rid="' + item.rid + '" style="cursor: pointer;"><img src="' + item.thumbImg + '" alt=""></div>' + '</div>' +
					'<div class="detail">' +
					'<div class="detail_wrapper">' +
					'<h4 class="detail_title">' + item.title + '</h4>' + 
					// '<p class="detail_desc">' + item.description + '</p>' + 
					'<p class="detail_text">' + item.thumbText + '</p>' + 
					'</div>' +
					'<span class="detail_icon">+</span>' + 
					'</div></div></li>';

					$works_content.append(contStr);
				}

				var $works_item = $('.works_item img');
				
				$works_item.on("load",function (){
					$(this).parent().BlackAndWhite();
				});

				//flip binding
				
				//show content
				$works_content.fadeIn(2000);

				//loading hide
				$flipCon = $('.flipCon');
				$flipWorld = $('.flipWorld');
				$works_item = $('.works_item');
				$itemWrap = $('.works_item_wrapper')
				$popup = $('.popup');

				setItems();
				showDetail();

				$popup.bind('click', function(e) {
					e.preventDefault();
					// $.getJSON('content/ajax/works.json', function (data) {
						initPhotoSwipe(data);
					// });
				});

				//callback
				callback && callback();
			});
		}

		function initPhotoSwipe(galleryJsonData) {
			var pswi = myPhotoSwipe({
				options: {
					captionAndToolbarFlipPosition: false,
				    nextPreviousSlideSpeed: 500,
				    captionAndToolbarAutoHideDelay: 0,
				    captionAndToolbarOpacity: 1,
				    zIndex: 1300,
				    getImageSource: function(obj){
				    	console.log(obj);
				    	// for (var i in obj) {
							return obj.popupImg;
						// }
					},
				    getImageCaption: function(obj){
 
	 	                var captionTitle, captionTitleEl;
		                var captionDesc, captionDescEl;

				        //wan: 看能不能在這邊處理顯示隱藏 caption & desc

		                if (obj.title != undefined && obj.title != null)
		                {
		                    captionTitle = obj.title;
		                    captionDesc = obj.description;

		                    // Return a DOM element with custom styling
		                    captionTitleEl = document.createElement('h2');
		                    captionDescEl = document.createElement('p');

		                    captionTitleEl.appendChild(document.createTextNode(captionTitle));
		                    captionDescEl.appendChild(document.createTextNode(captionDesc));
                        }
	                    

		                return [captionTitleEl, captionDescEl];
		            }
				},
				attachTarget: galleryJsonData,
				eventCallback: {
					onBeforeShow: function() {
						var $photoswipeDocLayer = $('.ps-document-overlay');

						$html.getNiceScroll().hide();

						$photoswipeDocLayer.css({
							position: 'fixed',
							height: '100%'							
						});
					},						
					onBeforeHide: function() {
						$html.getNiceScroll().show();							
					},
					onShow: function() {
						// open animate
					    var $psEl = $('.ps-carousel, .ps-toolbar'),
							$psLayer = $('.ps-uilayer'),
                            $psCaption = $('.ps-caption'),
                            $psCaptionTitle = $psCaption.find('h2'),
                            $psCaptionDesc = $psCaption.find('p');

					    $psEl.hide();
					    $psCaption.hide();

						$psLayer.css({
							position: 'fixed',
							top: '50%',
							'z-index': 1400,
							opacity: 1,
							height: 0
						});

						$psLayer.stop().animate({
							top: 0,
							height: '100%'
						}, 800, 'easeInOutExpo', function(){
						    $psEl.fadeIn(800);

						    if ($psCaptionTitle.text() === 'undefined' || $psCaptionTitle === 'null' && $psCaptionDesc.text() === 'undefined' || $psCaptionDesc === 'null') {
						        $psCaption.hide();
						    } else if ($psCaptionTitle.text() === 'undefined' || $psCaptionTitle === 'null') {
						        $psCaption.fadeIn(800);
						        $psCaptionTitle.hide();
						    } else if ($psCaptionDesc.text() === 'undefined' || $psCaptionDesc === 'null') {
						        $psCaption.fadeIn(800);
						        $psCaptionDesc.hide();
						    } else {
						        $psCaption.fadeIn(800);
						    }

						    $(this).animate({
							    opacity: 0
							}, 800, function() {
								$(this).hide();
							});
						});						
					}
				}
			});

			pswi.show(0);
		}	

		// scroll arrow down icon animate
		function downArrow() {
			$down_arrow.css({
				'margin-top': 22,
				opacity: 1
			}).delay(100).animate({
				opacity: 0,
				'margin-top': 40
			}, 600, 'swing', downArrow);
		}

		// init choice set
		function initChoice() {
			typeArr = [[null, 0, 0, 1, null, null], [null, 0, 1, 0, null, null], [null, 1, 0, 0, null, null], [null, 1, 1, 0, null, null], [null, 0, 1, 1, null, null]];
			itemRange = [0, 1, 1, 1, 0, 0];
			_repeat = false;
// showDetail();
			GetItems('content/ajax/works.json', function () {
			    $nav.css('background-color', 'transparent');
			});
		}

		// init list set
		function initList() {
			typeArr = [[1, 1, 1, 1, 1, 1]];
			itemRange = [1, 1, 1, 1, 1, 1];
			_repeat = true;

			GetItems('content/ajax/works.json', function () {
				// randomTransitions($flipWorld, 0, 1);
				scroll_to('#works');				
				$('.flipWorld:nth-child(6n+5), .flipWorld:nth-child(6n+6)').find('.detail').addClass('pos_r');

				$nav.css('background-color', '#000');
			});
		}

		// init this site all setting
		function init() {	
			calculateBox($calBlock);

			// init sub menu flip
			// TweenMax.set('.submenuFlipWrapper', {perspective : 600});
			// TweenMax.set('.submenuFlipSet', {transformStyle : 'preserve-3d'});
			// TweenMax.set('.submenu_back', {rotationY : -180});
			// TweenMax.set(['.submenu_back', '.submenu_front'], {backfaceVisibility : 'hidden'});

			// check type is choice or list
			if(_workType == 'CHOICE') {
				initChoice();
			} else if(_workType == 'LIST') {
				initList();
			}

			// nav scroll_to & hover
			$navItem.click(function(e) {
				e.preventDefault();
				var $this = $(this);
				var currentId = $this.attr('href');
				scroll_to(currentId);
			});

			// submenu click change work type & call the type init
			$submenu_back_wrapper.find('a').click(function(e) {
				e.preventDefault();

				// sub menu click init var
				var $this = $(this),
					currentId = $this.attr('href'),	
					$getClass = $this.attr('class');
					$getTitle = $this.children('.submenu_item_text').text();
					// console.log($getTitle);

				$('.submenu_title').text($getTitle);
				$this.parent().siblings().removeClass('submenu_active');
				$this.parent().addClass('submenu_active');

				// check getclass has listdisplay
				if($getClass == 'listDisplay') {
					// set worktype change list
					_workType = 'LIST';
					choiceClick=false;
					// check worktype is list
					if(_workType == 'LIST') {		
						initList();
					}
				} else {
					// set worktype change choice
					_workType="CHOICE";
					choiceClick=true;
					// check worktype is choice
					if(_workType == 'CHOICE') {
						initChoice();
					}
				}				
			});
		}
		
		//-- set construct in object --//
		this.__construct = function() {

			$(function() {

				init_nicescroll();
				initParallax();

				// new value
				_winW = $win.width(); // get window width

				if(_winW < 1024) {
					_winW = 1024;
				}

				_winH = $win.height(); // get window height
				boxW = Math.floor(_winW / 6); // this width value for main menu & sub menu & about item box set size
				
				// set header height
				$header.height(getHeaderH());

				// init this site
				init();				

				// init fullscreen background plugin
				$header.fullscreenBackground({
					defaultCss: false
				});

				// $('#submenu_front, #submenu_back a').click(function() {
				// 	submenu_flip();
				// });		

				downArrow();				

			});

			$win.resize(function() {
				// new value
				_winW = $win.width(); // get window width

				if(_winW < 1024) {
					_winW = 1024;
				}

				_winH = $win.height(); // get window height
				boxW = Math.floor(_winW / 6); // this width value for main menu & sub menu & about item box set size
		
				// set header height
				$header.height(getHeaderH());

				calculateBox($calBlock);
				_itemPosControler.setItemPos();
				resetContentH();
			});

		};		

		var _this = this;
		
		_this.__construct();
	};

})(SITE);