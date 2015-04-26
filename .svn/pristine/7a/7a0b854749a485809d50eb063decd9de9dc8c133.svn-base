var actionsWidth = 150;
var statusCodetraceWidth = 370;

var isBuildv1Open = false;
var isBuildv2Open = false;
var isInsertOpen = false;
var isExtractmaxOpen = false;
var isHeapsortOpen = false;

function openBuildv1() {
	if(!isBuildv1Open){
		$('.buildv1').fadeIn('fast');
		isBuildv1Open = true;
	}
}
function closeBuildv1() {
	if(isBuildv1Open){
		$('.buildv1').fadeOut('fast');
		$('#buildv1-err').html("");
		isBuildv1Open = false;
	}
}
function openBuildv2() {
	if(!isBuildv2Open){
		$('.buildv2').fadeIn('fast');
		isBuildv2Open = true;
	}
}
function closeBuildv2() {
	if(isBuildv2Open){
		$('.buildv2').fadeOut('fast');
		$('#buildv2-err').html("");
		isBuildv2Open = false;
	}
}
function openInsert() {
	if(!isInsertOpen){
		$('.insert').fadeIn('fast');
		isInsertOpen = true;
	}
}
function closeInsert() {
	if(isInsertOpen){
		$('.insert').fadeOut('fast');
		$('#insert-err').html("");
		isInsertOpen = false;
	}
}
function openExtractmax() {
	if(!isExtractmaxOpen){
		$('.extractmax').fadeIn('fast');
		isExtractmaxOpen = true;
	}
}
function closeExtractmax() {
	if(isExtractmaxOpen){
		$('.extractmax').fadeOut('fast');
		$('#extractmax-err').html("");
		isExtractmaxOpen = false;
	}
}
function openHeapsort() {
	if(!isHeapsortOpen){
		$('.heapsort').fadeIn('fast');
		isHeapsortOpen = true;
	}
}
function closeHeapsort() {
	if(isHeapsortOpen){
		$('.heapsort').fadeOut('fast');
		$('#heapsort-err').html("");
		isHeapsortOpen = false;
	}
}

function hideEntireActionsPanel() {
	closeBuildv1();
	closeBuildv2();
	closeInsert();
	closeExtractmax();
	closeHeapsort();
	hideActionsPanel();
}

$( document ).ready(function() {
	
	//action pullouts
	$('#buildv1').click(function() {
		closeBuildv2();
		closeInsert();
		closeExtractmax();
		closeHeapsort();
		openBuildv1();
	});	
	$('#buildv2').click(function() {
		closeBuildv1();
		closeInsert();
		closeExtractmax();
		closeHeapsort();
		openBuildv2();
	});
	$('#insert').click(function() {
		closeBuildv1();
		closeBuildv2();
		closeExtractmax();
		closeHeapsort();
		openInsert();
	});
	
	$('#extractmax').click(function() {
		closeBuildv1();
		closeBuildv2();
		closeInsert();
		closeHeapsort();
		openExtractmax();
	});
	
	$('#heapsort').click(function() {
		closeBuildv1();
		closeBuildv2();
		closeInsert();
		closeExtractmax();
		openHeapsort();
	});
		
	//tutorial mode
	$('#heap-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#heap-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#heap-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#heap-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#heap-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
});