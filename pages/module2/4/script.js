// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    codeEditor: document.querySelector('#htmlCodeEditor'),
    previewFrame: document.querySelector('#previewFrame'),
    runBtn: document.querySelector('#runCodeBtn'),
    clearBtn: document.querySelector('#clearCodeBtn'),
    loadExampleBtn: document.querySelector('#loadExampleBtn'),
    tasksCompleted: document.querySelector('#tasksCompleted'),
    tasksTotal: document.querySelector('#tasksTotal'),
    progressMessage: document.querySelector('#progressMessage'),
    randomFactBtn: document.querySelector('#randomFactBtn'),
    factDisplay: document.querySelector('#randomFactDisplay'),
    checklist: document.querySelector('#challengeChecklist'),
    resetChecklistBtn: document.querySelector('#resetChecklistBtn'),
};

// ==================== ДАНІ ДЛЯ ВІКТОРИН ====================
const CSS_QUIZ = [
    { 
        text: "Яка властивість відповідає за колір тексту?", 
        options: ["font-color", "text-color", "color", "background-color"], 
        correct: 2 
    },
    { 
        text: "Яка властивість робить текст жирним?", 
        options: ["font-style", "font-weight", "text-decoration", "font-size"], 
        correct: 1 
    },
    { 
        text: "Яка властивість робить текст курсивом?", 
        options: ["font-weight", "text-decoration", "font-style", "text-transform"], 
        correct: 2 
    },
    { 
        text: "Яка властивість підкреслює текст?", 
        options: ["text-decoration", "text-transform", "text-align", "line-height"], 
        correct: 0 
    },
    { 
        text: "Яка властивість вирівнює текст по центру?", 
        options: ["text-indent", "text-align", "text-transform", "text-decoration"], 
        correct: 1 
    }
];

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Мій улюблений вірш</title>
<style>
    /* Стилі для тексту */
    body {
        font-family: 'Segoe UI', sans-serif;
        background: #f0f8ff;
        padding: 30px;
        max-width: 700px;
        margin: 0 auto;
    }
    h1 {
        color: #1e5f7a;
        text-align: center;
        font-size: 32px;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    .author {
        text-align: center;
        font-style: italic;
        color: #7f8c8d;
        margin-bottom: 30px;
    }
    .verse {
        color: #2c3e4e;
        font-size: 18px;
        line-height: 2;
        text-indent: 30px;
    }
    .highlight {
        color: #e74c3c;
        font-weight: bold;
    }
    .italic {
        font-style: italic;
        color: #2980b9;
    }
    .center {
        text-align: center;
    }
    .underline {
        text-decoration: underline;
        text-decoration-color: #e67e22;
    }
</style>
</head>
<body>
    <h1>Сонце заходить</h1>
    <p class="author">— Тарас Шевченко</p>
    <p class="verse">
        <span class="highlight">Сонце</span> заходить, гори чорніють,<br>
        Пташечка тихо <span class="italic">щебече</span>,<br>
        <span class="underline">Садок</span> вишневий коло хати<br>
        Хрущі над вишнями гудуть.
    </p>
    <p class="verse center" style="text-indent:0;">
        <span class="highlight">Ідуть</span> дівчата з городу<br>
        Та співають, <span class="italic">мов солов'ї</span>,<br>
        А мати <span class="underline">вечеряти</span> кличе,<br>
        А діти граються на дворі.
    </p>
    <p style="text-align:right;color:#7f8c8d;font-style:italic;margin-top:30px;">
        Збірка "Кобзар"
    </p>
</body>
</html>`;

const FACTS = [
    "У CSS є понад 80 властивостей для стилізації тексту.",
    "Властивість font-size можна задавати в пікселях, ем, ремах, відсотках.",
    "Слово 'serif' означає шрифт із засічками, 'sans-serif' — без засічок.",
    "Властивість text-transform: capitalize робить першу літеру кожного слова великою.",
    "В CSS можна використовувати 140 стандартних назв кольорів.",
    "Міжрядковий інтервал line-height: 1.5 вважається оптимальним для читання.",
    "Властивість letter-spacing використовується для створення ефекту розрідженого тексту."
];

// ==================== ДАНІ ДЛЯ ГРИ "ЗНАЙДИ ПАРУ" ====================
const MATCH_PAIRS = [
    { id: 1, property: 'color', description: 'Колір тексту' },
    { id: 2, property: 'font-size', description: 'Розмір шрифту' },
    { id: 3, property: 'font-weight', description: 'Жирність тексту' },
    { id: 4, property: 'font-style', description: 'Нахил тексту' },
    { id: 5, property: 'text-align', description: 'Вирівнювання тексту' },
    { id: 6, property: 'text-transform', description: 'Трансформація тексту' },
    { id: 7, property: 'text-decoration', description: 'Оформлення тексту' },
    { id: 8, property: 'line-height', description: 'Міжрядковий інтервал' }
];

// ==================== ПРАВИЛЬНІ ВІДПОВІДІ ДЛЯ ЗАВДАНЬ ====================
const TASK_ANSWERS = {
    1: { property: 'color', value: '#e74c3c', alternatives: ['red'] },
    2: { property: 'font-weight', value: 'bold' },
    3: { property: 'font-style', value: 'italic' },
    4: { property: 'text-decoration', value: 'underline' },
    5: { property: 'text-align', value: 'center' },
    6: { property: 'text-transform', value: 'uppercase' }
};

// ==================== ІНТЕРАКТИВНА ДЕМОНСТРАЦІЯ ====================
class TextDemo {
    static init() {
        const options = document.querySelectorAll('.demo-option');
        options.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyStyle(e, btn));
        });
    }

    static applyStyle(e, btn) {
        const targetId = btn.dataset.target;
        const property = btn.dataset.property;
        const value = btn.dataset.value;

        const preview = document.getElementById(targetId);
        if (!preview) return;

        const p = preview.querySelector('p');
        if (!p) return;

        if (btn.classList.contains('reset-option')) {
            p.style[property] = '';
        } else {
            p.style[property] = value;
        }

        const group = btn.closest('.demo-options');
        if (group) {
            group.querySelectorAll('.demo-option').forEach(b => {
                if (b.dataset.target === targetId && b.dataset.property === property) {
                    b.classList.remove('active');
                }
            });
            btn.classList.add('active');
        }
    }
}

// ==================== ГРА "ЗНАЙДИ ПАРУ" ====================
class MatchGame {
    static cards = [];
    static flippedCards = [];
    static matchedPairs = 0;
    static totalPairs = MATCH_PAIRS.length;
    static isLocked = false;
    static timeoutId = null;

    static init() {
        this.resetGame();
        document.getElementById('resetMatchBtn')?.addEventListener('click', () => {
            this.resetGame();
        });
    }

    static resetGame() {
        // Очищаємо таймаут
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLocked = false;
        
        // Створюємо картки
        const grid = document.getElementById('matchGrid');
        if (!grid) return;
        
        // Створюємо масив карток (по 2 кожної)
        const cards = [];
        MATCH_PAIRS.forEach(pair => {
            cards.push({ id: pair.id, type: 'property', text: pair.property, pairId: pair.id });
            cards.push({ id: pair.id, type: 'description', text: pair.description, pairId: pair.id });
        });
        
        // Перемішуємо
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        this.cards = cards;
        this.matchedPairs = 0;
        
        // Рендеримо
        this.render(grid);
        this.updateScore();
    }

    static render(grid) {
        grid.innerHTML = '';
        this.cards.forEach((card, index) => {
            const div = document.createElement('div');
            div.className = 'match-card';
            div.dataset.index = index;
            div.dataset.pairId = card.pairId;
            div.dataset.type = card.type;
            
            // Показуємо вміст
            const content = document.createElement('div');
            content.className = 'card-content';
            
            if (card.type === 'property') {
                content.innerHTML = `<span class="card-property">${card.text}</span>`;
            } else {
                content.textContent = card.text;
            }
            
            div.appendChild(content);
            
            // Зберігаємо початковий стан
            div.dataset.flipped = 'false';
            div.dataset.matched = 'false';
            
            div.addEventListener('click', () => this.flipCard(div));
            grid.appendChild(div);
        });
    }

    static flipCard(cardElement) {
        if (this.isLocked) return;
        if (cardElement.dataset.matched === 'true') return;
        if (cardElement.dataset.flipped === 'true') return;
        if (this.flippedCards.length >= 2) return;

        // Перевертаємо картку
        cardElement.classList.add('flipped');
        cardElement.dataset.flipped = 'true';
        this.flippedCards.push(cardElement);

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    static checkMatch() {
        this.isLocked = true;
        
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];
        
        const isMatch = card1.dataset.pairId === card2.dataset.pairId && 
                       card1.dataset.type !== card2.dataset.type;

        if (isMatch) {
            // Знайдено пару
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                card1.dataset.matched = 'true';
                card2.dataset.matched = 'true';
                this.matchedPairs++;
                this.flippedCards = [];
                this.isLocked = false;
                this.updateScore();
                
                if (this.matchedPairs === this.totalPairs) {
                    document.getElementById('matchMessage').textContent = '🎉 Вітаю! Ти знайшов усі пари!';
                    document.getElementById('matchMessage').className = 'success';
                }
            }, 400);
        } else {
            // Не співпало - перевертаємо назад
            this.timeoutId = setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.dataset.flipped = 'false';
                card2.dataset.flipped = 'false';
                this.flippedCards = [];
                this.isLocked = false;
                this.timeoutId = null;
            }, 800);
        }
    }

    static updateScore() {
        const scoreEl = document.getElementById('matchScore');
        const totalEl = document.getElementById('matchTotal');
        const msgEl = document.getElementById('matchMessage');
        
        if (scoreEl) scoreEl.textContent = this.matchedPairs;
        if (totalEl) totalEl.textContent = this.totalPairs;
        
        if (this.matchedPairs < this.totalPairs) {
            msgEl.textContent = `Знайдено ${this.matchedPairs} з ${this.totalPairs}`;
            msgEl.className = '';
        }
    }
}

// ==================== ІНТЕРАКТИВНІ ЗАВДАННЯ ====================
class TaskExamples {
    static completedTasks = new Set();
    static totalTasks = 6;

    static init() {
        if (DOM.tasksTotal) DOM.tasksTotal.textContent = this.totalTasks;
        
        document.querySelectorAll('.btn-apply').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyTask(e));
        });
        
        document.querySelectorAll('.btn-hint').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = btn.dataset.task;
                const hintEl = document.getElementById(`hint${taskId}`);
                if (hintEl) {
                    hintEl.style.display = hintEl.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
        
        document.querySelectorAll('.task-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const taskId = input.id.replace('input', '');
                    const btn = document.querySelector(`.btn-apply[data-task="${taskId}"]`);
                    if (btn) btn.click();
                }
            });
        });
        
        this.updateProgress();
    }

    static applyTask(e) {
        const btn = e.currentTarget;
        const taskId = parseInt(btn.dataset.task);
        const input = document.getElementById(`input${taskId}`);
        const demoArea = document.getElementById(`demo${taskId}`);
        const statusEl = document.getElementById(`task${taskId}Status`);
        const resultEl = document.getElementById(`result${taskId}`);
        const taskElement = document.getElementById(`task${taskId}`);

        if (this.completedTasks.has(taskId)) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '✅ Це завдання вже виконано!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            return;
        }

        if (!input || !demoArea) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '❌ Помилка: не знайдено поле вводу';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
            return;
        }

        const userInput = input.value.trim();
        if (!userInput) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '⚠️ Будь ласка, напиши CSS-стиль у полі вводу!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
            return;
        }

        const parsed = this.parseStyle(userInput);
        const expected = TASK_ANSWERS[taskId];
        
        let isCorrect = false;
        let message = '';

        if (parsed) {
            const propMatch = parsed.property.toLowerCase().trim() === expected.property.toLowerCase();
            const valMatch = parsed.value.toLowerCase().trim() === expected.value.toLowerCase() || 
                           (expected.alternatives && expected.alternatives.some(alt => alt.toLowerCase() === parsed.value.toLowerCase().trim()));
            
            if (propMatch && valMatch) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            const p = demoArea.querySelector('p');
            if (p) {
                p.style[expected.property] = expected.value;
            }
            
            this.completedTasks.add(taskId);
            if (taskElement) taskElement.classList.add('completed');
            if (statusEl) {
                statusEl.textContent = '✅ Виконано!';
                statusEl.style.color = '#27ae60';
            }
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '🎉 Чудово! Стиль застосовано правильно!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            input.classList.add('correct');
            input.classList.remove('wrong');
            btn.disabled = true;
            this.updateProgress();
        } else {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '❌ Неправильно. Перевір написання властивості та значення. Спробуй ще раз!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
            input.classList.add('wrong');
            setTimeout(() => {
                input.classList.remove('wrong');
            }, 2000);
        }
    }

    static parseStyle(input) {
        const regex = /^\s*([a-zA-Z-]+)\s*:\s*([^;]+)\s*;?\s*$/;
        const match = input.match(regex);
        if (match) {
            return {
                property: match[1].trim(),
                value: match[2].trim()
            };
        }
        return null;
    }

    static updateProgress() {
        const count = this.completedTasks.size;
        if (DOM.tasksCompleted) DOM.tasksCompleted.textContent = count;
        if (DOM.progressMessage) {
            if (count === this.totalTasks) {
                DOM.progressMessage.textContent = '🎉 Вітаю! Ти виконав усі завдання! Ти справжній CSS-майстер!';
                DOM.progressMessage.style.color = '#27ae60';
            } else {
                DOM.progressMessage.textContent = `Виконано ${count} з ${this.totalTasks}. Продовжуй у тому ж дусі!`;
                DOM.progressMessage.style.color = '#1e5f7a';
            }
        }
    }

    static resetTasks() {
        this.completedTasks.clear();
        for (let i = 1; i <= this.totalTasks; i++) {
            const taskElement = document.getElementById(`task${i}`);
            const statusEl = document.getElementById(`task${i}Status`);
            const resultEl = document.getElementById(`result${i}`);
            const btn = taskElement?.querySelector('.btn-apply');
            const input = document.getElementById(`input${i}`);
            const demoArea = document.getElementById(`demo${i}`);
            const hintEl = document.getElementById(`hint${i}`);

            if (taskElement) taskElement.classList.remove('completed');
            if (statusEl) {
                statusEl.textContent = '⏳ Очікує';
                statusEl.style.color = '';
            }
            if (resultEl) {
                resultEl.style.display = 'none';
                resultEl.className = 'task-result';
            }
            if (btn) btn.disabled = false;
            if (input) {
                input.value = '';
                input.classList.remove('correct', 'wrong');
            }
            if (hintEl) {
                hintEl.style.display = 'none';
            }
            if (demoArea) {
                const p = demoArea.querySelector('p');
                if (p) {
                    p.style.color = '';
                    p.style.fontWeight = '';
                    p.style.fontStyle = '';
                    p.style.textDecoration = '';
                    p.style.textAlign = '';
                    p.style.textTransform = '';
                }
            }
        }
        this.updateProgress();
    }
}

// ==================== РЕДАКТОР КОДУ ====================
function initEditor() {
    if (DOM.codeEditor) DOM.codeEditor.value = DEFAULT_CODE;
    
    DOM.runBtn?.addEventListener('click', () => {
        if (DOM.previewFrame) DOM.previewFrame.srcdoc = DOM.codeEditor.value;
    });
    
    DOM.clearBtn?.addEventListener('click', () => {
        DOM.codeEditor.value = '';
        DOM.previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;">👈 Напиши код і натисни "Запустити"</body></html>';
    });
    
    DOM.loadExampleBtn?.addEventListener('click', () => {
        DOM.codeEditor.value = DEFAULT_CODE;
        DOM.previewFrame.srcdoc = DEFAULT_CODE;
    });
    
    if (DOM.previewFrame) DOM.previewFrame.srcdoc = DEFAULT_CODE;
}

// ==================== ЧЕКЛІСТ З ЧЕКБОКСАМИ ====================
function initChecklist() {
    const items = DOM.checklist ? [...DOM.checklist.querySelectorAll('li')] : [];
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'checklist-progress';
    progressContainer.innerHTML = `
        <span class="progress-text">📊 Прогрес: <strong id="progressCount">0</strong> з ${items.length}</span>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
    `;
    DOM.checklist?.after(progressContainer);

    const progressCount = document.getElementById('progressCount');
    const progressFill = document.getElementById('progressFill');

    const updateProgress = () => {
        const checked = items.filter(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            return checkbox && checkbox.checked;
        }).length;
        
        const total = items.length;
        const percent = total > 0 ? (checked / total) * 100 : 0;
        
        if (progressCount) progressCount.textContent = checked;
        if (progressFill) progressFill.style.width = percent + '%';
        
        const states = items.map(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            return checkbox ? checkbox.checked : false;
        });
        localStorage.setItem('textStylesChecklist', JSON.stringify(states));
    };

    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('textStylesChecklist'));
            if (saved && saved.length === items.length) {
                items.forEach((li, index) => {
                    const checkbox = li.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = saved[index];
                        if (saved[index]) {
                            li.classList.add('completed');
                        } else {
                            li.classList.remove('completed');
                        }
                    }
                });
                updateProgress();
            }
        } catch (e) {
            console.log('Помилка завантаження стану чекліста');
        }
    };

    items.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (checkbox) {
            li.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    checkbox.checked = !checkbox.checked;
                    const event = new Event('change', { bubbles: true });
                    checkbox.dispatchEvent(event);
                }
            });
            
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    li.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                }
                updateProgress();
            });
        }
    });

    DOM.resetChecklistBtn?.addEventListener('click', () => {
        items.forEach(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
                li.classList.remove('completed');
            }
        });
        updateProgress();
    });

    loadState();
}

// ==================== ВІКТОРИНИ ====================
function renderQuiz(containerId, questions, userAnswers) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер з ID "${containerId}" не знайдено!`);
        return;
    }
    
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
            renderQuiz(containerId, questions, userAnswers);
        });
    });
}

