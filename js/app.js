(function() {
    /*
     * Changes the displayed text for a jquery mobile button.
     * Encapsulates the idiosyncracies of how jquery re-arranges the DOM
     * to display a button for either an <a> link, <input type="button">
	 * and <button>
     */
    $.fn.changeButtonText = function(newText) {
        return this.each(function() {
            $this = $(this);
            if( $this.is('a') ) {
                $('span.ui-btn-text',$this).text(newText);
                return;
            }
            if( $this.is('input') || $this.is('button') ) {
                $this.val(newText);
                // go up the tree
                var ctx = $this.closest('.ui-btn');
                $('span.ui-btn-text',ctx).text(newText);
                return;
            }
        });
    };
})(jQuery);

(function() {
    'use strict';

    function tabooDebug(debugString) {
        document.getElementById("debugP").innerHTML = debugString;
    }

    function startRound() {
        tabooDebug("start round " + roundNumber);
        $("#startButton").changeButtonText("סיבוב חדש");
        updateRound();
        showCard();
        initTimer();
    }
    
    function updateRound() {
        roundNumber++;
        //document.getElementById("roundNumber").innerHTML = roundNumber;
        $("#roundNumber").changeButtonText(roundNumber);
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
        $("#timer").changeButtonText(timeoutCounter);
        timerInterval = setInterval(function(){ timerCount() }, 1000);
    }
    
    function timerCount() {
        if (timeoutCounter > 0) {
            timeoutCounter = timeoutCounter - 1;
            $("#timer").changeButtonText(timeoutCounter);
        } else {
            $("#timer").changeButtonText(0);
            clearInterval(timerInterval);
            updateRoundTeam();
            tabooDebug("timer done");
        }
    }
    
    function showCard() {
            var randomCardId = Math.floor(Math.random() * cards.length);
            var card = cards[randomCardId];
            $("#cardWord").changeButtonText(card.word);
            $("#cardTaboo1").changeButtonText(card.taboos[0]);
            $("#cardTaboo2").changeButtonText(card.taboos[1]);
            $("#cardTaboo3").changeButtonText(card.taboos[2]);
            $("#cardTaboo4").changeButtonText(card.taboos[3]);
    }
    
    function correctCard() {
        if (timeoutCounter == 0) return;
        if (roundTeam == "TeamA") {
            teamAScore++;
            $("#teamAScore").changeButtonText(teamAScore);
        } else {
            teamBScore++;
            $("#teamBScore").changeButtonText(teamBScore);
        }
        showCard();
    }
    
    function wrongCard() {
        if (timeoutCounter == 0) return;
        if (roundTeam == "TeamA") {
            teamAScore--;
            if (teamAScore < 0) teamAScore = 0;
            $("#teamAScore").changeButtonText(teamAScore);
        } else {
            teamBScore--;
            if (teamBScore < 0) teamBScore = 0;
            $("#teamBScore").changeButtonText(teamBScore);
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
        $("#startButton").changeButtonText("משחק חדש");
        $("#teamAScore").changeButtonText(teamAScore);
        $("#teamBScore").changeButtonText(teamBScore);
        $("#timer").changeButtonText(timeoutCounter);
        $("#roundNumber").changeButtonText(roundNumber);
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
    // click on the word is also good
    document.getElementById("correctButton").addEventListener('click', correctCard);
    document.getElementById("cardWord").addEventListener('click', correctCard);
    // clicking on any of the taboo words is also ok
    document.getElementById("wrongButton").addEventListener('click', wrongCard);
    document.getElementById("cardTaboo1").addEventListener('click', wrongCard);
    document.getElementById("cardTaboo2").addEventListener('click', wrongCard);
    document.getElementById("cardTaboo3").addEventListener('click', wrongCard);
    document.getElementById("cardTaboo4").addEventListener('click', wrongCard);
    
    document.getElementById("passButton").addEventListener('click', passCard);
    document.getElementById("resetButton").addEventListener('click', resetGame);

})();
