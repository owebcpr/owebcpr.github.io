// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    codeEditor: document.querySelector('#htmlCodeEditor'),
    previewFrame: document.querySelector('#previewFrame'),
    runBtn: document.querySelector('#runCodeBtn'),
    clearBtn: document.querySelector('#clearCodeBtn'),
    loadExampleBtn: document.querySelector('#loadExampleBtn'),
    showSolutionBtn: document.querySelector('#showSolutionBtn'),
    solutionContent: document.querySelector('#solutionContent'),
    checklist: document.querySelector('#challengeChecklist'),
    resetChecklistBtn: document.querySelector('#resetChecklistBtn'),
    quizCssContainer: document.querySelector('#quizCssContainer'),
    quizCssFeedback: document.querySelector('#quizCssFeedback'),
    checkCssQuizBtn: document.querySelector('#checkCssQuizBtn'),
    resetCssQuizBtn: document.querySelector('#resetCssQuizBtn'),
    quizControlContainer: document.querySelector('#quizControlContainer'),
    quizControlFeedback: document.querySelector('#quizControlFeedback'),
    checkControlQuizBtn: document.querySelector('#checkControlQuizBtn'),
    resetControlQuizBtn: document.querySelector('#resetControlQuizBtn'),
    randomFactBtn: document.querySelector('#randomFactBtn'),
    factDisplay: document.querySelector('#randomFactDisplay'),
    tasksCompleted: document.querySelector('#tasksCompleted'),
    tasksTotal: document.querySelector('#tasksTotal'),
    progressMessage: document.querySelector('#progressMessage'),
};

// ==================== ДАНІ ДЛЯ ВІКТОРИН ====================
const CSS_QUIZ = [
    { 
        text: "Який спосіб підключення CSS має найвищий пріоритет?", 
        options: ["Inline", "Внутрішній", "Зовнішній", "Однаковий"], 
        correct: 0 
    },
    { 
        text: "Який селектор використовується для класу?", 
        options: ["#id", ".class", "тег", "*"], 
        correct: 1 
    },
    { 
        text: "Який тег використовується для внутрішнього CSS?", 
        options: ["&lt;css&gt;", "&lt;style&gt;", "&lt;link&gt;", "&lt;script&gt;"], 
        correct: 1 
    },
    { 
        text: "Що означає CSS?", 
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Color Style Sheets"], 
        correct: 1 
    }
];

const CONTROL_QUIZ = [
    { 
        text: "Скільки способів підключення CSS існує?", 
        options: ["2", "3", "4", "1"], 
        correct: 1 
    },
    { 
        text: "Який спосіб підключення CSS найкращий для SEO?", 
        options: ["Inline", "Внутрішній", "Зовнішній", "Всі однакові"], 
        correct: 2 
    },
    { 
        text: "Який селектор застосовується до всіх елементів?", 
        options: ["*", ".", "#", "тег"], 
        correct: 0 
    },
    { 
        text: "Який атрибут використовується для inline-стилів?", 
        options: ["class", "id", "style", "css"], 
        correct: 2 
    }
];

