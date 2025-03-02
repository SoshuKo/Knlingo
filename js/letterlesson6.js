const allLetters = [
    { kniun: 'p', latin: 'p' },
    { kniun: 'b', latin: 'b' },
    { kniun: 'P', latin: 'p’' },
    { kniun: '1', latin: 'pm' },
    { kniun: 'B', latin: 'bm' },
    { kniun: '2', latin: 'p’m' },
    { kniun: 'M', latin: 'hm' },
    { kniun: 'm', latin: 'm' },
    { kniun: 'f', latin: 'f' },
    { kniun: 'v', latin: 'v' },
    { kniun: 't', latin: 't' },
    { kniun: 'd', latin: 'd' },
    { kniun: 'T', latin: 't’' },
    { kniun: '3', latin: 'tn' },
    { kniun: 'D', latin: 'dn' },
    { kniun: '4', latin: 't’n' },
    { kniun: 'N', latin: 'hn' },
    { kniun: 'n', latin: 'n' },
    { kniun: 'R', latin: 'hr' },
    { kniun: 'r', latin: 'r' },
    { kniun: 'L', latin: 'hl' },
    { kniun: 'l', latin: 'l' },
    { kniun: 'c', latin: 'c' },
    { kniun: 'Z', latin: 'dz' },
    { kniun: 'C', latin: 'c’' },
    { kniun: 's', latin: 's' },
    { kniun: 'z', latin: 'z' },
    { kniun: 'S', latin: 's’' },
    { kniun: '5', latin: 'ch' },
    { kniun: 'J', latin: 'j' },
    { kniun: '6', latin: 'ch’' },
    { kniun: '7', latin: 'sh' },
    { kniun: 'j', latin: 'zh' },
    { kniun: '8', latin: 'sh’' },
    { kniun: 'k', latin: 'k' },
    { kniun: 'g', latin: 'g' },
    { kniun: 'K', latin: 'k’' },
    { kniun: '9', latin: 'kn' },
    { kniun: 'G', latin: 'gn' },
    { kniun: '#', latin: 'k’n' },
    { kniun: 'O', latin: 'hng' },
    { kniun: 'o', latin: 'ng' },
    { kniun: 'x', latin: 'x' },
    { kniun: '%', latin: 'gh' },
    { kniun: 'a', latin: 'a' },
    { kniun: 'e', latin: 'e' },
    { kniun: 'i', latin: 'i' },
    { kniun: 'u', latin: 'u' },
    { kniun: 'ya', latin: 'ia' },
    { kniun: 'ye', latin: 'ie' },
    { kniun: 'yu', latin: 'iú' },
    { kniun: 'wa', latin: 'ua' },
    { kniun: 'we', latin: 'ue' },
    { kniun: 'wi', latin: 'uí' },
    { kniun: 'ay', latin: 'ai' },
    { kniun: 'ey', latin: 'ei' },
    { kniun: 'uy', latin: 'úi' },
    { kniun: 'aw', latin: 'au' },
    { kniun: 'ew', latin: 'eu' },
    { kniun: 'iw', latin: 'íu' }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledLetters = shuffleArray(getRandomQuestions(allLetters, 20)); // 20問をランダムに選択

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');

function getRandomQuestions(array, num) {
    const shuffled = shuffleArray([...array]);
    return shuffled.slice(0, num);
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledLetters.length) {
        showResult();
        return;
    }

    const currentLetter = shuffledLetters[currentQuestionIndex];
    questionElement.textContent = currentLetter.kniun;
    questionElement.classList.add('kniun-letter');

    const choices = generateChoices(currentLetter.latin);
    const choiceButtons = choicesElement.querySelectorAll('.choice');
    choiceButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.dataset.answer = choices[index] === currentLetter.latin;
    });
}

function generateChoices(correctAnswer) {
    const choices = [correctAnswer];
    const otherLetters = allLetters.filter(letter => letter.latin !== correctAnswer);

    while (choices.length < 4) {
        const randomIndex = Math.floor(Math.random() * otherLetters.length);
        const randomLetter = otherLetters[randomIndex].latin;
        if (!choices.includes(randomLetter)) {
            choices.push(randomLetter);
        }
    }

    return shuffleArray(choices);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.answer === 'true';
    const currentLetter = shuffledLetters[currentQuestionIndex];

    answeredQuestions.push({
        question: currentLetter.kniun,
        correctAnswer: currentLetter.latin,
        userAnswer: selectedButton.textContent,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        correctAnswers++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
        selectedButton.classList.remove('correct', 'incorrect');
    }, 500);
}

function showResult() {
    questionElement.parentElement.style.display = 'none';
    resultContainer.style.display = 'block';
    resultMessage.innerHTML = `正解数: ${correctAnswers} / ${shuffledLetters.length}<br><br>`;
    answeredQuestions.forEach(question => {
        resultMessage.innerHTML += `
            <p>
                問題: <span class="kniun-letter">${question.question}</span> 
                あなたの答え: ${question.userAnswer} 
                ${question.isCorrect ? '正解' : `不正解 (正答: ${question.correctAnswer})`}
            </p>
        `;
    });
}

choicesElement.addEventListener('click', checkAnswer);
loadQuestion();