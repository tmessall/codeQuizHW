var sectionTag = document.getElementById("highScores");
var ulTag = document.createElement("ul");
var scores = [JSON.parse(localStorage.getItem("topScore")), JSON.parse(localStorage.getItem("secondScore")), JSON.parse(localStorage.getItem("thirdScore")), JSON.parse(localStorage.getItem("fourthScore")), JSON.parse(localStorage.getItem("fifthScore"))];
for (var i = 0; i < scores.length; i++) {
    if (scores[i] !== null) {
        var liTag = document.createElement("li");
        liTag.innerHTML = `${scores[i].initials} # Correct: ${scores[i].scoreOne} Time: ${scores[i].scoreTwo} `;
        liTag.setAttribute("id", "scores");
        ulTag.appendChild(liTag);
    }
}
sectionTag.append(ulTag);