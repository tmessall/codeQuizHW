var intro = document.getElementById("intro");
var startBtn = document.getElementById("startBtn");
var forQuestion = document.getElementById("forQuestion");

var qOne = {
    ask: "What type of variable stores multiple of something?",
    answers: ["Array", "String", "Integer", "Boolean"],
    correctAnswer: "Array"
}

var qTwo = {
    ask: "What does arr.length return?",
    answers: ["Length of arr", "10", "Infinity", "The last index of arr"],
    correctAnswer: "Length of arr"
}

var questionArr = [qOne, qTwo]

function beginQuiz(e) {
    e.preventDefault();
    // Hides the starting information, brings up a question
    intro.style.display = "none";
    for (var i = 0; i < questionArr.length; i++) {
        console.log(questionArr[i].answers);
        displayQuestion(questionArr[i]);
    }
}

function displayQuestion(question) {
    var h1Tag = document.createElement("h1");
    h1Tag.innerHTML = question.ask;
    forQuestion.append(h1Tag);
    var quest = question;
    displayAnswers(quest);
}

function displayAnswers(question) {
    for (var i = 0; i < question.answers.length; i++) {
        var ulTag = document.createElement("ul");
        forQuestion.append(ulTag);
        var liTag = document.createElement("li");
        var answerBtn = document.createElement("button");
        answerBtn.innerHTML = (i + 1) + ". " + question.answers[i];
        liTag.appendChild(answerBtn);
        ulTag.append(liTag);
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

startBtn.addEventListener("click", beginQuiz);