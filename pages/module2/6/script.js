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

// ==================== ФАКТИ ПРО ШРИФТИ ====================
const FONTS_FACTS = [
    "📜 Найстаріший шрифт, який досі використовується — Times New Roman (створений у 1931 році).",
    "🖥️ Шрифт Arial був створений у 1982 році як дешева альтернатива Helvetica.",
    "📚 Шрифт Georgia був створений спеціально для читання на екранах моніторів у 1996 році.",
    "🎨 Google Fonts має понад 1500 безкоштовних шрифтів для використання на сайтах.",
    "🔤 Слово 'serif' (засічки) походить від нідерландського 'schreef' — 'риска'.",
    "📱 Шрифт Roboto був створений компанією Google спеціально для Android.",
    "💻 WOFF2 — це стиснений формат шрифтів, який завантажується на 30% швидше за WOFF.",
    "🌍 Найпопулярніший шрифт Google Fonts — Open Sans, його використовують мільйони сайтів."
];

// ==================== ПИТАННЯ ДЛЯ ВІКТОРИНИ ====================
const FONTS_QUIZ = [
    {
        text: "Яке CSS-правило використовується для підключення шрифту з сервера?",
        options: ["@import", "@font-face", "@media", "@keyframes"],
        correct: 1
    },
    {
        text: "Який формат шрифту є найкращим для сучасних браузерів?",
        options: ["EOT", "TTF", "WOFF2", "SVG"],
        correct: 2
    },
    {
        text: "Як підключити Google Font через HTML?",
        options: [
            "&lt;link href='...' rel='stylesheet'&gt;",
            "&lt;script src='...'&gt;",
            "&lt;style src='...'&gt;",
            "&lt;font src='...'&gt;"
        ],
        correct: 0
    },
    {
        text: "Що таке 'sans-serif'?",
        options: ["Шрифт із засічками", "Шрифт без засічок", "Моноширинний шрифт", "Декоративний шрифт"],
        correct: 1
    },
    {
        text: "Яка властивість відповідає за сімейство шрифту?",
        options: ["font-style", "font-weight", "font-family", "font-size"],
        correct: 2
    },
    {
        text: "Як підключити Google Font через CSS (у стилях)?",
        options: [
            "@import url('https://fonts.googleapis.com/css2?family=Roboto');",
            "&lt;link href='...' rel='stylesheet'&gt;",
            "font-family: 'Roboto';",
            "@font-face { src: url('Roboto.woff2'); }"
        ],
        correct: 0
    },
    {
        text: "Що таке 'serif'?",
        options: ["Шрифт із засічками", "Шрифт без засічок", "Моноширинний шрифт", "Рукописний шрифт"],
        correct: 0
    },
    {
        text: "Який з цих шрифтів є стандартним (встановлений на комп'ютері)?",
        options: ["Roboto", "Open Sans", "Arial", "Montserrat"],
        correct: 2
    },
    {
        text: "Що таке WOFF2?",
        options: [
            "Формат зображення",
            "Стиснений формат шрифту",
            "Мова програмування",
            "Тип файлу для відео"
        ],
        correct: 1
    },
    {
        text: "Як правильно вказати шрифт у CSS, якщо він складається з двох слів?",
        options: [
            "font-family: Times New Roman;",
            "font-family: 'Times New Roman';",
            "font-family: Times-New-Roman;",
            "font-family: Times_New_Roman;"
        ],
        correct: 1
    }
];
// ==================== ДАНІ ДЛЯ ГРИ "ВГАДАЙ ШРИФТ" ====================
const FONT_QUESTIONS = [
    { font: "'Roboto', sans-serif", display: 'Roboto', correct: 'Roboto', options: ['Roboto', 'Arial', 'Georgia', 'Open Sans'] },
    { font: "Georgia, serif", display: 'Georgia', correct: 'Georgia', options: ['Georgia', 'Times New Roman', 'Arial', 'Courier New'] },
    { font: "'Courier New', monospace", display: 'Courier New', correct: 'Courier New', options: ['Courier New', 'Arial', 'Georgia', 'Impact'] },
    { font: "'Open Sans', sans-serif", display: 'Open Sans', correct: 'Open Sans', options: ['Open Sans', 'Roboto', 'Lora', 'Montserrat'] },
    { font: "Arial, Helvetica, sans-serif", display: 'Arial', correct: 'Arial', options: ['Arial', 'Times New Roman', 'Georgia', 'Courier New'] },
    { font: "'Lora', serif", display: 'Lora', correct: 'Lora', options: ['Lora', 'Roboto', 'Georgia', 'Playfair Display'] },
    { font: "Impact, sans-serif", display: 'Impact', correct: 'Impact', options: ['Impact', 'Arial', 'Georgia', 'Courier New'] },
    { font: "'Montserrat', sans-serif", display: 'Montserrat', correct: 'Montserrat', options: ['Montserrat', 'Roboto', 'Open Sans', 'Lora'] }
];

