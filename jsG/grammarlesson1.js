const questions = [
    {
        question: "私(男性)はガケである。",
        holes: 3,
        words: ["Pmia", "Pmie", "mijaihrena", "mijeihrena", "Ghaket", "Reinet"],
        correctAnswer: ["Pmia", "mijaihrena", "Ghaket"]
    },
    {
        question: "私(女性)はレイネである。",
        holes: 3,
        words: ["Pmia", "Pmie", "mijaihrena", "mijeihrena", "Ghaket", "Reinet"],
        correctAnswer: ["Pmie", "mijeihrena", "Reinet"]
    },
    {
        question: "彼はリンゴを食べる（主題:彼）。",
        holes: 3,
        words: ["Gnauma", "Gneuma", "pmafaba", "pmefaba", "jrai", "glishke"],
        correctAnswer: ["Gnauma", "pmafaba", "jrai"]
    },
    {
        question: "ブドウは彼女が食べる（主題:ブドウ）。",
        holes: 3,
        words: ["gnauma", "gneuma", "pmafaba", "pmefaba", "Jrai", "Glishke"],
        correctAnswer: ["Glishke", "pmefaba", "gneuma"]
    },
    {
        question: "それはリンゴを食べますか。",
        holes: 4,
        words: ["Gnauma", "Gníuma", "pmafaba", "pmifaba", "jrai", "glishke", "gluí", "xuí"],
        correctAnswer: ["Gníuma", "pmifaba", "jrai", "gluí"]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledQuestions = shuffleArray([...questions]);

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const answerContainer = document.getElementById("answer-container");
const checkButton = document.getElementById("check-button");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showResult();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    choicesElement.innerHTML = "";
    answerContainer.innerHTML = "";

    const shuffledWords = shuffleArray([...currentQuestion.words]);
    shuffledWords.forEach(word => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = word;
        choiceButton.classList.add("choice");
        choiceButton.addEventListener("click", () => {
            const emptySpan = answerContainer.querySelector("span:not(.filled)");
            if (emptySpan) {
                emptySpan.textContent = word;
                emptySpan.classList.add("filled");
            }
        });
        choicesElement.appendChild(choiceButton);
    });

    for (let i = 0; i < currentQuestion.holes; i++) {
        const answerSpan = document.createElement("span");
        answerSpan.dataset.index = i;
        answerSpan.textContent = "　"; // 空白
        answerContainer.appendChild(answerSpan);
    }

    // 回答リセットボタンを追加
    const resetButton = document.createElement("button");
    resetButton.textContent = "回答をリセット";
    resetButton.addEventListener("click", resetAnswer);
    answerContainer.appendChild(resetButton);
}

function resetAnswer() {
    const answerSpans = answerContainer.querySelectorAll("span");
    answerSpans.forEach(span => {
        span.textContent = "　";
        span.classList.remove("filled");
    });
}

function checkAnswer() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const userAnswer = Array.from(answerContainer.querySelectorAll("span.filled")).map(span => span.textContent);
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(currentQuestion.correctAnswer);

    answeredQuestions.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer.join(" "),
        userAnswer: userAnswer.join(" "),
        isCorrect: isCorrect
    });

    if (isCorrect) {
        correctAnswers++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    questionElement.parentElement.style.display = "none";
    resultContainer.style.display = "block";
    resultMessage.innerHTML = `正解数: ${correctAnswers} / ${questions.length}<br><br>`;

    answeredQuestions.forEach(question => {
        resultMessage.innerHTML += `
            <p>
                問題: ${question.question}<br>
                あなたの答え: ${question.userAnswer}<br>
                ${question.isCorrect ? "正解" : `不正解 (正答: ${question.correctAnswer})`}
            </p>
        `;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

checkButton.addEventListener("click", checkAnswer);
loadQuestion();