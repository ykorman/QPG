(function() {
	'use strict';

	function tabooDebug(debugString) {
		document.getElementById("debugP").innerHTML = debugString;
	}

	function startRound() {
		tabooDebug("start round " + roundNumber);
		updateRound();
		showCard();
		initTimer();
	}
	
	function updateRound() {
		roundNumber++;
		document.getElementById("roundNumber").innerHTML = roundNumber;
	}
	
	function updateRoundTeam() {
		passCount = 3;
		if (roundTeam == "TeamA")
		{
			document.getElementById("teamAScoreLabel").style.color = "black";
			document.getElementById("teamBScoreLabel").style.color = "red";
			roundTeam = "TeamB";
		} else
		{
			document.getElementById("teamAScoreLabel").style.color = "red";
			document.getElementById("teamBScoreLabel").style.color = "black";
			roundTeam = "TeamA";
		}
		tabooDebug("now team: " + roundTeam);
	}
	
	function initTimer() {
		if (timeoutCounter > 0)
			updateRoundTeam();
		if (timerInterval)
			clearInterval(timerInterval);
		timeoutCounter = 10;
		document.getElementById("timer").innerHTML = timeoutCounter;
		timerInterval = setInterval(function(){ timerCount() }, 1000);
	}
	
	function timerCount() {
		if (timeoutCounter > 0) {
			timeoutCounter = timeoutCounter - 1;
			document.getElementById("timer").innerHTML = timeoutCounter;
		} else {
			document.getElementById("timer").innerHTML = "0";
			clearInterval(timerInterval);
			updateRoundTeam();
			tabooDebug("timer done");
		}
	}
	
	function showCard() {
			var randomCardId = Math.floor(Math.random() * cards.length);
			var card = cards[randomCardId];
			// tabooDebug("random is " + randomCardId);
			// var cardDiv = document.getElementById("gameCard");
			// var cardHtml = "<dl> <dt>" + card.word + "\n";
			// for (var i=0; i < card.taboos.length; i++)
				// cardHtml += "<dd>" + card.taboos[i] + "\n";
			// cardHtml += "</dl>"
			// cardDiv.innerHTML = cardHtml;
			document.getElementById("cardWord").innerHTML = card.word;
			document.getElementById("cardTaboo1").innerHTML = card.taboos[0];
			document.getElementById("cardTaboo2").innerHTML = card.taboos[1];
			document.getElementById("cardTaboo3").innerHTML = card.taboos[2];
			document.getElementById("cardTaboo4").innerHTML = card.taboos[3];
	}
	
	function correctCard() {
		if (timeoutCounter == 0) return;
		if (roundTeam == "TeamA") {
			teamAScore++;
			document.getElementById("teamAScore").innerHTML = teamAScore;
		} else {
			teamBScore++;
			document.getElementById("teamBScore").innerHTML = teamBScore;
		}
		showCard();
	}
	
	function wrongCard() {
		if (timeoutCounter == 0) return;
		if (roundTeam == "TeamA") {
			teamAScore--;
			if (teamAScore < 0) teamAScore = 0;
			document.getElementById("teamAScore").innerHTML = teamAScore;
		} else {
			teamBScore--;
			if (teamBScore < 0) teamBScore = 0;
			document.getElementById("teamBScore").innerHTML = teamBScore;
		}
		showCard();
	}
	
	function passCard() {
		if (timeoutCounter == 0) return;
		if (passCount > 0) {
			passCount--;
			showCard();
		}
	}
	
	function resetGame() {
		// todo
		timeoutCounter = 10;
		if (timerInterval)
			clearInterval(timerInterval);
		roundNumber = 0;
		teamAScore = 0;
		teamBScore = 0;
		roundTeam = "TeamB";
		document.getElementById("teamAScore").innerHTML = teamAScore;
		document.getElementById("teamBScore").innerHTML = teamBScore;
		document.getElementById("timer").innerHTML = timeoutCounter;
		document.getElementById("roundNumber").innerHTML = roundNumber;
	}
	
	tabooDebug("script started");
	var timerInterval = null;
	var timeoutCounter = 10;
	var roundNumber = 0;
	var teamAScore = 0;
	var teamBScore = 0;
	var roundTeam = "TeamB";
	document.getElementById("teamAScoreLabel").style.color = "red";
	var passCount = 3;
	var cards = [ 
					{word: "פרה", taboos: ["חיה","מוו","חלב","רפת"]},
					{word: "מעלית", taboos: ["בניין","עולה","יורד","קומה"]},
					{word: "פריס הילטון", taboos: ["מלון","בלונדינית","סלבריטי","מטומטמת"]},
					{word: "דמדומים", taboos: ["שמש","שקיעה","סרט","ערפד"]},
				];
				
	document.getElementById("startButton").addEventListener('click', startRound);
	document.getElementById("correctButton").addEventListener('click', correctCard);
	document.getElementById("wrongButton").addEventListener('click', wrongCard);
	document.getElementById("passButton").addEventListener('click', passCard);
	document.getElementById("resetButton").addEventListener('click', resetGame);

})();