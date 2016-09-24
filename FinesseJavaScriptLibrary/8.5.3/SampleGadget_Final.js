var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

/** @namespace */
// Configuration for the gadget
finesse.gadget.Config = (function () {
	var _prefs = new gadgets.Prefs();

	/** @scope finesse.gadget.Config */
	return {
		authorization: _prefs.getString("authorization"),
		host: _prefs.getString("host"),
		restHost: "localhost"
	};
}());

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
    var user, states, dialogs,
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();

        // Examples of getting data from the User object (GET)
        document.getElementById('userId').innerHTML = user.getId();
        document.getElementById('firstName').innerHTML = user.getFirstName();
        document.getElementById('lastName').innerHTML = user.getLastName();
        if (user.hasSupervisorRole()) {
            document.getElementById('userRole').innerHTML = 'Supervisor';
        } else {
            document.getElementById('userRole').innerHTML = 'Agent';
        }
        document.getElementById('extension').innerHTML = user.getExtension();
        document.getElementById('userState').innerHTML = currentState;
        
        // Example of setting the user state (PUT)
        if (currentState === states.NOT_READY) {
            document.getElementById('goReady').style.display = "";
            document.getElementById('goNotReady').style.display = "none";
        } else if (currentState === states.READY) {
            document.getElementById('goNotReady').style.display = "";
            document.getElementById('goReady').style.display = "none";
        } else {
            document.getElementById('goNotReady').style.display = "none";
            document.getElementById('goReady').style.display = "none";
        }
        
        gadgets.window.adjustHeight();
    },
    
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     handleNewDialog = function(dialog) {
         // Get call variables from the dialog
         var callVars = dialog.getMediaProperties();
         
         // Examples of getting data from the Dialog object (GET)    
         document.getElementById('callId').innerHTML = dialog.getId();
         document.getElementById('dnis').innerHTML = dialog.getDNIS();
         document.getElementById('fromAddress').innerHMTL = dialog.getFromAddress();
         document.getElementById('toAddress').innerHTML = dialog.getToAddress();
         document.getElementById('callState').innerHTML = dialog.getState();
         
         // Hide the make call button when the user is on a call
         document.getElementById('makeCallButton').style.display = "none";
         
         // Example of using data from the dialog to do a web search
         document.getElementById('bing').src = "http://www.bing.com/search?q=" + callVars["callVariable3"];
    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    handleEndDialog = function(dialog) {
    	// Clear the fields when the call is ended
        document.getElementById('callId').innerHTML = "";
        document.getElementById('dnis').innerHTML = "";
        document.getElementById('fromAddress').innerHMTL = "";
        document.getElementById('toAddress').innerHTML = "";
        document.getElementById('callState').innerHTML = "";
        document.getElementById('bing').src = "http://www.bing.com";
        
        // Show the make call button when the call is ended
        document.getElementById('makeCallButton').style.display = "";
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
	     * Sets the user state
	     */
	    setUserState : function (state) {
	        if (state === 'READY') {
	            user.setState(states.READY);
	        } else if (state === 'NOT_READY') {
	            user.setState(states.NOT_READY);
	        }
	    },
	    
	    /**
	     * Make a call to the number
	     */
	    makeCall : function (number) {
	        // Example of the user make call method
	    	user.makeCall(number, {
	    		success: makeCallSuccess,
	    		error: makeCallError
	    	});
	    	
	    	// Hide the button after making the call
	    	document.getElementById('makeCallButton').style.display = "none";
	    },
	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			var prefs =  new gadgets.Prefs(),
			id = prefs.getString("id");

	        gadgets.window.adjustHeight();
	        
	        // Initiate the ClientServices and load the user object.  ClientServices are
	        // initialized with a reference to the current configuration.
	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
	    }
    };
}(jQuery));
