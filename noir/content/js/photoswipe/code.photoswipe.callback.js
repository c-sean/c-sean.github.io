function myPhotoSwipe(_configs) {

	var configs = {
		options: {},
		selector: '#Gallery a',	
		attachTarget: false,		// use by array wrap json object: [{url: urlString, caption: imgAltString}]
		eventCallback: false		// use by json object: {eventHandle: eventCallbackFunction}
	};

	configs = $.extend(configs, _configs);

	var PhotoSwipe = Code.PhotoSwipe,
		attachTarget = configs.attachTarget !== false ? configs.attachTarget : window.document.querySelectorAll(configs.selector),
		instance = PhotoSwipe.attach( attachTarget, configs.options );
	
	/*
	 * Event callback
	 * 
	 * onBeforeShow
	 * onShow
	 * onBeforeHide
	 * onHide
	 * onDisplayImage
	 * onSlideshowStart
	 * onSlideshowStop
	 * onTouch
	 * onBeforeCaptionAndToolbarShow
	 * onCaptionAndToolbarShow
	 * onBeforeCaptionAndToolbarHide
	 * onCaptionAndToolbarHide
	 * onToolbarTap
	 * onBeforeZoomPanRotateShow
	 * onZoomPanRotateShow
	 * onBeforeZoomPanRotateHide
	 * onZoomPanRotateHide
	 * onZoomPanRotateTransform
	 * 
	 */
	
	if (configs.eventCallback !== false) {
		if (Object.keys(configs.eventCallback).length <= 0) alert('you need insert json data to eventCallback, like {eventHandle: eventCallbackFunction}');

		for (var k in configs.eventCallback) {
			instance.addEventHandler(PhotoSwipe.EventTypes[k], configs.eventCallback[k]);
		}
	}

	return instance;

}