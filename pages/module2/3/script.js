// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    codeEditor: document.querySelector('#htmlCodeEditor'),
    previewFrame: document.querySelector('#previewFrame'),
    runBtn: document.querySelector('#runCodeBtn'),
    clearBtn: document.querySelector('#clearCodeBtn'),
    loadExampleBtn: document.querySelector('#loadExampleBtn'),
    showSolutionBtn: document.querySelector('#showSolutionBtn'),
    solutionContent: document.querySelector('#solutionContent'),
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
        text: "Який селектор має найвищий пріоритет?", 
        options: ["Тег", "Клас", "ID", "Універсальний"], 
        correct: 2 
    },
    { 
        text: "Який символ використовується для класу?", 
        options: ["#", ".", "*", "&"], 
        correct: 1 
    },
    { 
        text: "Що означає селектор 'div p'?", 
        options: ["Всі div всередині p", "Всі p всередині div", "Всі div та p", "Всі елементи з класом div-p"], 
        correct: 1 
    },
    { 
        text: "Який селектор вибирає елементи за атрибутом?", 
        options: ["[атрибут]", ".атрибут", "#атрибут", "*атрибут"], 
        correct: 0 
    }
];

const CONTROL_QUIZ = [
    { 
        text: "Що означає селектор 'h1, h2'?", 
        options: ["Всі h1 всередині h2", "Всі h1 та h2", "Всі h2 всередині h1", "Всі елементи з класом h1-h2"], 
        correct: 1 
    },
    { 
        text: "Який селектор вибирає всі елементи?", 
        options: ["#", ".", "*", "&"], 
        correct: 2 
    },
    { 
        text: "Що означає селектор 'ul > li'?", 
        options: ["Всі li всередині ul", "Всі li, що є прямими нащадками ul", "Всі ul всередині li", "Всі ul та li"], 
        correct: 1 
    },
    { 
        text: "Який пріоритет має inline-стиль?", 
        options: ["Найнижчий", "Середній", "Найвищий", "Такий самий, як ID"], 
        correct: 2 
    }
];

const SELECTOR_QUESTIONS = [
    { 
        text: "Який селектор вибирає всі елементи з класом 'active'?", 
        options: ["#active", ".active", "active", "*active"], 
        correct: 1 
    },
    { 
        text: "Який селектор вибирає елемент з ID 'header'?", 
        options: ["#header", ".header", "header", "*header"], 
        correct: 0 
    },
    { 
        text: "Який селектор вибирає всі абзаци всередині div?", 
        options: ["div p", "div > p", "p div", "div + p"], 
        correct: 0 
    },
    { 
        text: "Який селектор вибирає всі заголовки h1 та h2?", 
        options: ["h1 h2", "h1, h2", "h1 > h2", "h1 + h2"], 
        correct: 1 
    },
    { 
        text: "Який селектор вибирає елементи з атрибутом 'type'?", 
        options: ["[type]", ".type", "#type", "*type"], 
        correct: 0 
    },
    { 
        text: "Який селектор вибирає всі елементи на сторінці?", 
        options: ["#", ".", "*", "&"], 
        correct: 2 
    }
];

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Селектори CSS</title>
    <style>
        /* ===== Тегові селектори ===== */
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f5f7fa;
            padding: 30px;
            color: #1e2a3e;
        }
        
        h1 {
            color: #1e5f7a;
            text-align: center;
        }
        
        h2 {
            color: #2c3e4e;
            border-bottom: 2px solid #ff9f4a;
            padding-bottom: 5px;
        }
        
        p {
            line-height: 1.6;
        }
        
        /* ===== Класи ===== */
        .card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        
        .highlight {
            background: #ffd93d;
            padding: 2px 8px;
            border-radius: 4px;
        }
        
        /* ===== ID ===== */
        #header {
            background: #1e5f7a;
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
        }
        
        #footer {
            text-align: center;
            color: #666;
            margin-top: 30px;
            padding: 15px;
            border-top: 1px solid #ddd;
        }
        
        /* ===== Вкладеність ===== */
        .card p {
            font-size: 16px;
        }
        
        .card .highlight {
            background: #ff6b6b;
            color: white;
        }
        
        /* ===== Атрибути ===== */
        a[target="_blank"] {
            color: #e67e22;
            text-decoration: none;
            font-weight: bold;
        }
        
        a[target="_blank"]:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>🏷️ Селектори CSS на практиці</h1>
    </div>
    
    <div class="card">
        <h2>Що таке селектори?</h2>
        <p>Селектори — це <span class="highlight">важливий інструмент</span> CSS, який дозволяє вибирати елементи для стилізації.</p>
        <p>Вони бувають <strong>простими</strong> та <strong>складеними</strong>.</p>
    </div>
    
    <div class="card">
        <h2>Види селекторів</h2>
        <ul>
            <li><strong>За тегом</strong> — p, h1, div</li>
            <li><strong>За класом</strong> — .class</li>
            <li><strong>За ID</strong> — #id</li>
            <li><strong>За атрибутом</strong> — [type]</li>
        </ul>
        <p>Більше інформації на <a href="#" target="_blank">сайті</a>.</p>
    </div>
    
    <div id="footer">
        <p>© 2026 Моя сторінка про селектори</p>
    </div>