// ==================== ПРАВИЛЬНІ ВІДПОВІДІ ДЛЯ ЗАВДАНЬ ====================
const TASK_ANSWERS = {
    1: {
        property: 'font-family',
        validValues: [
            'Georgia, serif',
            'Georgia',
            '"Georgia", serif',
            '"Georgia"',
            'Georgia,serif'
        ]
    },
    2: {
        property: 'font-family',
        validValues: [
            "'Roboto', sans-serif",
            '"Roboto", sans-serif',
            'Roboto, sans-serif',
            "'Roboto'",
            '"Roboto"',
            'Roboto'
        ]
    },
    3: {
        property: 'font-weight',
        validValues: ['bold', '700']
    },
    4: {
        property: 'font-style',
        validValues: ['italic']
    },
    5: {
        property: 'font-family',
        validValues: ['Georgia, serif', 'Georgia', '"Georgia", serif', '"Georgia"', 'Georgia,serif'],
        secondProperty: 'font-weight',
        secondValidValues: ['bold', '700'],
        thirdProperty: 'font-style',
        thirdValidValues: ['italic']
    },
    6: {
        fontFamily: ["'MyCustomFont'", '"MyCustomFont"', 'MyCustomFont'],
        src: [
            // Варіанти БЕЗ крапки з комою
            "url('fonts/MyFont.woff2') format('woff2')",
            'url("fonts/MyFont.woff2") format("woff2")',
            "url('fonts/MyFont.woff2') format('woff2'), url('fonts/MyFont.woff') format('woff')",
            'url("fonts/MyFont.woff2") format("woff2"), url("fonts/MyFont.woff") format("woff")',
            // Варіанти З крапкою з комою
            "url('fonts/MyFont.woff2') format('woff2');",
            'url("fonts/MyFont.woff2") format("woff2");',
            "url('fonts/MyFont.woff2') format('woff2'), url('fonts/MyFont.woff') format('woff');",
            'url("fonts/MyFont.woff2") format("woff2"), url("fonts/MyFont.woff") format("woff");'
        ],
        fontWeight: ['normal', '400'],
        fontStyle: ['normal']
    }
};

// ==================== ІНТЕРАКТИВНА ДЕМОНСТРАЦІЯ ШРИФТІВ ====================
class FontDemo {
    static init() {
        const buttons = document.querySelectorAll('.demo-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyStyle(e, btn));
        });
        
        this.setInitialState();
    }

    static setInitialState() {
        const weightNormal = document.querySelector('.style-btn[data-group="weight"][data-value="normal"]');
        if (weightNormal) weightNormal.classList.add('active');
        
        const styleNormal = document.querySelector('.style-btn[data-group="style"][data-value="normal"]');
        if (styleNormal) styleNormal.classList.add('active');
    }

    static applyStyle(e, btn) {
        const targetId = btn.dataset.target;
        const property = btn.dataset.property;
        const value = btn.dataset.value;

        const target = document.getElementById(targetId);
        if (!target) return;

        if (btn.classList.contains('style-reset')) {
            target.style.fontWeight = '';
            target.style.fontStyle = '';
            target.style.textTransform = '';
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            this.setInitialState();
            return;
        }

        const group = btn.dataset.group;
        if (group) {
            document.querySelectorAll(`.style-btn[data-group="${group}"]`).forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
        }

        if (property) {
            target.style[property] = value;
        }
    }
}

