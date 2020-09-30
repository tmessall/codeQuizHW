var intro = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");
var forText = document.getElementById("forText");
var final = document.getElementById("final");
var timer = document.getElementById("timer");
var secondsLeft = 90;
var scoreOne = 0;
var scoreTwo;

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

var questionArr = [qOne, qTwo, qThree, qFour, qFive, qSix];
var i = 0;

function beginQuiz(e) {
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
    forText.innerHTML = "";
    var h1Tag = document.createElement("h1");
    h1Tag.innerHTML = question.ask;
    forText.append(h1Tag);
    displayAnswers(question);
    getAnswer(question);
}

function displayAnswers(question) {
    for (var i = 0; i < question.answers.length; i++) {
        var ulTag = document.createElement("ul");
        forText.append(ulTag);
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
    forText.addEventListener("click", checkAnswer);
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
    forText.innerHTML = "";
    var h1Tag = document.createElement("h1");
    var pTag = document.createElement("p");
    var pTwoTag = document.createElement("p");
    var formTag = document.createElement("form");
    var inputTag = document.createElement("input");
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submitBtn");
    h1Tag.innerHTML = "Final Score";
    pTag.innerHTML = scoreOne + " correct answers with " + scoreTwo + " seconds remaining.";
    pTwoTag.innerHTML = "Input your initials below to save your score!";
    submitBtn.innerHTML = "Submit";
    formTag.appendChild(inputTag);
    formTag.appendChild(submitBtn);
    forText.append(h1Tag);
    forText.append(pTag);
    forText.append(pTwoTag);
    forText.append(formTag);
    saveScore();
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