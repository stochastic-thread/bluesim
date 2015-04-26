var SERVER_DEBUG =  true;

/**
*	Initializes variables for the server entity and creates the statistics table.
*
*	@class ServerModel
*	@constructor
*	@param a The view for the server.
*/
function ServerModel(a) {
	/**
	* @property view
	*/
    this.view = a;
	
	/**
	* Number of servers
	*
	* @property nservers
	* @default 1
	* @type Number
	*/
    this.nservers = 1;
	
	/**
	* Distribution type for the server
	*
	* @property distribution
	* @default "constant"
	* @type String
	*/
	this.distribution = "constant";
	
	/**
	* @property _params
	* @default null
	*/
    this._params = null;
	
	/**
	* Whether or not UDOs are being used
	*
	* @property UDO_selected
	* @default false
	* @type boolean
	*/
    this.UDO_selected = false;
	
	/**
	* @property params
	*/
	this.params = [null, null];
	
	/**
	* Maximum queue length
	*
	* @property maxqlen
	* @default -1
	* @type Number
	*/
    this.maxqlen = -1;

    this.dest = this.entity = null;
	
	/**
	* Statistics table for the server.
	*
	* @property statTable
	*/
    this.statTable = $("#server_stats").clone().attr("id", a.name);
    this.statTable.find("h2").text(a.name);
    $("#results").append(this.statTable);
	
	/**
	* @property statRef
	*/
    this.statRef = [
        this.statTable.find("#arrival"), 
        this.statTable.find("#drop"), 
        this.statTable.find("#sutil"), 
        this.statTable.find("#qtime"), 
        this.statTable.find("#stime"), 
        this.statTable.find("#qsize"), 
        this.statTable.find("#ssize"), 
        this.statTable.find("#qtimed"), 
        this.statTable.find("#stimed"),
        this.statTable.find("#qsized"), 
        this.statTable.find("#ssized")
    ];
	
	/**
	* Server statistics
	*
	* @property stat
	*/
	this.stat = {}
    this.view.image.attr({
		title:"Server #: "+ this.nservers + ", Distribution: " + this.distribution
    })             
    if (SERVER_DEBUG) console.log("server: ServerModel");
}

/**
*	Returns data about the server in JSON format.
*
*	@method jsonify
*	@return Number of servers, max queue length, distribution, and parameters
*/
ServerModel.prototype.jsonify = function() {
    return {
        nservers: this.nservers,
        maxqlen: this.maxqlen,
		distribution: this.distribution,
		params: this.params
    }
    if (SERVER_DEBUG) console.log("server: jsonify");

};

/**
*	Adds the server to the simulation
*
*	@method start
*/
ServerModel.prototype.start = function() {
    this.entity = QueueApp.sim.addEntity(ServerEntity, this.distribution, this.params, this.nservers, this.maxqlen)
    if (SERVER_DEBUG) console.log("server: start");

};

/**
*	Connects the server to another entity.
*
*	@method connect
*/
ServerModel.prototype.connect = function() {
    this.entity.dest = this.dest ? this.dest.entity : null
    if (SERVER_DEBUG) console.log("server: connect");

};

/**
*	Displays a settings form about the server.
*	Here users can set the server name, distribution, parameters, length, and UDO information.
*
*	@method showSettings
*/
ServerModel.prototype.showSettings = function() {
	pushToForm(this);
	var isUDO = this._params[0][1];
	var dist_UDO = this._params[0][2];
    var param1 = this._params[0][3];
    var param2 =  this._params[0][4];
    var queue_length = this._params[1][1];
    var num_servers = this._params[2][1];


    createServerForm();
    var a = $("#server_form");
    QueueApp.form_view = this.view;
    resetServer();
    //set parameters 
    if (this.UDO_selected){
        document.getElementById("use_udo_button").checked = true;
        a.find("#server_param_tr1").hide();
        a.find("#server_param_tr2").hide();
    } else {
        document.getElementById("use_function_button").checked = true;
        if (dist_UDO == "exponential" || dist_UDO == "constant" || dist_UDO == "pareto"){
            a.find("#server_param_tr1").val(param1).show();
            $("#server_param_tr2").hide(); 
        } else if (dist_UDO == "random") {
            $("#server_param_tr1").hide(); 
            $("#server_param_tr2").hide(); 
        } else {
            a.find("#server_param_tr1").val(param1).show();
            a.find("#server_param_tr2").val(param2).show();
        }
    }
    // get forms and insert the values into them
    a.find("#server_dropdown_1").val(dist_UDO);
    a.find("#server_queue_length").val(queue_length);
    a.find("#num_servers").val(num_servers);    
    a.find("#server_param1").val(param1);
    a.find("#server_param2").val(param2);


	a.show().position({
		of: $(this.view.image.node),
		at: "center center",
		my: "left top"
    });

    displayName(this, "server_name");
    if (SERVER_DEBUG) console.log("server: showSettings");
};

