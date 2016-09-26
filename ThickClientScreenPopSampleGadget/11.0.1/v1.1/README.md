****************************************************************************
Cisco Finesse - ThickClientScreenPop Sample Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The ThickClientScreenPop sample gadget is intended to serve as an example of 
   passing a command line on a workflow action to be executed as a windows command by 
   using a JavaApplet in a Finesse gadget.  The command can be used to
   run a Windows application such as the sample WindowsApplication.exe
   
   This sample illustrates how to initialize the gadget, and to set up a handler
   for the workflow action event, and shows how to pass that to a applet which
   then invokes the command line passed on the workflowaction event.  If the command
   line invoked is "WindowsApplication.exe <callvar1>" then callvar1 will be passed
   to the Windows application and displayed in the label.  See the
   ThickClientScreenPopSampleGadget.pdf for more information.
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   that you can execute a Windows command line from within finesse gadget using
   a Java Applet.
   
   The sample contains the following files:

      FinesseJavaScriptLibrary/
         readme.txt
      JavaScreenPopApplet/
         JavaScreenPop.jar
         JavaScreenPopApplet.java
      ThickClientScreenPop/
         ThickClientScreenPop.css
         ThickClientScreenPop.js
         ThickClientScreenPop.xml
         WindowsApplication.exe
      WindowsApplication/
         WindowsApplication/
            Form1.vb
      _readme.txt - This file
      ThickClientScreenPop.pdf

   This gadget sample is made available to Cisco partners and customers as
   a convenience to help minimize the cost of Cisco Finesse customizations.
   Please see the readme.txt in the FinesseJavaScriptLibrary folder for
   futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------

   See ThickClientScreenPopSampleGadget.pdf
   You must modify the ThickClientScreenPop.xml applet tag to point to the
   applet jar file (i.e. JavaScreenPop.jar) on your 3rd party web server.


III. Usage
-------------------------------------------------------------------------------
   See ThickClientScreenPopSampleGadget.pdf