var actionsWidth = 180;
var statusCodetraceWidth = 370;

var isBuildOpen = false;
var isSearchOpen = false;
var isLRSOpen = false;
var isLCSOpen = false;

function openBuild() {
	if(!isBuildOpen){
		$('.build').fadeIn('fast');
		isBuildOpen = true;
	}
}
function closeBuild() {
	if(isBuildOpen){
		$('.build').fadeOut('fast');
		$('#build-err').html("");	
		isBuildOpen = false;
	}
}
function openSearch() {
	if(!isSearchOpen){
		$('.search').fadeIn('fast');
		isSearchOpen = true;
	}
}
function closeSearch() {
	if(isSearchOpen){
		$('.search').fadeOut('fast');
		$('#search-err').html("");
		isSearchOpen = false;
	}
}
function openLRS() {
	if(!isLRSOpen){
		$('.lrs').fadeIn('fast');
		isLRSOpen = true;
	}

}
function closeLRS() {
	if(isLRSOpen){
		$('.lrs').fadeOut('fast');
		$('#lrs-err').html("");	
		isLRSOpen = false;
	}
}
function openLCS() {
	if(!isLCSOpen){
		$('.lcs').fadeIn('fast');
		isLCSOpen = true;
	}

}
function closeLCS() {
	if(isLCSOpen){
		$('.lcs').fadeOut('fast');
		$('#lcs-err').html("");	
		isLCSOpen = false;
	}
}

//
function hideEntireActionsPanel() {
	closeBuild();
	closeSearch();
	closeLRS();
	closeLCS();
	hideActionsPanel();
}

$( document ).ready(function() {
	
	//the actions with pullout inputs
	$('#build').click(function() {
		closeSearch();
		closeLRS();
		closeLCS();
		openBuild();
	});	

	$('#search').click(function() {
		closeBuild();
		closeLRS();
		closeLCS();
		openSearch();
	});

	$("#LCS").click(function() {
		closeBuild();
		closeSearch();
		closeLRS();
		openLCS();
	});

	$("#LRS").click(function() {
		closeBuild();
		closeSearch();
		closeLCS();
		openLRS();
	});
	
	//tutorial mode
	$('#suffixtree-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#suffixtree-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#suffixtree-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#suffixtree-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#suffixtree-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});

})