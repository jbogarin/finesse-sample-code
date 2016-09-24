****************************************************************************
Cisco Finesse - Reload Gadget From Other Url Sample Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The Reload Gadget From Other Url sample gadget is intended to serve as an example of using the 
   ContainerServices method reloadMyGadgetFromUrl in order to reload a gadget from a url
   different than the one specified in the layout.
   
   This sample illustrates how to initialize the gadget and create a button, which when
   clicked, will reload a gadget from the url specified in the javascript.
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and reload it from another url.
   

   
	The sample contains the following files:
	
	Reload
		Reload.xml
		Reload.js
		Reload.css
		finesse-10.5.1.js
		jquery-1.9.1.min.js
   	_readme.txt
	ReloadGadgetFromOtherUrl.pdf


    This gadget sample is made available to Cisco partners and customers as
    a convenience to help minimize the cost of Cisco Finesse customizations.
    Please see the readme.txt in the finesse javascript libraries zip
    for futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------
Place this gadget in the finesse layout. Have a another gadget hosted on a
reachable server to replace this one.



III. Usage
-------------------------------------------------------------------------------
1) In the Reload.xml, replace <your_server_url_here> with the url of the other
gadget.
2) Upload this sample gadget to Finesse and add the sample gadget to the layout.
3) Login an agent to Finesse.
4) Click the "Reload Gadget" button.
5) Other gadget should load in this gadget's place.
