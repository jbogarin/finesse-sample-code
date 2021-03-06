var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
    var user, states, dialogs, clientlogs,
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        clientLogs.log("render(): In method");
        var currentState = user.getState();
        
        // Example of setting the user state (PUT)
        if (currentState === states.NOT_READY) {
            // allow makecall from NOT_READY state
            $('#makeCallButton').show();
        } else if (currentState === states.READY) {
            // can't make a call from READY state
            $('#makeCallButton').hide();
        }
        
        gadgets.window.adjustHeight();
    },

    // Handler to handle changes in a dialog
    _processCall = function (dialog) {
        clientLogs.log("_processCall(): State = " + dialog.getState());

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
    makeCallSuccess = function(rsp) { },
    
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
        dialogs = user.getDialogs({
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
            var cfg = finesse.gadget.Config;

            clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
             
            gadgets.window.adjustHeight();
            
            // Initiate the ClientServices and load the user object.  ClientServices are
            // initialized with a reference to the current configuration.
            finesse.clientservices.ClientServices.init(cfg, false);

             // Initiate the ClientLogs. The gadget id will be logged as a part of the message
            clientLogs.init(gadgets.Hub, "ClickToCallSampleGadget", finesse.gadget.Config); //this gadget id will be logged as a part of the message
            
            user = new finesse.restservices.User({
                id: cfg.id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
                
            states = finesse.restservices.User.States;
            
            clientLogs.log ("ClickToCall.init(): completed init");
        }
    };
}(jQuery));