var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

// Gadget Config needed for instantiating ClientServices
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
finesse.modules.HubTopic = (function ($) {
   
    
	   /**
     * Handler for the dataRequestHandler from a hub.subscribe request.
	 *
	 *
     */
	var _dataRequestHandler = function (topic, data) {
        var dataCopy;
         clientLogs.log ("In _dataRequestHandler");
        //Ensure a valid data object with "type" and "data" properties.
        if (typeof data === "object" &&
                typeof data.type === "string" &&
                typeof data.data === "object") {
			switch (data.type) {
			case "SendDataReq":
			     // place the text in the 'hubtext' element
				 $('#hubtext').html(data.data.text);
				
                break;
			
			default:
				break;
			}
		}
        
    };
	
	    
	/** @scope finesse.modules.HubTopic */
	return {
	   

	

	
		/**
     * publish data to the our topic.
	 
     * @private
     */
	
		//sets the hub text
		
		setHubText : function () {
		    var text;

			text = $('#hubtextin').val();
			clientLogs.log("in setHubText: " + text);
			if (gadgets.Hub) {
				clientLogs.log("check gadgets.hub");
                 var data = {
						type: "SendDataReq",
						data: { text : text},
						invokeID: (new Date()).getTime()
					};
				clientLogs.log("setHubText publish HubTopic");
				gadgets.Hub.publish("sampleGadget.info", data);
			    clientLogs.log("returned from gadgets.Hub.publish");
				}
	    },

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			var prefs =  new gadgets.Prefs(),
			id = prefs.getString("id");
			var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
			
	        gadgets.window.adjustHeight();
	        
	        // Initiate the ClientServices and load the user object.  ClientServices are
	        // initialized with a reference to the current configuration.
	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
			clientLogs.init(gadgets.Hub, "HubTopicSampleGadget", finesse.gadget.Config); //this gadget id will be logged as a part of the message

			// subscribe to the hub topic "sampleGadget.info"
			if (gadgets.Hub) {
					
					clientLogs.log("checked gadgets.hub");
                    
                    gadgets.Hub.subscribe("sampleGadget.info", _dataRequestHandler);
					clientLogs.log("subscribe to sampleGadget.info");
					}
	    }
    };
}(jQuery));
