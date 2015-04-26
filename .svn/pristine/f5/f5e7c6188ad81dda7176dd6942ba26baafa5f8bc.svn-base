var actionsWidth = 150;
var statusCodetraceWidth = 370;

var isPerimeterOpen = false;
var isConvexOpen = false;
var isCutOpen = false;
var isPointInsideOpen = false;
var isGrahamOpen = false;

function openPerimeter() {
	if(!isPerimeterOpen) {
		$('.perimeter').fadeIn('fast');
		isPerimeterOpen = true;
	}
}
function closePerimeter() {
	if(isPerimeterOpen) {
		$('.perimeter').fadeOut('fast');
		$('#perimeter-err').html("");
		isPerimeterOpen = false;
	}
}
function openConvex() {
	if(!isConvexOpen) {
		$('.is_convex').fadeIn('fast');
		isConvexOpen = true;
	}
}
function closeConvex() {
	if(isConvexOpen) {
		$('.is_convex').fadeOut('fast');
		$('#is_convex-err').html("");
		isConvexOpen = false;
	}
}
function openCut() {
	if(!isCutOpen) {
		$('.cut_polygon').fadeIn('fast');
		isCutOpen = true;
	}
}
function closeCut() {
	if(isCutOpen) {
		$('.cut_polygon').fadeOut('fast');
		$('#cut_polygon-err').html("");
		isCutOpen = false;
	}
}
function openPointInside() {
	if(!isPointInsideOpen) {
		$('.point_inside').fadeIn('fast');
		isPointInsideOpen = true;
	}
}
function closePointInside() {
	if(isPointInsideOpen) {
		$('.point_inside').fadeOut('fast');
		$('#point_inside-err').html("");
		isPointInsideOpen = false;
	}
}
function openGraham() {
	if(!isGrahamOpen) {
		$('.graham').fadeIn('fast');
		isGrahamOpen = true;
	}
}
function closeGraham() {
	if(isGrahamOpen) {
		$('.graham').fadeOut('fast');
		$('#graham-err').html("");
		isGrahamOpen = false;
	}
}

function hideEntireActionsPanel() {
	closePerimeter();
	closeConvex();
	closeCut();
	closePointInside();
	closeGraham();
	hideActionsPanel();
}

$( document ).ready(function() {

	$('#clear').click(function() {
		closePerimeter();
		closeConvex();
		closeCut();
		closePointInside();
		closeGraham();
	});	
	
	//the actions with pullout inputs
	$('#perimeter').click(function() {
		openPerimeter();
		closeConvex();
		closeCut();
		closePointInside();
		closeGraham();
	});	

	$("#is_convex").click(function() {
		closePerimeter();
		openConvex();
		closeCut();
		closePointInside();
		closeGraham();
	});

	$("#cut_polygon").click(function() {
		closePerimeter();
		closeConvex();
		openCut();
		closePointInside();
		closeGraham();
	});

	$("#point_inside").click(function() {
		closePerimeter();
		closeConvex();
		closeCut();
		openPointInside();
		closeGraham();
	});

	$("#graham").click(function() {
		closePerimeter();
		closeConvex();
		closeCut();
		closePointInside();
		openGraham();
	});

	//tutorial mode
	$('#geometry-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#geometry-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#geometry-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#geometry-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#geometry-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
})