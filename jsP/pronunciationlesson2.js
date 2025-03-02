const letters = [
    { sound: 't', latin: 't' },
    { sound: 'd', latin: 'd' },
    { sound: 't’', latin: 't’' },
    { sound: 'tn', latin: 'tn' },
    { sound: 'dn', latin: 'dn' },
    { sound: 't’n', latin: 't’n' },
    { sound: 'hn', latin: 'hn' },
    { sound: 'n', latin: 'n' },
    { sound: 'hr', latin: 'hr' },
    { sound: 'r', latin: 'r' },
    { sound: 'hl', latin: 'hl' },
    { sound: 'l', latin: 'l' }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledLetters = shuffleArray([...letters]);

const audio = document.getElementById('audio');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');

function loadQuestion() {
    if (currentQuestionIndex >= shuffledLetters.length) {
        showResult();
        return;
    }

    const currentLetter = shuffledLetters[currentQuestionIndex];
    audio.src = `../sounds/kniun_${currentLetter.sound}.m4a`;
    audio.play();

    const choices = generateChoices(currentLetter.latin);
    const choiceButtons = choicesElement.querySelectorAll('.choice');
    choiceButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.dataset.answer = choices[index] === currentLetter.latin;
    });
}

function generateChoices(correctAnswer) {
    const choices = [correctAnswer];
    const otherLetters = letters.filter(letter => letter.latin !== correctAnswer);

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
        question: currentLetter.sound,
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
    resultMessage.innerHTML = `正解数: ${correctAnswers} / ${letters.length}<br><br>`;

    answeredQuestions.forEach(question => {
        resultMessage.innerHTML += `
            <p>
                問題: <audio src="../sounds/kniun_${question.question}.m4a" controls></audio>
                あなたの答え: ${question.userAnswer} 
                ${question.isCorrect ? '正解' : `不正解 (正答: ${question.correctAnswer})`}
            </p>
        `;
    });
}

choicesElement.addEventListener('click', checkAnswer);
loadQuestion();