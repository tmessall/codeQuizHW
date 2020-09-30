// HTML Elements
var intro = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");
var forQuestion = document.getElementById("forQuestion");
var final = document.getElementById("final");
var timer = document.getElementById("timer");

// For the final page, needs to be global so input can be checked
var inputTag = document.createElement("input");

// Creates top scores, second scores, third scores, fourth scores, fifth scores
var topScore = JSON.parse(localStorage.getItem("topScore"));
var secondScore = JSON.parse(localStorage.getItem("secondScore"));
var thirdScore = JSON.parse(localStorage.getItem("thirdScore"));
var fourthScore = JSON.parse(localStorage.getItem("fourthScore"));
var fifthScore = JSON.parse(localStorage.getItem("fifthScore"));

// Creates the object to track score
var score = {
    scoreOne: "",
    scoreTwo: "",
    initials: ""
}

// Global Variables to track score and time
var secondsLeft = 90;
var scoreOne = 0;
var scoreTwo;

// Questions
var qOne = {
    ask: "Which variable below stores multiple of something?",
    answers: ["Array", "String", "Integer", "Boolean"],
    correctAnswer: "Array"
}

var qTwo = {
    ask: "What does arr.length return?",
    answers: ["Length of arr", "10", "Infinity", "The last index of arr"],
    correctAnswer: "Length of arr"
}

var qThree = {
    ask: "Which piece does NOT belong in a for loop?",
    answers: ["for ( var i = 0;", "i < number;", "while (true)", "i++) {"],
    correctAnswer: "while (true)"
}

var qFour = {
    ask: "What are functions in javascript?",
    answers: ["Types of strings", "Types of numbers", "Chunks of code which carry out a process", "True/false statements"],
    correctAnswer: "Chunks of code which carry out a process"
}

var qFive = {
    ask: "What is javascript used for?",
    answers: ["Styling the page", "The basic contents of the page", "Showing the page in the broswer", "Adding function to the page"],
    correctAnswer: "Adding function to the page"
}

var qSix = {
    ask: "Which of these is NOT a javascript data type?",
    answers: ["Strings", "Numbers", "Boolean", "Keyboards"],
    correctAnswer: "Keyboards"
}

// Array of Questions
var questionArr = [qOne, qTwo, qThree, qFour, qFive, qSix];

// Global variable to loop through each question
var i;

function beginQuiz(e) {
    // Resets these variables so the quiz could be done multiple times
    i = 0;
    score.scoreOne = "";
    score.scoreTwo = "";
    score.initials = "";

    e.preventDefault();

    // Begins the timer in the top right
    startCountdown();

    // Hides the starting information, brings up first question
    intro.style.display = "none";
    displayQuestion(questionArr[i]);
}

// Controls the timer in the top right
function startCountdown() {
    var countdown = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft + " seconds left";
  
      if(secondsLeft <= 0) {
        // Goes to final page
        finishQuiz();
        clearInterval(countdown);
        timer.textContent = "";
      }
  
    }, 1000);
  }

// Displays a question
function displayQuestion(question) {
    forQuestion.innerHTML = "";
    var h1Tag = document.createElement("h1");
    h1Tag.innerHTML = question.ask;
    forQuestion.append(h1Tag);
    // Displays this question's answers
    displayAnswers(question);
    // Checks what the user answers
    forQuestion.addEventListener("click", checkAnswer);
}

// Displays the potential answers to a question
function displayAnswers(question) {
    for (var i = 0; i < question.answers.length; i++) {
        var ulTag = document.createElement("ul");
        forQuestion.append(ulTag);
        var liTag = document.createElement("li");
        var answerBtn = document.createElement("button");
        answerBtn.innerHTML = (i + 1) + ". " + question.answers[i];
        if (question.answers[i] === question.correctAnswer) {
            answerBtn.setAttribute("value", "correct");
        } else {
            answerBtn.setAttribute("value", "incorrect");
        }
        answerBtn.setAttribute("id", "answerBtn");
        liTag.appendChild(answerBtn);
        ulTag.append(liTag);
    }
}

// Checking the user's answer
function checkAnswer(e) {
    e.preventDefault();
    if (e.target.matches("button")) {
        if (e.target.getAttribute("value") === "correct") {
            // Increases number of correct answers
            scoreOne++;
        } else {
            // Time penalty for incorrect answer
            secondsLeft -= 15;
        }
        // Sends to next question
        i++;
        if (i < questionArr.length) {
            displayQuestion(questionArr[i]);
        } else {
            // Marks time where it is for that score
            scoreTwo = secondsLeft;
            // Goes to final page
            finishQuiz();
        }
    }
}

// Final page
function finishQuiz() {
    secondsLeft = 0;
    // Ensures score isn't negative
    if (scoreTwo < 0) {scoreTwo = 0};
    forQuestion.innerHTML = "";
    final.innerHTML = "";
    // Displays the score and asks for initials
    var h1Tag = document.createElement("h1");
    var pTag = document.createElement("p");
    var pTwoTag = document.createElement("p");
    var formTag = document.createElement("form");
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submitBtn");
    h1Tag.innerHTML = "Final Score";
    pTag.innerHTML = scoreOne + " correct answers with " + scoreTwo + " seconds remaining.";
    pTwoTag.innerHTML = "Input your initials below to save your score!";
    submitBtn.innerHTML = "Submit";
    formTag.appendChild(inputTag);
    formTag.appendChild(submitBtn);
    final.append(h1Tag);
    final.append(pTag);
    final.append(pTwoTag);
    final.append(formTag);
    final.addEventListener("click", saveScore);
}

// Saves scores by initial after name is checked
function saveScore(e) {
    if (e.target.matches("button")) {
        // Sets these so they can go to local storage
        score.scoreOne = scoreOne;
        score.scoreTwo = scoreTwo;
        score.initials = inputTag.value;
        checkScore(topScore, "topScore");
        checkScore(secondScore, "secondScore");
        checkScore(thirdScore, "thirdScore");
        checkScore(fourthScore, "fourthScore");
        checkScore(fifthScore, "fifthScore");
    }

}

// Puts score into local storage (if it belongs)
function checkScore(localScore, str) {
    // Makes sure the checks won't break it
    if (localScore !== null && score !== null) {
        // Adds as highest score by correct #
        if (score.scoreOne > localScore.scoreOne) {
            localStorage.setItem(str, JSON.stringify(score));
            score = localScore;
        // Adds as highest score by time (tiebreaker)
        } else if (score.scoreOne == localScore.scoreOne && score.scoreTwo > localScore.scoreTwo) {
            localStorage.setItem(str, JSON.stringify(score));
            score = localScore;
        }
    // Adds if there are still null score values
    } else if (localScore == null && score !== null) {
        localStorage.setItem(str, JSON.stringify(score));
        score = null;
    }
}

// Changes color of the START button on hover
intro.addEventListener("mouseover", function(e) {
    e.preventDefault();
    if (e.target.matches("button")) {
        startBtn.style.backgroundColor = "lightsteelblue";
        startBtn.style.color = "black";
    } else {
        startBtn.style.backgroundColor = "black";
        startBtn.style.color = "lightsteelblue";
    }
})

// Starts quiz when start button is clicked
startBtn.addEventListener("click", beginQuiz);