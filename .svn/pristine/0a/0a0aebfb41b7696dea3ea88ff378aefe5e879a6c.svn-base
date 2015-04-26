var actionsWidth = 150;
var statusCodetraceWidth = 370;

var isAction1Open = false;
var isAction2Open = false;
var isAction3Open = false;
var isAction4Open = false;
var isAction5Open = false;

function openAction1() {
	if(!isAction1Open){
		$('.action1').fadeIn('fast');
		isAction1Open = true;
	}
}
function closeAction1() {
	if(isAction1Open){
		$('.action1').fadeOut('fast');
		$('#action1-err').html("");
		isAction1Open = false;
	}
}
function openAction2() {
	if(!isAction2Open){
		$('.action2').fadeIn('fast');
		isAction2Open = true;
	}
}
function closeAction2() {
	if(isAction2Open){
		$('.action2').fadeOut('fast');
		$('#action2-err').html("");
		isAction2Open = false;
	}
}
function openAction3() {
	if(!isAction3Open){
		$('.action3').fadeIn('fast');
		isAction3Open = true;
	}
}
function closeAction3() {
	if(isAction3Open){
		$('.action3').fadeOut('fast');
		$('#action3-err').html("");
		isAction3Open = false;
	}
}
function openAction4() {
	if(!isAction4Open){
		$('.action4').fadeIn('fast');
		isAction4Open = true;
	}
}
function closeAction4() {
	if(isAction4Open){
		$('.action4').fadeOut('fast');
		$('#action4-err').html("");
		isAction4Open = false;
	}
}
function openAction5() {
	if(!isAction5Open){
		$('.action5').fadeIn('fast');
		isAction5Open = true;
	}
}
function closeAction5() {
	if(isAction5Open){
		$('.action5').fadeOut('fast');
		$('#action5-err').html("");
		isAction5Open = false;
	}
}

//
function hideEntireActionsPanel() {
	closeAction1();
	closeAction2();
	closeAction3();
	closeAction4();
	closeAction5();
	hideActionsPanel();
}

$( document ).ready(function() {
	
	//action pullouts
	$('#action1').click(function() {
		closeAction2();
		closeAction3();
		closeAction4();
		closeAction5();
		openAction1();
	});	
	$('#action2').click(function() {
		closeAction1();
		closeAction3();
		closeAction4();
		closeAction5();
		openAction2();
	});
	$('#action3').click(function() {
		closeAction1();
		closeAction2();
		closeAction4();
		closeAction5();
		openAction3();
	});
	
	$('#action4').click(function() {
		closeAction1();
		closeAction2();
		closeAction3();
		closeAction5();
		openAction4();
	});
	
	$('#action5').click(function() {
		closeAction1();
		closeAction2();
		closeAction3();
		closeAction4();
		openAction5();
	});
		
	//tutorial mode
	$('#sample-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#sample-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#sample-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#sample-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#sample-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
});