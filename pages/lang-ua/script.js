// ============================================
// ВІКТОРИНА
// ============================================

const quizQuestions = [
    {
        question: '1. Хто написав "Кобзаря"?',
        options: ['Тарас Шевченко', 'Леся Українка', 'Іван Франко'],
        correct: 0
    },
    {
        question: '2. Як звали першого українського друкаря?',
        options: ['Іван Федоров', 'Петро Могила', 'Михайло Грушевський'],
        correct: 0
    },
    {
        question: '3. Як буде англійське "computer" українською?',
        options: ['Компутер', 'Комп\'ютер', 'Машина'],
        correct: 1
    }
];

let quizSelections = [];

/**
 * Рендерить питання вікторини
 */
function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    container.innerHTML = '';
    quizSelections = [];

    quizQuestions.forEach((q, idx) => {
        quizSelections.push(null);

        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach((opt, optIdx) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = opt;
            optionDiv.dataset.qidx = idx;
            optionDiv.dataset.optidx = optIdx;

            optionDiv.addEventListener('click', function() {
                // Знімаємо виділення з усіх варіантів у цьому питанні
                const parent = this.parentElement;
                parent.querySelectorAll('.quiz-option').forEach(el => {
                    el.classList.remove('selected');
                });

                // Виділяємо вибраний варіант
                this.classList.add('selected');
                quizSelections[idx] = optIdx;

                // Очищаємо попередній фідбек
                const feedback = document.getElementById('quizFeedback');
                if (feedback) feedback.textContent = '';
            });

            questionDiv.appendChild(optionDiv);
        });

        container.appendChild(questionDiv);
    });
}

/**
 * Перевіряє відповіді вікторини
 */
function checkQuiz() {
    let correct = 0;
    const feedback = document.getElementById('quizFeedback');
    if (!feedback) return;

    const questions = document.querySelectorAll('.quiz-question');

    questions.forEach((q, idx) => {
        const options = q.querySelectorAll('.quiz-option');

        options.forEach((opt, optIdx) => {
            opt.classList.remove('correct', 'incorrect');

            const isSelected = quizSelections[idx] === optIdx;
            const isCorrect = optIdx === quizQuestions[idx].correct;

            if (isSelected && isCorrect) {
                opt.classList.add('correct');
                correct++;
            } else if (isSelected && !isCorrect) {
                opt.classList.add('incorrect');
            } else if (!isSelected && isCorrect) {
                // Показуємо правильну відповідь зеленим
                opt.classList.add('correct');
            }
        });
    });

    const total = quizQuestions.length;
    const message = `✅ Правильних відповідей: ${correct} з ${total}`;
    feedback.textContent = message;
    feedback.style.color = correct === total ? '#27ae60' : '#e67e22';
}

/**
 * Скидає вікторину
 */
function resetQuiz() {
    document.querySelectorAll('.quiz-option').forEach(el => {
        el.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById('quizFeedback');
    if (feedback) feedback.textContent = '';

    quizSelections = quizQuestions.map(() => null);
}

// ============================================
// ГРА "ЗНАЙДИ ПАРУ"
// ============================================

// ============================================
// ГРА "ЗНАЙДИ ПАРУ" - ОНОВЛЕНА ВЕРСІЯ
// ============================================

const wordPairs = [
    { ukrainian: 'Літопис', old: 'Лѣтопись' },
    { ukrainian: 'Князь', old: 'Кнѧзь' },
    { ukrainian: 'Град', old: 'Градъ' },
    { ukrainian: 'Вогонь', old: 'Огнь' },
    { ukrainian: 'Мати', old: 'Мати' },
    { ukrainian: 'Сонце', old: 'Слъньце' },
    { ukrainian: 'Місяць', old: 'Мѣсѧць' },
    { ukrainian: 'Земля', old: 'Землѧ' },
    { ukrainian: 'Вітер', old: 'Вѣтръ' },
    { ukrainian: 'Душа', old: 'Доуша' },
    { ukrainian: 'Хліб', old: 'Хлѣбъ' },
    { ukrainian: 'Вода', old: 'Вода' },
    { ukrainian: 'Око', old: 'Око' },
    { ukrainian: 'Рука', old: 'Рѫка' },
    { ukrainian: 'Нога', old: 'Нога' }
];

let selectedWords = [];
let matchedPairs = new Set();
let gameWords = [];
let isGameComplete = false;

/**
 * Перемішує елементи масиву (алгоритм Фішера-Єйтса)
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Генерує слова для гри (випадкові пари)
 */
function generateGameWords() {
    // Вибираємо 6-8 випадкових пар
    const shuffledPairs = shuffleArray([...wordPairs]);
    const selectedPairs = shuffledPairs.slice(0, 8);
    
    // Створюємо масив слів для гри
    const words = [];
    selectedPairs.forEach((pair, index) => {
        words.push({
            text: pair.ukrainian,
            pairId: index,
            type: 'ukrainian'
        });
        words.push({
            text: pair.old,
            pairId: index,
            type: 'old'
        });
    });
    
    return shuffleArray(words);
}

/**
 * Рендерить гру "Знайди пару"
 */
function renderMatchGame() {
    const container = document.getElementById('matchGame');
    if (!container) return;

    // Генеруємо нові слова
    gameWords = generateGameWords();
    matchedPairs = new Set();
    selectedWords = [];
    isGameComplete = false;

    // Оновлюємо контейнер
    container.innerHTML = `
        <div class="match-grid" id="matchGrid"></div>
        <div id="matchFeedback" class="match-feedback"></div>
        <div id="matchScore" class="match-score">Знайдено пар: 0 / 8</div>
        <div class="match-buttons">
            <button id="resetMatchBtn" class="btn-clear">
                <i class="fas fa-redo-alt"></i> Нова гра
            </button>
            <button id="hintMatchBtn" class="btn-run" style="background: #3498db;">
                <i class="fas fa-lightbulb"></i> Підказка
            </button>
        </div>
    `;

    const grid = document.getElementById('matchGrid');
    if (!grid) return;

    // Додаємо слова до сітки
    gameWords.forEach((word, index) => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.dataset.index = index;
        card.dataset.pairId = word.pairId;
        card.dataset.type = word.type;
        card.innerHTML = `<span class="match-text">${word.text}</span>`;
        
        // Якщо це староукраїнське слово - додаємо стилізацію
        if (word.type === 'old') {
            card.classList.add('old-word');
        } else {
            card.classList.add('ukrainian-word');
        }

        card.addEventListener('click', function() {
            handleMatchCardClick(this);
        });

        grid.appendChild(card);
    });

    // Оновлюємо рахунок
    updateMatchScore();

    // Кнопка нової гри
    const resetBtn = document.getElementById('resetMatchBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', renderMatchGame);
    }

    // Кнопка підказки
    const hintBtn = document.getElementById('hintMatchBtn');
    if (hintBtn) {
        hintBtn.addEventListener('click', showMatchHint);
    }
}

/**
 * Обробник кліку по картці
 */
