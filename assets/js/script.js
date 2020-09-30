var intro = document.getElementById("intro");
var startBtn = document.getElementById("startBtn")

var qOne = {
    question: "What are noodles",
    answers: "macaroni",
    correctAnswer: "macaroni"
}

var qTwo = {
    question: "What is the order of letters",
    answers: "alphabet",
    correctAnswer: "alphabet",
}

var questionArr = [qOne, qTwo]

function beginQuiz(e) {
    e.preventDefault();
    // Hides the starting information, brings up a question
    intro.style.display = "none";
    for (var i = 0; i < questionArr.length; i++) {
        console.log(questionArr[i].answers);
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