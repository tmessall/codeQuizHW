var intro = document.getElementById("intro");
var startBtn = document.getElementById("startBtn")

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