function handleMatchCardClick(card) {
    // Якщо гра завершена або картка вже знайдена
    if (isGameComplete || card.classList.contains('matched')) return;
    
    // Якщо вже вибрано 2 картки
    if (selectedWords.length === 2) return;

    // Вибираємо картку
    card.classList.add('selected');
    selectedWords.push(card);

    // Якщо вибрано 2 картки - перевіряємо
    if (selectedWords.length === 2) {
        const [card1, card2] = selectedWords;
        const pairId1 = parseInt(card1.dataset.pairId);
        const pairId2 = parseInt(card2.dataset.pairId);
        const type1 = card1.dataset.type;
        const type2 = card2.dataset.type;
        const feedback = document.getElementById('matchFeedback');

        // Перевіряємо чи це пара (одна українська + одна стара)
        if (pairId1 === pairId2 && type1 !== type2) {
            // Правильна пара
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs.add(pairId1);

            // Анімація успіху
            card1.style.animation = 'matchSuccess 0.5s ease';
            card2.style.animation = 'matchSuccess 0.5s ease';

            if (feedback) {
                feedback.textContent = '✅ Правильно! Чудова пара!';
                feedback.style.color = '#27ae60';
                feedback.style.animation = 'fadeIn 0.3s ease';
            }

            // Оновлюємо рахунок
            updateMatchScore();

            // Перевіряємо чи всі пари знайдено
            const totalPairs = 8;
            if (matchedPairs.size === totalPairs) {
                isGameComplete = true;
                setTimeout(() => {
                    if (feedback) {
                        feedback.textContent = '🎉 Вітаємо! Ти знайшов усі пари! Ти справжній знавець староукраїнської мови!';
                        feedback.style.color = '#2ecc71';
                        feedback.style.fontSize = '1.2rem';
                    }
                    // Додаємо конфетті або іншу анімацію
                    createCelebration();
                }, 300);
            }
        } else {
            // Неправильна пара
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('wrong');
            card2.classList.add('wrong');

            if (feedback) {
                feedback.textContent = '❌ Не пара. Спробуй ще раз!';
                feedback.style.color = '#e74c3c';
                feedback.style.animation = 'shake 0.5s ease';
            }

            // Знімаємо клас wrong через пів секунди
            setTimeout(() => {
                card1.classList.remove('wrong');
                card2.classList.remove('wrong');
            }, 600);
        }

        // Очищуємо вибрані картки
        setTimeout(() => {
            selectedWords = [];
        }, 300);
    }
}

/**
 * Оновлює рахунок
 */
function updateMatchScore() {
    const scoreElement = document.getElementById('matchScore');
    if (!scoreElement) return;
    const total = 8;
    const found = matchedPairs.size;
    scoreElement.textContent = `Знайдено пар: ${found} / ${total}`;
    
    // Змінюємо колір залежно від прогресу
    if (found === total) {
        scoreElement.style.color = '#2ecc71';
        scoreElement.style.fontWeight = 'bold';
    } else if (found > total * 0.5) {
        scoreElement.style.color = '#f39c12';
    } else {
        scoreElement.style.color = '#1e5f7a';
    }
}

/**
 * Показує підказку
 */
function showMatchHint() {
    const feedback = document.getElementById('matchFeedback');
    if (!feedback) return;

    // Знаходимо незнайдену пару
    const cards = document.querySelectorAll('.match-card:not(.matched)');
    if (cards.length === 0) {
        feedback.textContent = '🎉 Всі пари вже знайдено!';
        feedback.style.color = '#2ecc71';
        return;
    }

    // Вибираємо випадкову незнайдену пару
    const availablePairs = [...new Set(Array.from(cards).map(c => parseInt(c.dataset.pairId)))];
    if (availablePairs.length === 0) return;

    const randomPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
    const pairCards = Array.from(cards).filter(c => parseInt(c.dataset.pairId) === randomPair);

    // Підсвічуємо підказку
    pairCards.forEach(card => {
        card.classList.add('hint');
        setTimeout(() => {
            card.classList.remove('hint');
        }, 2000);
    });

    feedback.textContent = `💡 Підказка: зверни увагу на слова з пари ${randomPair + 1}`;
    feedback.style.color = '#3498db';
}

/**
 * Створює анімацію святкування
 */
function createCelebration() {
    const container = document.getElementById('matchGame');
    if (!container) return;

    // Додаємо конфетті
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: confettiFall ${Math.random() * 3 + 2}s ease-in forwards;
            animation-delay: ${Math.random() * 0.5}s;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);

        // Видаляємо конфетті після анімації
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

/**
 * Додаємо CSS анімації для гри
 */
function addMatchGameStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .match-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 20px;
        }

        .match-card {
            background: white;
            padding: 20px 15px;
            border-radius: 16px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid #e0e0e0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            position: relative;
        }

        .match-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .match-card .match-text {
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.3;
        }

        .match-card.ukrainian-word {
            border-color: #3498db;
        }

        .match-card.ukrainian-word .match-text {
            color: #2c3e50;
        }

        .match-card.old-word {
            border-color: #e67e22;
            background: #fef5e8;
        }

        .match-card.old-word .match-text {
            color: #8B4513;
            font-family: 'Times New Roman', serif;
            font-size: 1.1rem;
        }

        .match-card.selected {
            border-color: #ff9f4a;
            background: #ffd966;
            transform: scale(1.05);
            box-shadow: 0 4px 20px rgba(255, 159, 74, 0.3);
        }

        .match-card.matched {
            background: #d4edda;
            border-color: #28a745;
            cursor: default;
            opacity: 0.7;
            transform: scale(0.95);
            pointer-events: none;
        }

        .match-card.matched .match-text {
            color: #155724;
        }

        .match-card.matched::after {
            content: '✓';
            position: absolute;
            top: -10px;
            right: -10px;
            background: #28a745;
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .match-card.wrong {
            animation: shake 0.5s ease;
            border-color: #dc3545;
            background: #f8d7da;
        }

        .match-card.hint {
            animation: pulse 0.8s ease 3;
            border-color: #3498db;
            background: #d6eaf8;
            box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
        }

        .match-score {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
            margin: 15px 0;
            color: #1e5f7a;
            padding: 10px;
            background: #e8f4fd;
            border-radius: 16px;
        }

        .match-feedback {
            text-align: center;
            font-weight: 500;
            min-height: 50px;
            padding: 12px;
            border-radius: 16px;
            margin: 10px 0;
            font-size: 1.1rem;
        }

        .match-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-15px); }
            40% { transform: translateX(15px); }
            60% { transform: translateX(-10px); }
            80% { transform: translateX(10px); }
        }

        @keyframes matchSuccess {
            0% { transform: scale(1); }
            50% { transform: scale(1.2) rotate(5deg); }
            100% { transform: scale(0.95) rotate(0deg); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }

        /* Адаптивність */
        @media (max-width: 768px) {
            .match-grid {
                grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
                gap: 10px;
                padding: 10px;
            }

            .match-card {
                padding: 15px 10px;
                min-height: 60px;
                font-size: 0.9rem;
            }

            .match-card .match-text {
                font-size: 0.85rem;
            }

            .match-buttons {
                flex-direction: column;
                align-items: center;
            }

            .match-buttons button {
                width: 100%;
                max-width: 250px;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Ініціалізація гри
 */
function initMatchGame() {
    addMatchGameStyles();
    
    // Перевіряємо чи є контейнер для гри
    const container = document.getElementById('matchGame');
    if (!container) {
        // Якщо контейнера немає, створюємо його
        const gameSection = document.querySelector('#games');
        if (gameSection) {
            const gameDiv = document.createElement('div');
            gameDiv.id = 'matchGame';
            gameDiv.className = 'match-game';
            gameSection.appendChild(gameDiv);
        }
    }

    // Запускаємо гру
    renderMatchGame();

    // Додаємо обробник для кнопки нової гри (якщо вона існує)
    const resetBtn = document.getElementById('resetMatchBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', renderMatchGame);
    }
}

// Експортуємо функції для глобального використання
window.matchGame = {
    render: renderMatchGame,
    reset: renderMatchGame,
    hint: showMatchHint
};

// Автоматична ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    initMatchGame();
});

