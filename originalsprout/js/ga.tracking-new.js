/*
	Tracks website in Google Analytics. 
		
	link. https://developers.google.com/analytics/devguides/collection/analyticsjs/
	link. https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
*/


(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date(); a = s.createElement(o),
	m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-25807544-2');
ga('send', 'pageview');

	
/*
	Tracks the event in Google Analytics. 
	
	@eventCategory The category of the event as string. e.g. 'Links'. Cannot be empty.
	@eventAction The action of the event as string. e.g. 'Button'. Optional.
	@eventLabel The label of the event as string. e.g. 'MyButton'. Optional.
	@eventValue An integer value. Optional.
	
	ex. ga('send', 'event', 'category', 'action', 'label', value);
	link. https://developers.google.com/analytics/devguides/collection/analyticsjs/events
*/


function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
	if (eventCategory == null) {
		return;
	}
	if (eventAction == null) {
		eventAction = '';
	}
	if (eventLabel == null) {
		eventLabel = '';
	}
	
	if (eventValue == null) {
		ga('send', 'event', eventCategory, eventAction, eventLabel);
	} else {
		ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
	}
}


/*
	Tracks the page in Google Analytics. 
	
	@pageLink The view of the page as string. e.g. 'Links'. Cannot be empty.
	
	ex. ga('send', 'pageview', '/my-overridden-page?id=1');
	link. https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
*/


function trackPage(pageLink) {
	if (pageLink == null) {
		return;
	}
	
	ga('send', 'pageview', pageLink);
}