</body>
</html>`;

const FACTS = [
    "У CSS існує понад 50 різних типів селекторів!",
    "Селектор за ID має вищий пріоритет, ніж селектор за класом.",
    "Символ '*' — універсальний селектор, вибирає всі елементи.",
    "Селектори можна комбінувати для більшої специфічності.",
    "CSS був створений у 1996 році Хоконом Віум Лі.",
    "Селектори за атрибутами з'явилися в CSS2 у 1998 році.",
    "Сучасні селектори дозволяють вибирати елементи за станом (:hover, :focus)."
];

// ==================== ІНТЕРАКТИВНІ ЗАВДАННЯ ====================
class TaskExamples {
    static completedTasks = new Set();
    static totalTasks = 6;

    static init() {
        if (DOM.tasksTotal) DOM.tasksTotal.textContent = this.totalTasks;
        document.querySelectorAll('.btn-apply').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyTask(e));
        });
        this.updateProgress();
    }

    static applyTask(e) {
        const btn = e.currentTarget;
        const taskId = parseInt(btn.dataset.task);
        const taskElement = document.getElementById(`task${taskId}`);
        const demoArea = document.getElementById(`demo${taskId}`);
        const statusEl = document.getElementById(`task${taskId}Status`);
        const resultEl = document.getElementById(`result${taskId}`);

        if (this.completedTasks.has(taskId)) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '✅ Це завдання вже виконано!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            return;
        }

        let success = true;
        let message = '';

        switch(taskId) {
            case 1:
                const h1 = demoArea?.querySelector('h1');
                const h2 = demoArea?.querySelector('h2');
                if (h1 && h2) {
                    h1.style.color = '#1e5f7a';
                    h2.style.color = '#1e5f7a';
                    message = '✅ Чудово! Обидва заголовки змінили колір!';
                } else {
                    success = false;
                    message = '❌ Не знайдено h1 або h2';
                }
                break;
            case 2:
                const divP = demoArea?.querySelector('div p');
                if (divP) {
                    divP.style.color = 'green';
                    message = '✅ Супер! Текст у div став зеленим!';
                } else {
                    success = false;
                    message = '❌ Не знайдено div p';
                }
                break;
            case 3:
                const lis = demoArea?.querySelectorAll('ul > li');
                if (lis && lis.length > 0) {
                    lis.forEach(li => li.style.background = '#ffd93d');
                    message = '✅ Відмінно! Усі li отримали жовтий фон!';
                } else {
                    success = false;
                    message = '❌ Не знайдено ul > li';
                }
                break;
            case 4:
                const input = demoArea?.querySelector('input[type="text"]');
                if (input) {
                    input.style.border = '2px solid #1e5f7a';
                    message = '✅ Чудово! Поле отримало синю рамку!';
                } else {
                    success = false;
                    message = '❌ Не знайдено input[type="text"]';
                }
                break;
            case 5:
                const h2_5 = demoArea?.querySelector('h2');
                const nextP = h2_5?.nextElementSibling;
                if (nextP && nextP.tagName === 'P') {
                    nextP.style.fontWeight = 'bold';
                    message = '✅ Відмінно! Абзац після h2 став жирним!';
                } else {
                    success = false;
                    message = '❌ Не знайдено h2 + p';
                }
                break;
            case 6:
                const cardHighlight = demoArea?.querySelector('.card .highlight');
                if (cardHighlight) {
                    cardHighlight.style.background = '#ff6b6b';
                    cardHighlight.style.color = 'white';
                    message = '✅ Супер! .card .highlight змінився!';
                } else {
                    success = false;
                    message = '❌ Не знайдено .card .highlight';
                }
                break;
            default:
                success = false;
                message = '❌ Сталася помилка. Спробуй ще раз.';
        }

        if (success) {
            this.completedTasks.add(taskId);
            if (taskElement) taskElement.classList.add('completed');
            if (statusEl) {
                statusEl.textContent = '✅ Виконано!';
                statusEl.style.color = '#27ae60';
            }
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = message;
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            btn.disabled = true;
            this.updateProgress();
        } else {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = message;
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
        }
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
            const demoArea = document.getElementById(`demo${i}`);

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

            if (demoArea) {
                switch(i) {
                    case 1:
                        const h1 = demoArea.querySelector('h1');
                        const h2 = demoArea.querySelector('h2');
                        if (h1) h1.style.color = '';
                        if (h2) h2.style.color = '';
                        break;
                    case 2:
                        const divP = demoArea.querySelector('div p');
                        if (divP) divP.style.color = '';
                        break;
                    case 3:
                        const lis = demoArea.querySelectorAll('ul > li');
                        lis.forEach(li => li.style.background = '');
                        break;
                    case 4:
                        const input = demoArea.querySelector('input[type="text"]');
                        if (input) input.style.border = '';
                        break;
                    case 5:
                        const h2_5 = demoArea.querySelector('h2');
                        const nextP = h2_5?.nextElementSibling;
                        if (nextP && nextP.tagName === 'P') nextP.style.fontWeight = '';
                        break;
                    case 6:
                        const cardHighlight = demoArea.querySelector('.card .highlight');
                        if (cardHighlight) {
                            cardHighlight.style.background = '';
                            cardHighlight.style.color = '';
                        }
                        break;
                }
            }
        }
        this.updateProgress();
    }
}

// ==================== ГРА "ВГАДАЙ СЕЛЕКТОР" ====================
class SelectorQuiz {
    static currentQuestion = 0;
    static score = 0;
    static totalQuestions = SELECTOR_QUESTIONS.length;
    static answered = false;

    static init() {
        this.loadQuestion();
        
        document.getElementById('nextSelectorBtn')?.addEventListener('click', () => {
            if (this.answered) {
                this.nextQuestion();
            }
        });
        
        document.querySelectorAll('.selector-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e));
        });

        // Закриття модального вікна
        document.getElementById('modalCloseBtn')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalRestartBtn')?.addEventListener('click', () => {
            this.closeModal();
            this.restartGame();
        });

        // Клік на оверлей для закриття
        document.getElementById('selectorModal')?.addEventListener('click', (e) => {
            if (e.target === document.getElementById('selectorModal')) {
                this.closeModal();
            }
        });
    }

    static loadQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.showModal();
            return;
        }

        const question = SELECTOR_QUESTIONS[this.currentQuestion];
        document.getElementById('questionText').textContent = question.text;
        const options = document.querySelectorAll('.selector-option');
        options.forEach((btn, index) => {
            btn.textContent = question.options[index];
            btn.dataset.answer = index;
            btn.className = 'selector-option';
            btn.disabled = false;
            btn.style.display = 'inline-block';
        });
        document.getElementById('selectorFeedback').textContent = '';
        document.getElementById('selectorFeedback').className = 'selector-feedback';
        this.answered = false;
        this.updateScore();
    }

    static checkAnswer(e) {
        if (this.answered) return;
        const btn = e.currentTarget;
        const answer = parseInt(btn.dataset.answer);
        const question = SELECTOR_QUESTIONS[this.currentQuestion];
        const isCorrect = answer === question.correct;
        const feedback = document.getElementById('selectorFeedback');

        if (isCorrect) {
            this.score++;
            feedback.textContent = '✅ Правильно! Молодець!';
            feedback.className = 'selector-feedback success';
            btn.classList.add('correct');
        } else {
            feedback.textContent = `❌ Неправильно. Правильна відповідь: ${question.options[question.correct]}`;
            feedback.className = 'selector-feedback error';
            btn.classList.add('wrong');
            document.querySelectorAll('.selector-option')[question.correct].classList.add('correct');
        }

        this.answered = true;
        document.querySelectorAll('.selector-option').forEach(b => b.disabled = true);
        this.updateScore();
    }

    static nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion >= this.totalQuestions) {
            this.showModal();
        } else {
            this.loadQuestion();
        }
    }

    static showModal() {
        const modal = document.getElementById('selectorModal');
        const modalMessage = document.getElementById('modalMessage');
        const modalScore = document.getElementById('modalScore');
        
        // Повідомлення в залежності від результату
        if (this.score === this.totalQuestions) {
            modalMessage.textContent = '🌟 Ти відповів на всі питання правильно! Ти справжній експерт з селекторів!';
        } else if (this.score >= this.totalQuestions * 0.7) {
            modalMessage.textContent = '💪 Дуже гарний результат! Ти добре знаєш селектори!';
        } else if (this.score >= this.totalQuestions * 0.5) {
            modalMessage.textContent = '📚 Непогано! Повтори матеріал і спробуй ще раз!';
        } else {
            modalMessage.textContent = '🤔 Варто повторити тему селекторів. Не здавайся, у тебе все вийде!';
        }
        
        modalScore.textContent = `Правильних відповідей: ${this.score} з ${this.totalQuestions}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    static closeModal() {
        const modal = document.getElementById('selectorModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    static restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.loadQuestion();
        this.updateScore();
    }

    static updateScore() {
        document.getElementById('selectorScore').textContent = `Правильно: ${this.score} / ${this.totalQuestions}`;
    }
}