// ============================================
// РЕБУС З МАЛЮНКОМ
// ============================================

const rebusData = {
    currentLevel: 0,
    attempts: 0,
    hintsUsed: 0,
    levels: [
        // ========================================
        // РЕБУС 1 - Україна (з малюнком)
        // ========================================
        {
            // Використовуємо малюнок замість іконок
            image: 'img/r1.png',  // Шлях до вашого малюнка
            altText: 'Ребус: Україна',
            answer: 'україна',
            hints: [
                '💡 Слово складається з 7 букв',
                '💡 Найбільша країна Європи',
                '💡 Столиця — Київ',
                '💡 Має жовто-блакитний прапор',
                '💡 Найбільша річка - Дніпро',
                '💡 Має солов`їну мову'
            ],
            successMessage: '🎉 Правильно! Це слово — "Україна"! Слава Україні! 🇺🇦',
            // Додаткові цікаві факти після відгадки
            facts: [
                '🇺🇦 Україна — найбільша країна Європи',
                '🌾 Україна — житниця світу',
                '🏛️ Київ — одне з найстаріших міст Європи',
                '🎵 Українська мова — одна з наймилозвучніших у світі'
            ]
        },
        
        // ========================================
        // РЕБУС 2 - можна додати ще один малюнок
        // ========================================
                {
            image: 'img/r2.png',
            altText: 'Ребус: Рідна мова',
            answer: 'рідна мова',
            hints: [
                '💡 Перший малюнок — "слід"',
                '💡 на `М` `О`',
                '💡 Другий малюнок - "ваза"',
                '💡 Складається з двох слів',
                '💡 Це наша суперсила!'
            ],
            successMessage: '🎉 Правильно! Це — "Рідна мова"! Наша суперсила! 💪🇺🇦',
            facts: [
                '🇺🇦 Наша мова має спеціальні літери, яких немає в інших кириличних абетках — Ґ, Ї, Є та І',
                '📖 Слово «горити» має понад 30 синонімів (палати, палакотіти, жевріти, тліти тощо)',
                '📊 Найбільша кількість слів в українській мові починається на літеру «П», а найменш уживаною є літера «Ф»'
            ]
        },
    ]
};

/**
 * Рендерить ребус з малюнком
 */
function renderRebus() {
    const container = document.getElementById('rebusGame');
    if (!container) return;

    const level = rebusData.levels[rebusData.currentLevel];
    if (!level) {
        container.innerHTML = `
            <div class="rebus-complete">
                <h3>🏆 Вітаємо! Ти розгадав усі ребуси!</h3>
                <p>Ти справжній знавець України та української мови!</p>
                <button onclick="resetRebus()" class="btn-run">
                    <i class="fas fa-redo-alt"></i> Почати заново
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="rebus-header">
            <span class="rebus-level">Рівень ${rebusData.currentLevel + 1}/${rebusData.levels.length}</span>
            <span class="rebus-attempts">Спроби: ${rebusData.attempts}</span>
            <span class="rebus-hints">Підказки: ${rebusData.hintsUsed}</span>
        </div>

        <div class="rebus-image-container">
            <img src="${level.image}" alt="${level.altText}" class="rebus-image">
            <div class="rebus-image-label">🔍 Що зашифровано на малюнку?</div>
        </div>

        <div class="rebus-input-group">
            <input type="text" id="rebusAnswer" placeholder="Впиши відповідь..." 
                   autocomplete="off" class="rebus-input">
            <button id="checkRebusBtn" class="btn-run">
                <i class="fas fa-check"></i> Перевірити
            </button>
        </div>

        <div class="rebus-hint-area">
            <button id="showHintBtn" class="btn-hint">
                <i class="fas fa-lightbulb"></i> Підказка 
                <span class="hint-counter">(${level.hints.length - rebusData.hintsUsed} залишилось)</span>
            </button>
            <div id="hintDisplay" class="hint-display"></div>
        </div>

        <div id="rebusFeedback" class="rebus-feedback"></div>
        <div id="rebusFacts" class="rebus-facts"></div>

        <div class="rebus-buttons">
            <button id="skipRebusBtn" class="btn-clear" style="background: #95a5a6;">
                <i class="fas fa-forward"></i> Пропустити
            </button>
        </div>
    `;

    setupRebusHandlers();
}

/**
 * Налаштовує обробники подій для ребуса
 */
function setupRebusHandlers() {
    const input = document.getElementById('rebusAnswer');
    const checkBtn = document.getElementById('checkRebusBtn');
    const hintBtn = document.getElementById('showHintBtn');
    const skipBtn = document.getElementById('skipRebusBtn');
    const feedback = document.getElementById('rebusFeedback');
    const factsContainer = document.getElementById('rebusFacts');

    if (input) {
        input.focus();
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                checkRebusAnswer();
            }
        });

        input.addEventListener('input', function() {
            if (feedback) {
                feedback.textContent = '';
                feedback.className = 'rebus-feedback';
            }
            if (factsContainer) {
                factsContainer.innerHTML = '';
            }
            this.style.borderColor = '#ddd';
        });
    }

    if (checkBtn) {
        checkBtn.addEventListener('click', checkRebusAnswer);
    }

    if (hintBtn) {
        hintBtn.addEventListener('click', showRebusHint);
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            if (confirm('Точно хочеш пропустити цей ребус?')) {
                rebusData.currentLevel++;
                rebusData.attempts = 0;
                rebusData.hintsUsed = 0;
                renderRebus();
            }
        });
    }

    updateHintCounter();
}

/**
 * Перевіряє відповідь на ребус
 */
function checkRebusAnswer() {
    const input = document.getElementById('rebusAnswer');
    const feedback = document.getElementById('rebusFeedback');
    const factsContainer = document.getElementById('rebusFacts');
    
    if (!input || !feedback) return;

    const answer = input.value.trim().toLowerCase();
    const level = rebusData.levels[rebusData.currentLevel];
    
    if (!level) return;

    rebusData.attempts++;

    if (answer === '') {
        feedback.textContent = '⚠️ Будь ласка, введи відповідь!';
        feedback.className = 'rebus-feedback warning';
        input.style.borderColor = '#f39c12';
        return;
    }

    // Перевіряємо відповідь (з урахуванням різних форм)
    const possibleAnswers = [level.answer, level.answer + 'и', level.answer + 'ї', 'україни'];
    
    if (possibleAnswers.includes(answer)) {
        // Правильна відповідь
        feedback.innerHTML = `
            <div class="rebus-success">
                <span class="success-icon">🎉</span>
                <span class="success-text">${level.successMessage}</span>
            </div>
        `;
        feedback.className = 'rebus-feedback success';
        input.style.borderColor = '#27ae60';
        input.disabled = true;

        // Показуємо цікаві факти
        if (level.facts && factsContainer) {
            let factsHTML = '<div class="facts-grid">';
            level.facts.forEach(fact => {
                factsHTML += `<div class="fact-item">${fact}</div>`;
            });
            factsHTML += '</div>';
            factsContainer.innerHTML = factsHTML;
            factsContainer.style.display = 'block';
        }

        // Анімація успіху
        const imageContainer = document.querySelector('.rebus-image-container');
        if (imageContainer) {
            imageContainer.style.animation = 'rebusSuccess 0.6s ease';
            setTimeout(() => {
                imageContainer.style.animation = '';
            }, 600);
        }

        // Переходимо до наступного рівня через 3 секунди
        setTimeout(() => {
            rebusData.currentLevel++;
            rebusData.attempts = 0;
            rebusData.hintsUsed = 0;
            renderRebus();
        }, 3500);
    } else {
        // Неправильна відповідь
        const attemptsLeft = 3 - Math.floor(rebusData.attempts / 3);
        let message = '❌ Не зовсім. ';
        
        if (attemptsLeft > 0) {
            message += `Спробуй ще! (Залишилось спроб: ${attemptsLeft})`;
        } else {
            message += 'Можеш скористатися підказкою або пропустити ребус.';
        }

        feedback.textContent = message;
        feedback.className = 'rebus-feedback error';
        input.style.borderColor = '#e74c3c';
        input.classList.add('shake');
        
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);

        // Показуємо підказку після 2 невдалих спроб
        if (rebusData.attempts % 2 === 0 && rebusData.hintsUsed < level.hints.length) {
            setTimeout(() => {
                showRebusHint();
            }, 300);
        }
    }

    updateHintCounter();
}

