/*
 * Common utility
 */

/* To work around a timing issue where for Firefox 2.0.0.3 on Mac OS X
 * We need to put in a little delay before returning the var
 */
function getConfirm(theButton, msg){
    var oldOnFocus = theButton.onfocus;
    theButton.onfocus = "";
    var val=confirm(msg);
    theButton.onfocus = oldOnFocus;
    return val;
}

function showAlert(msg){
    setTimeout("alert('" + msg + "')", 100);
    return false;
}


function submitAndDisable(button, msg, target) {
    button.className='Btn1Dis'; // the LH styleClass for disabled buttons.
    button.disabled=true; 
    button.form.action += "?" + button.name + "=" + encodeURI(button.value); //bug# 6294035
    button.value=msg;
    if (target) {
	button.form.target = target;
    }
    button.form.submit(); 
    return true; 
}


function submitAndDisable(button, msg) {
    button.className='Btn1Dis'; // the LH styleClass for disabled buttons.
    button.disabled=true; 
    button.form.action += "?" + button.name + "=" + encodeURI(button.value); //bug# 6294035
    button.value=msg;
    button.form.submit(); 
    return true; 
}

function submitAndDisableBoth(button, msg, button2Id) {
    button.className='Btn1Dis'; // the LH styleClass for disabled buttons.
    button.disabled=true;
    button.value=msg;

    var button2 = document.getElementById(button2Id);
    button2.className='Btn1Dis'; // the LH styleClass for disabled buttons.
    button2.disabled=true;
    button2.value=msg;

    button.form.action += "?" + button.name + "=" + encodeURI(button.value); //bug# 6294035
    button.form.submit(); 
    return true; 
}


function getField(theForm, fieldName) {
    for (i=0; i < theForm.elements.length; i++) {
        var value = theForm.elements[i].name;
        if (value == null) {
            continue;
        }
        var pos = value.lastIndexOf(':');
        var helpKeyFieldName = value.substring(pos+1);
        if (helpKeyFieldName == fieldName) {
            return theForm.elements[i];
        }
    }
    return null;
}


function getTextElement(componentName) {
    return webui.suntheme.field.getInputElement(componentName);
}

function getSelectElement(componentName) {
    return webui.suntheme.dropDown.getSelectElement(componentName);
}

function getFileInputElement(componentName) {
    return webui.suntheme.upload.getInputElement(componentName);
}

function disableComponent(componentName, type) {
    component = null;
    if (type != null && type == 'file') {
        component = getFileInputElement(componentName);
    }
    else if(type != null && type == 'select') {
        component = getSelectElement(componentName);
    }
    else {
        component = getTextElement(componentName);
        component.value='';
    }
    component.disabled=true;
    component.className='TxtFldDis_sun4';
}

function disableBtnComponent(componentName) {
    component = document.getElementById(componentName);
    component.disabled=true;
    component.className='Btn1Dis';
}

function enableBtnComponent(componentName) {
    component = document.getElementById(componentName);
    component.disabled=false;
    component.className='Btn1';
}

function enableComponent(componentName, type) {
    component = null;
    if (type != null && type == 'file') {
        component = getFileInputElement(componentName);
    }
    else if(type != null && type == 'select') {
        component = getSelectElement(componentName);
    }
    else {
        component = getTextElement(componentName);
    }
    component.className='TxtFld_sun4';
    component.disabled=false;
}

function isChecked (elementName)
{
    var element = document.getElementById (elementName);
    if (element != null) {
        if (element.checked) {
            return true;
        }
        else {
            return false;
        }
    }
}

function checkForValue(formField) { 
    var result = (formField.value != '') && (isWhitespace(formField.value) == false); 
    if (result == false) formField.select();
    return result; 
}

//==========================================================
// Set a cookie

