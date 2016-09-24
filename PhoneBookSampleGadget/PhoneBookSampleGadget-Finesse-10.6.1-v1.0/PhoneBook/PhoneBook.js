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
    var user, states, dialogs, _phoneBooks,
	
	_handlePhoneBooksLoaded = function(){
	
	  clientLogs.log("There are " + _phoneBooks.length + " PhoneBooks in the PhoneBooks Collection.");
	  
	  var phoneBookCollection = _phoneBooks.getCollection(),
       contacts = [], id, restPhoneBook, restContact, contactId, contact, restContacts, i, layout;
	   
	   for (id in phoneBookCollection) {
		restPhoneBook = phoneBookCollection[id];
		// loop contacts within each phonebook
		restContacts = restPhoneBook.getEmbeddedContacts();
		if(restContacts !== null && restContacts.Contact){
			restContacts = restContacts.Contact;
			// if only 1 contact in the phonebook, it will show up as a single object instead of an array
			// making it a 1 element array keeps it simple
		if(!(restContacts instanceof Array)){
			restContacts = [restContacts];
		}
		html = "";
		for(i=0; i<restContacts.length; i++){
			restContact = restContacts[i];
			contact = {
				phoneBook: restPhoneBook.getName(),
				uri: restContact.uri,
				lastName: restContact.lastName,
				firstName: restContact.firstName,
				phoneNumber: restContact.phoneNumber,
				description: restContact.description
			};
		// display the contact
		html += '<div>';
		html += contact.lastName + ", " + contact.firstName + " " + contact.phoneNumber;
		html += '</div>';

}
}
//document.getElementById('agentout').innerHTML = html;
$('#agentout').html(html);
gadgets.window.adjustHeight();

}

	},
    
	_handlePhoneBooksError = function(rsp){
	
	  clientLogs.log("error status = " + rsp.status + ", error content" + rsp.content);
	},
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();
        // Examples of getting data from the User object (GET)
		$("#userId").text(user.getId());
		$("#firstName").text(user.getFirstName());
		$("#lastName").text(user.getLastName());
        if (user.hasSupervisorRole()) {
            $("#userRole").text('Supervisor');
        } else {
            $("#userRole").text('Agent');
			
        }
		$("#extension").text(user.getExtension());
		$("#userState").text(currentState);
        
        // Example of setting the user state (PUT)
        if (currentState === states.NOT_READY) {
			$("#goReady").show();
			$("#goNotReady").hide();
        } else if (currentState === states.READY) {
			$("#goNotReady").show();
			$("#goReady").hide();
        } else {
			$("#goNotReady").hide();
			$("#goReady").hide();
        }
        
        gadgets.window.adjustHeight();
    },
	
	displayCall = function (dialog){
	
	    var callVars = dialog.getMediaProperties();
         
         // Examples of getting data from the Dialog object (GET)    
		 $("#callId").text(dialog.getId());
		 $("#dnis").text(dialog.getMediaProperties().DNIS);
		 $("#callType").text(dialog.getMediaProperties().callType);
		 $("#fromAddress").text(dialog.getFromAddress());
		 $("#toAddress").text(dialog.getToAddress());
         $("#callState").text(dialog.getState());
         // Hide the make call button when the user is on a call
		 $("#makeCallButton").hide;
         
         // Example of using data from the dialog to do a web search
		 $("#bing").attr("src","http://www.bing.com/search?q=" + callVars["callVariable3"]);
		 clientLogs.log("bing url=" + $("#bing").attr("src"));  // log to Finesse logger
		 
	
	
	},
    
	_processCall = function (dialog) {
	     displayCall(dialog);
			
	},
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     handleNewDialog = function(dialog) {
	     // call the displayCall handler
		 displayCall (dialog);
        
		 // add a dialog change handler in case the callvars didn't arrive yet
		 dialog.addHandler('change', _processCall);
		
    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    handleEndDialog = function(dialog) {
    	// Clear the fields when the call is ended
      	$("#callId").text("");
		$("#dnis").text("");
		$("#callType").text("");
		$("#fromAddress").text("");
		$("#toAddress").text("");
		$("#callState").text("");
		$("#bing").attr("src","http://www.bing.com");
        
        // Show the make call button when the call is ended
        $("#makeCallButton").show();
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
		
		 gadgets.window.adjustHeight();
		
				
		_phoneBooks = user.getPhoneBooks({
           onLoad : _handlePhoneBooksLoaded,
            onError : _handlePhoneBooksError
          });
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
			 $("#makeCallButton").hide;
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
			clientLogs.init(gadgets.Hub, "PhoneBookGadget", finesse.gadget.Config); //this gadget id will be logged as a part of the message
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
			
			// Initiate the ContainerServices and add a handler for when the tab is visible
			// to adjust the height of this gadget in case the tab was not visible
			// when the html was rendered (adjustHeight only works when tab is visible)
			
			containerServices = finesse.containerservices.ContainerServices.init();
            containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, function(){
			    clientLogs.log("Gadget is now visible");  // log to Finesse logger
			   // automatically adjust the height of the gadget to show the html
		         gadgets.window.adjustHeight();
				
				   
			   });
            containerServices.makeActiveTabReq();
	    }
    };
}(jQuery));