/**
 * Показує підказку для ребуса
 */
function showRebusHint() {
    const level = rebusData.levels[rebusData.currentLevel];
    const hintDisplay = document.getElementById('hintDisplay');
    
    if (!level || !hintDisplay) return;

    const hintIndex = rebusData.hintsUsed;
    
    if (hintIndex >= level.hints.length) {
        hintDisplay.innerHTML = '⚠️ Використано всі підказки!';
        hintDisplay.className = 'hint-display warning';
        return;
    }

    const hint = level.hints[hintIndex];
    rebusData.hintsUsed++;

    hintDisplay.innerHTML = `
        <div class="hint-item">
            <span class="hint-icon">💡</span>
            <span class="hint-text">${hint}</span>
        </div>
    `;
    hintDisplay.className = 'hint-display show';
    hintDisplay.style.animation = 'fadeIn 0.3s ease';

    updateHintCounter();
}

/**
 * Оновлює лічильник підказок
 */
function updateHintCounter() {
    const level = rebusData.levels[rebusData.currentLevel];
    const counter = document.querySelector('.hint-counter');
    
    if (!level || !counter) return;

    const remaining = Math.max(0, level.hints.length - rebusData.hintsUsed);
    counter.textContent = `(${remaining} залишилось)`;

    const attemptsEl = document.querySelector('.rebus-attempts');
    if (attemptsEl) {
        attemptsEl.textContent = `Спроби: ${rebusData.attempts}`;
    }
}

/**
 * Скидає гру з ребусами
 */
function resetRebus() {
    rebusData.currentLevel = 0;
    rebusData.attempts = 0;
    rebusData.hintsUsed = 0;
    renderRebus();
}

/**
 * Додаємо CSS стилі для ребуса з малюнком
 */
function addRebusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .rebus-game {
            background: linear-gradient(135deg, #fff3e0, #ffe8cc);
            border-radius: 28px;
            padding: 30px;
            margin: 25px 0;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .rebus-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
            padding: 10px 15px;
            background: rgba(255,255,255,0.6);
            border-radius: 16px;
        }

        .rebus-level {
            font-weight: bold;
            color: #e67e22;
            font-size: 1.1rem;
        }

        .rebus-attempts {
            color: #7f8c8d;
            font-size: 0.95rem;
        }

        .rebus-hints {
            color: #3498db;
            font-size: 0.95rem;
        }

        .rebus-image-container {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }

        .rebus-image {
            max-width: 100%;
            max-height: 400px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .rebus-image-label {
            margin-top: 15px;
            font-size: 1.1rem;
            color: #2c3e50;
            font-weight: 500;
        }

        .rebus-instruction {
            text-align: center;
            font-size: 1.1rem;
            color: #2c3e50;
            margin: 15px 0;
        }

        .rebus-input-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .rebus-input {
            padding: 14px 25px;
            border-radius: 60px;
            border: 2px solid #ddd;
            font-size: 1.1rem;
            width: 80%;
            max-width: 350px;
            transition: all 0.3s ease;
            outline: none;
        }

        .rebus-input:focus {
            border-color: #ff9f4a;
            box-shadow: 0 0 0 3px rgba(255, 159, 74, 0.2);
        }

        .rebus-input.shake {
            animation: shake 0.5s ease;
        }

        .rebus-hint-area {
            margin: 20px 0;
        }

        .btn-hint {
            background: #3498db;
            color: white;
            padding: 10px 25px;
            border: none;
            border-radius: 40px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-hint:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .btn-hint:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .hint-counter {
            font-size: 0.85rem;
            opacity: 0.8;
        }

        .hint-display {
            margin-top: 15px;
            padding: 15px 20px;
            border-radius: 16px;
            min-height: 60px;
            display: none;
        }

        .hint-display.show {
            display: block;
            background: #d6eaf8;
            border-left: 4px solid #3498db;
            animation: fadeIn 0.3s ease;
        }

        .hint-display.warning {
            display: block;
            background: #fef5e8;
            border-left: 4px solid #f39c12;
            color: #e67e22;
        }

        .hint-item {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .hint-icon {
            font-size: 1.3rem;
        }

        .hint-text {
            font-size: 1.05rem;
            color: #2c3e50;
        }

        .rebus-feedback {
            margin: 15px 0;
            padding: 15px;
            border-radius: 16px;
            font-weight: 500;
            text-align: center;
            min-height: 50px;
            transition: all 0.3s ease;
        }

        .rebus-feedback.success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
        }

        .rebus-feedback.success .rebus-success {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .rebus-feedback.success .success-icon {
            font-size: 2rem;
        }

        .rebus-feedback.success .success-text {
            font-size: 1.1rem;
            color: #155724;
        }

        .rebus-feedback.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .rebus-feedback.warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffc107;
        }

        .rebus-facts {
            display: none;
            margin: 15px 0;
            padding: 20px;
            background: #e8f4fd;
            border-radius: 16px;
            border-left: 4px solid #1e5f7a;
            animation: fadeIn 0.5s ease;
        }

        .facts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
        }

        .fact-item {
            padding: 10px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            text-align: center;
            font-weight: 500;
            color: #1e5f7a;
        }

        .rebus-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        .rebus-complete {
            text-align: center;
            padding: 40px 20px;
        }

        .rebus-complete h3 {
            color: #27ae60;
            font-size: 1.8rem;
            margin-bottom: 15px;
        }

        .rebus-complete p {
            font-size: 1.1rem;
            color: #2c3e50;
            margin-bottom: 25px;
        }

        @keyframes rebusSuccess {
            0% { transform: scale(1); }
            25% { transform: scale(1.05) rotate(-2deg); }
            50% { transform: scale(1.02) rotate(2deg); }
            75% { transform: scale(1.04) rotate(-1deg); }
            100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-15px); }
            40% { transform: translateX(15px); }
            60% { transform: translateX(-10px); }
            80% { transform: translateX(10px); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .rebus-game {
                padding: 20px;
            }

            .rebus-image {
                max-height: 250px;
            }

            .rebus-input {
                width: 100%;
                max-width: 100%;
            }

            .rebus-input-group {
                flex-direction: column;
                align-items: center;
            }

            .rebus-input-group button {
                width: 100%;
                max-width: 250px;
            }

            .rebus-header {
                flex-direction: column;
                text-align: center;
            }

            .facts-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Ініціалізація ребуса
 */
function initRebus() {
    addRebusStyles();
    
    const container = document.getElementById('rebusGame');
    if (!container) {
        const rebusSection = document.querySelector('.rebus-box');
        if (rebusSection) {
            const gameDiv = document.createElement('div');
            gameDiv.id = 'rebusGame';
            gameDiv.className = 'rebus-game';
            rebusSection.innerHTML = '';
            rebusSection.appendChild(gameDiv);
        }
    }

    renderRebus();
}

// Експортуємо функції
window.rebusGame = {
    render: renderRebus,
    reset: resetRebus,
    check: checkRebusAnswer,
    hint: showRebusHint
};

// Додаємо функцію для додавання нових ребусів
window.addRebusWithImage = function(imagePath, answer, hints, successMessage, facts) {
    rebusData.levels.push({
        image: imagePath,
        altText: 'Ребус',
        answer: answer.toLowerCase(),
        hints: hints,
        successMessage: successMessage || '🎉 Правильно!',
        facts: facts || []
    });
    if (document.getElementById('rebusGame')) {
        renderRebus();
    }
};

// Автоматична ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    initRebus();
});

