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
        text: "Який символ використовується для позначення класу в CSS?", 
        options: ["#", ".", "*", "&"], 
        correct: 1 
    },
    { 
        text: "Який символ використовується для позначення ID в CSS?", 
        options: ["#", ".", "*", "&"], 
        correct: 0 
    },
    { 
        text: "Чим закінчується кожне оголошення в CSS?", 
        options: ["Крапкою", "Крапкою з комою", "Двокрапкою", "Кому"], 
        correct: 1 
    },
    { 
        text: "Які дужки використовуються в CSS для групування властивостей?", 
        options: ["()", "[]", "{}", "<>"], 
        correct: 2 
    }
];

const CONTROL_QUIZ = [
    { 
        text: "Як правильно написати селектор для класу 'header'?", 
        options: ["#header", ".header", "header", "*header"], 
        correct: 1 
    },
    { 
        text: "Як правильно написати селектор для ID 'main'?", 
        options: ["#main", ".main", "main", "*main"], 
        correct: 0 
    },
    { 
        text: "Як правильно записати властивість 'колір тексту'?", 
        options: ["color-text: red;", "text-color: red;", "color: red;", "font-color: red;"], 
        correct: 2 
    },
    { 
        text: "Що означає селектор 'div p'?", 
        options: ["Всі div всередині p", "Всі p всередині div", "Всі div та p", "Всі елементи з класом div-p"], 
        correct: 1 
    }
];

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Моя сторінка</title>
<style>
    /* Напиши свої стилі тут */
    body {
        font-family: 'Segoe UI', sans-serif;
        background: #f0f8ff;
        padding: 20px;
    }
    h1 {
        color: #1e5f7a;
        text-align: center;
    }
    .card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        max-width: 600px;
        margin: 20px auto;
    }
    .highlight {
        background: #ffd966;
        padding: 0 5px;
    }
    #footer {
        text-align: center;
        color: #666;
        margin-top: 30px;
    }
</style>
</head>
<body>
    <h1>🐼 Моя улюблена тварина</h1>
    <div class="card">
        <h2>Опис</h2>
        <p>Панда — <strong>рідкісна</strong> тварина, що живе в Китаї. <em>Чорно-біле забарвлення</em> робить її впізнаваною.</p>
        <h2>Цікаві факти</h2>
        <ul>
            <li>Їсть <span class="highlight">14 годин</span> на день</li>
            <li>Має <strong>6 пальців</strong> на лапах</li>
            <li>Новонароджені важать <span class="highlight">100 грамів</span></li>
        </ul>
    </div>
    <p id="footer">© 2026 Моя перша сторінка з CSS</p>
