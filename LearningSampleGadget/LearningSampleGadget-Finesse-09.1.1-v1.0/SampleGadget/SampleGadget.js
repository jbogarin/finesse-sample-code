var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

/** @namespace */
// Configuration for the gadget
finesse.gadget.Config = (function () {
	var _prefs = new gadgets.Prefs();

	/** @scope finesse.gadget.Config */
	return {
		authorization: _prefs.getString("authorization"),
		host: _prefs.getString("host"),
		restHost: "localhost"
	};
}());

/**
 * The following comment prevents JSLint errors concerning the logFinesse function being undefined.
 * logFinesse is defined in Log.js, which should also be included by gadget the includes this file.
 */
/*global logFinesse */

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {

	/** @scope finesse.modules.SampleGadget */
	return {
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
	        gadgets.window.adjustHeight();
	    }
    };
}(jQuery));
