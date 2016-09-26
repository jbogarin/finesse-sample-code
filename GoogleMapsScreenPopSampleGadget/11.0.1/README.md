****************************************************************************
Cisco Finesse - Google Maps ScreenPop Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The Google Maps ScreenPop sample gadget is intended to serve as an example of
   popping a  call variable (callvariable3) into a Google map search.
   
   To use this gadget you need to obtain a license key from Google.  See Usage
   below for more info.
   
   This sample illustrates how to initialize the gadget, and to set up handlers
   for user and dialog updates, including accessing callvariable3 of the dialog.
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and set up handlers for user and dialog updates
   and to use an address from a callvariable to conduct a google maps search.
   
   The sample contains the following files:

      FinesseJavaScriptLibrary/
         readme.txt
      GoogleMapsScreenPop\
         GoogleMapsScreenPop.css
         GoogleMapsScreenPop.js
         GoogleMapsScreenPop.xml
      _readme.txt - This file
      GoogleMapsScreenpop.pdf

   This gadget sample is made available to Cisco partners and customers as
   a convenience to help minimize the cost of Cisco Finesse customizations.
   Please see the readme.txt in the FinesseJavaScriptLibrary folder for
   futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------

A valid address in CallVariable 3 to do the Google map search on.


III. Usage
-------------------------------------------------------------------------------

Before you attempt to deploy the gadget, You will need to get a license key from
Google see: 
   https://developers.google.com/maps/licensing
   or https://developers.google.com/maps/documentation/javascript/tutorial#api_key

You will need to edit the GoogleMapsScreenPop.js file and replace [ENTER API KEY]
with your license key.

For more information on google maps and the google maps API see:
   https://developers.google.com/maps/
   and https://developers.google.com/maps/documentation/javascript/

See the document GoogleMapsScreenpop.pdf which shows how to modify  gadget
javascript and also how to "install" your gadget.