// ==================== ГРА "ВГАДАЙ ШРИФТ" ====================
class FontGuessGame {
    static currentQuestion = 0;
    static score = 0;
    static totalQuestions = 0;
    static isAnswered = false;

    static init() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.isAnswered = false;
        this.showQuestion();

        document.getElementById('nextFontGuessBtn')?.addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static showQuestion() {
        if (this.currentQuestion >= FONT_QUESTIONS.length) {
            const box = document.getElementById('guessFontBox');
            const options = document.getElementById('guessFontOptions');
            const feedback = document.getElementById('guessFontFeedback');

            box.style.fontFamily = "'Segoe UI', sans-serif";
            box.textContent = '🎉 Вітаю! Ти пройшов усі питання!';
            box.style.background = '#d4edda';
            options.innerHTML = '';
            feedback.innerHTML = '';
            document.getElementById('guessFontScore').textContent = this.score;
            document.getElementById('guessFontTotal').textContent = this.totalQuestions;
            document.getElementById('nextFontGuessBtn').style.display = 'none';
            return;
        }

        const q = FONT_QUESTIONS[this.currentQuestion];
        this.totalQuestions++;
        this.isAnswered = false;

        const box = document.getElementById('guessFontBox');
        box.style.fontFamily = q.font;
        box.textContent = 'Це приклад шрифту';
        box.style.background = '#f8f9fa';

        const options = document.getElementById('guessFontOptions');
        const shuffledOptions = this.shuffleArray([...q.options]);

        options.innerHTML = shuffledOptions.map(opt => `
            <button class="guess-option" data-value="${opt}" data-correct="${opt === q.correct}">
                ${opt}
            </button>
        `).join('');

        options.querySelectorAll('.guess-option').forEach(btn => {
            btn.addEventListener('click', () => this.checkAnswer(btn, q));
        });

        const feedback = document.getElementById('guessFontFeedback');
        feedback.innerHTML = '';
        feedback.className = 'guess-feedback';

        document.getElementById('guessFontScore').textContent = this.score;
        document.getElementById('guessFontTotal').textContent = this.totalQuestions;
        document.getElementById('nextFontGuessBtn').style.display = 'inline-block';
    }

    static checkAnswer(btn, q) {
        if (this.isAnswered) return;
        this.isAnswered = true;

        const isCorrect = btn.dataset.correct === 'true';
        const feedback = document.getElementById('guessFontFeedback');

        document.querySelectorAll('.guess-option').forEach(b => b.disabled = true);

        if (isCorrect) {
            this.score++;
            btn.classList.add('correct');
            feedback.textContent = `✅ Правильно! Це шрифт ${q.correct}`;
            feedback.className = 'guess-feedback correct';
        } else {
            btn.classList.add('wrong');
            document.querySelectorAll('.guess-option').forEach(b => {
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                }
            });
            feedback.textContent = `❌ Неправильно. Правильна відповідь: ${q.correct}`;
            feedback.className = 'guess-feedback wrong';
        }

