var MODE = "TRAINING";
var anskeyArr = new Array();

var seed = (Math.floor(Math.random()*1000000000));
nQns = 10;
var timeLimit = 2400; // in seconds
var maxAttemptCount = 1;
var testOn = true;
var ansOn = true;
var studentListFile;

var qnSettingsOpen = false;
var moreSettingsOpen = false;

if(surpriseColour == '#fec515' || surpriseColour == '#a7d41e') { //discard yellow or lime
	surpriseColour = '#52bc69';
}

function loadTraining() {
	$('#result-screen').fadeOut("fast");
	if(topics.length > 0) {
		startTraining();
	} else {
		customAlert("Select some topics first!");
	}
}

function startTraining() {
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_GENERATE_QUESTIONS, qAmt: nQns, seed: seed, topics: topics.toString()}
	}).done(function(data) {
		MODE = "TRAINING";
		
		data = JSON.parse(data);
		init();
		for(var i=1; i<=nQns; i++) {
			extractInfo(i, data[i-1]);
		}
		
		//switch screens
		prepareQnNav(nQns);
		$('#test-screen').fadeIn("fast");
		$('#undo-ans').show();
		$('#clear-ans').show();
		$('#info').show();
		$('#ans-key').hide();
		
		//show first question
		gw.startAnimation(qnGraphArr); //start graph widget
		gw.pause();
		qnNo = 1; //start with qn 1
		showQn(qnNo);
	});
}

function submitTraining() {
	ansArr.shift();
	var ansFlattened = ansArr.join("|").split('|');
	ansArr.unshift(false);
	//get score
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_CHECK_ANSWERS, qAmt: nQns, seed: seed, topics: topics.toString(), ans: ansFlattened}
	}).done(function(score) {
		score = parseInt(score);
		$('#score').html(score+" out of "+nQns);
		$('#test-screen').fadeOut("fast");
		$('#result-screen').fadeIn("fast");
	});
}

function startAns() {
	ansArr.shift();
	var ansFlattened = ansArr.join("|").split('|');
	ansArr.unshift(false);
	var queryStr = "php/Test.php";
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_GET_ANSWERS, qAmt: nQns, seed: seed, topics: topics.toString(), ans: ansFlattened}
	}).done(function(ansData) {
		//store into anskeyArr array
		ansData = JSON.parse(ansData);
		for(var i=0; i<ansData.length; i++) {
			anskeyArr[i+1] = ansData[i];
		}

		$('#result-screen').fadeOut('fast');
		$('#test-screen').fadeIn('fast');
		$('#ans-key').show();
		$('#undo-ans').hide();
		$('#clear-ans').hide();
		$('#info').hide();
				
		$('#question-nav .qnno').removeClass('selected');
		$('#question-nav .qnno').eq(0).addClass('selected');
		qnNo = 1; //start with qn 1
		showQn(qnNo);
	});
}

function populateTable() {
	$('table').html('<tr><th width="5%">No.</th><th width="20%">Matric Number</th> <th width="45%">Student Name</th><th width="15%">Score</th><th width="15%">Time Taken</th></tr>');
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_GET_SCOREBOARD}
	}).done(function(data) {
		data = JSON.parse(data);
		$('table').show();
		var total = 0;
		var nStudents = data.length;

		for(var i=0; i<nStudents; i++) {
			var no = i+1;
			var matricNo = data[i].username;
			var stName = data[i].name;
			var score = data[i].grade;
			var outof = data[i].questionAmount;
			var min = Math.floor(data[i].timeTaken/60);
			var sec = data[i].timeTaken%60;
			$('table tr:last').after('<tr><td>'+no+'</td><td>'+matricNo+'</td><td>'+stName+'</td><td>'+score+'</td><td>'+min+'m '+sec+'s</td></tr>');

			total += parseInt(score);
		}

		//calculate average score
		var avg = (total/nStudents).toFixed(2);
		$('#avg').html(avg);
	});
}

