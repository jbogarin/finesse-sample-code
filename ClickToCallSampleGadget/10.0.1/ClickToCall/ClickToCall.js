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
    var user, states,  dialogs,
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();

    
        
        // Example of setting the user state (PUT)
        if (currentState === states.NOT_READY) {
            
			// allow makecall from NOT_READY state
			 $('#makeCallButton').show();
        } else if (currentState === states.READY) {
           
			// can't make a call from READY state
			$('#makeCallButton').hide();

        } else {
            
        }
		
		clientLogs.log("in render ClickToCall");
              
        gadgets.window.adjustHeight();
    },
	

	// Handler to handle changes in a dialog
	_processCall = function (dialog) {
		// dialog.getId();
         clientLogs.log ("In _processCall in ClickToCall ");
		 clientLogs.log ("State = " + dialog.getState());
		 if (dialog.getState()  === finesse.restservices.Dialog.States.FAILED) {
			$('#errorMsg').html("Call Failed");
		 }
        
	},
    
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     handleNewDialog = function(dialog) {
         // Get call variables from the dialog
         var callVars = dialog.getMediaProperties();
         
        
         
         // Hide the make call button when the user is on a call
         $('#makeCallButton').hide();
         
		 // add a change handler to the dialog
		 dialog.addHandler('change', _processCall);

    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    handleEndDialog = function(dialog) {
            
        // Show the make call button when the call is ended
		$('#makeCallButton').show();
    },
    
    /**
     * Handler for makeCall when successful.
     */
    makeCallSuccess = function(rsp) {
	
	},
    
    /**
     * Handler for makeCall when error occurs.
     */
    makeCallError = function(rsp) {
	

	$('#errorMsg').html(_util.getErrData(rsp));
	
    },
     
    /**
     * Handler for the onLoad of a User object.  This occurs when the User object is initially read
     * from the Finesse server.  Any once only initialization should be done within this function.
     */
    handleUserLoad = function (userevent) {
        // Get an instance of the dialogs collection and register handlers for dialog additions and
        // removals
        dialogs = user.getDialogs( {
            onCollectionAdd : handleNewDialog,
            onCollectionDelete : handleEndDialog
        });
         
        render();
    },
      
    /**
     *  Handler for all User updates
     */
    handleUserChange = function(userevent) {
        render();
   };
	
	    
	/** @scope finesse.modules.SampleGadget */
	return {
	   
	
	 
	    /**
	     * Make a call to the number
	     */
	    makeCall : function (number) {
		
		   // clear the error message before making the call
			 $('#errorMsg').html("");
	        // Example of the user make call method
	    	user.makeCall(number, {
	    		success: makeCallSuccess,
	    		error: makeCallError
	    	});
	    	
	    	// Hide the button after making the call
			$('#makeCallButton').hide();
			
	
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
			clientLogs.init(gadgets.Hub, "ClickToCallSampleGadget"); //this gadget id will be logged as a part of the message
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
			clientLogs.log ("completed init in ClickToCall");
			
	    }
    };
}(jQuery));
