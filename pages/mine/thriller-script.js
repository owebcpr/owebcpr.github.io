// Обробник вікторини
function checkQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    let correctAnswers = 0;
    let totalQuestions = 3;

    options.forEach(option => {
        if (option.dataset.correct === "true") {
            if (option.classList.contains('selected')) {
                correctAnswers++;
                option.classList.add('correct');
            }
        } else if (option.classList.contains('selected')) {
            option.classList.add('incorrect');
        }
    });

    const resultElement = document.getElementById('quiz-result');
    resultElement.innerHTML = `<p>Результат: ${correctAnswers} з ${totalQuestions}</p>`;

    if (correctAnswers === totalQuestions) {
        resultElement.innerHTML += '<p style="color:#28a745;">Відмінно! Ти експерт з безпеки! 🎉</p>';
    } else {
        resultElement.innerHTML += '<p style="color:#dc3545;">Потрібно повторити правила безпеки. Будь уважніший! 📚</p>';
    }
}

// Додаємо обробники кліку для варіантів відповідей
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function () {
        // Знімаємо виділення з інших варіантів у цьому питанні
        const parent = this.parentElement;
        parent.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });

        // Додаємо виділення до обраного варіанту
        this.classList.add('selected');
    });
});

// Імітація запуску гри
function startGame() {
    alert("Гра 'Безпечний шлях' запускається! Обери маршрут без мінних загроз.");
}