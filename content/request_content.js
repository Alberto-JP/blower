(function() {


let patched = false;


let canvas_old_border = {};

let canvas = {};

let mycanvas = {};
let originalContext = {};


function getCanvasPtr() {
	canvas = document.querySelector('canvas');
	return canvas;
}

function setCanvasPtr() {
	mycanvas = document.querySelector('canvas');
	canvas = document.querySelector('canvas');
	originalContext = mycanvas.getContext('webgl') || mycanvas.getContext('experimental-webgl');
	
	if (canvas && !patched) {
		return canvas;
	} else {
		return false;
	}
}

function setCanvasBorder(ob) {
	if (ob) {
		ob.style.border = "3px solid #c0c0c0";
		return true;
	} else {
		return false;
	}
}

function unsetCanvasBorder(ob) {
	if (ob) {
		ob.style.border = "";
		patched = false;
		return true;
	} else {
		return false;
	}
}


browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    switch(msg.command) {

        case "patch":		
			if (!patched) {
				canvas = document.querySelector('canvas');
				window.mycanvas = canvas;
				console.log(window.mycanvas);
				if (setCanvasBorder(window.mycanvas)) {
					sendResponse(true);
				} else {
					sendResponse(false);
				}
			}
          break;
		  
		case "unpatch":
			if (patched) {
				unsetCanvasBorder(getCanvasPtr());
				sendResponse(true);
			} else {
				sendResponse(false);
			}
			break;

        case "getimgs":
            console.log("getting images from background");
            const images = Array.from(document.querySelectorAll("img"))
                          .map(img => img.src)
                          .filter(Boolean);
            sendResponse({ images });
          break;

		// not currently used
		/*
        case "blowerReady":
            if (DEBUG_MESSAGES) { console.log(__FILE__ + " Add-on Ready message called") }
            console.log("Add-on is ready");
			//sendResponse("true"):
            break;
		*/
		
		// anything else goes here
		case "default":
			console.log("default message!");
			break;
    }

  return true; // Ensure async response is valid
});

})();