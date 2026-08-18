// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    randomFactBtn: document.querySelector('#randomFactBtn'),
    factDisplay: document.querySelector('#randomFactDisplay'),
    resetDragBtn: document.querySelector('#resetDragBtn'),
    dragItems: document.querySelectorAll('.drag-item'),
    dropZones: document.querySelectorAll('.drop-zone'),
    dragScore: document.querySelector('#dragScore'),
    dragFeedback: document.querySelector('#dragFeedback'),
};

// ==================== ФАКТИ ПРО БЕЗПЕКУ ====================
const SAFETY_FACTS = [
    "🔒 87% підлітків отримували підозрілі повідомлення від незнайомців в інтернеті.",
    "🛡️ За даними кіберполіції, кожен п'ятий підліток потрапляв у небезпечну ситуацію через соцмережі.",
    "💡 Найчастіше вербувальники використовують Instagram, TikTok та Discord.",
    "👨‍👩‍👦 Діти, які розповідають батькам про свої справи в інтернеті, у 3 рази рідше потрапляють у небезпечні ситуації.",
    "📱 70% підлітків не знають, як заблокувати незнайомця в соцмережах.",
    "🔑 Шахраї часто створюють фейкові сторінки популярних блогерів, щоб обманювати дітей.",
    "📞 Гаряча лінія з кібербезпеки отримує понад 1000 звернень від дітей щомісяця.",
    "💪 Знати правила безпеки в інтернеті — це так само важливо, як знати правила дорожнього руху!"
];

// ==================== ПИТАННЯ ДЛЯ ВІКТОРИНИ ====================
const SAFETY_QUIZ = [
    {
        text: "Що робити, якщо незнайомець у соцмережі пропонує тобі легкий заробіток?",
        options: ["Погодитися, бо це шанс заробити", "Повідомити батькам або вчителю", "Запитати у друзів, чи варто", "Надіслати свої дані для перевірки"],
        correct: 1
    },
    {
        text: "Який з цих кроків є найбезпечнішим при спілкуванні з незнайомцями?",
        options: [
            "Розповісти свою адресу, щоб стати друзями",
            "Нікому не передавати особисту інформацію",
            "Погодитися на таємну зустріч",
            "Переслати повідомлення іншим друзям"
        ],
        correct: 1
    },
    {
        text: "Що робити, якщо друг в інтернеті починає вимагати особисті фото або гроші?",
        options: [
            "Надіслати, бо це друг",
            "Поговорити з батьками та заблокувати його",
            "Погрожувати йому у відповідь",
            "Ігнорувати і сподіватися, що все минеться"
        ],
        correct: 1
    },
    {
        text: "Який із цих випадків є ознакою вербування?",
        options: [
            "Друг просить допомогти з домашнім завданням",
            "Незнайомець пропонує секретне завдання за гроші",
            "Вчитель просить прийти на додаткове заняття",
            "Батьки просять винести сміття"
        ],
        correct: 1
    },
    {
        text: "Що потрібно зробити, якщо виявив фейковий акаунт, який видає себе за твого друга?",
        options: [
            "Написати йому і запитати, хто він",
            "Заблокувати та повідомити справжнього друга",
            "Додати його в друзі, бо це весело",
            "Розповісти всім у школі"
        ],
        correct: 1
    }
];

// ==================== ГРА "БЕЗПЕЧНО ЧИ НЕБЕЗПЕЧНО" ====================
class SafetyDragGame {
    static correctCount = 0;
    static totalItems = 0;
    static placedItems = new Map();
    static isComplete = false;

