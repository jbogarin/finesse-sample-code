var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

// Gadget Config needed for instantiating ClientServices
/** @namespace */
finesse.gadget.Config = (function () {
    var _prefs = new gadgets.Prefs();

    /** @scope finesse.gadget.Config */
    return {
        authorization: _prefs.getString("authorization"),
        country: _prefs.getString("country"),
        language: _prefs.getString("language"),
        locale: _prefs.getString("locale"),
        host: _prefs.getString("host"),
        hostPort: _prefs.getString("hostPort"),
        extension: _prefs.getString("extension"),
        mobileAgentMode: _prefs.getString("mobileAgentMode"),
        mobileAgentDialNumber: _prefs.getString("mobileAgentDialNumber"),
        xmppDomain: _prefs.getString("xmppDomain"),
        pubsubDomain: _prefs.getString("pubsubDomain"),
        restHost: _prefs.getString("restHost"),
        scheme: _prefs.getString("scheme"),
        localhostFQDN: _prefs.getString("localhostFQDN"),
        localhostPort: _prefs.getString("localhostPort"),
        teamId: _prefs.getString("teamId"),
        teamName: _prefs.getString("teamName"),
        clientDriftInMillis: _prefs.getInt("clientDriftInMillis"),
        compatibilityMode: _prefs.getString("compatibilityMode")
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