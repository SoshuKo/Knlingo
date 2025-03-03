const questions = [
    {
        type: "input",
        question: "hnuíshp- (「鳥」絶対格・単数形)",
        prefix: "hnuíshp",
        suffix: "e"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」絶対格・複数形)",
        prefix: "hnuíshp",
        suffix: "ie"
    },
    {
        type: "input",
        question: "kluí- (「虫」絶対格・単数形)",
        prefix: "kluí",
        suffix: ""
    },
    {
        type: "input",
        question: "kluí- (「虫」絶対格・複数形)",
        prefix: "kluí",
        suffix: "ghie"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」能格・単数形)",
        prefix: "hnuíshp",
        suffix: "am"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」能格・複数形)",
        prefix: "hnuíshp",
        suffix: "iam"
    },
    {
        type: "input",
        question: "kluí- (「虫」能格・単数形)",
        prefix: "kluí",
        suffix: "ma"
    },
    {
        type: "input",
        question: "kluí- (「虫」能格・複数形)",
        prefix: "kluí",
        suffix: "mia"
    },
    {
        type: "fill",
        question: "彼女が笑う。",
        holes: 2,
        words: ["Gneu", "Gneuma", "mefuhraba", "mefufaba", "ch’ua", "ch’uama"],
        correctAnswer: ["Gneu", "mefuhraba"]
    },
    {
        type: "fill",
        question: "彼女が子供を笑わせる。",
        holes: 3,
        words: ["Gneu", "Gneuma", "mefuhraba", "mefufaba", "ch’ua", "ch’uama"],
        correctAnswer: ["Gneuma", "mefufaba", "ch’ua"]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledQuestions = shuffleArray([...questions]);

const questionElement = document.getElementById("question");
const inputContainer = document.getElementById("input-container");
const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-button");
const choicesElement = document.getElementById("choices");
const answerContainerElement = document.getElementById("answer-container");
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

    inputContainer.style.display = "none";
    choicesElement.style.display = "none";
    answerContainerElement.style.display = "none";
    checkButton.style.display = "none";

    if (currentQuestion.type === "input") {
        inputContainer.style.display = "block";
        answerInput.value = "";
        submitButton.onclick = () => checkInputAnswer(currentQuestion);
    } else {
        choicesElement.style.display = "block";
        answerContainerElement.style.display = "block";
        checkButton.style.display = "block";
        loadFillQuestion(currentQuestion);
    }
}

function loadFillQuestion(currentQuestion) {
    choicesElement.innerHTML = "";
    answerContainerElement.innerHTML = "";

    const shuffledWords = shuffleArray([...currentQuestion.words]);
    shuffledWords.forEach(word => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = word;
        choiceButton.classList.add("choice");
        choiceButton.addEventListener("click", () => {
            const emptySpan = answerContainerElement.querySelector("span:not(.filled)");
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
        answerSpan.textContent = "　";
        answerContainerElement.appendChild(answerSpan);
    }

    const resetButton = document.createElement("button");
    resetButton.textContent = "回答をリセット";
    resetButton.addEventListener("click", resetAnswer);
    answerContainerElement.appendChild(resetButton);
}

function resetAnswer() {
    const answerSpans = answerContainerElement.querySelectorAll("span");
    answerSpans.forEach(span => {
        span.textContent = "　";
        span.classList.remove("filled");
    });
}

function checkInputAnswer(currentQuestion) {
    const userAnswer = answerInput.value;
    const isCorrect = userAnswer === currentQuestion.suffix;

    answeredQuestions.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.suffix,
        userAnswer: userAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        correctAnswers++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function checkFillAnswer(currentQuestion) {
    const userAnswer = Array.from(answerContainerElement.querySelectorAll("span.filled")).map(span => span.textContent);
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

checkButton.addEventListener("click", () => checkFillAnswer(shuffledQuestions[currentQuestionIndex]));
loadQuestion();