/**
*	Saves the settings that were entered in the form.
*
*	@method saveSettings
*/
ServerModel.prototype.saveSettings = function() {
    
    var a = $("#server_form");
	
    this._params = [];

    var dist_UDO = null;
    var maxqlen = a.find("#server_queue_length").val();
    var num_servers = a.find("#num_servers").val();

     var d = document.getElementById("server_dropdown_1");
     dist_UDO = d.options[d.selectedIndex].value;

    var isUDO = true;
    var param1 = a.find("#server_param1").val();
    var param2 = a.find("#server_param2").val();
    
    if (!USE_UDO){
        isUDO = false;
    } 
    if(document.getElementById("use_udo_button").checked){
        this.UDO_selected = true;
    } else {
        this.UDO_selected = false;
    }
    
    this._params[0] = ["UDO", isUDO, dist_UDO, param1, param2];
    this._params[1] = ["const", maxqlen];
    this._params[2] = ["const", num_servers];

    this.view.image.attr({
        title: "Service rate = " + this.mu
    })

    rename(this, "server_name");
    if (SERVER_DEBUG) console.log("server: saveSettings");
	pullFromForm(this);
};

//change drop down menu options for user dynamically. 
//will load from LIST_OF_PARAMETERS for UDO option

/**
*	Resets all server data to the default values.
*
*	@method resetServer
*/
function resetServer(){
    console.log("resetServer");
    var a = $("#server_form");

    if (this.UDO_selected){
        a.find("#server_dropdown_1").val(LIST_OF_PARAMETERS[0][0]);
        a.find("#server_queue_length").val("-1");
        a.find("#num_servers").val("1");
        a.find("#server_param1").val("").hide();
        a.find("#server_param2").val("").hide();
    } else {
        a.find("#server_dropdown_1").val("gaussian");
        a.find("#server_queue_length").val("-1");
        a.find("#num_servers").val("1");
        a.find("#server_param1").val("").show();
        a.find("#server_param2").val("").show();
    }
}

/**
*	Creates a new server form.
*
*	@method createServerForm
*/
function createServerForm(){

    if(UPDATE_SERVER_FORM == null){
        console.log("createServerForm");
        populateServerForm();
        UPDATE_SERVER_FORM= "not null";
    }
}

/**
*	Populates the server form depending on the User Defined Objects
*
*	@method populateServerForm
*/
function populateServerForm(){
    console.log("populateServerForm");

    var parentForm = document.getElementById("server_dropdown_1");
    var a = $("#server_form");

    for (var i = 0; i < 5; i++){
        a.find("#server_udo_"+i).val("").hide();
    }     
    if (USE_UDO){

         if(document.getElementById("use_udo_button").checked){
           
            $("#server_op1").hide();
            $("#server_op2").hide();
            $("#server_op3").hide();
            $("#server_op4").hide();
            $("#server_op5").hide();
            $("#server_op6").hide();
            $("#server_op7").hide();
            $("#server_param_tr1").hide(); 
            $("#server_param_tr2").hide();
            for (var i =0;i < LIST_OF_PARAMETERS.length;i++){
                a.find("#server_udo_"+i).text(LIST_OF_PARAMETERS[i][0]).show();
                a.find("#server_udo_"+i).val(LIST_OF_PARAMETERS[i][0])
            }
            a.find("#server_dropdown_1").val(LIST_OF_PARAMETERS[0][0]);
        } else {
            
            a.find("#server_dropdown_1").val("gaussian")
            $("#server_op1").show();
            $("#server_op2").show();
            $("#server_op3").show();
            $("#server_op4").show();
            $("#server_op5").show();
            $("#server_op6").show();
            $("#server_op7").show();
            $("#server_param_tr1").show(); 
            $("#server_param_tr2").show();
            
        }
       
    } else {
        
        a.find("#server_dropdown_1").val("gaussian")
        $("#server_op1").show();
        $("#server_op2").show();
        $("#server_op3").show();
        $("#server_op4").show();
        $("#server_op5").show();
        $("#server_op6").show();
        $("#server_op7").show();
        $("#server_param_tr1").show(); 
        $("#server_param_tr2").show(); 
    }
}
/**
*	@method serverDropper
*/
function serverDropper(){
    
    if (document.getElementById("use_function_button").checked){
        var e = document.getElementById("server_dropdown_1");
        var dropOption = e.options[e.selectedIndex].value;

    if (dropOption == "exponential" || dropOption == "constant" || 
            dropOption == "pareto"){ // param1 shows but param2 hidden
        $("#server_param_tr1").show(); 
        $("#server_param_tr2").hide(); 

    } else if (dropOption == "random"){ // param1 and param2 both are hidden
        $("#server_param_tr1").hide();
        $("#server_param_tr2").hide();
      
    } else {
        //for gaussian, weibull and gamma
        $("#server_param_tr1").show();  // Both parameters shows up
        $("#server_param_tr2").show();
    }

    }
}

/**
*	@method checkRadioButtonServer
*/
function checkRadioButtonServer(){

    populateServerForm();

}

