****************************************************************************
Cisco Finesse - SampleGadget_WebService Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The SampleGadget_WebService sample gadget is intended to serve as an example of 
   using the gadgets.io.makerequest function to make a request of a web server that is
   accessible via Finesse server.
   
   
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to use gadgets.io.makerequest.
   

   
	The sample contains the following files:
	
	WebService
		WebService.xml
		WebService.js
		WebService.css
		HelloWorld.xml
		finesse-9.1.1.js
		jquery-1.5.min.js
	_readme.txt
	WebServiceSampleGadget.pdf
	


    This gadget sample is made available to Cisco partners and customers as
    a convenience to help minimize the cost of Cisco Finesse customizations.
    Please see the readme.txt in the finesse javascript libraries zip
    for futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------

You must place the HelloWorld.xml file on your web server and modify the
WebService.js to point to you web server.

   

III. Usage
-------------------------------------------------------------------------------
Edit the gadget to point to your webserver (see WebServiceSampleGadget.pdf)

Add the gadget to the finesse layout.  

Place the HelloWorld.xml on your web server that is accessible via the Finesse web server.
(To determine if a server is accessible from Finesse Server,utilize the 'ping' command
from the Finesse console.)

Login an agent and click MakeRequest on the WebService gadget
 and the text: Jane Doe  123456 should be displayed (see WebServiceSampleGadget.pdf)

