var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {};  // for logging

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.HubTopic = (function ($) {
    /**
     * Handler for the dataRequestHandler from a hub.subscribe request.
     */
    var _dataRequestHandler = function (topic, data) {
        var dataCopy;
        clientLogs.log ("_dataRequestHandler(): in method");
        
        //Ensure a valid data object with "type" and "data" properties.
        if (typeof data === "object" &&
            typeof data.type === "string" &&
            typeof data.data === "object") {

            switch (data.type) {
                case "SendDataReq":
                    // place the text in the 'hubtext' element
                    $('#hubtext').html(data.data.text);
                    break;
                default:
                    break;
            }
        }
    };
    
    /** @scope finesse.modules.HubTopic */
    return {
        /**
         * Sets the hub text
         * Publish data to the our topic.
         * @private
         */
        setHubText : function () {
            var text;

            text = $('#hubtextin').val();
            clientLogs.log("setHubText(): text is " + text);

            if (gadgets.Hub) {
                clientLogs.log("setHubText(): check gadgets.hub");
                 var data = {
                        type: "SendDataReq",
                        data: { text : text},
                        invokeID: (new Date()).getTime()
                    };

                clientLogs.log("setHubText(): publish HubTopic");
                gadgets.Hub.publish("sampleGadget.info", data);
                clientLogs.log("setHubText(): returned from gadgets.Hub.publish");
            }
        },

        /**
         * Performs all initialization for this gadget
         */
        init : function () {
            var clientLogs = finesse.cslogger.ClientLogger;   // declare clientLogs
            
            gadgets.window.adjustHeight();
            
            // Initiate the ClientServices and load the user object.  ClientServices are
            // initialized with a reference to the current configuration.
            finesse.clientservices.ClientServices.init(finesse.gadget.Config);

            // Initiate the ClientLogs. The gadget id will be logged as a part of the message
            clientLogs.init(gadgets.Hub, "HubTopicSampleGadget", finesse.gadget.Config);

            // subscribe to the hub topic "sampleGadget.info"
            if (gadgets.Hub) {
                clientLogs.log("init(): checked gadgets.hub");
                
                gadgets.Hub.subscribe("sampleGadget.info", _dataRequestHandler);
                clientLogs.log("init(): subscribe to sampleGadget.info");
            }
        }
    };
}(jQuery));
