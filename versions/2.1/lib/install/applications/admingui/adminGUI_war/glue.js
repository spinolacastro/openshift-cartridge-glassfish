/*
 * These are some predefined glue listeners that you can
 *  modify to fit your application.
 *
 * This file should not placed in the /resources directory of your application
 * as that directory is for jmaki specific resources.
 */

// uncomment to turn on the logger
jmaki.debug = false;
// uncomment to show publish/subscribe messages
jmaki.debugGlue = false;

// map topic dojo/fisheye to fisheye handler
jmaki.subscribe("/dojo/fisheye*", function(args) {
    jmaki.log("glue.js : fisheye event");
 });


// map topics ending with  /onSave to the handler
jmaki.subscribe("*onSave", function(args) {
    jmaki.log("glue.js : onSave request from: " + args.id + " value=" + args.value);
});

// map topics ending with  /onSave to the handler
jmaki.subscribe("*onSelect", function(args) {
    jmaki.log("glue.js : onSelect request from: " + args.widgetId);
});

// map topics ending with  /onSave to the handler
jmaki.subscribe("*onClick", function(args) {
    jmaki.log("glue.js : onClick request from: " + args.widgetId);
});

jmaki.namespace("admin.blockList.RSSFilter");

admin.blockList.RSSFilter = function(input) {
    return input.channel.items;
};

admin.blockList.RemoveFirstImageFilter = function(input) {
    // Remove all but the first image
    var len = input.channel.items.length;
    for (var cnt = 1; cnt < len; cnt++) {
	var desc = input.channel.items[cnt].description;
	var idx = desc.indexOf('<img');
	if (idx != -1) {
	    var idx2 = desc.indexOf('>', idx);
	    if (idx2 != -1) {
		var newDesc = desc.substring(0, idx);
		newDesc += desc.substring(idx2 + 1);
		input.channel.items[cnt].description = newDesc;
	    }
	}
    }
    return input.channel.items;
};

