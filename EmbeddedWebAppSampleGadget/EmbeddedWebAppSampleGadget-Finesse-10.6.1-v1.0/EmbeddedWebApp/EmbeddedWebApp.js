var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};

// Gadget Config needed for initializing Logging
/** @namespace */
finesse.gadget.Config = (function () {
	var _prefs = new gadgets.Prefs();

	/** @scope finesse.gadget.Config */
	return {
		authorization: _prefs.getString("authorization"),
		country: _prefs.getString("country"),
		language: _prefs.getString("language"),
		locale: _prefs.getString("locale"),
		host: _prefs.getString("host"),
		hostPort: _prefs.getString("hostPort"),
		extension: _prefs.getString("extension"),
		mobileAgentMode: _prefs.getString("mobileAgentMode"),
		mobileAgentDialNumber: _prefs.getString("mobileAgentDialNumber"),
		xmppDomain: _prefs.getString("xmppDomain"),
		pubsubDomain: _prefs.getString("pubsubDomain"),
		restHost: _prefs.getString("restHost"),
		scheme: _prefs.getString("scheme"),
		localhostFQDN: _prefs.getString("localhostFQDN"),
		localhostPort: _prefs.getString("localhostPort"),
		clientDriftInMillis: _prefs.getInt("clientDriftInMillis")
	};
}());

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.EmbeddedWebAppGadget = (function ($) {
	var _clientLogger = finesse.cslogger.ClientLogger;   // declare _clientLogger
	var _urlToLoad;

	/*
	 * The following will be used to check if the tab is currently not visible.  We
	 * need to do this because there is no way currently of being notified when the
	 * User navigates away.  This allows us to do things on our Gadget if this is so.
	*/	
	_checkForTabNotVisible = function () {
		if (finesse.containerservices.ContainerServices.tabVisible()) {
			window.setTimeout(_checkForTabNotVisible, 100);
		}
		else
		{
			_clientLogger.log("Tab is no longer visible.  Stopped looking.");
			// Here we can do what we need to do to hide things if needed.
		}
	};
	
	/*
	 * The following runs when the Tab becomes active.  Here we initialize the contents
	 * of the iFrame containing our Gadget.
	 */
	_handleTabVisible = function () {
		_clientLogger.log("_handleTabVisible()");
		
		if ($("#displayOut").html() == "") 
		{
			var html = '<iframe src="' + _urlToLoad + '" id="displayFrame" ></iframe>';
	
			//set the html document's agentout element to the html we want to render
			$("#displayOut").html(html);
			_clientLogger.log("Setting #displayOut.html to: " + $("#displayOut").html()); 
	
			// automatically adjust the height of the gadget to show the html
			gadgets.window.adjustHeight();		}
		
		_clientLogger.log("Starting the _checkForTabNotVisible() checker...");
		window.setTimeout(_checkForTabNotVisible, 100);
	};
	
	/** @scope finesse.modules.EmbeddedWebAppGadget */
	return {
		/**
		 * Performs all initialization for this gadget
		 */
		init : function (urlToLoad) {
			_urlToLoad = urlToLoad;
			
			_clientLogger.init(gadgets.Hub, "EmbeddedWebAppGadget", finesse.gadget.Config); //this gadget id will be logged as a part of the message
			
			_clientLogger.log("Initializing Container Services...")
			containerServices = finesse.containerservices.ContainerServices.init();
			
			_clientLogger.log("Adding Tab Visible Handler...")
			containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, _handleTabVisible);
			
			// This requests to be notified of the currently active tab (in case we are already on it). 
			finesse.containerservices.ContainerServices.makeActiveTabReq();
			
		}   // init function
	}; // return
}(jQuery));
