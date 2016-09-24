var finesse = finesse || {};
finesse.modules = finesse.modules || {};

/** @namespace */
finesse.modules.Reload = (function ($) {
	var containerServices;

	return {
        /**
         * Init function.
         */
        init: function () {
            // Initialize the container services
            containerServices = finesse.containerservices.ContainerServices.init();
        },

        /**
         * Reload the gadget from the given url
         */
        reloadMyGadgetFromUrl: function (url) {
        	containerServices.reloadMyGadgetFromUrl(url);
        }
    };
}(jQuery));