function setCookie(c_name,value,expiredays)
{
    //alert( c_name + ',' + value + ',' + expiredays);
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


//===========================================================

/** 
 * Relating to Deployment
 */

function setVisible(type) {
    var fixedValue = 'form:title:ps:psec:';
    if (type == "webApp") {
        var fields = new Array();
        fields[0] = fixedValue.concat("wsp");
        fields[1] = "form:title:ps:advancedSection";
        fields[2] = fixedValue.concat("threadpoolProp");
        fields[3] = fixedValue.concat("registryProp");
        setVisibleFields(fields, false);
        fields = new Array();
        fields[0] = fixedValue.concat("cxp");
        fields[1] = fixedValue.concat("vsp");
        fields[2] = fixedValue.concat("precmplProp");
        fields[3] = fixedValue.concat("librariesProp");
        fields[4] = fixedValue.concat("enableProp");
        setVisibleFields(fields, true);
        setTargetSection(true);
        setHaProp(fixedValue.concat("haProp"), true);
    }
    else if (type == "application") {
        var fields = new Array();
        fields[0] = fixedValue.concat("cxp");
        fields[1] = fixedValue.concat("threadpoolProp");
        fields[2] = fixedValue.concat("registryProp");
        setVisibleFields(fields, false);
        var fields = new Array();
        fields[0] = fixedValue.concat("vsp");
        fields[1] = fixedValue.concat("wsp");
        fields[2] = fixedValue.concat("precmplProp");
        fields[3] = "form:title:ps:advancedSection";
        fields[4] = fixedValue.concat("librariesProp");
        fields[5] = fixedValue.concat("enableProp");
        setVisibleFields(fields, true);
        setTargetSection(true);
        setHaProp(fixedValue.concat("haProp"),true);
    }
    else if (type == "ejbModule") {
        webui.suntheme.common.setVisible("form:title:ps:advancedSection", true);
        webui.suntheme.common.setVisible(fixedValue.concat("librariesProp"), true);
        webui.suntheme.common.setVisible(fixedValue.concat("enableProp"), true);
        var fields = new Array();
        fields[0] = fixedValue.concat("wsp");
        fields[1] = fixedValue.concat("cxp");
        fields[2] = fixedValue.concat("vsp");
        fields[3] = fixedValue.concat("precmplProp");
        fields[4] = fixedValue.concat("threadpoolProp");
        fields[5] = fixedValue.concat("registryProp");
        setVisibleFields(fields, false);
        setTargetSection(true);
        setHaProp(fixedValue.concat("haProp"),true);
    }
    else if (type == "appclient") {
        webui.suntheme.common.setVisible(fixedValue.concat("wsp"), true);
        webui.suntheme.common.setVisible("form:ps:advancedSection", true);

        var fields = new Array();
        fields[0] = fixedValue.concat("librariesProp");
        fields[1] = fixedValue.concat("enableProp");
        fields[2] = fixedValue.concat("precmplProp");
        fields[3] = fixedValue.concat("cxp");
        fields[4] = fixedValue.concat("vsp");
        fields[5] = fixedValue.concat("threadpoolProp");
        fields[6] = fixedValue.concat("registryProp");
        setVisibleFields(fields, false);
        setTargetSection(false);
        setHaProp(fixedValue.concat("haProp"),false);
    }
    else if (type == "connector") {
        webui.suntheme.common.setVisible("form:title:ps:advancedSection", false);
        var fields = new Array();
        fields[0] = fixedValue.concat("precmplProp");
        fields[1] = fixedValue.concat("cxp");
        fields[2] = fixedValue.concat("vsp");
        fields[3] = fixedValue.concat("wsp");
        fields[4] = fixedValue.concat("librariesProp");
        fields[5] = fixedValue.concat("targetSectionId");
        setVisibleFields(fields, false);

        fields = new Array();
        fields[0] = fixedValue.concat("threadpoolProp");
        fields[1] = fixedValue.concat("registryProp");
        setVisibleFields(fields, true);
        setTargetSection(true);
        setHaProp(fixedValue.concat("haProp"), false);
    }
}

function setVisibleFields(fields, value) {
    for (ctr=0; ctr < fields.length; ctr++) {
        webui.suntheme.common.setVisible(fields[ctr], value);
    }
}


function checkExtension(appType, extensionId, msg, reqdMsg){
    var extension = getTextElement(extensionId).value;
    //alert(appType + ',' + extension + ',' +  msg);
    if (extension.length <= 0) {
        return true;
    }
    if (((appType == "webApp") && (extension != ".war")) ||
        ((appType == "application") && (extension != ".ear")) ||
        ((appType == "ejbModule") && (extension != ".jar")) ||
        ((appType == "appclient") && (extension != ".jar")) ||
        ((appType == "connector") && (extension != ".rar")) ) {
        return showAlert(msg);
    }
    else
        return true;

}


function setTargetSection(value){
    id = "form:title:ps:targetSectionId";
    component = document.getElementById(id);
    if (component != null)
        webui.suntheme.common.setVisible(id, value);
}

function setHaProp(id, value){
    component = document.getElementById(id);
    if (component != null)
        webui.suntheme.common.setVisible(id, value);
}

function checkRedeployRequired(form, reqdMesg) {
    var uploadField = getField(form, "fileupload");
    var dirField = getField(form, "dirPath");

    if (uploadField.value=='' && dirField.value=='') {
        return showAlert(reqdMesg);
    }
    return true;
}

function extractName(value) {
    var appName="";
    var len=-1;
    if ((len = value.lastIndexOf('/')) != -1) {
        appName = value.substring(len+1, value.length);
    }
    else {
        //For window platform, use backsplash
        len = value.lastIndexOf('\\');
        appName = value.substring(len+1, value.length);
    }
    return appName;
}


function getPrefix(fullName){
    index = fullName.lastIndexOf(".");
    if (index == -1)
        return fullName;
    else
        return fullName.substring(0, index);
}

function getSuffix(fullName){
    index = fullName.lastIndexOf(".");
    if (index == -1)
        return "";
    else
        return fullName.substring(index, fullName.length);
}

function setFieldValue(appNameId, value,  typeId, contextRootId, extensionId) {
    appName = extractName(value);
    var pfex = getPrefix(appName);
    var sfex = getSuffix(appName);
    
    component = getTextElement(extensionId);
    component.value=sfex;

    if (appNameId==null || appNameId.length <=0)
        return;
    component = getTextElement(appNameId);
    component.value=pfex

    component = getSelectElement(typeId);
    if (component.value == "webApp") {
        component = getTextElement(contextRootId);
        component.value = pfex
    }
}


function populateDirAndAppName(fileChooserId, dirPathId, appNameId, typeId, ctxRootId, extensionId){ 
    var fc = document.getElementById(fileChooserId).getSelectionValue();
    window.opener.getTextElement(dirPathId).value = fc;

    var appName = extractName(fc);
    if (appNameId.length > 0) {
        window.opener.getTextElement(appNameId).value=getPrefix(appName);
    }
    if (extensionId.length > 0) {
        window.opener.getTextElement(extensionId).value=getSuffix(appName);
    }

    if (typeId.length > 0) {
        type = window.opener.getSelectElement(typeId).value;
        if (type == "webApp") {
            component = window.opener.getTextElement(ctxRootId);
            component.value = getPrefix(appName);
        }
    }
    window.close();
}

function populatorDirAndAppName(fileChooserId, txtFld2Id){ 
    var fc = document.getElementById(fileChooserId).getSelectionValue();
 	window.opener.getTextElement(txtFld2Id).value = fc;
    window.close();
 }


function checkType(theButton, typeId, extensionId, msg){

    var appType = getSelectElement(typeId).value;
    var extension = getTextElement(extensionId).value;

    if (extension.length <= 0)
        return true;
    if (((appType == "webApp") && (extension != ".war")) ||
        ((appType == "application") && (extension != ".ear")) ||
        ((appType == "ejbModule") && (extension != ".jar")) ||
        ((appType == "appclient") && (extension != ".jar")) ||
        ((appType == "connector") && (extension != ".rar")) ) {
        return getConfirm(theButton, msg);
    }
    else
        return true;

}

// End of Deployment code

//===========================================================================
/** 
  *  Start support for On Line Help 
  */

function doHelp(url) {
    var helpLink = url.href;
    var frame = findFrame("main");
    form = frame.document.forms[0];
    if (!form) {
        var frame = findFrame("home");
        form = frame.document.forms[0];
        if (!form) {
            return null;
        }
    }
    hid = getField(form, "helpKey");
    if (hid != null && hid.value != "") {
        helpLink = helpLink.replace("CONTEXT_HELP.html", hid.value);
    }
    openInHelpWindow(helpLink);
}


function openInHelpWindow(url) {
    win = window.open(url, "HelpWindow" , "width=800, height=530, resizable"); 
    win.focus();
}

function findFrameRecursive( winOrFrame, frameName ) {
    // 1. CHECK THIS FRAME (winOrFrame)
    // home string is being checked to take care of the complex
    // frameset in PE homepage. Need to fix this in a Generic way later.
    if ( (winOrFrame.name && (winOrFrame.name == frameName)) ||
         winOrFrame.name == "home" )
        return winOrFrame;

    // 2. SEARCH SUBFRAMES.  note: when there are no sub-frames,
    // the frames array has 1 entry which is this frame,
    // hense this check for 2+ subframes
    if ( winOrFrame.frames.length < 2 )
        return null;

    // recurse
    for ( i= 0 ; i < winOrFrame.frames.length ; i++ ) {
        var x= findFrameRecursive( winOrFrame.frames[i], frameName );
        if ( x )
            return x;
    }
    return null;
}

function findFrame(frameName) {
    return findFrameRecursive(top, frameName);
}

//===========================================================================

/*
 *  The following function loads the login page in top window.
 */

function loadInTopWindow() {
    if (window.parent.frames.index) {
        window.parent.location="/";
    }
}

//===========================================================================

var admingui = {};

/*
 *  The following functions are utility functions.
 */
admingui.util = {

    /**
     *	This function finds an Array[] of nodes matching the (checkFunc),
     *	which is a JS function that takes two arguments: the HTML node object
     *	to check, and an optional "argument" (arg) that is passed through.
     */
    findNodes: function(node, checkFunc, arg) {
        var results = new Array();
        if (node == null) {
            return null;
        }

        // Check for match
        if (checkFunc(node, arg)) {
            results[results.length] = node;
        }

        // Not what we want, walk its children if any
        var nodeList = node.childNodes;
        if (nodeList && (nodeList.length > 0)) {
            var moreResults;

            // Look for more matches...
            for (var count = 0; count<nodeList.length; count++) {
                // Recurse
                moreResults = admingui.util.findNodes(nodeList[count], checkFunc, arg);
                if (moreResults) {
                    // Append the results
                    results = results.concat(moreResults);
                }
            }
        }

        // Make sure we found something...
        if (results.length == 0) {
            results = null;
        }

        // Return what we found (if anything)
        return results;
    }
}


/*
 *  The following functions provide breadcrumbs and tree functionality.
 */
admingui.nav = {
    
    refreshCluster: function(hasCluster){
        var node1 = admingui.nav.getTreeFrameElementById('form:tree:clusters');
        var node2 = admingui.nav.getTreeFrameElementById('form:tree:clusters2');
        var node3 = admingui.nav.getTreeFrameElementById('form:tree:clusters2_children');
        var tree = admingui.nav.getTreeFrameElementById("form:tree");
        admingui.nav.refreshTree('form:tree:clusters2');
        if (hasCluster=='true' || hasCluster=='TRUE') {
            node1.style.display='none';
            node2.style.display='block';
            node3.style.display='block';
            tree.selectTreeNode('form:tree:clusters2');
        } else {
	    //there is a problem in hiding clusters2,  it doesn' hide it, maybe because of the 
	    //dynamic treenode under it ? still need to figure this out.
            node3.style.display='none';
            node2.style.display='none';
            node1.style.display='block';
            tree.selectTreeNode('form:tree:clusters');
        }
    },
    
    /**
     *	<p> This function allows you to provide a clientId of a TreeNode in the
     *	    navigation frame to be "refreshed".  This means that it and its
     *	    children will be deleted, recreated, and redisplayed.</p> 
     */
    refreshTree: function(refreshNodeId) {
        if (window.parent && window.parent.frames.index) {
            if (document != window.parent.frames.index.document) {
                //ensure we call from index frame
                window.parent.frames.index.admingui.nav.refreshTree(refreshNodeId);
                return;
            }
            // Make sure the TreeFrame exists with DF support
            var df = window.parent.frames.index.DynaFaces;
            if (df) {
                var refreshNode = null;
                //alert('refreshNodeId='+refreshNodeId);
                if (refreshNodeId) {
                    refreshNode = admingui.nav.getTreeFrameElementById(refreshNodeId);
                    //alert('refreshNode='+refreshNode);
// FIXME: Warn if not found... How do you log a warning in JavaScript?  I don't want an alert().
                }
                else {
                    refreshNode = admingui.nav.getSelectedTreeNode();
                    refreshNodeId = refreshNode.id;
                }
                var updateTreeAction = admingui.nav.getTreeFrameElementById("form:update");
                if (refreshNode && updateTreeAction) {
                    df.fireAjaxTransaction(refreshNode,{
                                           execute: updateTreeAction.id,
                                           inputs: updateTreeAction.id,
                                           parameters: "updateTreeNode=" + refreshNodeId,
                                           replaceElement: admingui.nav.updateTreeNodeAjaxCallback,
                                           immediate: false,
                                           render: refreshNodeId
                                           });
                    return false;
                }
            }
        }
    },

    /**
     *	<p> This function is called in response to a DynamicFaces request.  It
     *	    takes the return value and replaces the old content with the
     *	    content from the Ajax response.  It currently only replaces the
     *	    children of the updated node.  It does this b/c the updated node
     *	    itself does not change in our current use cases, and because it
     *	    makes maintaining highlighting easier.  In the future this may
     *	    change.</p>
     */
    updateTreeNodeAjaxCallback: function(id, data, closure, xjson) {
	// Get the html node to replace for the TreeNode...
	var treeNode = admingui.nav.getTreeFrameElementById(id);
	if (!treeNode) {
	    return;
	}

	// Get the parent node (can be used for TreeNode children also)
	var parent = treeNode.parentNode;

	// Create a temporary <div> so we can extract the 2 nodes we need...
	var tmpDiv = document.createElement("div");
	tmpDiv.innerHTML = data;

	// Replace it!
	var newNode = tmpDiv.childNodes[0];
	newNode.className = treeNode.className;
	newNode.style["display"] = treeNode.style["display"];
	parent.replaceChild(newNode, treeNode); 

	// Get the html node to replace for the TreeNode children...
	treeNode = admingui.nav.getTreeFrameElementById(id + "_children");
	if (treeNode) {
	    // Get the new children...
	    newNode = tmpDiv.childNodes[0];

// FIXME: Provide some logging:
//if (!newNode) {
            //log a warning!
//}

            newNode.style["display"] = treeNode.style["display"];
            newNode.className = treeNode.className;
            admingui.nav.copyStyleAndClass(treeNode, newNode);

            // replace it...
            parent.replaceChild(newNode, treeNode);
        }
        else {
            // I think it's always there...
            alert('child tree nodes not found.');
        }
    },


    /**
     *
     */
    copyStyleAndClass: function(src, dest) {
        if (!src || !dest || !src.childNodes || !dest.childNodes) {
            return;
        }
        var name = null;
        for (var idx=0; idx<src.childNodes.length; idx++) {
            name = src.childNodes[idx].id;
            if (name) {
                for (var cnt=0; cnt<dest.childNodes.length; cnt++) {
                    if (name == dest.childNodes[cnt].id) {
                        dest.childNodes[cnt].style["display"] = src.childNodes[idx].style["display"];
                        dest.childNodes[cnt].className = src.childNodes[idx].className;
                        admingui.nav.copyStyleAndClass(src.childNodes[idx], dest.childNodes[cnt]);
                    }
                }
            }
        }
    },

    /**
     *	This function clears all treeNode selections.
     */
    clearTreeSelection: function(treeId) {
        var tree = admingui.nav.getTreeFrameElementById(treeId);
        if (tree) {
            tree.clearAllHighlight(treeId);
        }
    },

    /**
     *	This function selects a treeNode matching the given URL.
     */
    selectTreeNodeWithURL: function(url) {
        if (window.parent.frames.index) {
            var tree = admingui.nav.getTreeFrameElementById("form:tree");
            var matches =
            admingui.util.findNodes(tree, admingui.nav.matchURL, url);
            if (matches) {
                // FIXME: Find "best" match... this will be needed if the URL
                // is ambiguous, which may happen if post requests occur which
                // leave off QUERY_STRING data that is needed to identify the
                // URL.  It's probably best to leave the highlighting alone in
                // many of these cases... perhaps search for the nearest match
                // to the currently selected node.  Anyway, for now I will
                // ignore this until we need to fix it...
//		for (var test = 0; test < matches.length; test++) {
                admingui.nav.selectTreeNode(
                                           admingui.nav.getContainingTreeNode(matches[0]));
//		}
            }
        }
    },

    /**
     *	This function selects the given treeNode.
     */
    selectTreeNode: function(treeNode) {
        var tree = admingui.nav.getTree(treeNode);
        if (tree) {
            tree.selectTreeNode(treeNode.id);
        }
    },

    /**
     *	This function selects the given treeNode.
     */
    selectTreeNodeById: function(treeNodeId) {
        var tree = admingui.nav.getTree(
                                       admingui.nav.getTreeFrameElementById(treeNodeId));
        if (tree) {
            tree.selectTreeNode(treeNodeId);
        }
    },

    /**
     *	This function looks for an "A" node with a url equal to the url
     *	passed in.
     */
    matchURL: function(node, url) {
        var result = null;
        if ((node.nodeType == 1) && (node.nodeName == "A") && (node.href.indexOf(url) > -1)) {
            result = node;
        }
        return result;
    },

    /**
     *	This function attempts to obtain the tree frame's tree object and
     *	return its selected Tree node.  It will return null if unable to do
     *	this.  It will <b>not</b> wait for the tree frame to load if it is not
     *	already loaded.
     */
    getSelectedTreeNode: function() {
        var tree = admingui.nav.getTreeFrameElementById("form:tree");
        if (tree && tree.getSelectedTreeNode) {
            return tree.getSelectedTreeNode(tree.id);
        }
    },

    /**
     *	This function determines what bread crumbs should be displayed by
     *	looking at the currently selected TreeNode.
     *
     *	command	  - The button / href which will process the AjaxRequest, also
     *		    the source of the event.
     *	targetId  - The part(s) of the screen to refresh (breadcrumbs).
     *	count	  - Should be zero (0), helps prevent infinite loops.
     */
    calculateBreadCrumbs: function(command, targetId, count) {
        if (count == 5) {
            // This prevents an infinite loop.  Check for the tree frame up to
            // 5 times, 2 seconds apart.
            return;
        }
        if (window.parent.frames.index) {
            var tree = admingui.nav.getTreeFrameElementById("form:tree");
            if ((tree == null) || (tree.getSelectedTreeNode == null)) {
                // Tree isn't loaded yet, wait for it and try again
                setTimeout('admingui.nav.calculateBreadCrumbs(document.getElementById(\'' + command.id + '\'), \'' + targetId + '\', ' + (count + 1) + ')', 2000);
                return;
            }
            var selected = tree.getSelectedTreeNode(tree.id);
            if (selected) {
                return admingui.nav.submitAjaxRequest(command, targetId, admingui.nav.getBreadCrumbData(selected));
            }
            else {
                // No TreeNode is selected! Nothing to do??  Maybe set
                // CommonTask page?
            }
        }
    },

    /**
     *	This function submits an Ajax request using Dynamic Faces.  It also
     *	allows QUERY_STRING information to be sent.
     *
     *	command     - The button or href that is responsible for this event.
     *  targetId    - The id of the field(s) to be updated by this request.
     *  queryString - NVP information to send to the server.
     */
    submitAjaxRequest: function(command, targetId, queryString) {
        var form = null;
        if (queryString) {
            form = command;
            while (form && (form.nodeName != "FORM")) {
                form = form.parentNode;
            }
        }
        var oldAction = null;
        if (form) {
            oldAction = form.action;
            if (form.action.indexOf('?') == -1) {
                form.action += '?';
            }
            else {
                form.action += '&';
            }
            form.action += queryString;
        }
        DynaFaces.fireAjaxTransaction(command,{execute: command.id, inputs: command.id, immediate: false, render: targetId});
        if (oldAction) {
            form.action = oldAction;
        }
        return false;
    },

    /**
     *	This function provides access to DOM objects in the tree window.
     */
    getTreeFrameElementById: function(id) {
        //alert('in getTreeFrameElementById: id='+id);
		var indexFrame = findFrame("index");
        return indexFrame.document.getElementById(id);
    },

    /**
     *	This function returns the parent TreeNode for the given TreeNode.
     */
    getParentTreeNode: function(treeNode) {
        return window.parent.frames.index.webui.suntheme.tree.getParentTreeNode(treeNode);
    },

    getContainingTreeNode: function(href) {
        return window.parent.frames.index.webui.suntheme.tree.findContainingTreeNode(href);
    },

    getTree: function(treeNode) {
        if (treeNode) {
			var indexFrame = findFrame("index");
            return indexFrame.webui.suntheme.tree.getTree(treeNode);
        }
        return null;
    },

    /**
     *	This function is responsible for extracting the information
     *	needed to setup the Breadcrumbs.
     */
    getBreadCrumbData: function(treeNode) {
        var href = null;
        var id = null;
        var tmp = null;
        var text = '';
        var urls = '';
        while (true) {
            // Find the link associated with this TreeNode
            id = treeNode.id;

            // Get the next TreeNode
            treeNode = admingui.nav.getParentTreeNode(treeNode);
            if (!treeNode) {
                // No parent, we're processing the root TreeNode, skip it.
                break;
            }

            href = admingui.nav.getTreeFrameElementById(id + ':link');
            if (!href) {
                tmp = id.substring(id.lastIndexOf(':'));
                href = admingui.nav.getTreeFrameElementById(id + tmp + '_link');
            }
            if (href) {
                // Extract the link information
                // IE doesn't have the text attribute. Need to use innerText
                var tmp1 = href.text;
                if (!tmp1) {
                    tmp1 = href.innerText;
                }
                text = "text=" + encodeURIComponent(tmp1) + '&' + text;

                //IE doesn't start with a '/', we have to test and add it 
                var tmp2 = escape(href.pathname + href.search);
                if (tmp2.charAt(0) == '/')
                    urls = "urls=" + tmp2 + '&' + urls;
                else
                    urls = "urls=/" + tmp2 + '&' + urls;
            }
        }
        if (urls != '') {
            urls = urls.substring(0, urls.lastIndexOf('&'));
        }
        return text + urls;
    }
};

//============================================================
/**
  *   Validation functions
  */

function guiValidate(reqMsg,reqInt, reqPort){
    var inputFields = document.getElementsByTagName("input");
    for ( i=0; i< inputFields.length; i++) {
        component = inputFields[i];
        styleClass = component.className;
        if (styleClass == null || styleClass=='') {
            continue;
        }
        if (styleClass.match("require")) {
            if (component.value=='') {
                component.focus();
                return showAlert(reqMsg + ' ' + getLabel(component));
            }
        }
        
        if (styleClass.match("intAllowMinusOne")) {
            if (component.value =='' || component.value == '-1')
                return true;
            if (! checkForIntValue(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqInt + ' ' + getLabel( component ));
            }
        }

        if (styleClass.match("intAllowMinus")) {
            var num = 0;
            if (component.value !='' || num + component.value > 0){
                if (! checkForIntValue(component.value)) {
                    component.select();
                    component.focus();
                    return showAlert(reqInt + ' ' + getLabel( component ));
                }
            }
        }


        if (styleClass.match("integer")) {
            if (! checkForIntValueOrEmpty(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqInt + ' ' + getLabel( component ));
            }
        }


        if (styleClass.match("port")) {
            if (! checkForPortOrEmpty(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqPort + ' ' + getLabel( component ));
            }
        }
    }
    return true;
}

// FIXME: We should combine guiValidate() and guiValidateWithDropDown() these
// FIXME: perform similar operations but b/c of testing reasons we
// FIXME: added two methods.   We should combine these in the future. 

function guiValidateWithDropDown(reqMsg,reqInt, reqPort, reqMsgSelect){
    var selectFields = document.getElementsByTagName("select");
    var inputFields = document.getElementsByTagName("input");
    for ( i=0; i< inputFields.length; i++) {
        component = inputFields[i];
        styleClass = component.className;
        if (styleClass == null || styleClass=='') {
            continue;
        }
        if (styleClass.match("require")) {
            if (component.value=='') {
                component.focus();
                return showAlert(reqMsg + ' ' + getLabel(component));
            }
        }

        if (styleClass.match("intAllowMinusOne")) {
            if (component.value =='' || component.value == '-1')
                return true;
            if (! checkForIntValue(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqInt + ' ' + getLabel( component ));
            }
        }

        if (styleClass.match("intAllowMinus")) {
            var num = 0;
            if (component.value =='')  return true;
            if ((num + component.value) <=0) return true;
            if (! checkForIntValue(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqInt + ' ' + getLabel( component ));
            }
        }

        if (styleClass.match("integer")) {
            if (! checkForIntValueOrEmpty(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqInt + ' ' + getLabel( component ));
            }
        }

        if (styleClass.match("port")) {
            if (! checkForPortOrEmpty(component.value)) {
                component.select();
                component.focus();
                return showAlert(reqPort + ' ' + getLabel( component ));
            }
        }
    }
    for ( i=0; i< selectFields.length; i++) {
        component = selectFields[i];
        styleClass = component.className;
        if (styleClass == null || styleClass=='') {
            continue;
        }
        if (styleClass.match("require")) {
            if (component.value=='') {
                component.focus();
                return showAlert(reqMsgSelect + ' ' + getLabel(component));
            }
        }
    }
    return true;
}

function getLabel(component) {
    var id = component.id;
    var propId = id.substring(0,id.lastIndexOf(":"));
    var ss = propId.substring(propId.lastIndexOf(":")+1);
    var labelid=propId+':'+ss+'_label';
    var label = document.getElementById(labelid);
    var val = '';
    if (label != null) {
	//IE doesn't have textContent, need to use innerText;
	//firefox 2.0.0.1 doesn't have innerText, so need to test both.
	//val = label.textContent.substring(1);
	//val = label.innerText.substring(1);

	val = label.innerText;
	if (val ==null) {
	    val = label.textContent;
	}

	// Need to remove leading newline characters...
// FIXME: Consider using isWhitespace(val.charAt(0))
// FIXME: I didn't add it now b/c isWhitespace is defined in selectElements.js
// FIXME: and I don't have time to test that that file is included everywhere
// FIXME: that this function is called.
	while (val.charAt(0) == '\n') {
	    val = val.substring(1);
	}

	// Need to remove trailing newline characters...
// FIXME: Consider using isWhitespace(val.charAt(val.length-1))
// FIXME: I didn't add it now b/c isWhitespace is defined in selectElements.js
// FIXME: and I don't have time to test that that file is included everywhere
// FIXME: that this function is called.
	while ((val.charAt(val.length-1) == '\n') || (val.charAt(val.length-1) == ' ')) {
	    val = val.substring(0, val.length-1);
	}

	// Strip off the ':' so that it doesn't show in the alert.
	if (val.charAt(val.length-1) == ':') {
	    val = val.substring(0, val.length-1);
	}
    }
    return val;
}


function checkForIntValueOrEmpty(value) {
    if (value == '')
        return true;
    return checkForIntValue(value);
}

function checkForIntValue(value) {
    var result = (value != '') && isInCharSet(value, "0123456789");
    return result;
}

function checkForPortOrEmpty(value) {
    if (value == '')
        return true;
    return checkForPort(value);
}

function checkForPort(value) {
    if (value == '') return false;
    if (value.indexOf('${') == 0) return true;
    if (checkForIntValue(value) == false) return false;
    return checkNumbericRange(value, 0, 65536);
}



function checkNumbericRange(value, min, max) {
    var num = 0 + value;
    if (num < min || num > max)
        return false;
    return true;
}

function isInCharSet(str, charSet) {

    var i;
    for (i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (charSet.indexOf(c) < 0) {
            return false;
        }
    }
    return true;
}

function checkForNumericValueOrEmpty(value) {
    if (value == '')
        return true;
    return checkForNumericValue(value);
}

function checkForNumericValue(value) {
    var result = (value != '') && isInCharSet(value, "0123456789.");
    //if (result == false) {
		//This comment is by Senthil on Apr 11 2007. I think this is an
		//existing bug in this API.
		//formField isn't defined, or passed to this method, so just return the
		//result for now. Fixing this API now might involve lots of other changes, at this release time, so decided to live with this bug for now.
        //formField.select();
    //}
    return result;
}




//Special check for StatementTimeout for JDBC and connector connection pool

function checkPoolAttr(componentId, msg){
    component = getTextElement(componentId);
    value = component.value;
    if (value == '' || value == '-1' || checkForIntValue(value))
        return true;
    showAlert(msg + ' ' + getLabel(component));
    component.focus();
    return false;

}

function checkRequired(componentId, reqMsg){
    component = document.getElementById(componentId);
    var result = (component.value != '') && (isWhitespace(component.value) == false); 
    if (result == false) {
        showAlert(reqMsg + ' ' + getLabel(component));
        component.focus();
    }
    return result;
}

function compareDate(beginDate, endDate, pattern) {
	var endDateSet = false;
	var formatNumber = getDateFormat(pattern);
	var returnValue = true;
	if(beginDate == '') {
		return false;
	}
	if(endDate == '') {
		endDate = new Date();
		endDateSet = true;
	}
	beginDate = getUSDateFormat(beginDate, formatNumber);
	var endDateArr;
	var endDateValue;
	if(!endDateSet) {
		endDate = getUSDateFormat(endDate, formatNumber);
		endDateArr = endDate.split('/');
		if(endDateArr[2].length == 2) {
			endDateArr[2] = '20' + endDateArr[2];
		}
		endDateValue = new Date(endDateArr[2], endDateArr[0], endDateArr[1]);
	}
	if(endDateSet) {
		endDateValue = endDate;
	}
	var beginDateArr = beginDate.split('/');
	if(beginDateArr[2].length == 2) {
		//make sure this is in YYYY format
		beginDateArr[2] = '20' + beginDateArr[2];
	}
	var beginDateValue = new Date(beginDateArr[2], beginDateArr[0]-1, beginDateArr[1]);
	if(beginDateValue > endDateValue) {
		returnValue = false;
	}
	return returnValue;
}

function checkDatePattern(date, pattern, delim) {
	var separatorChar;
	var format = new Array();
	var regExp = new RegExp(/\s+/);

	if(delim == '') {
		separatorChar = new Array("/", "-", ":", " ");
	}
	else {
		separatorChar = delim;
	}
	
	if(pattern != '') {
		for(i = 0; i < separatorChar.length; i++) {
			if(pattern.indexOf(separatorChar[i]) != -1) {
				if(separatorChar[i] == ' ') {
					//split any number of whitespaces
					separatorChar[i] = regExp;
				}
				delim = '/';
				format = pattern.split(separatorChar[i]);
				dateArr = date.split(separatorChar[i]);
				if(format.length != dateArr.length) {
					return false;
				}
				pattern = '';
				break;
			}
		}
		for(i = 0; i < format.length; i++) {
			if(pattern.length > 0) {
				pattern += delim;
			}
			if(format[i].toLowerCase == "yy") {
				format[i] += format[i];
			} 
			pattern += format[i]; 
		}
	}	
	formatNumber = getDateFormat(pattern);
	if(!checkForValidDate(date, formatNumber, '')) {
		return false;
	}
	return true;
}

//This API returns the format number for the given date pattern
function getDateFormat(pattern) {
	if(pattern == '') {
		return 1; //default mm/dd/yyyy pattern
	}
	pattern = pattern.toLowerCase();
	format = new Array("mm/dd/yyyy", "dd/mm/yyyy", "mm/yyyy/dd",
						"dd/yyyy/mm", "yyyy/mm/dd", "yyyy/dd/mm" );

	for(i=0; i < format.length; i++) {
		if(format[i] == pattern) {
			return i+1;
		}
	}
	//default mm/dd/yyyy pattern
	return 1;

}

//format defines whether mm/dd/yyyy format, or dd/mm/yyyy format.
//We support only two formats for now

function checkDateRanges(startComponent, endComponent, format, separatorChar) {
	start = getTextElement(startComponent);
	end = getTextElement(endComponent);

	startDate = start.value;
	endDate = end.value;

	if(startDate != '') {
		if(!checkForValidDate(startDate, format, separatorChar)){
			start.focus;
			return false;
		}
	}
	if(endDate != '') {
		if(!checkForValidDate(endDate, format, separatorChar)){
			end.focus;
			return false;
		}
	}
	return true;
}

function getUSDateFormat(date, format) {
	if(format == '' || format == 1 || date == '' || date.length < 3) {
		//In US Date format already, no need to convert
		return date;
	}
	else if(format == 2) {
		// We received date in dd//mm/yyyy format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		tmp = date[0];
		date[0] = date[1];
		date[1] = tmp;
	}
	else if(format == 3) {
		// We received date in mm/yyyy/dd format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		tmp = date[1];
		date[1] = date[2];
		date[2] = tmp;
	}
	else if(format == 4) {
		// We received date in dd/yyyy/mm format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		tmp = date[1];
		date[1] = date[0];
		date[0] = date[2];
		date[2] = tmp;
	}
	else if(format == 5) {
		// We received date in yyyy/mm/dd format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		tmp = date[1];
		date[0] = date[1];
		date[1] = date[2];
		date[2] = tmp;
	}
	else if(format == 6) {
		// We received date in yyyy/dd/mm format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		tmp = date[2];
		date[0] = date[2];
		date[2] = tmp;
	}
	return date;
}

function checkForValidDate(date, format, delim) {
	var dateValue;
	var splitChar;
	var separatorChar;
	var regExp = new RegExp(/\s+/);

	if(delim == '') {
		separatorChar = new Array("/", "-", ":", " ");
	}
	else {
		separatorChar = delim;
	}
	var dateFound = false;

	if(format == '') {
		//default format mm/dd/yyyy
		format = 1;
	}

	for(i = 0; i < separatorChar.length; i++) {
		if(date.indexOf(separatorChar[i]) != -1) {
			if(separatorChar[i] == ' ') {
				//split any number of whitespaces
				separatorChar[i] = regExp;
			}
			dateValue = date.split(separatorChar[i]);
			dateFound = true;
			break;
		}
	}

	if(dateValue == '' || dateFound == false || dateValue.length != 3) {
		return false;
	}

	if(format > 1) {
		// We received date in non-us format
		// Our API always treats in mm/dd/yyyy format, so shuffle accordingly.
		dateValue = getUSDateFormat(dateValue, format);
	}

	if(dateValue[2].length == 2) {
		//make sure this is in YYYY format
		dateValue[2] = '20' + dateValue[2];
	}
	else {
		if(dateValue[2].length != 4) {
			return false;
		}
	}

	var range = new Array(3);
	range[0] = new Array(1, 12);
	range[1] = new Array(1, 31);
	range[2] = new Array(2000, 2100);

	for(i=0; i < 3; i++) {
		if(!checkForNumericValue(dateValue[i])) {
			return false;
		}

		if(!checkNumbericRange(dateValue[i], range[i][0], range[i][1])) {
			return false;
		}
	}
	if(!checkForAllowedDays(dateValue[0], dateValue[1], dateValue[2])) {
		return false;
	}
	return true;
}

function checkForAllowedDays(month, day, year) {
	if(day < 1) {
		return false;
	}
	if((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 ||
		month == 10 || month == 12) && (day > 31 )) {
			return false;
	}
	if((month == 4 || month == 6 || month == 9 || month == 11) &&
		(day > 30)) {
			return false;
	}
	if(month == 2) {
		if(leapYear(year) && (day > 29)) {
			return false;
		}
		else {
			if(day > 28) {
				return false;
			}
		}
	}
	return true;
}

function leapYear(year) {
	if((year % 4 == 0) && !(year % 100 == 0 || year % 400 == 0)) {
		return true;
	}
	return false;
}
/*
function checkObjectName(componentId) {
    var val = document.getElementById(componentId);
    var val = formField.value;
    var result = (val != '') && 
        isInCharSet(val, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.");
    if (result == false){
        formField.select();
    }
    return result;
}

*/

var lastSelectedIndex = 0;

function initLastSelected (objId) {
    var obj=document.getElementById(objId);
    setLastSelected (obj.selectedIndex);
}

function setLastSelected (value) {
    lastSelectedIndex = value;
}

function disableUnselect(obj) {
    if (obj.selectedIndex == -1) {
        obj.selectedIndex = lastSelectedIndex;
    }
    lastSelectedIndex = obj.selectedIndex;
}

function setSelectOption(index,obj,value) {
    obj.options[index].selected = value;
    lastSelectedIndex = index;
}


function setAllOptions(obj,value) {
    if (!hasOptions(obj)) {
        return;
    }
    for (var i=0;i<obj.options.length;i++) {
        setSelectOption(i,obj,value);
    }
}


function findSelectOptionIndex(obj,value) {
    if (!hasOptions(obj)) {
        return;
    }
    for (var i=0;i<obj.options.length;i++) {
        var optionValue = obj.options[i].text;
        if (optionValue == value) {
            return i;
        }
    }
    return -1;
}


function hasOptions(obj) {
    if (obj!=null && obj.options!=null) {
        return true;
    }
    return false;
}


function toggleSelectAll(checkbox,optionListId,dropDownId) {
    var optionList=document.getElementById(optionListId);
    var dropDownObj=document.getElementById(dropDownId);
    var dropDownSelectedValue = dropDownObj.value;
    setAllOptions (optionList, checkbox.checked);
    index = findSelectOptionIndex(optionList,dropDownSelectedValue);
    if (index > -1) {
        setSelectOption(index,optionList,true);
    }
}

/*
 * This functions submits the form when user hits enter
 */

function submitenter(e, id, msg) {
	var keyCode;
	if(window.event) {
		keyCode = window.event.keyCode;
	}
	else if(e) {
		keyCode = e.which;
	}
	else {
		return true;
	}
	if(keyCode == 13) {
    		button = document.getElementById(id);
		submitAndDisable(button, msg);
		return false;
	}
	else {
		return true;
	}
}

