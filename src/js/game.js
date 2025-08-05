// questions and game quiz
const question = document.querySelector("#question");
const currentScore = document.querySelector("#currentScore");
const progressBar = document.querySelector(".qz-progress-bar");
const gameDashboard = document.querySelector("#gameDashboard");

let displayedQuestion = [];
let acceptAnswer = false; //set to false so user can't answer before new question loaded
let score = 0;
let counterQuestion = 0;

let questions = [];

const EASY = "easy", HARD = "hard";
const MAX_QUESTIONS = 10;

// Buttons
const categoryBtn = document.querySelector("#categories");
const difficultyBtn = document.querySelector("#difficulty");
// Sounds
const incorrectSound = document.querySelector("#incorrect");
const correctSound = document.querySelector("#correct");
const finalSound = document.querySelector("#finalSound");
const fanfare = document.querySelector('#fanfare');
const noPoints = document.querySelector('#noPoints');

// Bonus point will depend on the level of quiz difficulty the player will choose
let bonus;

const startGame = () => {
    counterQuestion = 0;
    score = 0;
    availableQuestions = [...questions]; // creating full copy of questions
    const answers = document.querySelector("#answers");

    if (difficultyLevel === EASY) {
        bonus = 1;
    } else if (difficultyLevel === HARD) {
        bonus = 2;
    }

    if (!difficultyLevel || !categoryId) {
        $('#settingsModal').modal('show');
    } else {
        answers.innerHTML = "";
        location.href = "#start";
        gameProgress.classList.remove("hide");
        gameDashboard.classList.add("display");
        getNextQuestion();
    }
};

const getNextQuestion = () => {
    // Temporary setting: if no questions left, show final modal
    if (availableQuestions.length === 0) {
        question.innerHTML = "";
        $('#finalModal').modal('show');
        setHighScore();
        gameDashboard.classList.remove("display");
        return;
    }

    counterQuestion++;
    if (counterQuestion <= 10) {
        progressBar.innerText = `${counterQuestion}/${MAX_QUESTIONS}`;
    }

    const indexQuestion = Math.floor(Math.random() * availableQuestions.length);
    displayedQuestion = availableQuestions[indexQuestion];
    question.innerText = `${counterQuestion}. ${decodeURIComponent(displayedQuestion.question)}`;

    const possibleAnswers = displayedQuestion.possible_answers;
    possibleAnswers.forEach((answer, index) => {
        const alphabet = ["A", "B", "C", "D"];
        answers.innerHTML += `
        <div class="answers-container col-12 col-sm-5">
            <p class="answer-prefix ">${alphabet[index]}</p>
            <p class="answer-choice " data-number=${index + 1}></p>
        </div>`;
    });

    const choices = document.querySelectorAll(".answer-choice");
    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = decodeURIComponent(displayedQuestion["choice" + number]);
        if (choice.innerText === decodeURIComponent(displayedQuestion.correct_answer))
            choice.setAttribute("id", "correct_answer");
    });

    progressBar.style.width = `${(counterQuestion / MAX_QUESTIONS) * 100}%`;

    availableQuestions.splice(indexQuestion, 1);
    acceptAnswer = true;
    selectingChoice();
};

const selectingChoice = () => {
    const choices = document.querySelectorAll(".answer-choice");
    choices.forEach((choice) => {
        choice.addEventListener("click", (e) => {
            if (!acceptAnswer) return;
            acceptAnswer = false;

            const selectedChoice = e.target;
            const correctAnswer = document.querySelector('#correct_answer');
            const answerClass =
                selectedChoice.textContent === decodeURIComponent(displayedQuestion.correct_answer)
                    ? "correct"
                    : "incorrect";

            if (answerClass === "correct") {
                score += bonus;
                currentScore.innerText = score;
                if (document.querySelector(".fa-volume-up")) {
                    if (!incorrectSound || !correctSound) return;
                    correctSound.currentTime = 0;
                    correctSound.play();
                }
            } else {
                if (document.querySelector(".fa-volume-up")) {
                    if (!incorrectSound || !correctSound) return;
                    incorrectSound.currentTime = 0;
                    incorrectSound.play();
                }
            }

            correctAnswer.parentElement.classList.add('correct');
            selectedChoice.parentElement.classList.add(answerClass);

            setTimeout(() => {
                correctAnswer.parentElement.classList.remove('correct');
                selectedChoice.parentElement.classList.remove(answerClass);
                answers.innerHTML = "";
                getNextQuestion();
            }, 600);
        });
    });
};

// 🎯 END GAME button logic
const endGameBtn = document.getElementById('end');
if (endGameBtn) {
  endGameBtn.addEventListener('click', () => {
    window.location.href = 'end.html';
  });
}
