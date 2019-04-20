/*
 * KC.Welcome
 * 
 * @author		moncki
 * @copyright	Copyright (C) KICKcreative Co., All Rights Reserved.
 * 
 */

var KC = KC || {};

(function (KC) {


    KC.ItemPosControler = function() {

		var _this = this,
			_winW = 0,
			_winH = 0,
			_itemW = 0,
			_itemArr = [],
			_typeArr = [],
			_combinationArr = [],
			_itemRange = [],
			_itemTotal = 0,
			_quantityW = 0,
			_container = {},
			_itemPosArr = [],
			_selectNum = 0,
			_quantityH = 0;

		function init(itemArr, itemRange, typeArr, repeat, container) {
			_quantityW = itemRange.length;
			_itemArr = itemArr;
			_repeat = repeat;
			_itemTotal = _itemArr.length;
			_container = container;
			_itemRange = itemRange;
			_typeArr = typeArr;
			resize();
			initCombination();
		}

		// function initResize() {
			// resize();
			// var timer;
			// $(window).resize(function() {
			// 	clearTimeout(timer);

			    // timer = setTimeout(function() {console.log($(window).width(),$('.projectCon').innerWidth());
			          // resize(); //callback your coding
			      // }, 250);
			// });
		// }


		function resize() {
			_winW = _container.innerWidth();
			_itemW = Math.floor(_winW / _quantityW);
		}

		
		function initCombination() {
			for(var i = 0; i < _typeArr.length; i++) {
				for(var j = 0; j < _itemRange.length; j++) {
					if(_itemRange[j] == 0) {
						_typeArr[i][j] = 0;
					}
				}
			}

			setPosArr();
		}


		function setPosArr()
		{
			var itemNum = 0,
				arrNum = 0;

			_itemPosArr = [];
			_combinationArr = [];


			while(itemNum < _itemTotal) {
				_selectNum = chousePosArr();			
				_combinationArr.push(_typeArr[_selectNum]);

				for(var i = 0; i < _combinationArr[arrNum].length; i++) {
					if(_combinationArr[arrNum][i] == 1) {
						_itemPosArr.push({X:i,Y:arrNum});
						//console.log("X:"+_itemPosArr[itemNum].X);
						//console.log('a' + _itemPosArr.push({X:i,Y:arrNum}));
						itemNum++;
					}
				}
				arrNum++;
			}

			_quantityH = arrNum;
		}


		function chousePosArr() {
			var myNum = Math.floor(Math.random() * _typeArr.length);

			if(!_repeat) {
				while( _selectNum == myNum ) {
				  myNum = Math.floor(Math.random() * _typeArr.length);
				}
			}
			
			return myNum;
		}


		function setItemPos() {
			// console.log("setItemPos:"+_itemTotal);
			for(var i = 0; i < _itemTotal; i++) {
				// console.log("X:"+_itemPosArr[i].X*_itemW);
				_itemArr[i].css({"left" : _itemPosArr[i].X * _itemW, "top" : (_itemPosArr[i].Y) * _itemW, "width" : _itemW + "px", "height" : _itemW + "px"});
				// _itemArr[i].css({"left" : _itemPosArr[i].X * _itemW, "top" : (_itemPosArr[i].Y) * _itemW});
			}
		}


		function resetItemPos() {
			setItemPos();
		}

		function getQuantityH() {
			return _quantityH;
		}

		
		return{
			init:init,
			setItemPos:setItemPos,
			resize:resize,
			resetItemPos:resetItemPos,
			getQuantityH:getQuantityH
		}
	};
	
})(KC);