function checkQuiz(feedbackId, questions, userAnswers) {
    const feedback = document.getElementById(feedbackId);
    if (!feedback) {
        console.error(`Елемент для зворотного зв'язку з ID "${feedbackId}" не знайдено!`);
        return;
    }
    
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
        const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
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
    
    initEditor();
    initChecklist();
    TaskExamples.init();
    TextDemo.init();
    MatchGame.init();

    // Вікторина CSS
    const cssAnswers = new Array(CSS_QUIZ.length).fill(null);
    renderQuiz('quizCssContainer', CSS_QUIZ, cssAnswers);
    
    document.getElementById('checkCssQuizBtn')?.addEventListener('click', () => {
        checkQuiz('quizCssFeedback', CSS_QUIZ, cssAnswers);
    });
    
    document.getElementById('resetCssQuizBtn')?.addEventListener('click', () => { 
        cssAnswers.fill(null);
        renderQuiz('quizCssContainer', CSS_QUIZ, cssAnswers);
        const feedback = document.getElementById('quizCssFeedback');
        if (feedback) feedback.innerHTML = '';
    });

    initRandomFact();
    initSmoothScroll();

    // Кнопка скидання завдань
    const resetTasksBtn = document.createElement('button');
    resetTasksBtn.textContent = '🔄 Скинути всі завдання';
    resetTasksBtn.className = 'btn-reset';
    resetTasksBtn.style.marginTop = '15px';
    resetTasksBtn.addEventListener('click', () => TaskExamples.resetTasks());
    
    const taskProgress = document.querySelector('.task-progress');
    if (taskProgress) {
        taskProgress.after(resetTasksBtn);
    }
    
    console.log('Ініціалізація завершена!');
});