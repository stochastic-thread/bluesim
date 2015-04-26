var statman = {
	initParamSeries: function(){
		var dataCollector = {}
		for(var i = LIST_OF_PARAMETERS.length -1;i >= 0; i--){
			var timSeries = new Sim.TimeSeries()
			dataCollector[LIST_OF_PARAMETERS[i][0]]=timSeries
		}
		return dataCollector
	},
	expandSeries: function(data){
	/*
		data = series
	*/
		return {
			count:data.count(),
			min:data.min(),
			max:data.max(),
			sum:data.sum(),
			average:data.average(),
			deviation:data.deviation(),
			variance:data.variance()
		}
	},
	parseStats: function(stats, depth){
		/*
			possibly nested == Must be nested objects (not arrays, etc.)
			
			optional argument depth of traversal
		*/
		var tabLength = ""
		
		var currdepth = (depth !== undefined && depth !== null)? depth : 1
		var str = ""
		
		
		
		for(var i = 0; i < currdepth; i++){
			/* actually two spaces */
			tabLength += "  "
		}
		
		for(var prop in stats){
			if(stats.hasOwnProperty(prop)){
				str += tabLength + prop + ": "
				/* if is nested object */
				if(stats[prop] !== undefined && stats[prop] !== null){
					if(typeof stats[prop] === "object"){
						str += "\n" + this.parseStats(stats[prop], currdepth + 1)
					}else{
						str += stats[prop] + "\n"
					}
				}else{
					str += "ERROR\n"
				}
			}
		}
		return str;
	}
};