/*-------SETTINGS PANEL FUNCTIONS-------*/
function displayConfig(data) { //data is a JSON object
	seed = data.seed;
	$('#set-seed').val(seed);
	topics = data.topics;
	for(var i=0; i<topics.length; i++) {
		topicName = topics[i];
		$('.topic[name='+topicName+']').addClass('topic-selected');
		$('.topic[name='+topicName+']').css('background', surpriseColour).css('color','white');
	}
	nQns = data.questionAmount;
	$('#set-nqns').val(nQns);
	timeLimit = data.timeLimit;
	$('#set-time').val(Math.floor(timeLimit/60));
	if(data.testIsOpen==1) {
		testOn = true;
		$('#toggle-test').val("ON").css('border','1px solid '+surpriseColour);
	} else if(data.testIsOpen==0) {
		testOn = false;
		$('#toggle-test').val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
	}
	if(data.answerIsOpen==1) {
		ansOn = true;
		$('#toggle-ans').val("ON").css('border','1px solid '+surpriseColour);
	} else if(data.answerIsOpen==0) {
		ansOn = false;
		$('#toggle-ans').val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
	}
}

function saveConfig() {
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_ADMIN_EDIT_CONFIG, password: adminpw, seed: seed, questionAmount: nQns, topics: topics.toString(), timeLimit: timeLimit, maxAttemptCount: maxAttemptCount, testIsOpen: (testOn?1:0), answerIsOpen: (ansOn?1:0)}
	}).done(function(passed) {
		customAlert("New test configurations have been saved.");
	});
}

function toggleQnSettings() {
	if(qnSettingsOpen) {
		$('.qn-settings').slideUp();
		$('#qn-settings img').removeClass('rotateLeft').addClass('rotateRight');
	} else {
		$('.qn-settings').slideDown();
		$('#qn-settings img').removeClass('rotateRight').addClass('rotateLeft');
	}
	qnSettingsOpen = !qnSettingsOpen;
}

function toggleMoreSettings() {
	if(moreSettingsOpen) {
		$('.more-settings').slideUp();
		$('#more-settings img').removeClass('rotateLeft').addClass('rotateRight');
	} else {
		$('.more-settings').slideDown();
		$('#more-settings img').removeClass('rotateRight').addClass('rotateLeft');
	}
	moreSettingsOpen = !moreSettingsOpen;
}

/*-------OVERRIDE TEST_COMMON.JS-------*/
function checkComplete() {}

