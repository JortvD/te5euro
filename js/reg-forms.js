document.addEventListener("DOMContentLoaded", function() {
	
  websiteLoaded();
});

var firstLoad = false;

window.onload=function(){
    var ele = document.getElementById("60777745689376");
if(ele.addEventListener){
    ele.addEventListener("submit", submitReg(), false);  //Modern browsers
}else if(ele.attachEvent){
    ele.attachEvent('onsubmit', submitReg());            //Old IE
}

}


var cookieName = "hasRegistered";

function submitReg(){
	console.log("Tried to call Submit()");
	if (!firstLoad) {
		firstLoad = true;
		return;
	}
	// Set cookie to true
	console.log("Submit called");
	createCookie(cookieName, "true", 30);
	
	websiteLoaded();
}

function deSubmitReg() {
	console.log("Desumbit called");
	createCookie(cookieName, "", -1);
	
	websiteLoaded();
}

function websiteLoaded() {
	console.log("Page loaded");
	
	console.log("Cookie: " + readCookie(cookieName));
	
	var hasVisited = readCookie(cookieName);
	
	if (hasVisited != 'true') {
				
		// Hide regged message as user has not registered ready.
		document.getElementById('alreadyreg').style.display = 'none';
		
		// User has already submitted registered for an ouderdag.
		document.getElementById('regforms').style.display = 'inline';
		
		console.log("Nothing to hide!");
	} else {

		
		// User has already submitted registered for an ouderdag.
		document.getElementById('regforms').style.display = 'none';
		// Hide register form
		console.log("Hid div");
		
		// Show regged message
		document.getElementById('alreadyreg').style.display = 'inline';
	}
	
	
	
	
	
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}