// ==================== ГРА "ПЕРЕТЯГУВАННЯ" ====================
class DragGame {
    static score = 0;
    static totalItems = 6;
    static placedItems = new Map();

    static init() {
        const items = document.querySelectorAll('.drag-item');
        const zones = document.querySelectorAll('.drop-zone');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => this.dragStart(e, item));
            item.addEventListener('dragend', (e) => this.dragEnd(e, item));
        });

        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.dragOver(e));
            zone.addEventListener('dragenter', (e) => this.dragEnter(e));
            zone.addEventListener('dragleave', (e) => this.dragLeave(e));
            zone.addEventListener('drop', (e) => this.drop(e, zone));
        });

        document.getElementById('resetDragBtn')?.addEventListener('click', () => this.reset());
        this.updateScore();
    }

    static dragStart(e, item) {
        e.dataTransfer.setData('text/plain', item.dataset.selector);
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
        
        const selector = e.dataTransfer.getData('text/plain');
        const expected = zone.dataset.expected;
        const item = document.querySelector(`.drag-item[data-selector="${selector}"]`);

        if (!item) return;

        if (zone.querySelector('.dropped-item')) {
            return;
        }

        document.querySelectorAll('.drop-zone .dropped-item').forEach(el => {
            if (el.textContent === selector) {
                el.remove();
                const oldZone = el.closest('.drop-zone');
                if (oldZone) {
                    oldZone.classList.remove('correct', 'wrong');
                    const placeholder = oldZone.querySelector('.drop-placeholder');
                    if (placeholder) placeholder.style.display = '';
                }
            }
        });

        const dropped = document.createElement('span');
        dropped.className = 'dropped-item';
        dropped.textContent = selector;
        zone.querySelector('.drop-placeholder').style.display = 'none';
        zone.appendChild(dropped);

        const isCorrect = selector === expected;
        zone.classList.add(isCorrect ? 'correct' : 'wrong');

        this.placedItems.set(zone, { selector, correct: isCorrect });
        this.updateScore();
    }

    static updateScore() {
        let correct = 0;
        this.placedItems.forEach((value) => {
            if (value.correct) correct++;
        });
        this.score = correct;
        const scoreEl = document.getElementById('dragScore');
        if (scoreEl) scoreEl.textContent = `Правильно: ${this.score} / ${this.totalItems}`;
    }

    static reset() {
        this.placedItems.clear();
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('correct', 'wrong', 'drag-over');
            const dropped = zone.querySelector('.dropped-item');
            if (dropped) dropped.remove();
            const placeholder = zone.querySelector('.drop-placeholder');
            if (placeholder) placeholder.style.display = '';
        });
        this.score = 0;
        this.updateScore();
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
    
    DOM.showSolutionBtn?.addEventListener('click', () => DOM.solutionContent?.classList.toggle('show'));
    
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
        localStorage.setItem('selectorsChecklist', JSON.stringify(states));
    };

    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('selectorsChecklist'));
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
    SelectorQuiz.init();
    DragGame.init();

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

    // Контрольна вікторина
    const controlAnswers = new Array(CONTROL_QUIZ.length).fill(null);
    renderQuiz('quizControlContainer', CONTROL_QUIZ, controlAnswers);
    
    document.getElementById('checkControlQuizBtn')?.addEventListener('click', () => {
        checkQuiz('quizControlFeedback', CONTROL_QUIZ, controlAnswers);
    });
    
    document.getElementById('resetControlQuizBtn')?.addEventListener('click', () => { 
        controlAnswers.fill(null);
        renderQuiz('quizControlContainer', CONTROL_QUIZ, controlAnswers);
        const feedback = document.getElementById('quizControlFeedback');
        if (feedback) feedback.innerHTML = '';
    });

    initRandomFact();
    initSmoothScroll();

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