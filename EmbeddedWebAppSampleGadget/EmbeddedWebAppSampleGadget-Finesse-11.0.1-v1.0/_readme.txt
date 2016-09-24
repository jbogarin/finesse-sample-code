****************************************************************************
Cisco Finesse - EmbeddedWebApp Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The EmbeddedWebApp sample gadget is intended to serve as an example of
   placing an external web application in a finesse gadget.  There are special
   considerations that must be made when doing this as some web pages do not
   render correctly if they are loaded in the Tab of Finesse that is not visible
   and/or need special handling when the user navigates away from that Tab.  This
   sample provides examples of how to deal with these issues in a safe way using
   the standard support afforded by the Finesse Javascript library.
       
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and set up handler for tabVisible.

   The sample contains the following files:
      EmbeddedWebApp/
         EmbeddedWebApp.css
         EmbeddedWebApp.js
         EmbeddedWebApp.xml
      FinesseJavaScriptLibrary/
         readme.txt
      _readme.txt - This file
      EmbeddedWebApp.pdf

   This gadget sample is made available to Cisco partners and customers as
   a convenience to help minimize the cost of Cisco Finesse customizations.
   Please see the readme.txt in the FinesseJavaScriptLibrary folder for
   futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------
There are no special requirements for this sample gadget.

III. Usage
-------------------------------------------------------------------------------
There is no special usage requirements for this sample gadget.