// ==================== ДАНІ ДЛЯ РЕДАКТОРА ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Панда</title>
<style>
    body { background: #f0f8ff; font-family: 'Segoe UI', sans-serif; }
    .card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin: 20px; }
    h1 { color: #2c3e50; }
    .highlight { background: #ffd966; padding: 0 5px; }
</style>
</head>
<body>
<div class="card">
    <h1 style="color:#1e5f7a;">🐼 Панда</h1>
    <h2>Опис</h2>
    <p>Панда — <strong>рідкісна</strong> тварина, що живе в Китаї. <em>Чорно-біле забарвлення</em> робить її впізнаваною.</p>
    <h2>Факти</h2>
    <ul><li>Їсть <span class="highlight">14 годин</span> на день</li><li>Має <strong>6 пальців</strong> на лапах</li></ul>
</div>
</body>
</html>`;

const FACTS = [
    "CSS був створений у 1996 році Хоконом Віум Лі.",
    "Перший браузер, що підтримав CSS — Internet Explorer 3.0.",
    "CSS3 додав анімації, Flexbox та Grid.",
    "Зовнішній CSS кешується браузером, що прискорює завантаження.",
    "Сьогодні CSS — це мова, що постійно оновлюється."
];

// ==================== ІНТЕРАКТИВНІ ЗАВДАННЯ-ПРИКЛАДИ ====================
class TaskExamples {
    static completedTasks = new Set();
    static totalTasks = 5;

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
                if (h1) {
                    h1.style.color = 'red';
                    message = '✅ Чудово! Тепер заголовок червоний!';
                } else {
                    success = false;
                    message = '❌ Не знайдено заголовок h1';
                }
                break;
            case 2:
                if (demoArea) {
                    demoArea.style.fontFamily = "'Courier New', monospace";
                    message = '✅ Супер! Текст став як у редакторі коду!';
                } else {
                    success = false;
                    message = '❌ Не знайдено область демонстрації';
                }
                break;
            case 3:
                if (demoArea) {
                    demoArea.style.background = '#ffd93d';
                    message = '✅ Відмінно! Яскравий жовтий фон привертає увагу!';
                } else {
                    success = false;
                    message = '❌ Не знайдено область демонстрації';
                }
                break;
            case 4:
                const h1_4 = demoArea?.querySelector('h1');
                if (h1_4) {
                    h1_4.style.fontSize = '2.5rem';
                    message = '✅ Чудово! Заголовок став великим та помітним!';
                } else {
                    success = false;
                    message = '❌ Не знайдено заголовок h1';
                }
                break;
            case 5:
                if (demoArea) {
                    demoArea.style.background = '#a8e6cf';
                    message = '✅ Відмінно! М\'ятний фон створює відчуття свіжості!';
                } else {
                    success = false;
                    message = '❌ Не знайдено область демонстрації';
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
                        if (h1) h1.style.color = '';
                        break;
                    case 2:
                        demoArea.style.fontFamily = '';
                        break;
                    case 3:
                        demoArea.style.background = '';
                        break;
                    case 4:
                        const h1_4 = demoArea.querySelector('h1');
                        if (h1_4) h1_4.style.fontSize = '';
                        break;
                    case 5:
                        demoArea.style.background = 'white';
                        break;
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
    DOM.showSolutionBtn?.addEventListener('click', () => DOM.solutionContent?.classList.toggle('show'));
    if (DOM.previewFrame) DOM.previewFrame.srcdoc = DEFAULT_CODE;
}

// ==================== ЧЕКЛІСТ ====================
function initChecklist() {
    const items = DOM.checklist ? [...DOM.checklist.querySelectorAll('li')] : [];
    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('cssChecklist'));
            if (saved) items.forEach((li, i) => { 
                if (saved[i]) li.classList.add('completed');
                else li.classList.remove('completed'); 
            });
        } catch (e) {}
    };
    const saveState = () => {
        const states = items.map(li => li.classList.contains('completed'));
        localStorage.setItem('cssChecklist', JSON.stringify(states));
    };
    loadState();
    items.forEach(li => li.addEventListener('click', () => { 
        li.classList.toggle('completed');
        saveState(); 
    }));
    DOM.resetChecklistBtn?.addEventListener('click', () => { 
        items.forEach(li => li.classList.remove('completed'));
        saveState(); 
    });
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

    // Вікторина CSS (теоретична частина) - використовуємо ID напряму
    const cssAnswers = new Array(CSS_QUIZ.length).fill(null);
    renderQuiz('quizCssContainer', CSS_QUIZ, cssAnswers);
    
    DOM.checkCssQuizBtn?.addEventListener('click', () => {
        checkQuiz('quizCssFeedback', CSS_QUIZ, cssAnswers);
    });
    
    DOM.resetCssQuizBtn?.addEventListener('click', () => { 
        cssAnswers.fill(null);
        renderQuiz('quizCssContainer', CSS_QUIZ, cssAnswers);
        const feedback = document.getElementById('quizCssFeedback');
        if (feedback) feedback.innerHTML = '';
    });

    // Контрольна вікторина (практична частина)
    const controlAnswers = new Array(CONTROL_QUIZ.length).fill(null);
    renderQuiz('quizControlContainer', CONTROL_QUIZ, controlAnswers);
    
    DOM.checkControlQuizBtn?.addEventListener('click', () => {
        checkQuiz('quizControlFeedback', CONTROL_QUIZ, controlAnswers);
    });
    
    DOM.resetControlQuizBtn?.addEventListener('click', () => { 
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
    resetTasksBtn.className = 'btn-clear';
    resetTasksBtn.style.marginTop = '15px';
    resetTasksBtn.addEventListener('click', () => TaskExamples.resetTasks());
    const taskProgress = document.querySelector('.task-progress');
    if (taskProgress) {
        taskProgress.after(resetTasksBtn);
    }
    
    console.log('Ініціалізація завершена!');
});