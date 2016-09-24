var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging 

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
  var urlToLoad, numTabs, ulTop, ulMid, ulBottom, tabMid, tabEnd,
  
  _activateTab = function (tabnum){
  
        $('#myTab a[href="#home' + tabnum + '"]').tab('show');   //make tab active
  },
  
  _handleWorkflowActionEvent =  function(workflowActionEvent){
  
                var mytype, myhandledby
				params = workflowActionEvent.getParams();
				actionVars = workflowActionEvent.getActionVariables();
				myhandledby = workflowActionEvent.getHandledBy();
				mytype = workflowActionEvent.getType();
				//
                 if (myhandledby === "OTHER" && mytype === "BROWSER_POP") {
               
                
                 clientLogs.log("browser pop, type= " + workflowActionEvent.getType() );
		
                  if (params.hasOwnProperty("path") === true && params.hasOwnProperty("windowName") === true) {
                                                clientLogs.log("About to open browser tab.  URL is: " + params.path.expandedValue + ", window name is: "  + params.windowName.value);
												
                                             			var tabToPop = 0;
														var tabWindowName;
														clientLogs.log("numTabs="+numTabs);
														// if we have existing tabs then check windowname on them
														for (var j = 1; j <= numTabs; ++j)
														{
														//	
															tabWindowName = $('a#ahome'+j).text();
															if (tabWindowName === params.windowName.value){
															   clientLogs.log("tab found: " + tabWindowName);
															// update the url of this tab's iframe
															  tabToPop = j;  // we found it
															  $('#home'+ j).html('<iframe src="' + params.path.expandedValue +'" ' + 'width="100%" height="650"> </iframe>');
																clientLogs.log("in SetPopTab: " + $('#home'+ j).html());
																//$('#myTab a[href="#home' + j + '"]').tab('show');   //make tab active
																_activatetab(j);
															  
															  break
															}
															
														}  // end for
														if (tabToPop === 0){
															 //  add new tab
															 ++numTabs;
															 clientLogs.log("Adding new tab " + numTabs + " " + params.windowName.value );
															 var html;
															 ulMid = ulMid + '<li><a href="#home' + numTabs + '" id="ahome' + numTabs + '" data-toggle="tab">'+ params.windowName.value + '</a></li>';
															 tabMid = tabMid + '<div class="tab-pane active" id="home' + numTabs + '"><iframe src="' + params.path.expandedValue + '" width="100%" height="650"> </iframe></div>';
															 html = ulTop + ulMid + ulBottom + tabMid + tabEnd;
															 clientLogs.log("setting tabsout to: " + html);
															 $('#tabsout').html(html);
															 // activate the tab
															 //$('#myTab a[href="#home' + numTabs + '"]').tab('show');   //make tab active
															 _activateTab(numTabs);
															 gadgets.window.adjustHeight();
														}
														
                                                
                                        } else {
                                                if (params.hasOwnProperty("path") === true) {
                                                        clientLogs.log("Error in WorkflowActionExecutor : _processBrowserPop(workflowActionEvent) - A browser pop action must have a Path and a Window Name.  Browser path is " + params.path.expandedValue + " and window name is missing");
                                                } else if (params.hasOwnProperty("windowName") === true) {
                                                        clientLogs.log("Error in WorkflowActionExecutor : _processBrowserPop(workflowActionEvent) - A browser pop action must have a Path and a Window Name.  Browser path is missing and window name is " + params.windowName.value);
                                                } else {
                                                        clientLogs.log("Error in WorkflowActionExecutor : _processBrowserPop(workflowActionEvent) - A browser pop action must have a Path and a Window Name.  Browser path is missing and window name is missing");
                                                }
                                        }
										
								}  else {   //if handledBy = "Other"
									clientLogs.log("No workflow browser pop.  handledBy is " + myhandledby + " type is " + mytype);
								}
                                
                               
};


	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	   

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			
	        
	        var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
			clientLogs.init(gadgets.Hub, "WorkflowScreenpop"); //this gadget id will be logged as a part of the message
			
			// add code to handle tab clicked
			containerServices = finesse.containerservices.ContainerServices.init();
            clientLogs.log("Adding Workflow Action Event Handler...")
            containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.WORKFLOW_ACTION_EVENT, _handleWorkflowActionEvent);

            gadgets.window.adjustHeight();
			numTabs = 0;
			ulTop = '<ul class="nav nav-tabs" id="mytab">';
			ulMid = "";
			ulBottom = '</ul> <div class="tab-content">';
			tabMid = "";
			tabEnd = "</div>";
			
            //containerServices.makeActiveTabReq();
	    }   // init function
    };  // return
}(jQuery));
