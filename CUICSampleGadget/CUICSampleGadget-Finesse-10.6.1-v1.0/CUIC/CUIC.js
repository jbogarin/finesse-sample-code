var permalink = "https://10.201.64.81:8444/cuic/permalink/PermalinkViewer.htmx?viewId=4133EFBD1000013D16907C420AC94051&amp;linkType=htmlType&amp;viewType=Grid";
var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging 

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
finesse.modules.SampleGadget = (function ($) {
  
	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	    

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			
	        
	        var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
			clientLogs.init(gadgets.Hub, "CUIC", finesse.gadget.Config); //this gadget id will be logged as a part of the message
			
			// add code to handle tab clicked
			containerServices = finesse.containerservices.ContainerServices.init();
            containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, function(){
			clientLogs.log("**** Gadget is now visible ****"); 
			 
			  if ($("#cuic").length) 
			 {
			 // only modify the html if we haven't done it before
			 
			   clientLogs.log("Gadget html already=" + $("#cuic").html()); 
			 }
			 else
			 
			 {
			    var html = '';
                // add a div tag to the html
                html += '<div id="cuic">';
				html += '<iframe src="' + permalink + ' " id="frame1" width="900" height="300"></iframe>';
				html += '</div>';
                
                //set the html document's agentout element to the html we want to render
				$("#agentout").html(html);
				clientLogs.log("Set html to=" + $("#cuic").html()); 
		
                // automatically adjust the height of the gadget to show the html
		         gadgets.window.adjustHeight();
				}
				   
			   });
            containerServices.makeActiveTabReq();
	    }   // init function
    };  // return
}(jQuery));
