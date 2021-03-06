var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

// replace the APIKey string with your own API Key from Google
// see https://developers.google.com/maps/licensing
var APIKey = "[ENTER API KEY]";  // replace [ENTER API KEY] with your own Google Maps API Key
var geocoder;
var map;

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
    var numDialogs = 0;      // used to count the calls (dialogs)
    var callvars = new Array();  // the callvars array of callvariables     
    var user, states, dialogs, clientLogs,
     
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();

        if (numDialogs == 1) {
            // callvars was set in handleNewDialog
            // get the call var 3 and put it in the address field
            var cv3 = callvars["callVariable3"];

            clientLogs.log("render(): callVariable3=" + cv3);
            
            $('#address').attr('value', cv3);
        } else {
            // we don't have a call yet so
            // show the default map
        
            $('#address').attr('value', "New York, NY");
        }

        codeAddress();
        gadgets.window.adjustHeight('1000');
    },
    
    _processCall = function (dialog) {
        // if here then callvar3 didnt show up on initial dialog
        // get the latest callvariables
        callvars = dialog.getMediaProperties();
        render();
    },
    
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
    handleNewDialog = function(dialog) {
        clientLogs.log("handleNewDialog(): in method");
        
        // increment the number of dialogs
        numDialogs++;
            
        // get the call variable data from the dialog
        // getMediaProperties returns an array of properties
        callvars = dialog.getMediaProperties();

        clientLogs.log("handleNewDialog(): callVariable3=" + callvars["callVariable3"]);

        // if callVariable3 is null then add a handler for subsequent dialog events
        //  where the call data will have been updated
        if (callvars["callVariable3"] == null) {
            dialog.addHandler('change', _processCall);
        } else {
            // render the html in the gadget
            clientLogs.log("handleNewDialog(): rendering dialog");
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
    handleUserChange = function(userevent) { };
        
    /** @scope finesse.modules.SampleGadget */
    return {  
        /**
         * Performs all initialization for this gadget
         */
        init : function () {
            var cfg = finesse.gadget.Config;
            
            clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
            
            gadgets.window.adjustHeight('1000');

            // Initiate the ClientServices, initialize the logger, and load the user object.  ClientServices are
            // initialized with a reference to the current configuration.
            finesse.clientservices.ClientServices.init(cfg, false);

            // Initiate the ClientLogs. The gadget id will be logged as a part of the message
            clientLogs.init(gadgets.Hub, "GoogleMapsScreenPop", finesse.gadget.Config);
            
            user = new finesse.restservices.User({
                id: cfg.id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
                
            states = finesse.restservices.User.States;
            
            clientLogs.log("handleNewDialog(): completed init");
        }
    };
}(jQuery));

// *** Google maps specific functions  ****
// the javascript and html are from a sample from Google maps
// for more information about using the GoogleMaps API
// goto https://developers.google.com/maps
//
//  the functions below are outside of Finesse.modules.SampleGadget because
//  the loadScript and initialize need to occur before the gadget itself is initialized
//  and codeAddress is called from initialize

function initialize() {
    // create a geocoder and a latitude/longitude
    geocoder = new google.maps.Geocoder();
    
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    
    // set the options for zoom level and map type
    var myOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    // create a map in the map_canvas div element
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    // call codeAddress to render the initial map
    codeAddress();
}

function codeAddress() {
    // get the address we want to encode
    var address = $('#address').val();

    // geocode the address to a map location
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // geocode was successful
            $('#agentout').html(" ");   
            map.setCenter(results[0].geometry.location);

            // place a marker on the map
            var marker = new google.maps.Marker({
                map: map, 
                position: results[0].geometry.location
            });
        } else {
            // geocode was not successful, tell user why
            $('#agentout').html("Geocode was not successful for the following reason: " + status);  
        }
    });
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    // get the script from google using the APIKey and call initialize when the script is loaded
    // edit the APIKey with your own key from google at the top of this file
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&sensor=false&callback=initialize";  

    document.body.appendChild(script);
}