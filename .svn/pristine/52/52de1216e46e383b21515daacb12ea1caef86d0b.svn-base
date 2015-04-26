//actions panel stuff
var actionsWidth = 150;
var statusCodetraceWidth = 350;

var isSetFlagsOpen = false;
var isSetOpen = false;
var isCheckOpen = false;
var isToggleOpen = false;
var isClearOpen = false;
var isLSOneOpen = false;

function openSetFlags() {
	if(!isSetFlagsOpen){
		$('.setFlags').fadeIn('fast');
		isSetFlagsOpen = true;
	}
}
function closeSetFlags() {
	if(isSetFlagsOpen){
		$('.setFlags').fadeOut('fast');
		$('#setFlags-err').html("");
		isSetFlagsOpen = false;
	}
}
function openSet() {
	if(!isSetOpen) {
		$('.set').fadeIn('fast');
		isSetOpen = true;
	}
}
function closeSet() {
	if(isSetOpen) {
		$('.set').fadeOut('fast');
		$('#set-err').html("");
		isSetOpen = false;
	}
}
function openCheck() {
	if(!isCheckOpen) {
		$('.check').fadeIn('fast');
		isCheckOpen = true;
	}
}
function closeCheck() {
	if(isCheckOpen) {
		$('.check').fadeOut('fast');
		$('#check-err').html("");
		isCheckOpen = false;
	}
}
function openToggle() {
	if(!isToggleOpen) {
		$('.toggle').fadeIn('fast');
		isToggleOpen = true;
	}
}
function closeToggle() {
	if(isToggleOpen) {
		$('.toggle').fadeOut('fast');
		$('#toggle-err').html("");
		isToggleOpen = false;
	}
}
function openClear() {
	if(!isClearOpen) {
		$('.clear').fadeIn('fast');
		isClearOpen = true;
	}
}
function closeClear() {
	if(isClearOpen) {
		$('.clear').fadeOut('fast');
		$('#clear-err').html("");
		isClearOpen = false;
	}
}
function openLSOne() {
	if(!isLSOneOpen) {
		$('.lsone').fadeIn('fast');
		isLSOneOpen = true;
	}
}
function closeLSOne() {
	if(isLSOneOpen) {
		$('.lsone').fadeOut('fast');
		$('#lsone-err').html("");
		isLSOneOpen = false;
	}
}

//
function hideEntireActionsPanel() {
	closeSetFlags();
	closeSet();
	closeCheck();
	closeToggle();
	closeClear();
	closeLSOne();
	hideActionsPanel();
}

$( document ).ready(function() {
	
	//action pullouts
	$('#setFlags').click(function() {
		closeSet();
		closeCheck();
		closeToggle();
		closeClear();
		closeLSOne();
		openSetFlags();
	});
	
	$('#set').click(function() {
		closeSetFlags();
		closeCheck();
		closeToggle();
		closeClear();
		closeLSOne();
		openSet();
	});
	
	$('#check').click(function() {
		closeSetFlags();
		closeSet();
		closeToggle();
		closeClear();
		closeLSOne();
		openCheck();
	});
	
	$('#toggle').click(function() {
		closeSetFlags();
		closeSet();
		closeCheck();
		closeClear();
		closeLSOne();
		openToggle();
	});
	
	$('#clear').click(function() {
		closeSetFlags();
		closeSet();
		closeCheck();
		closeToggle();
		closeLSOne();
		openClear();
	});
	
	$('#lsone').click(function() {
		closeSetFlags();
		closeSet();
		closeCheck();
		closeToggle();
		closeClear();
		openLSOne();
	});
	
	//tutorial mode
	$('#bitmask-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#bitmask-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#bitmask-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#bitmask-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#bitmask-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
});