$(document).ready (function() {
	$('#question-nav').css("background-color", surpriseColour);
	$('#settings-screen').height($(window).height() - 80);
	$( window ).resize(function() {
		$('#settings-screen').height($(window).height() - 80);
	});

	/*-------SWITCHING BETWEEN 'TABS'-------*/
	$('#scoreboard-tab').click(function(){
		$('#settings-screen').hide();
		$('#test-screen').hide();
		$('#result-screen').hide();
		$('#scoreboard-screen').show();
		populateTable();
	});
	$('#settings-tab').click(function(){
		$('#scoreboard-screen').hide();
		$('#result-screen').hide();
		$('#settings-screen').show();
		$('#test-screen').show();
		if(topics.length > 0) {
			startTraining();
		}
	});
	
	/*-------LOG IN CSS-------*/
	$('#login-pw').focusin(function() {
		$(this).css('box-shadow','0px 0px 3px '+surpriseColour+' inset');
		if ($(this).val() == "password") {
			$(this).attr('type','password');
			$(this).css('color','black');
			$(this).val("");
		}
	}).focusout(function() {
		$(this).css('box-shadow','0px 0px 3px #929292 inset');
		if ($(this).val() == "") {
			$(this).css('color','#aaa');
			$(this).attr('type','text');
			$(this).val("password");
		}
	});
	
	/*-------LOG IN AUTHENTICATION-------*/
	$('#login-go').click(function(event) {
		event.preventDefault();
		adminpw = $('#login-pw').val();
		//authentificate
		$.ajax({
			url: "php/Test.php",
			data: {mode: MODE_ADMIN, password: adminpw}
		}).done(function(passed) {
			passed = parseInt(passed);
			if(passed == 1) {
				$('#login-err').html("");
				$('#title').show();
				$('#login-screen').fadeOut("fast");
				$.ajax({
					url: "php/Test.php",
					data: {mode: MODE_ADMIN_GET_CONFIG, password: adminpw}
				}).done(function(data) {
					//show current configurations
					data = JSON.parse(data);
					displayConfig(data);
					populateTable();
					$('#scoreboard-screen').fadeIn("fast");
				});
			} else {
				$('#login-err').html("Incorrect password");
			}
		});
	});
	
	/*-------SETTINGS MENUS-------*/
	$('#qn-settings').click(function(){
		toggleQnSettings();
	});
	$('#more-settings').click(function(){
		toggleMoreSettings();
	});
	
	/*-------SET SEED-------*/
	$('#set-seed').val(seed);
	$('#set-seed').change(function() {
		seed = parseInt($('#set-seed').val());
	});
	
	$('#new-seed').click(function() {
		seed = (Math.floor(Math.random()*1000000000));
		$('#set-seed').val(seed);
		return false;
	});
	
	/*-------SET NO OF QNS-------*/
	$('#set-nqns').focusin(function() {
		$(this).css('box-shadow','0px 0px 3px '+surpriseColour+' inset');
	}).focusout(function() {
		$(this).css('box-shadow','0px 0px 3px #929292 inset');
	});
	
	$('#set-nqns').change(function() {
		var temp = $('#set-nqns').val().replace(/[^\0-9]/ig, "");
		$(this).val(temp);
		if(temp != "") {
			if(parseInt(temp) > 20) {
				temp = 20;
				$(this).val(20);
			}
			nQns = parseInt(temp);
		} else {
			timeLimit = 10;
			$(this).val(10);
		}
	});
	
	/*-------SET TIME LIMIT-------*/
	$('#set-time').focusin(function() {
		$(this).css('box-shadow','0px 0px 3px '+surpriseColour+' inset');
	}).focusout(function() {
		$(this).css('box-shadow','0px 0px 3px #929292 inset');
	});
	
	$('#set-time').change(function() {
		var temp = $('#set-time').val().replace(/[^\0-9]/ig, "");
		$(this).val(temp);
		if(temp != "") {
			timeLimit = parseInt(temp)*60;
		} else {
			timeLimit = 2400;
			$(this).val(40);
		}
	});
	
	/*-------TOPIC SELECTION-------*/
	$('.topic').click(function() {
		if($(this).hasClass('topic-selected')) { //deselect it
			$('#all-topics').prop('checked',false);
			$(this).css('background', '#eee').css('color', 'black');
			$(this).removeClass('topic-selected');
			var indexToDel = topics.indexOf($(this).attr('name'));
			topics.splice(indexToDel,1);
		} else { //select it
			$('#clear-topics').prop('checked',false);
			$(this).css('background', surpriseColour).css('color', 'white');
			$(this).addClass('topic-selected');
			topics.push($(this).attr('name'));
		}
	});
	$('.topic').hover(function() {
		$(this).css('background', 'black').css('color','white');
	}, function() {
		if($(this).hasClass('topic-selected')) {
			$(this).css('background', surpriseColour).css('color','white');
		} else { //select it
			$(this).css('background', '#eee').css('color','black');
		}
	});

	$('#clear-topics').change(function() {
		if(this.checked) {
			$('#all-topics').prop('checked',false);
			topics = new Array();
			$('.topic').removeClass('topic-selected').css('background', '#eee').css('color', 'black');
		}
	});
	$('#all-topics').change(function() {
		if(this.checked) {
			$('#clear-topics').prop('checked',false);
			$('.topic').each(function(){
				$('#clear-topics').prop('checked',false);
				$(this).css('background', surpriseColour).css('color', 'white');
				$(this).addClass('topic-selected');
				if(topics.indexOf($(this).attr('name'))==-1) topics.push($(this).attr('name'));
			});
		}
	});
	
	/*-------LOAD TEST DEMO-------*/
	$('#load-test').click(function() {
		loadTraining();
	});
	
	/*-------SAVE TEST DEMO-------*/
	$('#save').click(function(event) {
		event.preventDefault();
		if(testOn) {
			customAlert("You cannot change the configurations while the test is running.");
		} else {
			loadTraining();
			saveConfig();
		}
	});
	
	/*-------TOGGLE TEST-------*/
	$('#toggle-test').hover(function() {
		if(testOn) {
			$(this).val("Turn OFF").css('border','1px solid black');
		} else {
			$(this).val("Turn ON").css('border','1px solid black').css('color','white');
		}
	}, function() {
		if(testOn) {
			$(this).val("ON").css('border','1px solid '+surpriseColour);
		} else {
			$(this).val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
		}
	});
	$('#toggle-test').click(function() {
		testOn = !testOn;
		if(testOn) {
			$(this).val("ON").css('background',surpriseColour).css('border','1px solid '+surpriseColour).css('color','white');
		} else {
			$(this).val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
		}
		saveConfig();
	});
	
	/*-------TOGGLE ANS-------*/
	$('#toggle-ans').hover(function() {
		if(ansOn) {
			$(this).val("Turn OFF").css('border','1px solid black');
		} else {
			$(this).val("Turn ON").css('border','1px solid black').css('color','white');
		}
	}, function() {
		if(ansOn) {
			$(this).val("ON").css('border','1px solid '+surpriseColour);
		} else {
			$(this).val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
		}
	});
	$('#toggle-ans').click(function() {
		ansOn = !ansOn;
		if(ansOn) {
			$(this).val("ON").css('background',surpriseColour).css('border','1px solid '+surpriseColour).css('color','white');
		} else {
			$(this).val("OFF").css('background','#eee').css('border','1px solid #aaa').css('color','#aaa');
		}
		saveConfig();
	});
	
	/*-------RESET STUDENT ATTEMPT-------*/
	$('#reset-attempt').focusin(function() {
		$(this).css('box-shadow','0px 0px 3px '+surpriseColour+' inset');
		if ($(this).val() == "student id") {
			$(this).css('color','black');
			$(this).val("");
		}
	}).focusout(function() {
		$(this).css('box-shadow','0px 0px 3px #929292 inset');
		if ($(this).val() == "") {
			$(this).css('color','#aaa');
			$(this).val("student id");
		}
	});
	$('#reset').click(function(event) {
		event.preventDefault();
		var stName = $('#reset-attempt').val();
		$.ajax({
			url: "php/Test.php",
			data: {mode: MODE_ADMIN_RESET_ATTEMPT, password: adminpw, username: stName}
		}).done(function(success) {
			if(success==1) {
				customAlert("Attempt for "+stName+" has been reset.");
			} else {
				customAlert("No such student in database.");
			}
		});
	});
	
	/*-------STUDENT LIST FILE UPLOAD-------*/
	$('#upload-file').click(function(event){
		event.preventDefault();
		var formData = new FormData($('.more-settings')[0]);
		$.ajax({
			url: 'php/UploadStudentData.php',  //Server script to process data
			type: 'POST',
			// Form data
			data: formData,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
	    }).done(function(result) {
	    	if(result == "Success") {
	    		customAlert("Student list updated accordingly.");
	    	} else {
	    		customAlert(result);
	    	}
	    });
	});

	/*-------SUBMIT QUIZ-------*/
	$('#submit-test').click(function() {
		submitTraining();
	});
	$('#goto-answer').css("background-color", surpriseColour);
	$('#goto-answer').hover(function() {
		$(this).css("background-color", "black");
	}, function() {
		$(this).css("background-color", surpriseColour);
	});
	$('#goto-answer').click(function() {
		MODE = "ANSWER";
		startAns();
	});	
});