var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging 

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
   var urlToLoad, numTabs, ulTop, ulMid, ulBottom, tabMid, tabEnd,
  
  _handleWorkflowActionEvent =  function(workflowActionEvent){
  
                var myhandledby, mytype;
				params = workflowActionEvent.getParams();
				vars = workflowActionEvent.getActionVariables();
				
				myhandledby = workflowActionEvent.getHandledBy();
				mytype = workflowActionEvent.getType();
				clientLogs.log("thickclient pop, type= " + workflowActionEvent.getType() );
				//
                 if (myhandledby === "OTHER" && mytype === "HTTP_REQUEST") {

				 
                  if (params.hasOwnProperty("path") === true)  {
                                                clientLogs.log("About to pop thick client.  URL is: " + params.path.expandedValue );
												$("#path").text(params.path.expandedValue);  // display the path in the gadget first
												document.JavaScreenPopApplet.executeCommandLine(params.path.expandedValue);  // then execute the command line
		
                                             		                                               
                                        } else {
                                                
                                                        clientLogs.log("Error in WorkflowActionExecutor : _handleWorkflowActionEvent(workflowActionEvent) - A thickclient action must have a Path.  Thick client path is missing.");
                                                }
                                        
                                
               }  // if myhandledby                
};


	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	   

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			
	        var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
			clientLogs.init(gadgets.Hub, "ThickClientScreenpop"); //this gadget id will be logged as a part of the message
	       
			
			// add code to handle tab clicked
			containerServices = finesse.containerservices.ContainerServices.init();
            clientLogs.log("Adding Workflow Action Event Handler...")
            containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.WORKFLOW_ACTION_EVENT, _handleWorkflowActionEvent);

            gadgets.window.adjustHeight();

			
			
            //containerServices.makeActiveTabReq();
	    }   // init function
    };  // return
}(jQuery));