/**
*	Resets the server and re-populates the server form
*
*	@method clearAndUpdateForm
*/
ServerModel.prototype.clearAndUpdateForm = function(){
    //var a = document.getElementById("source_form_to_append");
    //a.innerHTML = "";
    console.log("clear and update server");
    resetServer();
    populateServerForm(); 
}

/**
*	Initiializes the statistics that will be shown about the server.
*	Displays data arrival, dropped, server utilization, time spent in queue, length of queue, and population in the entire system.
*
*	@method initStats
*/
ServerModel.prototype.initStats = function(){
	var fac = this.entity.facility,
        qDur = fac.queueStats().durationSeries,
        qSize = fac.queueStats().sizeSeries,
        sysDur = fac.systemStats().durationSeries,
        sysSize = fac.systemStats().sizeSeries,
        perc = fac.usage() / QueueApp.sim.time() * 100;
	
	this.stat["arrived"]=this.entity.arrived;
	this.stat['dropped']=this.entity.dropped;
	this.stat["use"]=perc;
	this.stat["queue"]={
		time:statman.expandSeries(qDur),
		pop:statman.expandSeries(qSize)
	}
	this.stat["system"]={
		time:statman.expandSeries(sysDur),
		pop:statman.expandSeries(sysSize)
	}
	
	for(var property in this.entity.dataCollector){
		if(this.entity.dataCollector.hasOwnProperty(property)){
			dC = this.entity.dataCollector[property]
			this.stat[property]=statman.expandSeries(dC)
		}
	}
}

/**
*	Initializes server statistics, then fills it in with information about the server.
*
*	@method showStats
*/
ServerModel.prototype.showStats = function() {
	if(Object.keys(this.stat) > 0){
		this.statRef[0].text(this.stat["arrival"]);	
		this.statRef[1].text(this.stat["dropped"]);
		this.statRef[2].text(this.stat.use.toFixed(1) + "%");
		this.statRef[3].text(this.stat.queue.time.average.toFixed(3));
		this.statRef[4].text(this.stat.system.time.average.toFixed(3));
		this.statRef[5].text(this.stat.queue.pop.average.toFixed(3));
		this.statRef[6].text(this.stat.system.pop.average.toFixed(3));
		this.statRef[7].text(this.stat.queue.time.deviation.toFixed(3));
		this.statRef[8].text(this.stat.system.time.deviation.toFixed(3));
		this.statRef[9].text(this.stat.queue.pop.deviation.toFixed(3));
		this.statRef[10].text(this.stat.system.pop.deviation.toFixed(3));
		this.view.showCounters(this.stat.queue.count, this.stat.system.count)
		
		//call animation manager funtion
		var val = this.stat.use.toFixed(1);
		stat_animation_manager(this.view.image.node.id, "queue", val);
	}
    if (SERVER_DEBUG) console.log("server: showStats");
};

/*!
*	Un-links a connection between the server and another entity.
*
*	@method unlink
*/
ServerModel.prototype.unlink = function() {
    this.statTable.remove();
    this.stat = this.view = this.statRef = null

    if (SERVER_DEBUG) console.log("server: unlink");

};

/**
*	Server entity variable.
*
*	@class ServerEntity
*	@static
*/
var ServerEntity = {
	/**
	* Initial server information
	*
	* @param a Distribution
	* @param b Params
	* @param c Number of servers
	* @param d Max queue length
	*/
    start: function(a, b, c, d) {
		//Arguments: distribution, params, nservers, maxqlen
        this.facility = new Sim.Facility("queue", Sim.Facility.FCFS, c, d);
        this.arrived = this.dropped = 0
		this.distribution = a
		this.params = b
		//{property name:time series}
		this.dataCollector=statman.initParamSeries()
		//debug
		this.remainder = 0
		this.udoval = []
    },
	
	/**
	* New data has arrived at the server
	*
	* @param sender Who sent the message
	* @param message Message that was sent
	*/
    onMessage: function(sender, message) {
        this.arrived++
		this.remainder++
		var timeval = 0
		if(this.distribution === "custom"){
			timeval = message.fields[this.params[0]]
		}else{
			timeval = randDist(this.distribution, this.params, QueueApp.random)
		}
		/* useFacility cannot handle timeval ≈ 0.  Make sure that timeval is >= 0.1*/
		timeval = (timeval < 1 ? Math.abs(timeval) + 1 : timeval)
		this.udoval.push(timeval)
		
		for(var property in message.fields){
				if(message.fields.hasOwnProperty(property)){
					this.dataCollector[property].record(message.fields[property],this.time());
				}
			}	
        this.useFacility(this.facility, timeval).done(this.completed, this, message)
    },
	
	/**
	* All traffic has been processed
	*
	* @param message Server message
	*/
    completed: function(message) {
		this.remainder -= 1
        this.callbackMessage === -1 ? this.dropped++ : this.dest && this.send(message, 0, this.dest)
    }
};


