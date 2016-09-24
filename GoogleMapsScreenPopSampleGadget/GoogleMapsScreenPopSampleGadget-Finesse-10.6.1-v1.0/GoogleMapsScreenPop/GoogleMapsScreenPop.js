var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging
// replace the APIKey string with your own API Key from Google
// see https://developers.google.com/maps/licensing
var APIKey = "AIzaSyBXpj16UBvdLH4QFEHn7egnjKBnCk6d5eM";   // this line to be deleted prior to posting on CDN
// var APIKey = "[ENTER API KEY]";  // replace [ENTER API KEY] with your own Google Maps API Key
var geocoder;
var map;

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
     var numDialogs = 0;	     // used to count the calls (dialogs)
	var callvars = new Array();  // the callvars array of callvariables		
    var user, states, dialogs, 
    
	 
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();

		if (numDialogs==1) {
               
		    // callvars was set in handleNewDialog
            // get the call var 3 and put it in the address field
			
            var cv3 = callvars["callVariable3"];
			clientLogs.log("callVariable3=" + cv3);
			$('#address').attr('value', cv3); 
			
			//geocode the new address on the map
			codeAddress();
			gadgets.window.adjustHeight('1000');
		}
	     else {
                // we don't have a call yet so
				// show the default map
		
			$('#address').attr('value', "New York, NY");
			// use the default address on the map
			codeAddress();
			gadgets.window.adjustHeight('1000');

	    }
         
        
        
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
         clientLogs.log("In handleNewDialog Googlemapscreenpop");
            // increment the number of dialogs
	    numDialogs++;
            
            // get the call variable data from the dialog
	    // getMediaProperties returns an array of properties
            callvars = dialog.getMediaProperties();
			clientLogs.log("cv3="+callvars["callVariable3"]);
			// if callVariable3 is null then add a handler for subsequent dialog events
			//  where the call data will have been updated
			if (callvars["callVariable3"] == null )
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
            

	        gadgets.window.adjustHeight('1000');
	        // Initiate the ClientServices, initialize the logger, and load the user object.  ClientServices are
	        // initialized with a reference to the current configuration.

	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
			clientLogs.init(gadgets.Hub, "GoogleMapsScreenPop", finesse.gadget.Config); //this gadget id will be logged as a part of the message
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
			
			clientLogs.log("Completed init");
			
			
	    }
		
		
    };
}(jQuery));

//
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
		// jQuery with the google maps API will not work
		// map = new google.maps.Map($('#map_canvas'), myOptions);
		
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
		script.src = "http://maps.googleapis.com/maps/api/js?key=" + APIKey + "&sensor=false&callback=initialize";  
		// edit the APIKey with your own key from google at the top of this file

		document.body.appendChild(script);
	}
  

