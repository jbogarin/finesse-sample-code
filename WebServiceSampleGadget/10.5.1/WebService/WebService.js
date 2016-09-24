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
finesse.modules.SampleGadget = (function ($) {
   
 /**
     * Handler for makeWebService when successful.
     */
   var  makeWebServiceSuccess = function(rsp) {
	     clientLogs.log ("In makeWebServiceSuccess SampleGadget_WebService");
		 // display the content returned from the makerequest
		 $('#result').html(rsp.content);
    },
    
    /**
     * Handler for makeWebService when error occurs.
     */
    makeWebServiceError = function(rsp) {
	
	clientLogs.log("In makeWebServiceError");
	clientLogs.log (rsp);
    };
     
   			    
	/** @scope finesse.modules.SampleGadget */
	return {
	
	/**
     * Create a new WebServices request
     *
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    createNewWebServicesRequest : function ( handlers)
    {
        var contentBody = {};
   
        clientLogs.log("In createNewWebServicesRequest");
        // 
        handlers = handlers || {};
		
		// TODO: change Rest path to match your own web server

        this.myrestRequest("/userContent/HelloWorld.xml", {
            method: 'GET',
            success: handlers.success,
            error: handlers.error,
            content: contentBody,
        });
        return this; 
    },
	
	/**
	     * mymakeRequest is a Proxy method for gadgets.io.makeRequest. The will be identical to gadgets.io.makeRequest
         * ClientServices will mixin the BASIC Auth string, locale, and host, since the
         * configuration is encapsulated in here anyways.
         * This removes the dependency
	     * @param {String} url
	     *     The relative url to make the request to (the host from the passed in config will be
         *     appended). It is expected that any encoding to the URL is already done.
	     * @param {Function} handler
	     *     Callback handler for makeRequest to invoke when the response returns.
         *     Completely passed through to gadgets.io.makeRequest
	     * @param {Object} params
	     *     The params object that gadgets.io.makeRequest expects. Authorization and locale
	     *     headers are mixed in.
         */


	mymakeRequest : function (url, handler, params) {
			
			clientLogs.log("In mymakeRequest");
			
			params = params || {};
			params[gadgets.io.RequestParameters.HEADERS] = params[gadgets.io.RequestParameters.HEADERS] || {};
			
						
			// This is the url we want to get to:
			// http://10.88.194.158:8080/userContent/HelloWorld.html
			
			// TODO: Change the IP address to your server
    
	        gadgets.io.makeRequest(encodeURI("http://10.88.194.158:8080") + url, handler, params);
			clientLogs.log("io.makeRequest to http://10.88.194.158:8080"+url);
		},
		
	  /**
     * _mycreateAjaxHandler is a Utility method to create ajax response handler closures around the
     * provided callbacks. Callbacks should be passed through from .ajax().
     * makeRequest is responsible for garbage collecting these closures.
     * @param {Object} options
     *     An object containing success and error callbacks.
     * @param {Function} options.success(rsp)
     *     A callback function to be invoked for a successful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *     }
     * @param {Function} options.error(rsp)
     *     A callback function to be invoked for an unsuccessful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
     * @private
     */	
		
	
    _mycreateAjaxHandler: function (options) {
        

        var parentUser = this;

        return function (rsp) {

            var requestId, error = false, rspObj;

            if (options.success || options.error) {
                rspObj = {
                    status: rsp.rc,
                    content: rsp.text
                };

                //Some responses may not have a body.
				
				
                if (rsp.text.length > 0) {
                    try {
					    //TODO: Here you could parse xml into JSON, rather than just using the content in the success handler
						clientLogs.log(rsp.text);
                       // rspObj.object = gadgets.json.parse((parentUser._util.xml2json(jQuery.parseXML(rsp.text), "")));
                    } catch (e) {
                        error = true;
                       rspObj.error = {
                            errorType: "parseError",
                           errorMessage: "Could not serialize XML: " + e
                        };
                    }
                } else {
                    rspObj.object = {};
                }

                if (!error && rspObj.status >= 200 && rspObj.status < 300) {
                    if (options.success) {
                        options.success(rspObj);
                    }
                } else {
                    if (options.error) {
                        options.error(rspObj);
                    }
                }

            
            }
        };
    },
	
		/** myrestRequest
     * my modification of Utility method to make an asynchronous request
     * @param {String} url
     *     The unencoded URL to which the request is sent (will be encoded)
     * @param {Object} options
     *     An object containing additional options for the request.
     * @param {Object} options.content
     *     An object to send in the content body of the request. Will be
     *     serialized into XML before sending.
     * @param {String} options.method
     *     The type of request. Defaults to "GET" when none is specified.
     * @param {Function} options.success(rsp)
     *     A callback function to be invoked for a successful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *     }
     * @param {Function} options.error(rsp)
     *     A callback function to be invoked for an unsuccessful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
    */
	
	   myrestRequest : function (url, options) {

        var params, uuid;

        params = {};

		clientLogs.log("In myrestRequest");
        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        options = options || {};
        options.success = _util.validateHandler(options.success);
		options.error = _util.validateHandler(options.error);

        // Request Headers
        params[gadgets.io.RequestParameters.HEADERS] = {};

        // HTTP method is a passthrough to gadgets.io.makeRequest, makeRequest defaults to GET
        params[gadgets.io.RequestParameters.METHOD] = options.method;
		

        //true if this should be a GET request, false otherwise
        if (!options.method || options.method === "GET") {
            //Disable caching for GETs
            if (url.indexOf("?") > -1) {
                url += "&";
            } else {
                url += "?";
            }
            url += "nocache=" + _util.currentTimeMillis();
        } else {
            /**
             * If not GET, generate a requestID and add it to the headers, 
             **/
            
            uuid = _util.generateUUID();
            params[gadgets.io.RequestParameters.HEADERS].requestId = uuid;

						
            params[gadgets.io.RequestParameters.GET_FULL_HEADERS] = "true";
        
        }

        // Content Body
        if (typeof options.content === "object") {
            // Content Type
            params[gadgets.io.RequestParameters.HEADERS]["Content-Type"] = "application/xml";
            // Content
            params[gadgets.io.RequestParameters.POST_DATA] = _util.json2xml(options.content);
        }

		// go do a makerequest

		this.mymakeRequest(encodeURI(url), this._mycreateAjaxHandler(options), params);
    },
	   
	   /**
	     * Make a call to the web service
		 
	     */
	/**
     * Make a request to the our topic.
	 
      */
	

	    makeWebService : function () {

			clientLogs.log("In makeWebService");

	    	this.createNewWebServicesRequest( {
	    		success: makeWebServiceSuccess,
	    		error: makeWebServiceError
	    	});
	    	
	    
	    },
	
    
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			var prefs =  new gadgets.Prefs(),
			id = prefs.getString("id");
			var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
      
			_util = finesse.utilities.Utilities;

		    gadgets.window.adjustHeight();
	        
	        // Initiate the ClientServices.  ClientServices are
	        // initialized with a reference to the current configuration.
	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
			clientLogs.init(gadgets.Hub, "WebServiceSampleGadget"); //this gadget id will be logged as a part of the message
			clientLogs.log("In init.");  
	       
	    }
    };
}(jQuery));
