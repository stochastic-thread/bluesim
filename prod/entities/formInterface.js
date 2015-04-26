// Interface for creating forms for the entities with dependencies on 
// the UDO_manager 

showSettings(){

	updateForm()
	createForm()

	var a = form
	QueueApp.form_view = this.view

	if (USE_UDO)

		if (this._params == null)
			reset()

		else 

			grab form data
	else 

		if (this._params == null)
			reset()

		else
			grab data from form

	showPosition()
}

saveSettings(){
	
	var a = form

	if (USE_UDO)

		this._params = []

		for loop
			this._params[i] = [value, value, value]

	else
		do the same thing
}

createForm(){
	
	if(UPDATE_CurrFORM == null){
        populateCURRRRRRForm();
        UPDATE_CurrFORM = "not null";
    }

}

populateCURRRRForm(){
	
	var parentForm = document.getElementById("source_form_to_append");

	if (USE_UDO){

		var newDiv = document.createElement('div');
        newDiv.id = "source_table_" + i;

        newDiv.innerHTML = '<table>'  +
              '<tr></tr>' +
            '</table>';
            
		parentForm.appendChild(newDiv);

	} else {

		the same

	}
}

dropper(index){
	
	var e = document.getElementById("dropdown_" + index);
    var dropOption = e.options[e.selectedIndex].value;

    if (dropOption == "exponential" || dropOption == "constant" || 
            dropOption == "pareto"){ // param1 shows but param2 hidden
        $("#source_table_" + index + "_param1").show(); 
        $("#source_table_" + index + "_param2").hide(); 

    } else if (dropOption == "random"){ // param1 and param2 both are hidden
        $("#source_table_" + index + "_param2").hide();
        $("#source_table_" + index + "_param1").hide();
      
    } else {
        //for gaussian, weibull and gamma
        $("#source_table_" + index + "_param1").show();  // Both parameters shows up
        $("#source_table_" + index + "_param2").show();
    }

}

Entity.prototype.clearAndUpdateForm(){
	
	var a = document.getElementById("source_form_to_append");
    a.innerHTML = "";

    //MAY have to get individual elements and set values for form
    var b = $("#splitfunc_form");
    b.find("#splitfunc_form_param1").val("");

    populateForm();

}
