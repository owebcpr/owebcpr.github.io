// Глобальні змінні для Drag & Drop
let draggedCard = null;
let draggedText = '';
let correctAnswers = {
    'yes': [
        'Користуватися складною паролем',
        'Питати дозволу у батьків',
        'Спілкуватися з друзями',
        'Дивитися мультики'
    ],
    'no': [
        'Відкривати підозрілі листи',
        'Домовлятися про зустріч з незнайомцем',
        'Викладати свою адресу',
        'Ображати інших в чаті'
    ]
};

// Функція створення героя
function createHero() {
    const name = document.getElementById("heroName").value.trim();
    const power = document.getElementById("heroPower").value;
    const result = document.getElementById("heroResult");

    if (!name) {
        showResult(result, "❌ Введіть ім'я героя!", "error");
        return;
    }

    const heroEmoji = power.includes('парол') ? '🔒' :
        power.includes('фейк') ? '🕵️' :
            power.includes('булінг') ? '💪' : '🛡️';

    showResult(result, `🎉 ${heroEmoji} ${name} – ${power}! Ти тепер захищаєш Інтернет! 🦸‍♂️`, "success");

    // Очищаємо поле вводу
    document.getElementById("heroName").value = '';
}

// Функція для вибору відповіді у вікторині
function selectAnswer(element, isCorrect, questionNum) {
    const questionDiv = element.closest('.quiz-question');
    const options = questionDiv.querySelectorAll(".quiz-option");

    // Видаляємо попередні класи
    options.forEach(opt => {
        opt.classList.remove("selected-correct", "selected-wrong");
    });

    // Додаємо клас залежно від правильності
    if (isCorrect) {
        element.classList.add("selected-correct");
    } else {
        element.classList.add("selected-wrong");
    }

    // Зберігаємо дані
    element.dataset.correct = isCorrect;
}

// Перевірка вікторини
function checkQuiz() {
    let score = 0;
    const questions = document.querySelectorAll(".quiz-question");
    let totalQuestions = 0;

    questions.forEach(question => {
        const selected = question.querySelector(".selected-correct, .selected-wrong");
        if (selected) {
            totalQuestions++;
            if (selected.classList.contains("selected-correct")) {
                score++;
            }
        }
    });

    const resultDiv = document.getElementById("quizResult");

    if (totalQuestions < questions.length) {
        showResult(resultDiv, "🤔 Дай відповіді на всі питання!", "warning");
        return;
    }

    let message = '';
    if (score === questions.length) {
        message = "🏆 Супер! Ти знаєш всі правила безпеки! 🌟";
    } else if (score >= questions.length - 1) {
        message = "👍 Майже ідеально! Ще трохи і будеш супергероєм! ⭐";
    } else {
        message = "📚 Спробуй ще раз! Безпека в інтернеті дуже важлива! 💪";
    }

    showResult(resultDiv, `✨ Твій результат: ${score} / ${questions.length}. ${message}`, "info");
}

// Клятва
function takeOath() {
    const result = document.getElementById("oathResult");

    // Створюємо HTML з картинкою по центру
    const heroHTML = `
        <div style="text-align: center;">
            <img src="img/super_heroy.png" alt="Супергерой" 
                 style="width: 200px; height: auto; margin: 0 auto 20px auto; 
                        display: block; border-radius: 20px; 
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        animation: heroAppear 0.5s ease-out;">
            <div>🎉 Вітаємо! Ти справжній Онлайн-Супергерой!<br>Захищай себе та друзів!</div>
        </div>
    `;

    showResult(result, heroHTML, "success");

    // Додаємо анімацію для картинки
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heroAppear {
            0% {
                opacity: 0;
                transform: scale(0.5) rotate(-10deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Допоміжна функція для показу результатів з різними стилями
function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = 'result-box';

    switch (type) {
        case 'success':
            element.style.background = 'linear-gradient(135deg, #a8e6cf, #d4edfa)';
            break;
        case 'error':
            element.style.background = 'linear-gradient(135deg, #ffd3b6, #ffaaa5)';
            break;
        case 'warning':
            element.style.background = 'linear-gradient(135deg, #ffeaa7, #fdcb6e)';
            break;
        default:
            element.style.background = 'linear-gradient(135deg, #fbc2eb, #a6c1ee)';
    }
}

// Ініціалізація Drag & Drop
function initDragDrop() {
    const statements = [
        'Користуватися складним паролем',
        'Відкривати підозрілі листи',
        'Питати дозволу у батьків',
        'Домовлятися про зустріч з незнайомцем',
        'Викладати свою адресу',
        'Спілкуватися з друзями',
        'Ображати інших в чаті',
        'Дивитися мультики'
    ];

    const container = document.getElementById('statementsContainer');
    container.innerHTML = '';

    // Перемішуємо масив для випадкового порядку
    const shuffled = [...statements].sort(() => Math.random() - 0.5);

    shuffled.forEach(text => {
        const card = document.createElement('div');
        card.className = 'drag-card';
        card.textContent = text;
        card.draggable = true;
        card.id = 'card-' + Date.now() + Math.random();

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);

        container.appendChild(card);
    });

    // Налаштовуємо зони скидання
    const dropzones = document.querySelectorAll('.dropzone');
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedCard = this;
    draggedText = this.textContent;
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', this.textContent);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (!draggedCard) return;

    const zone = this.closest('.dropzone');
    const zoneType = zone.id === 'dropzoneYes' ? 'yes' : 'no';
    const droppedContainer = zone.querySelector('.dropped-items');

    // Перевіряємо, чи картка ще не була скинута
    if (draggedCard.parentElement.classList.contains('statements')) {
        // Видаляємо оригінальну картку
        draggedCard.remove();

        // Створюємо нову картку в зоні скидання
        const newCard = document.createElement('div');
        newCard.className = 'dropped-card';
        newCard.textContent = draggedText;
        newCard.dataset.zone = zoneType;
        newCard.dataset.originalText = draggedText;

        droppedContainer.appendChild(newCard);
    }

    draggedCard = null;
}

// Перевірка Drag & Drop гри
function checkDragDropQuiz() {
    const yesZone = document.getElementById('droppedYes');
    const noZone = document.getElementById('droppedNo');

    let yesCards = yesZone.querySelectorAll('.dropped-card');
    let noCards = noZone.querySelectorAll('.dropped-card');

    let correctCount = 0;
    let totalCards = yesCards.length + noCards.length;

    // Перевіряємо правильні відповіді
    yesCards.forEach(card => {
        if (correctAnswers.yes.includes(card.textContent)) {
            card.style.background = '#4CAF50';
            correctCount++;
        } else {
            card.style.background = '#f44336';
        }
    });

    noCards.forEach(card => {
        if (correctAnswers.no.includes(card.textContent)) {
            card.style.background = '#4CAF50';
            correctCount++;
        } else {
            card.style.background = '#f44336';
        }
    });

    // Перевіряємо, чи всі картки розподілені
    const remainingCards = document.querySelectorAll('.statements .drag-card').length;

    if (remainingCards > 0) {
        showResult(document.getElementById('dragDropResult'),
            `📦 Залишилося розкласти ${remainingCards} карток!`, "warning");
        return;
    }

    const resultDiv = document.getElementById('dragDropResult');
    if (correctCount === totalCards) {
        showResult(resultDiv, "🏆 Чудово! Ти правильно розподілив всі правила! 🌟", "success");
    } else {
        showResult(resultDiv,
            `📊 Правильно: ${correctCount} з ${totalCards}. Спробуй виправити помилки! 💪`, "info");
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    initDragDrop();

    // Додаємо анімацію для кнопок
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});