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
    i = 0;
    e.preventDefault();
    startCountdown();
    // Hides the starting information, brings up a question
    intro.style.display = "none";
    displayQuestion(questionArr[i]);
}

function startCountdown() {
    var countdown = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft + " seconds left";
  
      if(secondsLeft <= 0) {
        finishQuiz();
        clearInterval(countdown);
        timer.textContent = "";
      }
  
    }, 1000);
  }

function displayQuestion(question) {
    forQuestion.innerHTML = "";
    var h1Tag = document.createElement("h1");
    h1Tag.innerHTML = question.ask;
    forQuestion.append(h1Tag);
    displayAnswers(question);
    getAnswer(question);
}

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

function getAnswer(question) {
    forQuestion.addEventListener("click", checkAnswer);
}

function checkAnswer(e) {
    e.preventDefault();
    if (e.target.matches("button")) {
        if (e.target.getAttribute("value") === "correct") {
            console.log("correct");
            scoreOne++;
        } else {
            console.log("incorrect");
            secondsLeft -= 15;
        }
        i++;
        if (i < questionArr.length) {
            displayQuestion(questionArr[i]);
        } else {
            scoreTwo = secondsLeft;
            finishQuiz()
        }
    }
}

function finishQuiz() {
    secondsLeft = 0;
    if (scoreTwo < 0) {scoreTwo = 0};
    forQuestion.innerHTML = "";
    final.innerHTML = "";
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

function saveScore(e) {
    e.preventDefault();
    if (e.target.matches("button")) {
        console.log(inputTag.value);
        score.scoreOne = scoreOne;
        score.scoreTwo = scoreTwo;
        score.initials = inputTag.value;
        var scoreSaved = false;
        checkScore(topScore, "topScore");
        checkScore(secondScore, "secondScore");
        checkScore(thirdScore, "thirdScore");
        checkScore(fourthScore, "fourthScore");
        checkScore(fifthScore, "fifthScore");
    }

}

function checkScore(localScore, str) {
    console.log(localScore);
    if (localScore !== null && score !== null) {
        if (score.scoreOne > localScore.scoreOne) {
            localStorage.setItem(str, JSON.stringify(score));
            score = localScore;
        } else if (score.scoreOne == localScore.scoreOne && score.scoreTwo > localScore.scoreTwo) {
            localStorage.setITem(str, JSON.stringify(score));
            score = localScore;
        }
    } else if (localScore == null && score !== null) {
        localStorage.setItem(str, JSON.stringify(score));
        console.log("is you doing this?");
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