// ============================================
// ГРА "МОВОЗНАВЧИЙ КВІЗ" 
// ============================================

const quizWords = [
    {
        word: 'окрайок',
        correct: 'Маленький шматок хліба з краю',
        options: [
            'Маленький шматок хліба з краю',
            'Старовинна монета',
            'Назва жіночої прикраси'
        ]
    },
    {
        word: 'кочергá',
        correct: 'Металева палка для печі',
        options: [
            'Металева палка для печі',
            'Старовинна одиниця довжини',
            'Невеликий човен'
        ]
    },
    {
        word: 'молодиця',
        correct: 'Молода заміжня жінка',
        options: [
            'Молода заміжня жінка',
            'Дівчина, що ворожить',
            'Хатня робітниця'
        ]
    },
    {
        word: 'божниця',
        correct: 'Домашній куточок з іконами',
        options: [
            'Домашній куточок з іконами',
            'Храм язичницький',
            'Місце для обрядів'
        ]
    },
    {
        word: 'вежа',
        correct: 'Оборонна споруда',
        options: [
            'Оборонна споруда',
            'Стара міра ваги',
            'Слово, що означає «пильність»'
        ]
    },
    {
        word: 'торок',
        correct: 'Шкіряна прикраса до пояса',
        options: [
            'Шкіряна прикраса до пояса',
            'Дерев’яна миска',
            'Низький табурет'
        ]
    }
];

let quizAnswers = {};

/**
 * Рендерить гру "Мовознавчий квіз"
 */
function renderModernQuiz() {
    const container = document.getElementById('modernQuizGame');
    if (!container) return;

    quizAnswers = {};

    let html = `
        <div class="quiz-modern-grid">
            <div class="quiz-modern-header">
                <div class="quiz-modern-progress">
                    <i class="fas fa-tasks"></i>
                    Відповідей: <span id="quizProgress">0</span> / ${quizWords.length}
                </div>
                <div class="quiz-modern-status" id="quizStatus">
                    <i class="fas fa-hourglass-half"></i> Очікуємо відповіді...
                </div>
                <div class="quiz-modern-timer" id="quizTimer">
                    <i class="fas fa-clock"></i> <span id="timerDisplay">00:00</span>
                </div>
            </div>
    `;

    quizWords.forEach((item, index) => {
        const wordId = `quiz_${index}`;
        html += `
            <div class="quiz-modern-item" id="${wordId}">
                <div class="quiz-modern-word">
                    <span class="quiz-modern-number">${String(index + 1).padStart(2, '0')}.</span>
                    <strong>${item.word}</strong>
                    <span class="quiz-modern-hint" onclick="showQuizHint(${index})">
                        <i class="fas fa-lightbulb"></i>
                        <span class="hint-tooltip">Підказка</span>
                    </span>
                    <span class="quiz-modern-status-icon" id="statusIcon_${index}"></span>
                </div>
                <div class="quiz-modern-select-wrapper">
                    <select class="quiz-modern-select" data-index="${index}" data-correct="${item.correct}">
                        <option value="">— Оберіть значення —</option>
                        ${item.options.map(opt => `
                            <option value="${opt}">${opt}</option>
                        `).join('')}
                    </select>
                    <span class="quiz-modern-arrow">▼</span>
                </div>
                <div class="quiz-modern-feedback" id="quizFeedback_${index}"></div>
            </div>
        `;
    });

    html += `
            <div class="quiz-modern-actions">
                <button onclick="checkQuizAnswers()" class="btn-run">
                    <i class="fas fa-check-circle"></i> Перевірити відповіді
                </button>
                <button onclick="resetQuizGame()" class="btn-clear">
                    <i class="fas fa-redo-alt"></i> Почати заново
                </button>
                <button onclick="showAllHints()" class="btn-hint-quiz" style="background: #3498db;">
                    <i class="fas fa-lightbulb"></i> Всі підказки
                </button>
            </div>
            <div id="quizResult" class="quiz-modern-result"></div>
        </div>
    `;

    container.innerHTML = html;

    // Додаємо обробники подій для випадаючих списків
    document.querySelectorAll('.quiz-modern-select').forEach(select => {
        select.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const feedback = document.getElementById(`quizFeedback_${index}`);
            if (feedback) {
                feedback.textContent = '';
                feedback.className = 'quiz-modern-feedback';
            }
            updateQuizProgress();
        });
    });

    updateQuizProgress();
    startTimer();
}

/**
 * Оновлює прогрес квізу
 */
function updateQuizProgress() {
    const selects = document.querySelectorAll('.quiz-modern-select');
    let answered = 0;
    selects.forEach(select => {
        if (select.value !== '') {
            answered++;
        }
    });

    const progress = document.getElementById('quizProgress');
    if (progress) {
        progress.textContent = answered;
    }

    const status = document.getElementById('quizStatus');
    if (status) {
        if (answered === 0) {
            status.innerHTML = '<i class="fas fa-hourglass-half"></i> Очікуємо відповіді...';
            status.className = 'quiz-modern-status';
        } else if (answered < quizWords.length) {
            status.innerHTML = `<i class="fas fa-pen"></i> Відповідей: ${answered} / ${quizWords.length}`;
            status.className = 'quiz-modern-status';
        } else {
            status.innerHTML = '<i class="fas fa-check-circle" style="color: #27ae60;"></i> Усі відповіді вибрані! Натисни "Перевірити"';
            status.className = 'quiz-modern-status complete';
        }
    }
}

/**
 * Таймер
 */
let timerInterval;
let seconds = 0;

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = `${mins}:${secs}`;
        }
    }, 1000);
}

/**
 * Показує підказку для слова
 */
function showQuizHint(index) {
    const item = quizWords[index];
    const feedback = document.getElementById(`quizFeedback_${index}`);
    if (!feedback) return;

    feedback.innerHTML = `
        <div class="quiz-modern-hint-box">
            <i class="fas fa-lightbulb" style="color: #f39c12;"></i>
            <span>Підказка: правильна відповідь — <strong>"${item.correct}"</strong></span>
        </div>
    `;
    feedback.className = 'quiz-modern-feedback hint';
}

/**
 * Показує всі підказки
 */
function showAllHints() {
    quizWords.forEach((item, index) => {
        showQuizHint(index);
    });
}

/**
 * Перевіряє всі відповіді
 */
