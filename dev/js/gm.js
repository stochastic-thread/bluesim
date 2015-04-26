window.setInterval(start, 1000);


var my_counter = 0;
var my_id = "custom";

var colors = [];
colors[0] = "#FF0000"; 
colors[1] = "#FF7F00";
colors[2] = "#FFFF00";
colors[3] = "#00CC00";
colors[4] = "#0000FF";
colors[5] = "#9900CC";
colors[6] = "#FF0099";

function getID(){
	var id = my_id + my_counter;
	my_counter = my_counter + 1;
	return id;
}

//range = 0 - 480 68
function start(){


	for(i = 0; i <= my_counter; i++){
		var x = document.getElementById("custom" + i);
		if(x != null){
			var length = x.getTotalLength();
			if(length <= 68){
				x.setAttribute('stroke' , colors[0]);
			}else if(length > 68 && length <= 136){
				x.setAttribute('stroke' , colors[1]);
			}else if(length > 136 && length <= 204){
				x.setAttribute('stroke' , colors[2]);
			}else if(length > 204 && length <= 272){
				x.setAttribute('stroke' , colors[3]);
			}else if(length > 272 && length <= 340){
				x.setAttribute('stroke' , colors[4]);
			}else if(length > 340 && length <= 408){
				x.setAttribute('stroke' , colors[5]);
			}else if(length > 408){
				x.setAttribute('stroke' , colors[6]);
			}
		}	

	}


}