//import * from "res/js/logger.js";
//export function spawnMessage(text, mode, type, loggerContainer) {


// GLOBALS
const DEBUG = 1;
const CON_LOG_DELAY = 5;

let response = {};
const con = document.getElementById("console");
const out = document.getElementById("content");

const __FILE__ = document.currentScript.src.substring(document.currentScript.src.lastIndexOf("/")+1);



//const [tab] = await browser.tabs.query({ active: true, currentWindow: true });


// general mouse click event listener
window.addEventListener("click", function (e) {
	
	//console.log(e.target);
	
	// clicked over button or icon
	switch( true ) {
		
		case (e.target.id || e.target.parentNode.id) === "btn-reload":
			console.log("clicked " + e.target.nodeName + " reload");
			//out.textContent = "clicked " + e.target.nodeName + " reload";
			spawnMessage("Reloading (" + __FILE__ + ")", 1, 1, con);
			location.reload();
			break;
		
		case (e.target.id || e.target.parentNode.id) === "btn-patch":
			console.log("clicked " + e.target.nodeName + " patch");
			//out.textContent = "clicked " + e.target.nodeName + " patch";
			spawnMessage("Patching canvas (" + __FILE__ + ")", 1, 1, con);
			requestContent("patch");
			break;
			
		case (e.target.id || e.target.parentNode.id) === "btn-unpatch":
			console.log("clicked " + e.target.nodeName + " unpatch");
			//out.textContent = "clicked " + e.target.nodeName + " unpatch";
			spawnMessage("Unpatching canvas (" + __FILE__ + ")", 1, 1, con);
			requestContent("unpatch");
			break;
			
		case (e.target.id || e.target.parentNode.id) === "btn-images":
			console.log("clicked " + e.target.nodeName + " images");
			//out.textContent = "clicked " + e.target.nodeName + " images";
			spawnMessage("Retrieving images (" + __FILE__ + ")", 1, 1, con);
			requestContent("getimgs");
			break;
			
		case (e.target.id || e.target.parentNode.id) === "btn-downloadall":
			console.log("clicked " + e.target.nodeName + " downloadAll");
			//out.textContent = "clicked " + e.target.nodeName + " downloadAll";
			break;
	}
	
}, false);


out.textContent = "Loading ended..";
console.log("Loaded "+__FILE__);