function checkQuizAnswers() {
    clearInterval(timerInterval);
    
    const selects = document.querySelectorAll('.quiz-modern-select');
    let correct = 0;
    let total = selects.length;
    let allAnswered = true;

    selects.forEach(select => {
        const index = parseInt(select.dataset.index);
        const selected = select.value;
        const correctAnswer = select.dataset.correct;
        const feedback = document.getElementById(`quizFeedback_${index}`);
        const statusIcon = document.getElementById(`statusIcon_${index}`);

        if (!feedback) return;

        if (selected === '') {
            allAnswered = false;
            feedback.innerHTML = '⚠️ Будь ласка, обери значення!';
            feedback.className = 'quiz-modern-feedback warning';
            return;
        }

        if (selected === correctAnswer) {
            correct++;
            feedback.innerHTML = '✅ Правильно! Молодець! 🎉';
            feedback.className = 'quiz-modern-feedback correct';
            select.style.borderColor = '#27ae60';
            select.style.background = '#f0fff4';
            if (statusIcon) {
                statusIcon.innerHTML = '✅';
                statusIcon.style.color = '#27ae60';
            }
        } else {
            feedback.innerHTML = `
                ❌ Неправильно. Правильна відповідь: 
                <strong>"${correctAnswer}"</strong>
            `;
            feedback.className = 'quiz-modern-feedback incorrect';
            select.style.borderColor = '#dc3545';
            select.style.background = '#fff5f5';
            if (statusIcon) {
                statusIcon.innerHTML = '❌';
                statusIcon.style.color = '#dc3545';
            }
        }
    });

    // Показуємо загальний результат
    const resultDiv = document.getElementById('quizResult');
    if (resultDiv) {
        if (!allAnswered) {
            resultDiv.innerHTML = `
                <div class="quiz-modern-result-warning">
                    ⚠️ Дайте відповідь на всі питання перед перевіркою!
                </div>
            `;
            resultDiv.className = 'quiz-modern-result warning';
            return;
        }

        const timeElapsed = document.getElementById('timerDisplay');
        const timeText = timeElapsed ? timeElapsed.textContent : '00:00';
        
        if (correct === total) {
            resultDiv.innerHTML = `
                <div class="quiz-modern-result-perfect">
                    <div class="result-icon">🏆</div>
                    <div class="result-text">
                        <h3>Ідеально! 100% правильних відповідей!</h3>
                        <p>Ти справжній знавець староукраїнської мови! 📚</p>
                        <p class="result-time">⏱️ Час: ${timeText}</p>
                    </div>
                </div>
            `;
            resultDiv.className = 'quiz-modern-result perfect';
            createQuizCelebration();
        } else if (correct >= total * 0.7) {
            resultDiv.innerHTML = `
                <div class="quiz-modern-result-good">
                    <div class="result-icon">🌟</div>
                    <div class="result-text">
                        <h3>Дуже добре! ${correct} з ${total} правильних!</h3>
                        <p>Ти добре знаєш староукраїнські слова! Так тримати! 💪</p>
                        <p class="result-time">⏱️ Час: ${timeText}</p>
                    </div>
                </div>
            `;
            resultDiv.className = 'quiz-modern-result good';
        } else {
            resultDiv.innerHTML = `
                <div class="quiz-modern-result-ok">
                    <div class="result-icon">📖</div>
                    <div class="result-text">
                        <h3>${correct} з ${total} правильних</h3>
                        <p>Не здавайся! Спробуй ще раз — у тебе все вийде! 🌟</p>
                        <p class="result-time">⏱️ Час: ${timeText}</p>
                    </div>
                </div>
            `;
            resultDiv.className = 'quiz-modern-result ok';
        }
    }

    // Блокуємо подальші зміни
    selects.forEach(select => {
        select.disabled = true;
    });
}

/**
 * Скидає гру
 */
function resetQuizGame() {
    clearInterval(timerInterval);
    renderModernQuiz();
}

/**
 * Створює святкування
 */
function createQuizCelebration() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#ff6b6b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const size = Math.random() * 10 + 4;
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size * 0.6}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: 2px;
            animation: confettiFall ${Math.random() * 3 + 2}s ease-in forwards;
            animation-delay: ${Math.random() * 0.5}s;
            pointer-events: none;
            z-index: 9999;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

/**
 * Додаємо CSS стилі
 */
function addModernQuizStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modern-quiz-game {
            background: white;
            border-radius: 24px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .quiz-modern-grid {
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .quiz-modern-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            padding: 14px 20px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 16px;
            margin-bottom: 10px;
        }

        .quiz-modern-progress {
            font-size: 1.05rem;
            font-weight: 600;
            color: #1e5f7a;
        }

        .quiz-modern-progress i {
            color: #8e44ad;
        }

        .quiz-modern-progress #quizProgress {
            color: #e67e22;
            font-size: 1.2rem;
        }

        .quiz-modern-status {
            font-size: 0.95rem;
            color: #7f8c8d;
            padding: 4px 16px;
            background: white;
            border-radius: 30px;
        }

        .quiz-modern-status.complete {
            color: #27ae60;
            background: #f0fff4;
        }

        .quiz-modern-timer {
            font-size: 0.95rem;
            color: #7f8c8d;
            padding: 4px 16px;
            background: white;
            border-radius: 30px;
            font-weight: 500;
        }

        .quiz-modern-timer i {
            color: #e74c3c;
        }

        .quiz-modern-item {
            background: #fafbfc;
            border-radius: 16px;
            padding: 16px 20px;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
        }

        .quiz-modern-item:hover {
            border-color: #d4a0d4;
            box-shadow: 0 2px 12px rgba(142, 68, 173, 0.08);
        }

        .quiz-modern-word {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .quiz-modern-number {
            color: #bdc3c7;
            font-weight: 600;
            min-width: 35px;
            font-size: 0.9rem;
        }

        .quiz-modern-word strong {
            color: #1a5276;
            font-size: 1.2rem;
        }

        .quiz-modern-hint {
            cursor: pointer;
            color: #f39c12;
            transition: all 0.3s ease;
            margin-left: auto;
            font-size: 1.1rem;
            position: relative;
        }

        .quiz-modern-hint:hover {
            transform: scale(1.2);
            color: #e67e22;
        }

        .quiz-modern-hint .hint-tooltip {
            display: none;
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #2c3e50;
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            white-space: nowrap;
        }

        .quiz-modern-hint:hover .hint-tooltip {
            display: block;
        }

        .quiz-modern-status-icon {
            font-size: 1.2rem;
            margin-left: 8px;
            min-width: 25px;
        }

        .quiz-modern-select-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }

        .quiz-modern-select {
            width: 100%;
            padding: 10px 16px;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            font-size: 0.95rem;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            appearance: none;
            -webkit-appearance: none;
            color: #2c3e50;
        }

        .quiz-modern-select:hover {
            border-color: #bdc3c7;
        }

        .quiz-modern-select:focus {
            outline: none;
            border-color: #8e44ad;
            box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.15);
        }

        .quiz-modern-select:disabled {
            opacity: 0.8;
            cursor: not-allowed;
        }

        .quiz-modern-arrow {
            position: absolute;
            right: 14px;
            color: #95a5a6;
            font-size: 0.7rem;
            pointer-events: none;
        }

        .quiz-modern-feedback {
            margin-top: 8px;
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 0.9rem;
            display: none;
        }

        .quiz-modern-feedback.correct {
            display: block;
            background: #f0fff4;
            color: #155724;
            border-left: 4px solid #27ae60;
        }

        .quiz-modern-feedback.incorrect {
            display: block;
            background: #fff5f5;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }

        .quiz-modern-feedback.warning {
            display: block;
            background: #fff8e1;
            color: #856404;
            border-left: 4px solid #ffc107;
        }

        .quiz-modern-feedback.hint {
            display: block;
            background: #e8f4fd;
            color: #1a5276;
            border-left: 4px solid #3498db;
        }

        .quiz-modern-hint-box {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quiz-modern-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 10px;
            padding-top: 20px;
            border-top: 2px solid #f1f3f5;
        }

        .btn-hint-quiz {
            background: #3498db;
            border: none;
            color: white;
            padding: 10px 24px;
            border-radius: 40px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .btn-hint-quiz:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .quiz-modern-result {
            margin-top: 15px;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            display: none;
        }

        .quiz-modern-result.perfect {
            display: block;
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            border: 2px solid #28a745;
        }

        .quiz-modern-result.good {
            display: block;
            background: linear-gradient(135deg, #fff3cd, #ffeaa7);
            border: 2px solid #ffc107;
        }

        .quiz-modern-result.ok {
            display: block;
            background: linear-gradient(135deg, #d6eaf8, #aed6f1);
            border: 2px solid #3498db;
        }

        .quiz-modern-result.warning {
            display: block;
            background: #f8d7da;
            border: 2px solid #dc3545;
        }

        .quiz-modern-result-perfect,
        .quiz-modern-result-good,
        .quiz-modern-result-ok,
        .quiz-modern-result-warning {
            display: flex;
            align-items: center;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .result-icon {
            font-size: 3rem;
        }

        .result-text h3 {
            margin: 0 0 5px 0;
            font-size: 1.3rem;
        }

        .result-text p {
            margin: 3px 0;
            font-size: 1rem;
        }

        .result-time {
            color: #7f8c8d;
            font-size: 0.9rem !important;
        }

        @media (max-width: 768px) {
            .modern-quiz-game {
                padding: 18px;
            }

            .quiz-modern-item {
                padding: 12px 14px;
            }

            .quiz-modern-header {
                flex-direction: column;
                text-align: center;
                padding: 12px 16px;
                gap: 8px;
            }

            .quiz-modern-word {
                font-size: 0.95rem;
                flex-wrap: wrap;
            }

            .quiz-modern-word strong {
                font-size: 1.05rem;
            }

            .quiz-modern-select {
                padding: 8px 12px;
                font-size: 0.9rem;
            }

            .quiz-modern-actions {
                flex-direction: column;
                align-items: center;
            }

            .quiz-modern-actions button {
                width: 100%;
                max-width: 250px;
            }

            .quiz-modern-result-perfect,
            .quiz-modern-result-good,
            .quiz-modern-result-ok,
            .quiz-modern-result-warning {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }

            .result-icon {
                font-size: 2.5rem;
            }
        }

        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Ініціалізація
 */
function initModernQuiz() {
    addModernQuizStyles();
    renderModernQuiz();
}

// Автоматична ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    initModernQuiz();
});


// ============================================
// КОНТРОЛЬНІ ПИТАННЯ (додаткові)
// ============================================

const controlQuestions = [
    {
        question: 'Який тег використовується для найголовнішого заголовка?',
        options: ['&lt;h1&gt;', '&lt;h2&gt;', '&lt;h6&gt;'],
        correct: 0
    },
    {
        question: 'Який тег робить текст жирним і семантично важливим?',
        options: ['&lt;b&gt;', '&lt;strong&gt;', '&lt;em&gt;'],
        correct: 1
    },
    {
        question: 'Скільки рівнів заголовків існує в HTML?',
        options: ['4', '5', '6'],
        correct: 2
    }
];

let controlSelections = [];

/**
 * Рендерить контрольну вікторину
 */
function renderControlQuiz() {
    const container = document.getElementById('quizControlContainer');
    if (!container) return;

    container.innerHTML = '';
    controlSelections = [];

    controlQuestions.forEach((q, idx) => {
        controlSelections.push(null);

        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach((opt, optIdx) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.innerHTML = opt;
            optionDiv.dataset.qidx = idx;
            optionDiv.dataset.optidx = optIdx;

            optionDiv.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.querySelectorAll('.quiz-option').forEach(el => {
                    el.classList.remove('selected');
                });

                this.classList.add('selected');
                controlSelections[idx] = optIdx;

                const feedback = document.getElementById('quizControlFeedback');
                if (feedback) feedback.textContent = '';
            });

            questionDiv.appendChild(optionDiv);
        });

        container.appendChild(questionDiv);
    });
}

/**
 * Перевіряє контрольну вікторину
 */
function checkControlQuiz() {
    let correct = 0;
    const feedback = document.getElementById('quizControlFeedback');
    if (!feedback) return;

    const questions = document.querySelectorAll('#quizControlContainer .quiz-question');

    questions.forEach((q, idx) => {
        const options = q.querySelectorAll('.quiz-option');

        options.forEach((opt, optIdx) => {
            opt.classList.remove('correct', 'incorrect');

            const isSelected = controlSelections[idx] === optIdx;
            const isCorrect = optIdx === controlQuestions[idx].correct;

            if (isSelected && isCorrect) {
                opt.classList.add('correct');
                correct++;
            } else if (isSelected && !isCorrect) {
                opt.classList.add('incorrect');
            } else if (!isSelected && isCorrect) {
                opt.classList.add('correct');
            }
        });
    });

    const total = controlQuestions.length;
    const message = `✅ Правильних відповідей: ${correct} з ${total}`;
    feedback.textContent = message;
    feedback.style.color = correct === total ? '#27ae60' : '#e67e22';
}

/**
 * Скидає контрольну вікторину
 */
function resetControlQuiz() {
    const container = document.getElementById('quizControlContainer');
    if (!container) return;

    container.querySelectorAll('.quiz-option').forEach(el => {
        el.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById('quizControlFeedback');
    if (feedback) feedback.textContent = '';

    controlSelections = controlQuestions.map(() => null);
}

// ============================================
// ЧЕКЛІСТ ЗАВДАНЬ
// ============================================

/**
 * Ініціалізація чекліста
 */
function initChecklist() {
    const items = document.querySelectorAll('#challengeChecklist li');
    if (!items.length) return;

    // Завантажуємо збережений стан
    items.forEach((item, index) => {
        const saved = localStorage.getItem(`checklist_${index}`);
        if (saved === 'true') {
            item.classList.add('completed');
            item.dataset.done = 'true';
        }

        item.addEventListener('click', function() {
            const isDone = this.dataset.done === 'true';
            this.dataset.done = isDone ? 'false' : 'true';
            this.classList.toggle('completed');

            // Зберігаємо стан
            const itemsList = document.querySelectorAll('#challengeChecklist li');
            itemsList.forEach((el, idx) => {
                localStorage.setItem(`checklist_${idx}`, el.dataset.done === 'true');
            });
        });
    });

    // Кнопка скидання
    const resetBtn = document.getElementById('resetChecklistBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const itemsList = document.querySelectorAll('#challengeChecklist li');
            itemsList.forEach((el, idx) => {
                el.dataset.done = 'false';
                el.classList.remove('completed');
                localStorage.setItem(`checklist_${idx}`, 'false');
            });
        });
    }
}

// ============================================
// ВИПАДКОВІ ФАКТИ
// ============================================

const randomFacts = [
    '📚 Українська мова посідає 7-ме місце у світі за милозвучністю!',
    '📖 Словник української мови налічує близько 256 000 слів!',
    '🌍 Українська є однією з найдавніших слов\'янських мов.',
    '🗣️ В українській мові є багато діалектів: гуцульський, лемківський, поліський та інші.',
    '📜 Найдавніша відома пам\'ятка української мови — "Слово о полку Ігоревім" (XII ст.)',
    '🇺🇦 Українська мова є другою за поширеністю серед слов\'янських мов (після російської).',
    '🖋️ Найдовше слово в українській мові — "дихлордифенілтрихлорметилметан" (31 літера)',
    '🎵 Українська мова вважається однією з наймелодійніших мов світу.'
];

