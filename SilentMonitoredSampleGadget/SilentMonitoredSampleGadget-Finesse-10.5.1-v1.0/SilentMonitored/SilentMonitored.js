var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
_clientLogger = finesse.cslogger.ClientLogger || {};  // for logging

// Gadget Config needed for instantiating ClientServices
/** @namespace */
finesse.gadget.Config = (function () {
	var _prefs = new gadgets.Prefs();

	/** @scope finesse.gadget.Config */
	return {
		authorization: _prefs.getString("authorization"),
		id: _prefs.getString("id"),
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
finesse.modules.SilentMonitoredGadget = (function ($) {
	var _user = null, _dialogs = null, _dialog = null;
   
    /**
     * Updates the Gadget UI based on the current state of the objects contained within.
     */
    _updateUI = function () {
		_clientLogger.log ("_updateUI() - _dialog: " + ((_dialog === null) ? "none" : _dialog.getId()));
		
		// Here you could extract the extension of the Participant that is watching and show it to them if desired.
		if (_dialog === null) {
			$('#yourBeingWatchedMsg').hide();		
			$('#coastClearMsg').fadeIn("slow",0, function() {gadgets.window.adjustHeight();});
		} else {
			$('#coastClearMsg').hide();		
			$('#yourBeingWatchedMsg').fadeIn("slow",0, function() {gadgets.window.adjustHeight();});
		}
        gadgets.window.adjustHeight();
    },
    
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     _handleDialogAdd = function(dialog) {
		_clientLogger.log ("_handleDialogAdd() - dialog.getId(): " + dialog.getId());

		if (dialog.getCallType() === "SUPERVISOR_MONITOR") {
			_dialog = dialog;
			_updateUI();
		}
    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    _handleDialogDelete = function(dialog) {
		_clientLogger.log ("_handleDialogDelete() - dialog.getId(): " + dialog.getId());
		
		if (dialog.getId() === _dialog.getId()) {
			_dialog = null;
		} else {
			_clientLogger.log ("_handleDialogDelete() - Last Dialog added had Id of: " + _dialog.getId() + ", so not clearing Dialog reference for: " + dialog.getId());			
		}
		
		_updateUI();
    },
	
    /**
     * Handler for when GET Dialogs has loaded
     *
     */
    _handleDialogsLoaded = function() {
  		_clientLogger.log ("_handleDialogsLoaded()");

      var dialogCollection, dialogId;
        //Render any existing dialogs
        dialogCollection = _dialogs.getCollection();
        for (dialogId in dialogCollection) {
            if (dialogCollection.hasOwnProperty(dialogId)) {
                _handleDialogAdd(dialogCollection[dialogId]);
            }
        }
    },
	
    /**
     * Handler for the onLoad of a User object.  This occurs when the User object is initially read
     * from the Finesse server.  Any once only initialization should be done within this function.
     */
    _handleUserLoad = function (userevent) {
		_clientLogger.log ("_handleUserLoad()");

        // Get an instance of the dialogs collection and register handlers for dialog additions and
        // removals
        _dialogs = _user.getDialogs( {
            onCollectionAdd : _handleDialogAdd,
            onCollectionDelete : _handleDialogDelete,
			onLoad : _handleDialogsLoaded
        });
         
        _updateUI();
    },
      
    /**
     *  Handler for all User updates
     */
    _handleUserChange = function(userevent) {
		_clientLogger.log("_handleUserChange()");

        _updateUI();
   };
	    
	/** @scope finesse.modules.SilentMonitoredGadget */
	return {
		
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
		var _clientLogger = finesse.cslogger.ClientLogger;   // declare _clientLogger

		_clientLogger.init(gadgets.Hub, "SilentMonitoredGadget", finesse.gadget.Config); //this gadget id will be logged as a part of the message
		_clientLogger.log ("Initializing...");
	        
		// Initiate the ClientServices and load the user object.  ClientServices are
		// initialized with a reference to the current configuration.
		finesse.clientservices.ClientServices.init(finesse.gadget.Config);
		
		_dialogs = [];
		_dialog = null;

		_user = new finesse.restservices.User({
						id: finesse.gadget.Config.id, 
						onLoad : _handleUserLoad,
						onChange : _handleUserChange
		});
			
		_clientLogger.log ("Initialization finished.");
			
	    }
    };
}(jQuery));
