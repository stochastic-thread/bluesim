/* function called in all the enitities.  Value are as follows
	- QUEUE (server entitity) = server_utilization
	- SINK = stay duration
	- SOURCE, SPLITTER, SPLIT3 = 100 (generic value)
*/

function stat_animation_manager(id, entity_type, value){
	
	  var test = d3.select("#" + id);
    // var movement = Math.floor(value);

  	if (entity_type == "queue") animate_queue(test, value);
    if (entity_type == "source") animate_source(test, value);
    if (entity_type == "sink") animate_sink(test, value);
    if (entity_type == "splitter") animate_splitter(test, value);
    if (entity_type == "split3") animate_split3(test, value);
    if (entity_type == "switch") animate_switch(test, value);

}

function animate_queue(test, value){

    var height = test.attr("y");

    test.transition().duration(1000).attr("y", 200);
    test.transition().delay(1000).duration(1000).attr("y", height);
    test.transition().delay(2000).style("opacity", .5);

}

function animate_split3(test, value){

    var height = test.attr("y");

    test.transition().duration(1000).attr("y", 200);
    test.transition().delay(1000).duration(1000).attr("y", height);
    test.transition().delay(2000).style("opacity", .5);

}

function animate_switch(test, value){

    var height = test.attr("y");

    test.transition().duration(1000).attr("y", 200);
    test.transition().delay(1000).duration(1000).attr("y", height);
    test.transition().delay(2000).style("opacity", .5);

}

function animate_splitter(test, value){

    var height = test.attr("y");

    test.transition().duration(1000).attr("y", 200);
    test.transition().delay(1000).duration(1000).attr("y", height);
    test.transition().delay(2000).style("opacity", .5);

}

function animate_source(test, value){

    var height = test.attr("y");

    test.transition().
        delay(500).
        duration(1000);

}

function animate_sink(test, value){

    var height = test.attr("y");

    test.transition().duration(1000).attr("y", 200);
    test.transition().delay(1000).duration(1000).attr("y", height);
    test.transition().delay(2000).style("opacity", .5);

}