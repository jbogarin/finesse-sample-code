var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

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
     var numDialogs = 0;	     // used to count the calls (dialogs)
	var callvars = new Array();  // the callvars array of callvariables		
    var user, states, dialogs,
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();
		// html is initially blank
        var html = '';
        // add a div tag to the html
        html += '<div>';
            
            // for debugging you could print out the agent state and the number of calls (Dialogs)
            //html += '<div id="agentstate"> The current state is: ' + user.getState() + '</div>';
            //html += '<div id="dialogcount"> The number of dialogs is: ' + numDialogs + '</div>';
	     
		if (numDialogs==1) {
		
			// if we were triggered by a new call (numDialogs==1) then set the html to the url we want to pop in the iframe
			// build the url by adding the callvariable 1 into the search parameter
		html += '<iframe src="http://www.dogpile.com/info.dogpl/search/web?fcoid=417&fcop=topnav&fpid=27&q=' + callvars["callVariable1"] +  '" width="100%" height="650"> </iframe>';
			// comment out the above line and uncomment the line below to change the search engine to bing
			//html += '<iframe src="http://www.bing.com/search?q=' + callvars["callVariable1"] +  '" width="100%" height="650"> </iframe>';
			// note: google search won't allow an iframe, yahoo search has errors too

		
			// add the closing </div> html element
		html += '</div>';
		
		clientLogs.log(html);  // for debugging
                //set the html document's agentout element (see the html after the /script tag) to the html we want to render
		$('#agentout').html(html);
		
                // automatically adjust the height of the gadget to show the html
		gadgets.window.adjustHeight();

		}
	     else {
                // we don't have a call yet
		html += 'Screen Pop Goes here';
		html += '</div>';
                
                //set the html document's agentout element to the html we want to render
		$('#agentout').html(html);
		
                // automatically adjust the height of the gadget to show the html
		gadgets.window.adjustHeight();

	    }
         
        
        
    },
	
		_processCall = function (dialog) {
	     // if here then callvar1 didnt show up on initial dialog
		 // get the latest callvariables
			callvars = dialog.getMediaProperties();
			clientLogs.log("_processCall:cv1="+callvars["callVariable1"]);
			render();
	
	},
    
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     handleNewDialog = function(dialog) {
            // increment the number of dialogs
			numDialogs++;
            
            // get the call variable data from the dialog
			// dialog.getMediaProperties() returns an array of properties
            callvars = dialog.getMediaProperties();
			
			clientLogs.log("handleNewDialog:cv1="+callvars["callVariable1"]);
			// if callVariable1 is null then add a handler for subsequent dialog events
			//  where the call data will have been updated
			if (callvars["callVariable1"] == null )
			{
			    dialog.addHandler('change', _processCall);
			}
			else
			{
			// render the html in the gadget
			   clientLogs.log("rendering dialog");
			   render();
			}
	

    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    handleEndDialog = function(dialog) {
    
	   // decrement the number of dialogs
            numDialogs--;
 
            // render the html in the gadget
            render();
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
      
    };
	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	    

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			var prefs =  new gadgets.Prefs(),
			id = prefs.getString("id");
			
			var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs

	        gadgets.window.adjustHeight();
	        
	        // Initiate the ClientServices and the logger and then load the user object.  ClientServices are
	        // initialized with a reference to the current configuration.
	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
			clientLogs.init(gadgets.Hub, "ScreenPop"); //this gadget id will be logged as a part of the message
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
	    }
    };
}(jQuery));