</body>
</html>`;

const FACTS = [
    "CSS був створений у 1996 році Хоконом Віум Лі.",
    "Перший браузер, що підтримав CSS — Internet Explorer 3.0.",
    "CSS3 додав анімації, Flexbox та Grid.",
    "Зовнішній CSS кешується браузером, що прискорює завантаження.",
    "Сьогодні CSS — це мова, що постійно оновлюється.",
    "CSS дозволяє створювати адаптивні сайти для будь-яких пристроїв.",
    "Flexbox та Grid з'явилися у CSS3 і зробили верстку набагато простішою.",
    "CSS-анімації можуть працювати без JavaScript."
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
                const p = demoArea?.querySelector('p');
                if (p) {
                    p.style.color = 'blue';
                    message = '✅ Чудово! Текст став синім!';
                } else {
                    success = false;
                    message = '❌ Не знайдено тег p';
                }
                break;
            case 2:
                const highlight = demoArea?.querySelector('.highlight');
                if (highlight) {
                    highlight.style.background = 'yellow';
                    message = '✅ Супер! Фон став жовтим!';
                } else {
                    success = false;
                    message = '❌ Не знайдено клас .highlight';
                }
                break;
            case 3:
                const main = demoArea?.querySelector('#main');
                if (main) {
                    main.style.fontSize = '24px';
                    message = '✅ Відмінно! Текст став більшим!';
                } else {
                    success = false;
                    message = '❌ Не знайдено ID #main';
                }
                break;
            case 4:
                const h2 = demoArea?.querySelector('h2');
                if (h2) {
                    h2.style.color = 'green';
                    h2.style.textDecoration = 'underline';
                    message = '✅ Чудово! Заголовок зелений і підкреслений!';
                } else {
                    success = false;
                    message = '❌ Не знайдено заголовок h2';
                }
                break;
            case 5:
                const divP = demoArea?.querySelector('div p');
                if (divP) {
                    divP.style.fontWeight = 'bold';
                    message = '✅ Відмінно! Текст став жирним!';
                } else {
                    success = false;
                    message = '❌ Не знайдено div p';
                }
                break;
            case 6:
                const h3 = demoArea?.querySelector('h3');
                const h4 = demoArea?.querySelector('h4');
                if (h3 && h4) {
                    h3.style.color = 'purple';
                    h4.style.color = 'purple';
                    message = '✅ Супер! Обидва заголовки стали фіолетовими!';
                } else {
                    success = false;
                    message = '❌ Не знайдено h3 або h4';
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
                        const p = demoArea.querySelector('p');
                        if (p) p.style.color = '';
                        break;
                    case 2:
                        const highlight = demoArea.querySelector('.highlight');
                        if (highlight) highlight.style.background = '';
                        break;
                    case 3:
                        const main = demoArea.querySelector('#main');
                        if (main) main.style.fontSize = '';
                        break;
                    case 4:
                        const h2 = demoArea.querySelector('h2');
                        if (h2) {
                            h2.style.color = '';
                            h2.style.textDecoration = '';
                        }
                        break;
                    case 5:
                        const divP = demoArea.querySelector('div p');
                        if (divP) divP.style.fontWeight = '';
                        break;
                    case 6:
                        const h3 = demoArea.querySelector('h3');
                        const h4 = demoArea.querySelector('h4');
                        if (h3) h3.style.color = '';
                        if (h4) h4.style.color = '';
                        break;
                }
            }
        }
        this.updateProgress();
    }
}

// ==================== ГРА "ЗНАЙДИ ТА ВИПРАВ ПОМИЛКИ" ====================
class ErrorFixGame {
    static initialCode = `/* Знайди та виправ помилки */

h1 {
  color: red
  font-size: 32px;
}

. card {
  background: blue;
  padding: 20px
}

# main {
  width: 100%;
  height: auto;