        document.getElementById('guessFontScore').textContent = this.score;
        document.getElementById('guessFontTotal').textContent = this.totalQuestions;
    }

    static nextQuestion() {
        if (!this.isAnswered && this.currentQuestion < FONT_QUESTIONS.length) {
            const feedback = document.getElementById('guessFontFeedback');
            feedback.textContent = '⚠️ Спочатку обери відповідь!';
            feedback.className = 'guess-feedback wrong';
            return;
        }
        this.currentQuestion++;
        this.showQuestion();
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
                    const taskId = input.id.replace('input', '').replace(/[a-z]/g, '');
                    const btn = document.querySelector(`.btn-apply[data-task="${taskId}"]`);
                    if (btn) btn.click();
                }
            });
        });

        this.updateProgress();
    }

    static parseStyles(input) {
        const parts = input.split(';').filter(p => p.trim());
        const styles = [];

        for (const part of parts) {
            const trimmed = part.trim();
            const match = trimmed.match(/^\s*([a-zA-Z-]+)\s*:\s*(.+?)\s*$/);
            if (match) {
                styles.push({
                    property: match[1].trim(),
                    value: match[2].trim()
                });
            }
        }
        return styles;
    }

    static isValueValid(value, validValues) {
        if (!validValues) return false;
        const normalizedValue = value.toLowerCase().replace(/\s+/g, ' ');
        return validValues.some(valid => {
            const normalizedValid = String(valid).toLowerCase().replace(/\s+/g, ' ');
            return normalizedValue === normalizedValid;
        });
    }

    static applyTask(e) {
        const btn = e.currentTarget;
        const taskId = parseInt(btn.dataset.task);
        const taskElement = document.getElementById(`task${taskId}`);
        const statusEl = document.getElementById(`task${taskId}Status`);
        const resultEl = document.getElementById(`result${taskId}`);
        const demoArea = document.getElementById(`demo${taskId}`);

        if (this.completedTasks.has(taskId)) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '✅ Це завдання вже виконано!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            return;
        }

        // Для завдання 6 (спеціальна обробка)
        if (taskId === 6) {
            this.applyTask6(btn, taskElement, statusEl, resultEl);
            return;
        }

        const input = document.getElementById(`input${taskId}`);
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

        const expected = TASK_ANSWERS[taskId];
        const styles = this.parseStyles(userInput);
        let isCorrect = false;

        // Для завдання 5 (три стилі)
        if (taskId === 5) {
            if (styles.length >= 3) {
                const fontFamily = styles.find(s => s.property.toLowerCase() === 'font-family');
                const fontWeight = styles.find(s => s.property.toLowerCase() === 'font-weight');
                const fontStyle = styles.find(s => s.property.toLowerCase() === 'font-style');

                const hasFont = fontFamily && this.isValueValid(fontFamily.value, expected.validValues);
                const hasWeight = fontWeight && this.isValueValid(fontWeight.value, expected.secondValidValues);
                const hasStyle = fontStyle && this.isValueValid(fontStyle.value, expected.thirdValidValues);

                isCorrect = hasFont && hasWeight && hasStyle;
            }
        } else {
            // Для звичайних завдань
            if (styles.length === 1) {
                const style = styles[0];
                const propMatch = style.property.toLowerCase() === expected.property.toLowerCase();
                const valMatch = this.isValueValid(style.value, expected.validValues);
                isCorrect = propMatch && valMatch;
            }
        }

        if (isCorrect) {
            // Застосовуємо стиль
            const p = demoArea.querySelector('p');
            if (p) {
                if (taskId === 5) {
                    p.style.fontFamily = 'Georgia, serif';
                    p.style.fontWeight = 'bold';
                    p.style.fontStyle = 'italic';
                } else {
                    p.style[expected.property] = expected.validValues[0];
                }
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

    static applyTask6(btn, taskElement, statusEl, resultEl) {
        const inputs = {
            family: document.getElementById('input6a'),
            src: document.getElementById('input6b'),
            weight: document.getElementById('input6c'),
            style: document.getElementById('input6d')
        };

        for (const key in inputs) {
            if (!inputs[key]) {
                if (resultEl) {
                    resultEl.className = 'task-result';
                    resultEl.textContent = '❌ Помилка: не знайдено поле вводу';
                    resultEl.style.display = 'block';
                    resultEl.className = 'task-result error';
                }
                return;
            }
        }

        const familyVal = inputs.family.value.trim();
        const srcVal = inputs.src.value.trim();
        const weightVal = inputs.weight.value.trim();
        const styleVal = inputs.style.value.trim();

        if (!familyVal || !srcVal || !weightVal || !styleVal) {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '⚠️ Будь ласка, заповни всі поля!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
            return;
        }

        const expected = TASK_ANSWERS[6];
        
        const isFamilyCorrect = this.isValueValid(familyVal, expected.fontFamily);
        const isSrcCorrect = this.isValueValid(srcVal, expected.src);
        const isWeightCorrect = this.isValueValid(weightVal, expected.fontWeight);
        const isStyleCorrect = this.isValueValid(styleVal, expected.fontStyle);

        const isCorrect = isFamilyCorrect && isSrcCorrect && isWeightCorrect && isStyleCorrect;

        let errors = [];
        if (!isFamilyCorrect) errors.push('font-family');
        if (!isSrcCorrect) errors.push('src');
        if (!isWeightCorrect) errors.push('font-weight');
        if (!isStyleCorrect) errors.push('font-style');

        if (isCorrect) {
            this.completedTasks.add(6);
            if (taskElement) taskElement.classList.add('completed');
            if (statusEl) {
                statusEl.textContent = '✅ Виконано!';
                statusEl.style.color = '#27ae60';
            }
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = '🎉 Чудово! @font-face написано правильно!';
                resultEl.style.display = 'block';
                resultEl.className = 'task-result success';
            }
            Object.values(inputs).forEach(inp => {
                inp.classList.add('correct');
                inp.classList.remove('wrong');
            });
            btn.disabled = true;
            this.updateProgress();
        } else {
            if (resultEl) {
                resultEl.className = 'task-result';
                resultEl.textContent = `❌ Перевір правильність полів: ${errors.join(', ')}`;
                resultEl.style.display = 'block';
                resultEl.className = 'task-result error';
            }
            Object.keys(inputs).forEach(key => {
                const inp = inputs[key];
                const isFieldCorrect = {
                    family: isFamilyCorrect,
                    src: isSrcCorrect,
                    weight: isWeightCorrect,
                    style: isStyleCorrect
                }[key];
                
                if (!isFieldCorrect) {
                    inp.classList.add('wrong');
                    setTimeout(() => inp.classList.remove('wrong'), 2000);
                } else {
                    inp.classList.add('correct');
                    setTimeout(() => inp.classList.remove('correct'), 2000);
                }
            });
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

            if (i === 6) {
                ['input6a', 'input6b', 'input6c', 'input6d'].forEach(id => {
                    const inp = document.getElementById(id);
                    if (inp) {
                        inp.value = '';
                        inp.classList.remove('correct', 'wrong');
                    }
                });
            } else {
                const input = document.getElementById(`input${i}`);
                if (input) {
                    input.value = '';
                    input.classList.remove('correct', 'wrong');
                }
            }

            if (hintEl) {
                hintEl.style.display = 'none';
            }

            if (demoArea) {
                const p = demoArea.querySelector('p');
                if (p) {
                    p.style.fontFamily = '';
                    p.style.fontWeight = '';
                    p.style.fontStyle = '';
                    p.style.textTransform = '';
                }
            }
        }
        this.updateProgress();
    }
}

