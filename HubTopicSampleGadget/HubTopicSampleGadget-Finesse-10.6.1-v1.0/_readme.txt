****************************************************************************
Cisco Finesse - SampleGadget_HubTopic Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The SampleGadget_HubTopic sample gadget is intended to serve as an example of using the 
   gadgets.hub.publish and gadgets.hub.subscribe which are part of the OpenSocial
   Specification. (http://opensocial-resources.googlecode.com/svn/spec/trunk/Core-Gadget.xml#gadgets.io.ContentType )
   
   This sample illustrates how to initialize the gadget, and to subscribe and
   add a handler for a hub topic and to publish to a hub topic.
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and subscribe to a user defined hub topic and
   to publish and receive updates for a hub topic,
   

   
	The sample contains the following files:
	
	HubTopic
		HubTopic.xml
		HubTopic.js
		HubTopic.css
		finesse-@finesse.js.version@.js
		jquery-@jquery.version@.min.js
   	_readme.txt
	HubTopicSampleGadget.pdf


    This gadget sample is made available to Cisco partners and customers as
    a convenience to help minimize the cost of Cisco Finesse customizations.
    Please see the readme.txt in the finesse javascript libraries zip
    for futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------
Place at least 2 instances of this gadget in the finesse layout.  



III. Usage
-------------------------------------------------------------------------------
Place at least 2 instances of this gadget in the finesse layout.  Type text in 
one gadget and click 'Show Text' and the text is seen in both gadgets.

HubTopicSampleGadget.pdf demonstrates how the gadget(s) work together.