p {
  color: green;
}`;

    static errorPatterns = [
        { pattern: /color:\s*red\s*$/, fix: 'color: red;', description: 'Відсутня крапка з комою після color: red' },
        { pattern: /\.\s+card/, fix: '.card', description: 'Зайвий пробіл після крапки в селекторі .card' },
        { pattern: /padding:\s*20px\s*$/, fix: 'padding: 20px;', description: 'Відсутня крапка з комою після padding: 20px' },
        { pattern: /#\s+main/, fix: '#main', description: 'Зайвий пробіл після # в селекторі #main' },
        { pattern: /height:\s*auto;\s*$/, fix: 'height: auto;\n}', description: 'Відсутня закриваюча дужка } після height: auto;' }
    ];

    static foundErrors = new Set();
    static totalErrors = 5;

    static init() {
        const editor = document.getElementById('errorCodeEditor');
        const preview = document.getElementById('errorPreviewFrame');
        
        if (editor) {
            editor.value = this.initialCode;
            this.updatePreview(editor.value);
            
            editor.addEventListener('input', () => {
                this.updatePreview(editor.value);
                this.checkErrors(editor.value);
            });
        }

        document.getElementById('resetErrorsBtn')?.addEventListener('click', () => {
            if (editor) {
                editor.value = this.initialCode;
                this.updatePreview(editor.value);
                this.foundErrors.clear();
                this.updateUI();
            }
        });

        document.getElementById('checkErrorsBtn')?.addEventListener('click', () => {
            if (editor) {
                this.checkErrors(editor.value, true);
            }
        });
    }

    static updatePreview(code) {
        const preview = document.getElementById('errorPreviewFrame');
        if (!preview) return;

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Попередній перегляд</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            padding: 30px;
            background: #f5f7fa;
            color: #1e2a3e;
            line-height: 1.6;
        }
        h1 {
            font-size: 28px;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 15px;
        }
        #main {
            font-size: 18px;
            color: #1e5f7a;
        }
        p {
            margin: 8px 0;
        }
        /* Стилі з редактора */
        ${code}
    </style>
</head>
<body>
    <h1>🐼 Моя улюблена тварина</h1>
    <div class="card">
        <p>Це текст, який має бути стилізованим.</p>
        <p id="main">Цей текст має бути синім або іншого кольору.</p>
    </div>
</body>
</html>`;
        
        preview.srcdoc = html;
    }

    static checkErrors(code, showFeedback = false) {
        const feedback = document.getElementById('errorsFeedback');
        const status = document.getElementById('errorStatus');
        const countEl = document.getElementById('errorsFound');
        
        this.foundErrors.clear();
        
        // Перевіряємо кожну помилку
        this.errorPatterns.forEach((error, index) => {
            let isFixed = false;
            
            switch(index) {
                case 0:
                    isFixed = /color:\s*red\s*;/.test(code);
                    break;
                case 1:
                    isFixed = /\.card/.test(code) && !/\.\s+card/.test(code);
                    break;
                case 2:
                    isFixed = /padding:\s*20px\s*;/.test(code);
                    break;
                case 3:
                    isFixed = /#main/.test(code) && !/#\s+main/.test(code);
                    break;
                case 4:
                    isFixed = /height:\s*auto;\s*\n\s*\}/.test(code);
                    break;
                default:
                    isFixed = true;
            }
            
            if (isFixed) {
                this.foundErrors.add(index);
            }
        });

        const found = this.foundErrors.size;
        countEl.textContent = `Знайдено: ${found} / ${this.totalErrors}`;

        if (found === this.totalErrors) {
            status.textContent = '✅ Всі помилки виправлено!';
            status.className = 'error-status success';
            if (showFeedback) {
                feedback.textContent = '🎉 Вітаю! Ти виправив усі 5 помилок!';
                feedback.className = 'success';
            }
        } else if (found > 0) {
            status.textContent = `⚠️ Виправлено ${found} з ${this.totalErrors}`;
            status.className = 'error-status partial';
            if (showFeedback) {
                const missing = this.totalErrors - found;
                feedback.textContent = `⚠️ Залишилося виправити ${missing} помилок. Продовжуй!`;
                feedback.className = 'error';
            }
        } else {
            status.textContent = '⏳ Очікує виправлення';
            status.className = 'error-status';
            if (showFeedback) {
                feedback.textContent = '🔍 Спробуй знайти всі 5 помилок у коді!';
                feedback.className = 'error';
            }
        }
    }

    static updateUI() {
        const countEl = document.getElementById('errorsFound');
        const status = document.getElementById('errorStatus');
        const feedback = document.getElementById('errorsFeedback');
        
        const found = this.foundErrors.size;
        countEl.textContent = `Знайдено: ${found} / ${this.totalErrors}`;
        
        if (found === this.totalErrors) {
            status.textContent = '✅ Всі помилки виправлено!';
            status.className = 'error-status success';
            feedback.textContent = '🎉 Вітаю! Ти виправив усі 5 помилок!';
            feedback.className = 'success';
        } else if (found > 0) {
            status.textContent = `⚠️ Виправлено ${found} з ${this.totalErrors}`;
            status.className = 'error-status partial';
            feedback.textContent = `⚠️ Залишилося виправити ${this.totalErrors - found} помилок.`;
            feedback.className = 'error';
        } else {
            status.textContent = '⏳ Очікує виправлення';
            status.className = 'error-status';
            feedback.textContent = '';
        }
    }
}

// ==================== ГРА "ПЕРЕТЯГУВАННЯ" ====================
class DragGame {
    static score = 0;
    static totalItems = 5;
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
    
    // Створюємо прогрес-бар
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
        
        // Зберігаємо стан у localStorage
        const states = items.map(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            return checkbox ? checkbox.checked : false;
        });
        localStorage.setItem('cssChecklist', JSON.stringify(states));
    };

    // Завантажуємо збережений стан
    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('cssChecklist'));
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

    // Додаємо обробники для чекбоксів
    items.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (checkbox) {
            // Клік на весь рядок
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

    // Кнопка скидання
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

    // Завантажуємо стан
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
    ErrorFixGame.init();
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