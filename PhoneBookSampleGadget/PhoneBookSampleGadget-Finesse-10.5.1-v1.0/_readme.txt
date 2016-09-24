****************************************************************************
Cisco Finesse - PhoneBook Sample Gadget
Cisco Systems, Inc.
http://www.cisco.com/
http://developer.cisco.com/web/finesse
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------

   The PhoneBook Sample Gadget is intended to serve as an example of accessing
   the User's PhoneBooks collection.
      
   This is only a sample and is NOT intended to be a production quality
   gadget and will not be supported as such.  It is NOT guaranteed to
   be bug free. It is merely provided as a guide for a programmer to see
   how to initialize a gadget and set up handlers for user and dialog updates.
   
	The sample contains the following files:
	
	_readme.txt - This file
	PhoneBook.pdf - additional documentation
	PhoneBook/
		PhoneBook.xml
		PhoneBook.js
		PhoneBook.css
		finesse-10.5.1.js
		jquery-1.9.1.min.js

    This gadget sample is made available to Cisco partners and customers as
    a convenience to help minimize the cost of Cisco Finesse customizations.
    Please see the readme.txt in the finesse javascript libraries zip
    for futher information about the Finesse libraries.


II. Requirements
-------------------------------------------------------------------------------
Something in Callvariable 3 to screenpop into Bing search.
A Phonebook assigned to the user (you can verify this using the CallControl gadget)

III. Usage
-------------------------------------------------------------------------------

Add the gadget to your layout and sign in an agent.  The gadget should display
Phonebook entries at the bottom of the gadget (see PhoneBook.pdf)