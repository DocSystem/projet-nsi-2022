let scores = [];
let oldScores = [];
let difficulty = "easy";
let vitesse = 150;

async function getScores() {
    const response = await fetch('/api/getScores');
    const scores = await response.json();
    return scores;
}

async function saveScore(user, score) {
    const response = await fetch('/api/saveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "score": score})
    });
    const saved = await response.text();
    return saved == "OK";
}

async function refreshScores() {
    const snakeScores = document.querySelector("#snake_scores");
    scores = await getScores();
    if (oldScores.length != scores.length) {
        oldScores = scores;
        snakeScores.innerHTML = "";
        // sort scores by score
        scores.sort((a, b) => b.score - a.score);
        window.bestScore = scores[0].score;
        scores.forEach(score => {
            const scoreRank = scores.indexOf(score) + 1;
            const li = document.createElement("li");
            li.innerHTML = `<span class="scoreRank">${scoreRank}</span><span class="scoreRight"><span class="scoreUsername">${score.user}</span><span class="scoreScore">${score.score}</span></span>`;
            snakeScores.appendChild(li);
            if (scoreRank == 1){li.classList.add("firstRank")}
            else if (scoreRank == 2){li.classList.add("secondRank")}
            else if (scoreRank == 3){li.classList.add("thirdRank")}
        });
    }
}

function gameEnd() {
    const gameOver = document.querySelector(".gameOverContainer");
    gameOver.classList.remove("hidden");
    document.querySelector("#final_score").innerHTML = score;
}

async function execSaveScore() {
    const user = document.querySelector("#final_name").value;
    if (user != "") {
        const saved = await saveScore(user, score);
        if (saved) {
            document.location.reload();
        }
    }
}

document.querySelector("#final_name").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        execSaveScore();
    }
});
document.querySelector("#final_save").onclick = execSaveScore;

async function main() {
    await refreshScores();
}

function setDifficulty(diff) {
    difficulty = diff;
    vitesse = diff == "hard" ? 90 : 150;
    document.querySelectorAll("#menu button").forEach(button => button.removeAttribute("active"));
    document.querySelector(`#diff_${diff}`).setAttribute("active", "");
}

main();

setInterval(refreshScores, 10000);
