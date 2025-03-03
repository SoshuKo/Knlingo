const questions = [
    {
        type: "input",
        question: "hnuíshp- (「鳥」与格・単数形)",
        prefix: "hnuíshp",
        suffix: "et"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」与格・複数形)",
        prefix: "hnuíshp",
        suffix: "iet"
    },
    {
        type: "input",
        question: "kluí- (「虫」与格・単数形)",
        prefix: "kluí",
        suffix: "te"
    },
    {
        type: "input",
        question: "kluí- (「虫」与格・複数形)",
        prefix: "kluí",
        suffix: "tie"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」属格・単数形)",
        prefix: "hnuíshp",
        suffix: "art"
    },
    {
        type: "input",
        question: "hnuíshp- (「鳥」属格・複数形)",
        prefix: "hnuíshp",
        suffix: "iart"
    },
    {
        type: "input",
        question: "kluí- (「虫」属格・単数形)",
        prefix: "kluí",
        suffix: "tra"
    },
    {
        type: "input",
        question: "kluí- (「虫」属格・複数形)",
        prefix: "kluí",
        suffix: "tria"
    },
    {
        type: "fill",
        question: "グレイネがスツューフテに行く。",
        holes: 3,
        words: ["Greine", "Greinam", "mahraba", "mehraba", "Sciúxte", "Sciúxtet"],
        correctAnswer: ["Greine", "mehraba", "Sciúxtet"]
    },
    {
        type: "fill",
        question: "ダウケがリンゴを彼女に与える。",
        holes: 4,
        words: ["Dauke", "Daukam", "chuaxpuxaba", "jrai", "jraite", "gneu", "gneute"],
        correctAnswer: ["Daukam", "chuaxpuxaba", "jrai", "gneute"]
    },
    {
        type: "fill",
        question: "タヌキが森のほうへ歩く。",
        holes: 4,
        words: ["Tnuke", "Tnukam", "kluístuhraba", "hruíne", "sciúxte", "sciúxtet"],
        correctAnswer: ["Tnuke", "kluístuhraba", "hruíne", "sciúxtet"]
    },
    {
        type: "fill",
        question: "牛乳",
        holes: 2,
        words: ["meutra", "míutra", "smeutra", "smíutra", "schre"],
        correctAnswer: ["smeutra", "schre"]
    },
    {
        type: "fill",
        question: "私のものがここにある。",
        holes: 3,
        words: ["Pmia", "Pmiatra", "p’raihrana", "shniasen"],
        correctAnswer: ["Pmiatra", "p’raihrana", "shniasen"]
    },
    {
        type: "fill",
        question: "あなたのものがスミウルタのほうから来る。",
        holes: 4,
        words: ["Jairart", "Jairarte", "p’iaxkuhraba", "friúspen", "Smíulta", "Smíultatra"],
        correctAnswer: ["Jairarte", "p’iaxkuhraba", "friúspen", "Smíultatra"]
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