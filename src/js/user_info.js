// USER ON START
const username = document.querySelector("#userName");
const userHighScore = document.querySelector("#highScore");
const finalLabel = document.querySelector("#finalModalLabel");
const userInput = document.querySelector("#user");

const topScore = localStorage.getItem("topScore");
userHighScore.innerText = topScore;

let user = localStorage.getItem("user");
let highScore = 0;

// RETURN USER
const checkUserData = () => {
    if (!user || user.trim() === "") {
        localStorage.setItem("highScore", 0);
        $("#playerModal").modal("show");
        $("#playerModal").ready(() => {
            $('#user').focus();
        });
    } else {
        user = localStorage.getItem("user");
        highScore = localStorage.getItem("highScore") || 0;
        displayUsernameInfo();
    }
};

// SAVE USER
const userNameSubmit = () => {
    user = userInput.value.trim();
    if (user) {
        localStorage.setItem("user", user);
        $("#playerModal").modal("hide");
        displayUsernameInfo();
    }
};

// USER INFO AND SCORE
const displayUsernameInfo = () => {
    finalScore.innerText = topScore;
    username.innerHTML = user || "Unknown";
    userHighScore.innerHTML = highScore || 0;
};

// FIND HIGHEST SCORE PER SESSION/USER
const setHighScore = () => {
    let gameScore = parseInt(currentScore.innerText);
    if (gameScore > userHighScore.innerText && gameScore !== undefined) {
        finalLabel.innerText = "CONGRATULATIONS!!!";
        finalScore.innerText = `NEW HIGH SCORE!!! You scored ${gameScore} points`;
        userHighScore.innerText = gameScore;
        localStorage.setItem("highScore", gameScore);
        if (document.querySelector(".fa-volume-up")) fanfare.play();
    } else if (gameScore <= userHighScore.innerText && gameScore !== undefined) {
        finalLabel.innerText = "RESULT";
        finalScore.innerText = `You scored ${gameScore} points`;
        if (document.querySelector(".fa-volume-up")) finalSound.play();
    } else {
        finalLabel.innerText = "UNFORTUNATELY";
        finalScore.innerText = "No point this time. Try Again!";
        if (document.querySelector(".fa-volume-up")) noPoints.play();
    }
};

document.querySelector("#submitName").addEventListener("click", userNameSubmit);

userInput.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        e.preventDefault();
        userNameSubmit();
    }
});

// CHANGE NAME
document.addEventListener("DOMContentLoaded", () => {
    const changeNameBtn = document.querySelector("#changeNameBtn");
    if (changeNameBtn) {
        changeNameBtn.addEventListener("click", () => {
            userInput.value = localStorage.getItem("user") || "";
            $("#playerModal").modal("show");
            $('#user').focus();
        });
    }
});

document.querySelectorAll(".closeHighScore").forEach((e) => {
    e.addEventListener("click", () => {
        gameProgress.classList.add("hide");
        $("#finalModal").modal("hide");
        currentScore.innerText = "";
        progressBar.innerText = "";
        progressBar.style.width = "";
    });
});

document.querySelector("#openModal").addEventListener("click", () => {
    $("#qz-Modal").modal("show");
});
document.querySelectorAll(".close").forEach((e) => {
    e.addEventListener("click", () => {
        $("#qz-Modal").modal("hide");
    });
});

window.onload = () => checkUserData();
