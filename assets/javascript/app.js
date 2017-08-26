$(document).ready(function() {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var questionIndex = 0;

    var intervalId;
    var clockRunning = false;

     $(".unanswered").hide();

    function startTimer() {
        t = 10;

            if (!clockRunning) {
                t = 10;
                intervalId = setInterval(decrement, 1000);
                clockRunning = true;
                $(".button").hide();
                $(".gameInfo").hide();
            }
            if (clockRunning){
                $(".snickleFritz").on("click", function(){
                    resetTimer();
                })
            }
            if (t === 0) {
                incorrectAnswers++;
                clockRunning = false;
                stop();

            }
    }

    function resetTimer(){
        clearInterval(intervalId);
        startTimer();

    }

    function decrement() {
        t--;
        $(".timer").html("<h4>Time Remaining: " + t + "</h4>");
        if (t === 0) {
            stop();
            questionIndex++;
            incorrectAnswers++;
            $(".snickleFritz").empty();
            postQuestion(questionIndex);

        }
    }

    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }

    var questions = [{
        question: "Which one of these films stars Robin Williams?",
        choices: ["Moonrise Kingdom", "World's Greatest Dad", "Best in Show", "Presumed Innocent"],
        answer: 1
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Tinker Tailor Soldier Spy", "Walk Hard: The Dewey Cox Story", "12 Monkeys", "Popeye"],
        answer: 3
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Aladdin", "WALL·E", "The Lion King", "Hercules"],
        answer: 0
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Footloose", "Harry Potter and the Order of Phoenix", "Good Morning, Vietnam", "Unforgiven"],
        answer: 2
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Misery", "Jumanji", "Pulp Fiction", "Martha Marcy May Marlene"],
        answer: 1
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Spider-Man 2", "Jacob's Ladder", "True Grit", "Hook"],
        answer: 3
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["The Birdcage", "Drive", "Boyhood", "Homeward Bound: The Incredible Journey"],
        answer: 0
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Night at the Museum", "Mad Max: Fury Road", "Django Unchained", "Miami Blues"],
        answer: 0
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Indiana Jones and the Last Crusade", "The Queen", "The Devil's Advocate", "Good Will Hunting"],
        answer: 3
    }, {
        question: "Which one of these films stars Robin Williams?",
        choices: ["Mrs. Doubtfire", "Black Swan", "The Hunt for Red October", "In Bruges"],
        answer: 0
    },{
        question: "Which one of these films stars Robin Williams?",
        choices: ["The Bodyguard", "The Usual Suspects", "The World According to Garp", "Scott Pilgrim vs. the World"],
        answer: 2
    },{
        question: "Which one of these films stars Robin Williams?",
        choices: ["21 Jump Street", "Awakenings", "Titanic", "American Beauty"],
        answer: 1
    },{
        question: "Which one of these films stars Robin Williams?",
        choices: ["X-Men: First Class", "Dead Poets Society", "Dances with Wolves", "Before Sunset"],
        answer: 1
    },{
        question: "Which one of these films stars Robin Williams?",
        choices: ["Batman", "The Avengers", "One Hour Photo", "King of New York"],
        answer: 2
    },{
        question: "Which one of these films stars Robin Williams?",
        choices: ["Beasts of the Southern Wild", "Where the Heart Is", "Ghost", "The Fisher King"],
        answer: 3
    }];

    function postQuestion(post) {
        $(".snickleFritz").off("click");
        if (questionIndex < questions.length) {
            startTimer();
            $(".questions").html("<h2>" + questions[post].question + "</h2>");
            for (var i = 0; i < questions[post].choices.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("snickleFritz").attr("numberIndex", i).text(questions[post].choices[i]);
                $(".choices").append(newDiv);
            }
        }
            else {

                endGame();
            }

        $(".snickleFritz").on("click", function() {
            console.log(this);
            $(".snickleFritz").remove();
            var userChoice = $(this).attr("numberIndex");
            userChoice = parseInt(userChoice);

            if (userChoice === questions[questionIndex].answer) {
                questionIndex++;
                correctAnswers++;
            } else {
                incorrectAnswers++;
                questionIndex++;
            }

                postQuestion(questionIndex);

        })
    }

    function startGame(){
        var correctAnswers = 0;
        var incorrectAnswers = 0;
        var questionIndex = 0;

        $(".button").click(function() {
            clearInterval(intervalId);
            startTimer();
            postQuestion(questionIndex);

        });

        $(".wins").empty();
        $(".losses").empty();
        $(".restartButton").hide();
        $(".button").show();

    }

    function endGame() {
    stop();
    $(".questions").empty();
    $(".snickleFritz").empty();
    $(".timer").hide();
    $(".wins").html("<h3>Correct Answers: " + correctAnswers + "</h3>");
    $(".losses").html("<h3>Incorrect Answers: " + incorrectAnswers + "</h3>");
     $(".unanswered").show();

    var restartButton = $("<button>");
    restartButton.addClass("btn btn-primary btn-lg restartButton");
    restartButton.text("Restart Game");
    $(".unanswered").append($(restartButton));
    $(".restartButton").on("click", function() {

        $(".restartButton").hide();
        $(".wins").empty();
        $(".losses").empty();
        $(".timer").show();
        correctAnswers = 0;
        incorrectAnswers = 0;
        questionIndex = 0;

        postQuestion(questionIndex);
    })
    }

    startGame();

});