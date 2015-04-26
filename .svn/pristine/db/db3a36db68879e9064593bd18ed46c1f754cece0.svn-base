var MODE = "TRAINING";
var studentid = "";
var studentpw = "";

var infoRefresh; //setInterval function
var clientsideTimeRefresh; //setInterval function
var availableTime = 0; //in seconds
var timeLeft;

function startTest() {
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_TEST_GENERATE_QUESTIONS, username: studentid, password: studentpw, type: TEST_GENERATE_QUESTIONS_TYPE_TEST}
	}).done(function(data) {
		if(data != 0) {
			data = JSON.parse(data);
			nQns = data.length;
			init();
			for(var i=1; i<=nQns; i++) {
				extractInfo(i, data[i-1]);
			}

			//switch screens
			$('#question-nav').html("");
			prepareQnNav(nQns);
			$('#instructions-screen').fadeOut("fast");
			$('#test-screen').fadeIn("fast");
			$('#submit-test').hide();
			
			//show first question
			gw.startAnimation(qnGraphArr); //start graph widget
			gw.pause();
			qnNo = 1; //start with qn 1
			showQn(qnNo);
			
			//time, attempt no, and date update
			updateInfo();
			infoRefresh = setInterval(function(){updateInfo()}, 10000); //10 sec
			clientsideTimeRefresh = setInterval(function() {clientsideTimeUpdate();},1000); //1 sec
		} else {
			customAlert("There is no ongoing test session.");
		}
	});
}

function submitTest() {
	//get score
	ansArr.shift();
	var ansFlattened = ansArr.join('|').split("|");
	ansArr.unshift(false);
	$.ajax({
		url: "php/Test.php",
		data: {mode: MODE_TEST_SUBMIT, username: studentid, password: studentpw, ans: ansFlattened}
	}).done(function(score) {
		score = parseInt(score);
		if(score >= 0) {
			clearInterval(infoRefresh);
			clearInterval(clientsideTimeRefresh);
			$('#score').html(score+" out of "+nQns);
			$('#test-screen').fadeOut("fast");
			$('#result-screen').fadeIn("fast");
		} else if(score == -1) { //unused for now
			clearInterval(infoRefresh);
			clearInterval(clientsideTimeRefresh);
			$('#result-screen').html('<div id="result-name"></div><br/>You have already attempted this quiz.<br/>This score will not be recorded.');
			$('#test-screen').fadeOut("fast");
			$('#result-screen').fadeIn("fast");
		}
	});
}

/*-------INFO/TIME UPDATE FUNCTIONS-------*/
function updateInfo() {
	$.ajax({//update timer
		url: "php/Test.php",
		data: {mode: MODE_TEST_GET_INFO, username: studentid, password: studentpw}
	}).done(function(data) {
		data = JSON.parse(data);
		availableTime = data.timeLimit;
		var timeElapsed = data.timeElapsed;
		timeLeft = availableTime-timeElapsed;
		if(timeLeft <=0) {
			submitTest();
		}
		var studentname = data.name;
		$('#student-name').html(studentname);
	});
}

function clientsideTimeUpdate() {
	var m = Math.floor(timeLeft/60).toString();
	var s = (timeLeft%60).toString();
	if(s.length <2){ s = "0"+s; }
	if(timeLeft > 60) {
		//m = parseInt(m)+1;
		$('#time-left').html(m+" min left");
	} else {
		$('#time-left').html(s+" s left");
	}
	if(timeLeft <=0) {
		submitTest();
	} else {
		timeLeft--;
	}
}

$(document).ready (function() {
	$('#question-nav').css("background-color", surpriseColour);
	$('#to-scoreboard').css("background-color", surpriseColour);
	$('#to-scoreboard').hover(function() {
		$(this).css('background','black');
	}, function() {
		$(this).css('background',surpriseColour);
	});
	
	/*-------LOG IN CSS-------*/
	$('#login-id').focusin(function() {
		$(this).css('box-shadow','0px 0px 3px '+surpriseColour+' inset');
		if ($(this).val() == "user id") {
			$(this).css('color','black');
			$(this).val("");
		}
	}).focusout(function() {
		$(this).css('box-shadow','0px 0px 3px #929292 inset');
		if ($(this).val() == "") {
			$(this).css('color','#aaa');
			$(this).val("user id");
		}
	});
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
		studentid = $('#login-id').val();
		studentpw = $('#login-pw').val();
		//authentificate
		$.ajax({
			url: "php/Test.php",
			data: {mode: MODE_LOGIN, username: studentid, password: studentpw}
		}).done(function(passed) {
			passed = parseInt(passed);
			if(passed == 1) {
				$('#login-err').html("");
				$('#login-screen').fadeOut("fast");
				$('#instructions-screen').fadeIn("fast");
			} else {
				$('#login-err').html("Incorrect username or password");
			}
		});
	});
	
	/*-------LOAD TEST-------*/
	$('#start-test').click(function() {
		startTest();
	});

	/*-------SUBMIT QUIZ-------*/
	$('#submit-test').click(function() {
		$('#dark-overlay').fadeIn("fast", function() {
			$('#submit-check').fadeIn("fast");
			$('#submit-check p').html('You only have 1 attempt on this quiz. Are you sure you want to submit it?');
		});
	});
	$('#submit-yes').click(function() {
		$('#submit-check').fadeOut("fast", function() {
			$('#dark-overlay').fadeOut("fast");
		});
		submitTest();
	});
	$('#submit-no').click(function() {
		$('#submit-check').fadeOut("fast", function() {
			$('#dark-overlay').fadeOut("fast");
		});
	});
	
});