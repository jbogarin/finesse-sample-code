****************************************************************************
Cisco Finesse - JavaScript Library
Cisco Systems, Inc.
http://www.cisco.com/
****************************************************************************

I. Disclaimer
-------------------------------------------------------------------------------
This javascript library is made available to Cisco partners and customers as
a convenience to help minimize the cost of Cisco Finesse customizations.
This library can be used in Cisco Finesse deployments.  Cisco does not
permit the use of this library in customer deployments that do not include
Cisco Finesse.  Support for the javascript library is provided on a
"best effort" basis via CDN.  Like any custom deployment, it is the
responsibility of the partner and/or customer to ensure that the
customization works correctly and this includes ensuring that the Cisco
Finesse JavaScript is properly integrated into 3rd party applications.
Cisco reserves the right to make changes to the javascript code and
corresponding API as part of the normal Cisco Finesse release cycle.  The
implication of this is that new versions of the javascript might be
incompatible with applications built on older Finesse integrations.  That
said, it is Cisco's intention to ensure javascript compatibility across
versions as much as possible and Cisco will make every effort to clearly
document any differences in the javascript across versions in the event
that a backwards compatibility impacting change is made.

II. Requirements
-------------------------------------------------------------------------------
This library depends on and requires the following objects to be present:
- gadgets.* APIs (specifically gadgets.json, gadgets.io and gadgets.Hub)
- jQuery

III. Usage
-------------------------------------------------------------------------------
The gadgets.* APIs are generally provided by the gadget container for gadget
code to invoke. Certain APIs may only be available if specified as a
"required feature" in the gadget specification XML; gadgets.json and gadgets.io
are provided while gadgets.Hub requires the "pubsub2" feature specified in the
<ModulePrefs> node:
<ModulePrefs>
	...
	<Require feature="pubsub-2" />
	...
</ModulePrefs>

Starting with Finesse 10.0, gadgets must also specify the "setprefs" feature 
in the <ModulePrefs> node. Developers will also want to import the Finesse
Javascript Library (finesse.js) prior to accessing the "authorization" property
from the gadget prefs.

Starting with Finesse 10.6, jQuery and the Finesse JavaScript library can be
accessed from the Finesse server by using the following imports:
<!-- jQuery -->          
<script type="text/javascript" src="/desktop/assets/js/jquery.min.js"></script>
<!-- Finesse Library -->
<script type="text/javascript" src="/desktop/assets/js/finesse.js"></script>

Usage of the finesse.restservices classes simply require ClientServices to
be initialized:

finesse.clientservices.ClientServices.init(obj);

Please refer to the documentation for the specific parameters required by
this method, and to the sample gadget code for how to obtain this information.

Starting with Finesse 10.6, the documentation for the Finesse JavaScript library
can be accessed from the Finesse server by using the following URL:
http://<server>/desktop/assets/js/doc/index.html