// ==================== РЕДАКТОР КОДУ ====================
function initEditor() {
    const defaultCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Мої улюблені шрифти</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
            background: #f5f7fa;
        }
        h1 {
            font-family: 'Playfair Display', serif;
            text-align: center;
            color: #1e5f7a;
            font-size: 36px;
        }
        .roboto {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 20px;
            color: #2c3e50;
        }
        .dancing {
            font-family: 'Dancing Script', cursive;
            font-size: 24px;
            color: #8e44ad;
        }
        .standard {
            font-family: Georgia, serif;
            font-style: italic;
            color: #27ae60;
        }
        .font-box {
            padding: 20px;
            margin: 15px 0;
            background: white;
            border-radius: 12px;
            border: 1px solid #e0e0e0;
        }
        .font-label {
            display: inline-block;
            background: #1e5f7a;
            color: white;
            padding: 2px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-family: 'Segoe UI', sans-serif;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>🎨 Мої улюблені шрифти</h1>
    
    <div class="font-box">
        <span class="font-label">Google Fonts</span>
        <span class="roboto">Це шрифт Roboto — сучасний та читабельний</span>
    </div>
    
    <div class="font-box">
        <span class="font-label">Google Fonts</span>
        <span class="dancing">Це шрифт Dancing Script — елегантний та рукописний</span>
    </div>
    
    <div class="font-box">
        <span class="font-label">Стандартний</span>
        <span class="standard">Це шрифт Georgia — класичний із засічками</span>
    </div>
    
    <div class="font-box">
        <span class="font-label">Стандартний</span>
        <span style="font-family: 'Courier New', monospace; font-weight: bold;">
            Це шрифт Courier New — моноширинний
        </span>
    </div>
</body>
</html>`;

    if (DOM.codeEditor) DOM.codeEditor.value = defaultCode;

    DOM.runBtn?.addEventListener('click', () => {
        if (DOM.previewFrame) DOM.previewFrame.srcdoc = DOM.codeEditor.value;
    });

    DOM.clearBtn?.addEventListener('click', () => {
        DOM.codeEditor.value = '';
        DOM.previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;">👈 Напиши код і натисни "Запустити"</body></html>';
    });

    DOM.loadExampleBtn?.addEventListener('click', () => {
        DOM.codeEditor.value = defaultCode;
        DOM.previewFrame.srcdoc = defaultCode;
    });

    if (DOM.previewFrame) DOM.previewFrame.srcdoc = defaultCode;
}

// ==================== ВІКТОРИНА ====================
function renderFontsQuiz(questions, userAnswers) {
    const container = document.getElementById('quizFontsContainer');
    if (!container) {
        console.error('Контейнер quizFontsContainer не знайдено!');
        return;
    }

    const html = questions.map((q, idx) => {
        // Переконуємося, що опції існують
        if (!q.options || q.options.length === 0) {
            console.error('Немає опцій для питання', idx);
            return '';
        }
        
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

    console.log('Згенерований HTML:', html);
    container.innerHTML = html;

    container.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', function() {
            const q = parseInt(this.dataset.q);
            const o = parseInt(this.dataset.o);
            // Якщо клікнули на ту ж опцію - знімаємо вибір
            userAnswers[q] = (userAnswers[q] === o) ? null : o;
            renderFontsQuiz(questions, userAnswers);
        });
    });
}

function checkFontsQuiz(questions, userAnswers) {
    const feedback = document.getElementById('quizFontsFeedback');
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

// ==================== ЧЕКЛІСТ ====================
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
        localStorage.setItem('fontsChecklist', JSON.stringify(states));
    };

    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('fontsChecklist'));
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

// ==================== ВИПАДКОВИЙ ФАКТ ====================
function initRandomFact() {
    DOM.randomFactBtn?.addEventListener('click', () => {
        const fact = FONTS_FACTS[Math.floor(Math.random() * FONTS_FACTS.length)];
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
    FontDemo.init();
    FontGuessGame.init();

    // Вікторина
    const fontsAnswers = new Array(FONTS_QUIZ.length).fill(null);
    renderFontsQuiz(FONTS_QUIZ, fontsAnswers);

    document.getElementById('checkFontsQuizBtn')?.addEventListener('click', () => {
        checkFontsQuiz(FONTS_QUIZ, fontsAnswers);
    });

    document.getElementById('resetFontsQuizBtn')?.addEventListener('click', () => {
        fontsAnswers.fill(null);
        renderFontsQuiz(FONTS_QUIZ, fontsAnswers);
        const feedback = document.getElementById('quizFontsFeedback');
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