let factIndex = 0;

/**
 * Показує випадковий факт
 */
function showRandomFact() {
    const display = document.getElementById('randomFactDisplay');
    if (!display) return;

    // Показуємо наступний факт
    const fact = randomFacts[factIndex % randomFacts.length];
    display.textContent = fact;
    factIndex++;

    // Додаємо анімацію
    display.style.transition = 'all 0.3s ease';
    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 300);
}

// ============================================
// СТАРА ВІКТОРИНА (для сумісності)
// ============================================

/**
 * Стара функція checkAnswer для сумісності
 */
window.checkAnswer = function(element, isCorrect) {
    if (!element) return;

    if (isCorrect) {
        element.classList.add('correct');
        element.style.borderColor = '#28a745';
        // Показуємо повідомлення
        const feedback = element.closest('.quiz-question');
        if (feedback) {
            let msg = feedback.querySelector('.quiz-feedback-message');
            if (!msg) {
                msg = document.createElement('div');
                msg.className = 'quiz-feedback-message';
                msg.style.marginTop = '10px';
                msg.style.fontWeight = 'bold';
                msg.style.color = '#27ae60';
                feedback.appendChild(msg);
            }
            msg.textContent = '✅ Правильно!';
        }
    } else {
        element.classList.add('incorrect');
        element.style.borderColor = '#dc3545';
        // Показуємо повідомлення
        const feedback = element.closest('.quiz-question');
        if (feedback) {
            let msg = feedback.querySelector('.quiz-feedback-message');
            if (!msg) {
                msg = document.createElement('div');
                msg.className = 'quiz-feedback-message';
                msg.style.marginTop = '10px';
                msg.style.fontWeight = 'bold';
                msg.style.color = '#dc3545';
                feedback.appendChild(msg);
            }
            msg.textContent = '❌ Неправильно. Спробуй інший варіант!';
        }
    }

    // Блокуємо подальші кліки
    const siblings = element.parentElement.querySelectorAll('.quiz-option');
    siblings.forEach(s => {
        s.style.pointerEvents = 'none';
    });
};

// ============================================
// ІНІЦІАЛІЗАЦІЯ
// ============================================

/**
 * Ініціалізує всі модулі при завантаженні сторінки
 */
document.addEventListener('DOMContentLoaded', function() {
    // Вікторина
    renderQuiz();

    const checkQuizBtn = document.getElementById('checkQuizBtn');
    if (checkQuizBtn) {
        checkQuizBtn.addEventListener('click', checkQuiz);
    }

    const resetQuizBtn = document.getElementById('resetQuizBtn');
    if (resetQuizBtn) {
        resetQuizBtn.addEventListener('click', resetQuiz);
    }

    // Гра "Знайди пару"
    initMatchGame();

    // Ребус
    const checkRebusBtn = document.getElementById('checkRebusBtn');
    if (checkRebusBtn) {
        checkRebusBtn.addEventListener('click', checkRebus);
    }

    const rebusInput = document.getElementById('rebusAnswer');
    if (rebusInput) {
        rebusInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                checkRebus();
            }
        });
        rebusInput.addEventListener('focus', function() {
            this.style.borderColor = '#ddd';
            const feedback = document.getElementById('rebusFeedback');
            if (feedback) feedback.textContent = '';
        });
    }

    // Контрольна вікторина
    renderControlQuiz();

    const checkControlBtn = document.getElementById('checkControlQuizBtn');
    if (checkControlBtn) {
        checkControlBtn.addEventListener('click', checkControlQuiz);
    }

    const resetControlBtn = document.getElementById('resetControlQuizBtn');
    if (resetControlBtn) {
        resetControlBtn.addEventListener('click', resetControlQuiz);
    }

    // Чекліст
    initChecklist();

    // Випадкові факти
    const factBtn = document.getElementById('randomFactBtn');
    if (factBtn) {
        factBtn.addEventListener('click', showRandomFact);
        // Показуємо перший факт при завантаженні
        setTimeout(showRandomFact, 1000);
    }

    // ===== ПРИХОВАНЕ РІШЕННЯ =====
    const showSolutionBtn = document.getElementById('showSolutionBtn');
    if (showSolutionBtn) {
        showSolutionBtn.addEventListener('click', function() {
            const content = document.getElementById('solutionContent');
            if (content) {
                content.classList.toggle('show');
                this.textContent = content.classList.contains('show') ?
                    '🙈 Приховати приклад' :
                    '👁️ Показати приклад';
            }
        });
    }

    // ===== ЖИВИЙ РЕДАКТОР КОДУ =====
    const htmlCodeEditor = document.getElementById('htmlCodeEditor');
    const previewFrame = document.getElementById('previewFrame');
    const runCodeBtn = document.getElementById('runCodeBtn');
    const clearCodeBtn = document.getElementById('clearCodeBtn');
    const loadExampleBtn = document.getElementById('loadExampleBtn');

    if (htmlCodeEditor && previewFrame) {
        // Функція для оновлення прев'ю
        function updatePreview(code) {
            const preview = previewFrame;
            if (preview) {
                const doc = preview.contentDocument || preview.contentWindow.document;
                doc.open();
                doc.write(code);
                doc.close();
            }
        }

        // Запуск коду
        if (runCodeBtn) {
            runCodeBtn.addEventListener('click', function() {
                const code = htmlCodeEditor.value || '<h1>👋 Привіт!</h1><p>Напиши свій HTML код у редакторі ліворуч.</p>';
                updatePreview(code);
            });
        }

        // Очищення
        if (clearCodeBtn) {
            clearCodeBtn.addEventListener('click', function() {
                htmlCodeEditor.value = '';
                updatePreview('<p style="color: #999; text-align: center; padding: 50px;">🧹 Код очищено. Напиши щось нове!</p>');
            });
        }

        // Завантажити приклад
        if (loadExampleBtn) {
            loadExampleBtn.addEventListener('click', function() {
                const example = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моя улюблена тварина - Панда</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #f0f8ff; }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        h3 { color: #7f8c8d; }
        strong { color: #e74c3c; }
        em { color: #2980b9; }
        ul { background: white; padding: 20px; border-radius: 10px; }
        li { margin: 10px 0; }
    </style>
</head>
<body>
    <h1>🐼 Велика панда</h1>

    <h2>Опис</h2>
    <p>Велика панда - це <strong>рідкісна тварина</strong>, яка мешкає в гірських регіонах Китаю. Вона відома своїм <em>чорно-білим забарвленням</em> та любов'ю до бамбука.</p>

    <h2>Цікаві факти</h2>
    <ul>
        <li>Панди їдять <strong>до 14 годин на день</strong></li>
        <li>Новонароджені панди <em>важать лише 100 грамів</em></li>
        <li>У панд <strong>6 пальців</strong> на передніх лапах</li>
    </ul>

    <h3>Харчування</h3>
    <p>Панди харчуються переважно <strong>бамбуком</strong> - до <em>38 кг на день</em>!</p>
</body>
</html>`;
                htmlCodeEditor.value = example;
                updatePreview(example);
            });
        }

        // Автоматичний запуск при завантаженні
        setTimeout(() => {
            if (loadExampleBtn) {
                loadExampleBtn.click();
            }
        }, 500);
    }

    console.log('🚀 Сторінка "Мова — наша суперсила!" завантажена успішно!');
});