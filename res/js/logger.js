function createIcon(mode, type) {
	const icon = document.createElement("i");

	switch(type) {
		//<i class="bi bi-check-lg"></i>
		//<i class="bi bi-check-square-fill"></i>
		case 0:
			mode == 0 ? 
				icon.classList.add("bi","bi-check-lg") :
				icon.classList.add("bi","bi-check-square-fill");
			break;

		//<i class="bi bi-exclamation-lg"></i>
		//<i class="bi bi-exclamation-triangle-fill"></i>
		case 1:
			mode == 0 ? 
				icon.classList.add("bi","bi-exclamation-lg") :
				icon.classList.add("bi","bi-exclamation-triangle-fill");
			break;

		//<i class="bi bi-exclamation-lg"></i>
		//<i class="bi bi-exclamation-circle-fill"></i>
		case 2:
			mode == 0 ?
				icon.classList.add("bi","bi-exclamation-lg") :
				icon.classList.add("bi","bi-exclamation-circle-fill");
			break;
	}

	return icon;
}

function spawnMessage(text, mode, type, loggerContainer) {
	const li = document.createElement("li");
	const s = document.createElement("span");
	const i = createIcon(mode, type);
	
	li.classList.add("border", "border-2", "list-unstyled", "spawn");
	li.appendChild(i);
	s.textContent = " "+text;
	if (type == 0) {
		li.classList.add("text-success");
	} else if (type == 1) {
		li.classList.add("text-warning");
	} else {
		li.classList.add("text-danger");
	}
	li.appendChild(s);
	loggerContainer.appendChild(li);
	li.addEventListener("animationend", function() {
		loggerContainer.removeChild(li);
	});
}
		
async function requestContent(a) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  try {
    // Inject the content script first, this script will retrieve information about the selected page's DOM
    await browser.tabs.executeScript(tab.id, { file: "content/request_content.js" });

    // Delay to ensure script is loaded before messaging
    setTimeout(async () => {
      try {

          response = {};

          // filter request by type
          switch(a) {
			  
				case "patch":
					response = await browser.tabs.sendMessage(tab.id, { command: "patch" });
					
					if (!response) {
						out.innerHTML = "No canvas found.";
						return;
					} else {
						console.log(response);
						console.log(window.mycanvas);
					}
					break;
			 
				case "unpatch":
				
					break;
			  
				case "getimgs":
					response = await browser.tabs.sendMessage(tab.id, { command: "getimgs" });

					if (!response || !response.images.length) {
						out.innerHTML = "No images found.";
						return;
					}

					response.images.forEach(function(url){
						console.log(url);
						const c = document.createElement("div");
						c.classList.add("img-container");
						const d1 = document.createElement("div"), d2 = document.createElement("div"), d3 =document.createElement("div");
						const i = document.createElement("img");
						i.src = url;
						i.onerror = () => i.remove(); // Remove if image fails to load

						const a = document.createElement("a"), a1 = document.createElement("a"), a2 = document.createElement("a");
						const i1 = document.createElement("i"), i2 = document.createElement("i");

						// link url
						a.href = url;
						a.textContent = url;

						//<i class="bi bi-image"></i> opens the image up in a new tab
						a1.href= url;
						i1.classList.add("bi","bi-image");
						a1.target = "_blank";
						a1.appendChild(i1);

						//<i class="bi bi-download"></i>
						//href="data:video/mp4,http://www.example.com/video.mp4"
						//download="video.mp4"
						a2.href = url;
						i2.classList.add("bi","bi-download");
						a2.appendChild(i2);

						//add elements to each div
						d1.appendChild(i);
						d2.appendChild(a);
						d3.appendChild(a1);
						d3.appendChild(a2);

						//add divs to parent div
						c.appendChild(d1);
						c.appendChild(d2);
						c.appendChild(d3);

						//add div to container
						out.appendChild(c);
						
						spawnMessage("Image url: "+url+" created", 0, 1, con);
					});
					break;
			}
			
          if (!response) {
            console.log("no response from backgorund");
          } else {
            //console.log(response);
          }
		  
      } catch (err) {
        document.getElementById("console").innerHTML = `Error: ${err.message}`;
		spawnMessage(err.message, 1, 2,  document.getElementById("console"));
		//console.log(err);
      }
    }, 250); // delay to ensure request_content.js is attached

  } catch (err) {
    document.getElementById("console").innerHTML = `Injection Error: ${err.message}`;
	spawnMessage(err.message, 1, 2,  document.getElementById("console"));
  }
}