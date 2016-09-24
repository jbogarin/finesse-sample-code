var permalink = "https://10.201.64.81:8444/cuic/permalink/PermalinkViewer.htmx?viewId=4133EFBD1000013D16907C420AC94051&amp;linkType=htmlType&amp;viewType=Grid";
var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging 

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
  
	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	    

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			
	        
	        var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
			clientLogs.init(gadgets.Hub, "CUIC"); //this gadget id will be logged as a part of the message
			
			// add code to handle tab clicked
			containerServices = finesse.containerservices.ContainerServices.init();
            containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, function(){
			clientLogs.log("**** Gadget is now visible ****"); 
			 
			  if ($("#cuic").length) 
			 {
			 // only modify the html if we haven't done it before
			 
			   clientLogs.log("Gadget html already=" + $("#cuic").html()); 
			 }
			 else
			 
			 {
			    var html = '';
                // add a div tag to the html
                html += '<div id="cuic">';
				html += '<iframe src="' + permalink + ' " id="frame1" width="900" height="300"></iframe>';
				html += '</div>';
                
                //set the html document's agentout element to the html we want to render
				$("#agentout").html(html);
				clientLogs.log("Set html to=" + $("#cuic").html()); 
		
                // automatically adjust the height of the gadget to show the html
		         gadgets.window.adjustHeight();
				}
				   
			   });
            containerServices.makeActiveTabReq();
	    }   // init function
    };  // return
}(jQuery));
