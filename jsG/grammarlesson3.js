const questions = [
    {
        question: "_¹m_²u (「牛」クラス1)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["", "a"]
    },
    {
        question: "_¹m_²u (「牛」クラス2)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["", "e"]
    },
    {
        question: "_¹m_²u (「牛」クラス3)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["", "í"]
    },
    {
        question: "_¹m_²u (「牛」クラス4)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["s", "a"]
    },
    {
        question: "_¹m_²u (「牛」クラス5)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["s", "e"]
    },
    {
        question: "_¹m_²u (「牛」クラス6)",
        prefix: "m",
        options1: ["", "s"],
        options2: ["a", "e", "í"],
        correctAnswer: ["s", "í"]
    },
    {
        question: "_¹c’l_²fpesh mau (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "a"]
    },
    {
        question: "_¹c’l_²fpesh meu (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "e"]
    },
    {
        question: "_¹c’l_²fpesh míu (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "i"]
    },
    {
        question: "_¹c’l_²fpesh smau (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "a"]
    },
    {
        question: "_¹c’l_²fpesh smeu (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "e"]
    },
    {
        question: "_¹c’l_²fpesh smíu (「大きい牛」)",
        prefix: "c’l",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "i"]
    },
    {
        question: "mauma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "a"]
    },
    {
        question: "meuma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "e"]
    },
    {
        question: "míuma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["", "i"]
    },
    {
        question: "smauma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "a"]
    },
    {
        question: "smeuma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "e"]
    },
    {
        question: "smíuma ga=_¹pm_²-f-ab-a (「牛が食べる」)",
        prefix: "pm",
        options1: ["", "s"],
        options2: ["a", "e", "i"],
        correctAnswer: ["s", "i"]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledQuestions = shuffleArray(getRandomQuestions(questions, 6));

const questionElement = document.getElementById("question");
const dropdownsElement = document.getElementById("dropdowns");
const checkButton = document.getElementById("check-button");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");

function getRandomQuestions(array, num) {
    const shuffled = shuffleArray([...array]);
    return shuffled.slice(0, num);
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showResult();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    dropdownsElement.innerHTML = "";

    const dropdown1Container = document.createElement("span");
    const dropdown1 = document.createElement("select");
    const option1Label = document.createElement("option");
    option1Label.textContent = "1";
    option1Label.disabled = true;
    option1Label.selected = true;
    dropdown1.appendChild(option1Label);
    currentQuestion.options1.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option === "" ? "なし" : option;
        dropdown1.appendChild(optionElement);
    });
    dropdown1Container.appendChild(dropdown1);
    dropdownsElement.appendChild(dropdown1Container);

    const dropdown2Container = document.createElement("span");
    const dropdown2 = document.createElement("select");
    const option2Label = document.createElement("option");
    option2Label.textContent = "2";
    option2Label.disabled = true;
    option2Label.selected = true;
    dropdown2.appendChild(option2Label);
    currentQuestion.options2.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown2.appendChild(optionElement);
    });
    dropdown2Container.appendChild(dropdown2);
    dropdownsElement.appendChild(dropdown2Container);
}

function checkAnswer() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const userAnswer = [dropdownsElement.children[0].querySelector("select").value, dropdownsElement.children[1].querySelector("select").value];
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(currentQuestion.correctAnswer);

    answeredQuestions.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer.join(""),
        userAnswer: userAnswer.join(""),
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
    resultMessage.innerHTML = `正解数: ${correctAnswers} / ${shuffledQuestions.length}<br><br>`;

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