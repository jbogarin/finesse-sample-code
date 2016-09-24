****************************************************************************
Cisco Finesse - WorkflowScreenPop Sample Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The WorkflowScreenPop sample gadget is intended to serve as an example of popping a 
   new tab for each WorkflowActionEvent received.

   
   This sample illustrates how to initialize the gadget, and to set up a handler
   for receiving the WorkflowActionEvent and placing the path in an iframe on a new tab in
   the gadget.
   
       
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and set up handler for tabVisible.

 
	The sample contains the following files:
	
	WorkflowScreenPop
		WorkflowScreenPop.xml
		WorkflowScreenPop.js
		WorkflowScreenPop.css
		bootstrap/2.3.2/css/bootstrap.min.css
		bootstrap/2.3.2/js/bootstrap.min.js
		finesse-10.6.1.js
		jquery-1.9.1.min.js
		
	_readme.txt
	WorkflowScreenPop.pdf


    This gadget sample is made available to Cisco partners and customers as
    a convenience to help minimize the cost of Cisco Finesse customizations.
    Please see the readme.txt in the finesse javascript libraries zip
    for futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------
a valid configured Workflow (assigned to the agent's team team) 
which will be triggered by a WorkflowActionEvent



   

III. Usage
-------------------------------------------------------------------------------
See the document WorkflowSceenPop.pdf which shows how to "install" your gadget.