    static init() {
        this.totalItems = DOM.dragItems.length;
        this.correctCount = 0;
        this.placedItems.clear();
        this.isComplete = false;

        DOM.dragItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.dragStart(e, item));
            item.addEventListener('dragend', (e) => this.dragEnd(e, item));
        });

        DOM.dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.dragOver(e));
            zone.addEventListener('dragenter', (e) => this.dragEnter(e));
            zone.addEventListener('dragleave', (e) => this.dragLeave(e));
            zone.addEventListener('drop', (e) => this.drop(e, zone));
        });

        DOM.resetDragBtn?.addEventListener('click', () => this.reset());
        this.updateScore();
        this.hideFeedback();
    }

    static dragStart(e, item) {
        if (item.classList.contains('placed')) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: item.dataset.id,
            situation: item.dataset.situation,
            text: item.textContent.trim()
        }));
        item.classList.add('dragging');
    }

    static dragEnd(e, item) {
        item.classList.remove('dragging');
    }

    static dragOver(e) {
        e.preventDefault();
    }

    static dragEnter(e) {
        e.preventDefault();
        e.target.closest('.drop-zone')?.classList.add('drag-over');
    }

    static dragLeave(e) {
        e.target.closest('.drop-zone')?.classList.remove('drag-over');
    }

    static drop(e, zone) {
        e.preventDefault();
        zone.classList.remove('drag-over');

        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const item = document.querySelector(`.drag-item[data-id="${data.id}"]`);
            if (!item || item.classList.contains('placed')) return;

            const expected = zone.dataset.expected;
            const isCorrect = data.situation === expected;

            // Створюємо елемент у зоні
            const dropped = document.createElement('div');
            dropped.className = 'dropped-item' + (isCorrect ? '' : ' wrong-item');
            dropped.textContent = data.text;
            zone.querySelector('.drop-placeholder').style.display = 'none';
            zone.appendChild(dropped);

            // Позначаємо елемент як розміщений
            item.classList.add('placed');
            this.placedItems.set(data.id, { correct: isCorrect });

            if (isCorrect) {
                this.correctCount++;
                zone.classList.add('correct');
            } else {
                zone.classList.add('wrong');
            }

            this.updateScore();
            this.checkComplete();

        } catch (err) {
            console.log('Помилка перетягування');
        }
    }

    static updateScore() {
        if (DOM.dragScore) {
            DOM.dragScore.textContent = `Правильно: ${this.correctCount} / ${this.totalItems}`;
        }
    }

    static checkComplete() {
        if (this.placedItems.size === this.totalItems) {
            this.isComplete = true;
            const feedback = DOM.dragFeedback;
            if (feedback) {
                if (this.correctCount === this.totalItems) {
                    feedback.textContent = '🎉 Вітаю! Ти правильно розподілив усі ситуації! Ти справжній експерт з безпеки!';
                    feedback.className = 'drag-feedback complete';
                    feedback.style.display = 'block';
                } else {
                    const wrong = this.totalItems - this.correctCount;
                    feedback.textContent = `⚠️ Є ${wrong} помилок. Спробуй ще раз, уважно подумай!`;
                    feedback.className = 'drag-feedback error';
                    feedback.style.display = 'block';
                }
            }
        }
    }

    static hideFeedback() {
        const feedback = DOM.dragFeedback;
        if (feedback) {
            feedback.style.display = 'none';
            feedback.className = 'drag-feedback';
        }
    }

    static reset() {
        this.correctCount = 0;
        this.placedItems.clear();
        this.isComplete = false;

        // Повертаємо всі елементи
        DOM.dragItems.forEach(item => {
            item.classList.remove('placed');
        });

        // Очищаємо зони
        DOM.dropZones.forEach(zone => {
            zone.classList.remove('correct', 'wrong');
            const dropped = zone.querySelectorAll('.dropped-item');
            dropped.forEach(el => el.remove());
            const placeholder = zone.querySelector('.drop-placeholder');
            if (placeholder) placeholder.style.display = '';
        });

        this.updateScore();
        this.hideFeedback();
    }
}

// ==================== ВІКТОРИНА ====================
function renderSafetyQuiz(questions, userAnswers) {
    const container = document.getElementById('quizSafetyContainer');
    if (!container) return;

    const html = questions.map((q, idx) => {
        return `
            <div class="quiz-question">${idx+1}. ${q.text}</div>
            ${q.options.map((opt, oi) => `
                <div class="quiz-option ${userAnswers[idx] === oi ? 'selected' : ''}" 
                     data-q="${idx}" data-o="${oi}">
                    ${String.fromCharCode(65+oi)}. ${opt}
                </div>
            `).join('')}
        `;
    }).join('');

    container.innerHTML = html;

    container.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', function() {
            const q = parseInt(this.dataset.q);
            const o = parseInt(this.dataset.o);
            userAnswers[q] = (userAnswers[q] === o) ? null : o;
            renderSafetyQuiz(questions, userAnswers);
        });
    });
}

function checkSafetyQuiz(questions, userAnswers) {
    const feedback = document.getElementById('quizSafetyFeedback');
    if (!feedback) return;

    let correct = 0;
    const results = questions.map((q, i) => {
        const isCorrect = userAnswers[i] === q.correct;
        if (isCorrect) correct++;
        return {
            isCorrect,
            correctText: q.options[q.correct],
            number: i + 1
        };
    });

    feedback.innerHTML = `
        <p style="color:#1e5f7a;font-size:1.1rem;">📊 Результат: <strong>${correct}</strong> з ${questions.length}</p>
        ${results.map(r => `
            <p style="margin:5px 0;">
                ${r.isCorrect ? '✅' : '❌'} 
                Питання ${r.number}: 
                ${r.isCorrect ? 'Вірно!' : `Невірно. Правильна відповідь: <strong>${r.correctText}</strong>`}
            </p>
        `).join('')}
    `;
}

// ==================== ВИПАДКОВИЙ ФАКТ ====================
function initRandomFact() {
    DOM.randomFactBtn?.addEventListener('click', () => {
        const fact = SAFETY_FACTS[Math.floor(Math.random() * SAFETY_FACTS.length)];
        if (DOM.factDisplay) DOM.factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${fact}`;
    });
}

// ==================== ПЛАВНА НАВІГАЦІЯ ====================
function initSmoothScroll() {
    document.querySelectorAll('.nav a, a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка завантажена! Починаємо ініціалізацію...');

    SafetyDragGame.init();

    // Вікторина
    const safetyAnswers = new Array(SAFETY_QUIZ.length).fill(null);
    renderSafetyQuiz(SAFETY_QUIZ, safetyAnswers);

    document.getElementById('checkSafetyQuizBtn')?.addEventListener('click', () => {
        checkSafetyQuiz(SAFETY_QUIZ, safetyAnswers);
    });

    document.getElementById('resetSafetyQuizBtn')?.addEventListener('click', () => {
        safetyAnswers.fill(null);
        renderSafetyQuiz(SAFETY_QUIZ, safetyAnswers);
        const feedback = document.getElementById('quizSafetyFeedback');
        if (feedback) feedback.innerHTML = '';
    });

    initRandomFact();
    initSmoothScroll();

    console.log('Ініціалізація завершена!');
});