var actionsWidth = 120;
var statusCodetraceWidth = 370;

var isInitOpen = false;
var isSampleOpen = false;
var isFindOpen = false;
var isIsSameSetOpen = false;
var isUnionOpen = false;

function openInit() {
	if(!isInitOpen) {
		$('.init').fadeIn('fast');
		isInitOpen = true;
	}
}
function closeInit() {
	if(isInitOpen) {
		$('.init').fadeOut('fast');
		$('#init-err').html("");
		isInitOpen = false;
	}
}
function openSample() {
	if(!isSampleOpen) {
		$('.sample').fadeIn('fast');
		isSampleOpen = true;
	}
}
function closeSample() {
	if(isSampleOpen) {
		$('.sample').fadeOut('fast');
		$('#sample-err').html("");
		isSampleOpen = false;
	}
}
function openFind() {
	if(!isFindOpen){
		$('.find').fadeIn('fast');
		isFindOpen = true;
	}
}
function closeFind() {
	if(isFindOpen){
		$('.find').fadeOut('fast');
		$('#find-err').html("");
		isFindOpen = false;
	}
}
function openIsSameSet() {
	if(!isIsSameSetOpen){
		$('.isSameSet').fadeIn('fast');
		isIsSameSetOpen = true;
	}
}
function closeIsSameSet() {
	if(isIsSameSetOpen){
		$('.isSameSet').fadeOut('fast');
		$('#isSameSet-err').html("");
		isIsSameSetOpen = false;
	}
}
function openUnion() {
	if(!isUnionOpen){
		$('.union').fadeIn('fast');
		isUnionOpen = true;
	}
}
function closeUnion() {
	if(isUnionOpen){
		$('.union').fadeOut('fast');
		$('#union-err').html("");
		isUnionOpen = false;
	}
}

function hideEntireActionsPanel() {
	closeInit();
	closeSample();
	closeFind();
	closeIsSameSet();
	closeUnion();
	hideActionsPanel();
}

$( document ).ready(function() {
	
	$('#arrunionj').hide();
	$('#arrissamesetj').hide();
	
	//action pullouts
	$('#init').click(function() {
		closeFind();
		closeUnion();
		closeSample();
		closeIsSameSet();
		openInit();
	});
	$('#sample').click(function() {
		closeFind();
		closeUnion();
		closeInit();
		closeIsSameSet();
		openSample();
	});
	$('#find').click(function() {
		closeUnion();
		closeInit();
		closeSample();
		closeIsSameSet();
		openFind();
	});	
	$('#isSameSet').click(function() {
		closeFind();
		closeInit();
		closeSample();
		closeUnion();
		openIsSameSet();
	});
	$('#union').click(function() {
		closeFind();
		closeInit();
		closeSample();
		closeIsSameSet();
		openUnion();
	});

	//tutorial mode
	$('#ufds-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#ufds-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#ufds-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#ufds-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#ufds-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
	
});