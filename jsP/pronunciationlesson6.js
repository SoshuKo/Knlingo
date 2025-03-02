const allLetters = [
    { sound: 'p', latin: 'p' },
    { sound: 'b', latin: 'b' },
    { sound: 'p’', latin: 'p’' },
    { sound: 'pm', latin: 'pm' },
    { sound: 'bm', latin: 'bm' },
    { sound: 'p’m', latin: 'p’m' },
    { sound: 'hm', latin: 'hm' },
    { sound: 'm', latin: 'm' },
    { sound: 'f', latin: 'f' },
    { sound: 'v', latin: 'v' },
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
    { sound: 'l', latin: 'l' },
    { sound: 'c', latin: 'c' },
    { sound: 'dz', latin: 'dz' },
    { sound: 'c’', latin: 'c’' },
    { sound: 's', latin: 's' },
    { sound: 'z', latin: 'z' },
    { sound: 's’', latin: 's’' },
    { sound: 'ch', latin: 'ch' },
    { sound: 'j', latin: 'j' },
    { sound: 'ch’', latin: 'ch’' },
    { sound: 'sh', latin: 'sh' },
    { sound: 'zh', latin: 'zh' },
    { sound: 'sh’', latin: 'sh’' },
    { sound: 'k', latin: 'k' },
    { sound: 'g', latin: 'g' },
    { sound: 'k’', latin: 'k’' },
    { sound: 'kn', latin: 'kn' },
    { sound: 'gn', latin: 'gn' },
    { sound: 'k’n', latin: 'k’n' },
    { sound: 'hng', latin: 'hng' },
    { sound: 'ng', latin: 'ng' },
    { sound: 'x', latin: 'x' },
    { sound: 'gh', latin: 'gh' },
    { sound: 'q', latin: 'q' },
    { sound: 'h', latin: 'h' },
    { sound: 'y', latin: 'y' },
    { sound: 'w', latin: 'w' },
    { sound: 'a', latin: 'a' },
    { sound: 'e', latin: 'e' },
    { sound: 'i', latin: 'i' },
    { sound: 'u', latin: 'u' }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let shuffledLetters = shuffleArray(getRandomQuestions(allLetters, 20));

const audio = document.getElementById('audio');
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
    resultMessage.innerHTML = `正解数: ${correctAnswers} / ${shuffledLetters.length}<br><br>`;

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