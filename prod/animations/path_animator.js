// settings


function runPathFlowAnimation() {
	
	console.log("ANIMATION: started");

	// preferences
	var STROKE_DASH = "10.50 10.50";
	var STROKE_COLOR = "red";  		// we can also randomize colors
	var STROKE_WIDTH = "8";
	var SPEED = 100;
	var DURATION = 10000;
	var DIRECTION = -1;				// (<-- 1) (--> -1) 		

	var paths = [];

	var svg = document.getElementById("canvas").children[0];
	console.log(svg);			// assign id to svg
	svg.id = "svg";
	
	var pathIds = 0; // assign ids to paths		
	var source_image = /^source/;

for(var j = 0; j < QueueApp.models.length; j++){ // loop through all the entities in QueApp.Models
		
	for (var i = 0; i < svg.children.length; i++) {
		var currElmt = svg.children[i];
		
		if (currElmt.nodeName.toLowerCase() === "path" 
			&& currElmt.hasAttribute("stroke-width")) {					// filtering elements in svg - we only want paths

			var strokeVal = currElmt.getAttribute("stroke-width");		// this is the only way to identify paths
			if (strokeVal === "3") {

				var dataFrom = currElmt.getAttribute("data-from");
				var dataTo = currElmt.getAttribute("data-to");

				if(/^source/.test(dataFrom)){   // if data is going from source to anywhere, red color appears 
					currElmt.id = "path" + pathIds++;
					currElmt.style['stroke-dasharray']	= STROKE_DASH;
					currElmt.style['stroke'] = STROKE_COLOR;
					currElmt.style['stroke-width'] = STROKE_WIDTH;

			}else if(/^queue/.test(dataFrom) && !(/^sink/.test(dataTo))){ // if queue is not going to sink, then make path color orange
					currElmt.id = "path" + pathIds++;
					currElmt.style['stroke-dasharray']	= STROKE_DASH;
					currElmt.style['stroke'] = "orange";
					currElmt.style['stroke-width'] = STROKE_WIDTH;

			}else {   // if data is not going from source or queue, green color appears 
				currElmt.id = "path" + pathIds++;
				currElmt.style['stroke-dasharray']	= STROKE_DASH;
				currElmt.style['stroke'] = "green";
				currElmt.style['stroke-width'] = STROKE_WIDTH;
			
			}
				//source_1_img, sink_1_img, splitfunc_1_img, reverser_1_img, thermometer_1_img, queue_1_img 

				
				paths.push(currElmt);
				
			}
		}
	}

}

	var i = 1;                     										//  set your counter to 1

	function myLoop (ind) {        										//  create a loop function
	   setTimeout(function () {    										//  call a 100ms setTimeout when the loop is called
	      	var x = "" + i + "" ;
			// console.log("DEBUG: " + x);
		    paths[ind].style['stroke-dashoffset'] = x * DIRECTION;    	//  code here
	      	i++;                     									//  increment counter
	      	if (i < DURATION) {           								//  if counter < 10, call the loop function
	        	myLoop(ind);             								//  ..  again which will trigger another 
	      	} else {
	      		console.log("ANIMATION: ended");	
	      	}                       
	   }, SPEED)														//  ..  setTimeout()
	}

	for (var i = 0; i < paths.length; i++) {
		myLoop(i);                      								//  start the loop
	}
}

