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
        text: "Який спосіб задання кольору використовує #ff0000?", 
        options: ["Назва", "HEX", "RGB", "RGBA"], 
        correct: 1 
    },
    { 
        text: "Що означає 'a' у записі rgba(255,0,0,0.5)?", 
        options: ["Колір", "Яскравість", "Прозорість", "Розмір"], 
        correct: 2 
    },
    { 
        text: "Яка властивість відповідає за колір тексту?", 
        options: ["background-color", "color", "text-color", "font-color"], 
        correct: 1 
    },
    { 
        text: "Яке значення RGBA робить колір повністю прозорим?", 
        options: ["rgba(255,0,0,1)", "rgba(255,0,0,0)", "rgba(255,0,0,0.5)", "rgba(0,0,0,1)"], 
        correct: 1 
    },
    { 
        text: "Як записати білий колір у HEX?", 
        options: ["#000", "#fff", "#ffffff", "обидва B і C"], 
        correct: 3 
    }
];

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Веселка кольорів</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            padding: 30px;
            max-width: 700px;
            margin: 0 auto;
            background: #f5f7fa;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            font-size: 32px;
        }
        .color-block {
            padding: 20px;
            margin: 10px 0;
            border-radius: 12px;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
        }
        .color-name {
            color: #e74c3c;
        }
        .color-hex {
            color: #3498db;
        }
        .color-rgb {
            color: rgb(39, 174, 96);
        }
        .bg-name {
            background-color: #ffd93d;
            padding: 20px;
            border-radius: 12px;
        }
        .bg-hex {
            background-color: #ff6b6b;
            color: white;
            padding: 20px;
            border-radius: 12px;
        }
        .bg-rgb {
            background-color: rgb(52, 152, 219);
            color: white;
            padding: 20px;
            border-radius: 12px;
        }
        .bg-rgba {
            background-color: rgba(231, 76, 60, 0.3);
            padding: 20px;
            border-radius: 12px;
            border: 2px solid rgba(231, 76, 60, 0.5);
        }
        .rainbow {
            display: flex;
            gap: 5px;
            margin: 20px 0;
            border-radius: 12px;
            overflow: hidden;
            height: 60px;
        }
        .rainbow div {
            flex: 1;
            text-align: center;
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>🎨 Веселка кольорів</h1>
    
    <p class="color-name">Цей текст червоний (color: #e74c3c)</p>
    <p class="color-hex">Цей текст синій (color: #3498db)</p>
    <p class="color-rgb">Цей текст зелений (color: rgb(39, 174, 96))</p>
    
    <div class="bg-name">Жовтий фон (background-color: #ffd93d)</div>
    <div class="bg-hex">Червоний фон (background-color: #ff6b6b)</div>
    <div class="bg-rgb">Синій фон (background-color: rgb(52, 152, 219))</div>
    <div class="bg-rgba">Напівпрозорий червоний фон (rgba(231, 76, 60, 0.3))</div>
    
    <div class="rainbow">
        <div style="background:#ff0000;">red</div>
        <div style="background:#ff7f00;">orange</div>
        <div style="background:#ffff00;color:#333;">yellow</div>
        <div style="background:#00ff00;color:#333;">green</div>
        <div style="background:#0000ff;">blue</div>
        <div style="background:#4b0082;">indigo</div>
        <div style="background:#8b00ff;">violet</div>
    </div>
</body>
</html>`;

const FACTS = [
    "Людське око може розрізняти близько 10 мільйонів кольорів.",
    "Червоний колір був першим кольором, який отримав назву в багатьох мовах.",
    "HEX-код #000000 — це чорний, а #ffffff — білий.",
    "В CSS можна використовувати 140 стандартних назв кольорів.",
    "Колір 'rebeccapurple' був доданий у CSS на честь Ребекки Меєр.",
    "Перші веб-сторінки підтримували лише 16 кольорів.",
    "RGB-модель була створена для роботи з моніторами комп'ютерів."
];

// ==================== ПРАВИЛЬНІ ВІДПОВІДІ ДЛЯ ЗАВДАНЬ ====================
const TASK_ANSWERS = {
    1: { 
        property: 'color', 
        validValues: ['blue', '#0000ff', '#00f', 'rgb(0,0,255)', 'rgb(0, 0, 255)'] 
    },
    2: { 
        property: 'color', 
        validValues: ['red', '#ff0000', '#f00', 'rgb(255,0,0)', 'rgb(255, 0, 0)', '#e74c3c'] 
    },
    3: { 
        property: 'color', 
        validValues: ['green', '#00ff00', '#0f0', 'rgb(0,255,0)', 'rgb(0, 255, 0)', '#27ae60'] 
    },
    4: { 
        property: 'background-color', 
        validValues: ['yellow', '#ffff00', '#ff0', 'rgb(255,255,0)', 'rgb(255, 255, 0)', '#ffd93d'] 
    },
    5: { 
        property: 'color', 
        validValues: ['white', '#ffffff', '#fff'],
        secondProperty: 'background-color',
        secondValidValues: ['#2c3e50', 'rgb(44,62,80)', 'rgb(44, 62, 80)']
    },
    6: { 
        property: 'background-color', 
        validValues: [
            'rgba(255,0,0,0.3)', 
            'rgba(255, 0, 0, 0.3)', 
            'rgba(255,0,0,0.3);',
            'rgba(255, 0, 0, 0.3);'
        ] 
    }
};

// ==================== ДАНІ ДЛЯ ГРИ "ВГАДАЙ КОЛІР" ====================
const COLOR_QUESTIONS = [
    { color: '#e74c3c', display: 'Червоний', correct: '#e74c3c', options: ['red', '#e74c3c', 'rgb(255,0,0)', 'rgba(255,0,0,1)'] },
    { color: '#3498db', display: 'Синій', correct: '#3498db', options: ['blue', '#3498db', 'rgb(52,152,219)', 'rgba(52,152,219,1)'] },
    { color: '#2ecc71', display: 'Зелений', correct: '#2ecc71', options: ['green', '#2ecc71', 'rgb(46,204,113)', 'rgba(46,204,113,1)'] },
    { color: '#f39c12', display: 'Помаранчевий', correct: '#f39c12', options: ['orange', '#f39c12', 'rgb(243,156,18)', 'rgba(243,156,18,1)'] },
    { color: '#9b59b6', display: 'Фіолетовий', correct: '#9b59b6', options: ['purple', '#9b59b6', 'rgb(155,89,182)', 'rgba(155,89,182,1)'] },
    { color: '#1abc9c', display: 'Бірюзовий', correct: '#1abc9c', options: ['teal', '#1abc9c', 'rgb(26,188,156)', 'rgba(26,188,156,1)'] },
    { color: '#e67e22', display: 'Помаранчевий', correct: '#e67e22', options: ['orange', '#e67e22', 'rgb(230,126,34)', 'rgba(230,126,34,1)'] },
    { color: '#2c3e50', display: 'Темно-синій', correct: '#2c3e50', options: ['navy', '#2c3e50', 'rgb(44,62,80)', 'rgba(44,62,80,1)'] }
];

// ==================== ГРА "ВГАДАЙ КОЛІР" ====================
class ColorGuessGame {
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
        
        document.getElementById('nextGuessBtn')?.addEventListener('click', () => {
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
        if (this.currentQuestion >= COLOR_QUESTIONS.length) {
            // Гра завершена
            const box = document.getElementById('guessColorBox');
            const options = document.getElementById('guessOptions');
            const feedback = document.getElementById('guessFeedback');
            
            box.style.background = '#27ae60';
            options.innerHTML = '<p style="font-size:24px;text-align:center;padding:20px;">🎉 Вітаю! Ти пройшов усі питання!</p>';
            feedback.innerHTML = '';
            document.getElementById('guessScore').textContent = this.score;
            document.getElementById('guessTotal').textContent = this.totalQuestions;
            document.getElementById('nextGuessBtn').style.display = 'none';
            return;
        }

        const q = COLOR_QUESTIONS[this.currentQuestion];
        this.totalQuestions++;
        this.isAnswered = false;
        
        // Оновлюємо колір
        const box = document.getElementById('guessColorBox');
        box.style.background = q.color;
        
        // Створюємо варіанти відповідей
        const options = document.getElementById('guessOptions');
        const shuffledOptions = this.shuffleArray([...q.options]);
        
        options.innerHTML = shuffledOptions.map(opt => `
            <button class="guess-option" data-value="${opt}" data-correct="${opt === q.correct}">
                ${opt}
            </button>
        `).join('');
        
        // Додаємо обробники
        options.querySelectorAll('.guess-option').forEach(btn => {
            btn.addEventListener('click', () => this.checkAnswer(btn, q));
        });
        
        // Очищаємо фідбек
        const feedback = document.getElementById('guessFeedback');
        feedback.innerHTML = '';
        feedback.className = 'guess-feedback';
        
        // Оновлюємо рахунок
        document.getElementById('guessScore').textContent = this.score;
        document.getElementById('guessTotal').textContent = this.totalQuestions;
        document.getElementById('nextGuessBtn').style.display = 'inline-block';
    }

    static checkAnswer(btn, q) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        
        const isCorrect = btn.dataset.correct === 'true';
        const feedback = document.getElementById('guessFeedback');
        
        // Блокуємо всі кнопки
        document.querySelectorAll('.guess-option').forEach(b => b.disabled = true);
        
        if (isCorrect) {
            this.score++;
            btn.classList.add('correct');
            feedback.textContent = `✅ Правильно! Колір ${q.display} — це ${q.correct}`;
            feedback.className = 'guess-feedback correct';
        } else {
            btn.classList.add('wrong');
            // Показуємо правильну відповідь
            document.querySelectorAll('.guess-option').forEach(b => {
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                }
            });
            feedback.textContent = `❌ Неправильно. Правильна відповідь: ${q.correct}`;
            feedback.className = 'guess-feedback wrong';
        }
        
        // Оновлюємо рахунок
        document.getElementById('guessScore').textContent = this.score;
        document.getElementById('guessTotal').textContent = this.totalQuestions;
    }

    static nextQuestion() {
        if (!this.isAnswered && this.currentQuestion < COLOR_QUESTIONS.length) {
            // Якщо ще не відповіли, перевіряємо з примусом
            const feedback = document.getElementById('guessFeedback');
            feedback.textContent = '⚠️ Спочатку обери відповідь!';
            feedback.className = 'guess-feedback wrong';
            return;
        }
        this.currentQuestion++;
        this.showQuestion();
    }
}

// ==================== ІНТЕРАКТИВНА ДЕМОНСТРАЦІЯ ====================
class ColorDemo {
    static currentBgColor = null; // зберігаємо поточний колір фону
    static defaultBgColor = 'white';
    static hasBg = false;

    static init() {
        const buttons = document.querySelectorAll('.demo-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.applyStyle(e, btn));
        });

        // Ініціалізуємо стан альфа-кнопок
        this.updateAlphaButtons();
    }

    static applyStyle(e, btn) {
        const targetId = btn.dataset.target;
        const property = btn.dataset.property;
        const value = btn.dataset.value;

        const target = document.getElementById(targetId);
        if (!target) return;

        // === СКИДАННЯ КОЛЬОРУ ТЕКСТУ ===
        if (btn.classList.contains('color-reset')) {
            target.style.color = '';
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            return;
        }

        // === СКИДАННЯ ФОНУ ===
        if (btn.classList.contains('bg-reset') || btn.classList.contains('alpha-reset')) {
            target.style.backgroundColor = this.defaultBgColor;
            this.currentBgColor = null;
            this.hasBg = false;
            document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
            this.updateAlphaButtons();
            return;
        }

        // === КОЛІР ТЕКСТУ ===
        if (btn.classList.contains('color-btn')) {
            target.style.color = value;
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            return;
        }

        // === КОЛІР ФОНУ ===
        if (btn.classList.contains('bg-btn')) {
            // Застосовуємо колір
            target.style.backgroundColor = value;
            this.currentBgColor = value;
            this.hasBg = true;
            
            document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Оновлюємо альфа-кнопки: активуємо 100%
            this.updateAlphaButtons();
            return;
        }

        // === ПРОЗОРІСТЬ (ALPHA) ===
        if (btn.classList.contains('alpha-btn')) {
            const alpha = btn.dataset.alpha || 1;
            
            if (this.hasBg && this.currentBgColor) {
                // Є фон - змінюємо його прозорість
                const rgbaColor = this.convertToRGBA(this.currentBgColor, alpha);
                target.style.backgroundColor = rgbaColor;
            } else {
                // Немає фону - створюємо червоний з прозорістю
                target.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
                this.currentBgColor = 'rgb(255, 0, 0)';
                this.hasBg = true;
                // Активуємо червону кнопку фону
                document.querySelectorAll('.bg-btn').forEach(b => {
                    if (b.dataset.value === '#e74c3c' || b.dataset.value === '#c0392b') {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
            }
            
            // Оновлюємо активність альфа-кнопок
            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }

    static convertToRGBA(color, alpha) {
        // Якщо вже rgba - оновлюємо alpha
        if (color.startsWith('rgba')) {
            const parts = color.match(/[\d.]+/g);
            if (parts && parts.length >= 4) {
                return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
            }
        }
        
        // Якщо rgb - додаємо alpha
        if (color.startsWith('rgb')) {
            const parts = color.match(/\d+/g);
            if (parts && parts.length >= 3) {
                return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
            }
        }
        
        // Якщо HEX - конвертуємо
        const hex = color.replace('#', '');
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            return `rgba(255, 0, 0, ${alpha})`;
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    static updateAlphaButtons() {
        const alpha100 = document.querySelector('.alpha-btn[data-alpha="1"]');
        const otherAlphas = document.querySelectorAll('.alpha-btn:not([data-alpha="1"])');
        
        if (this.hasBg) {
            // Є фон - 100% активна
            alpha100?.classList.add('active');
            otherAlphas.forEach(b => b.classList.remove('active'));
        } else {
            // Немає фону - всі альфа-кнопки неактивні
            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
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

    static parseStyles(input) {
        // Розділяємо за крапкою з комою
        const parts = input.split(';').filter(p => p.trim());
        const styles = [];
        
        for (const part of parts) {
            const trimmed = part.trim();
            // Шукаємо властивість: значення
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
        // Перевіряємо з точністю до пробілів та регістру
        const normalizedValue = value.toLowerCase().replace(/\s+/g, ' ');
        return validValues.some(valid => {
            const normalizedValid = valid.toLowerCase().replace(/\s+/g, ' ');
            return normalizedValue === normalizedValid;
        });
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

        const expected = TASK_ANSWERS[taskId];
        let isCorrect = false;
        let message = '';

        // Для завдання 5 (два стилі)
        if (taskId === 5) {
            const styles = this.parseStyles(userInput);
            if (styles.length >= 2) {
                // Перевіряємо перший стиль (color)
                const colorStyle = styles.find(s => s.property.toLowerCase() === 'color');
                const bgStyle = styles.find(s => s.property.toLowerCase() === 'background-color');
                
                const hasColor = colorStyle && this.isValueValid(colorStyle.value, expected.validValues);
                const hasBg = bgStyle && this.isValueValid(bgStyle.value, expected.secondValidValues);
                
                isCorrect = hasColor && hasBg;
            }
        } else {
            // Для звичайних завдань (один стиль)
            const styles = this.parseStyles(userInput);
            if (styles.length === 1) {
                const style = styles[0];
                const propMatch = style.property.toLowerCase() === expected.property.toLowerCase();
                const valMatch = this.isValueValid(style.value, expected.validValues);
                isCorrect = propMatch && valMatch;
            }
        }

        if (isCorrect) {
            // Застосовуємо стиль
            if (taskId === 5) {
                const p = demoArea.querySelector('p');
                if (p) {
                    p.style.color = 'white';
                    p.style.backgroundColor = '#2c3e50';
                    p.style.padding = '10px';
                    p.style.borderRadius = '8px';
                }
            } else {
                const p = demoArea.querySelector('p');
                if (p) {
                    const expectedTask = TASK_ANSWERS[taskId];
                    if (expectedTask.property === 'color') {
                        // Беремо перше значення як приклад для застосування
                        p.style.color = expectedTask.validValues[0];
                    } else if (expectedTask.property === 'background-color') {
                        p.style.backgroundColor = expectedTask.validValues[0];
                        p.style.padding = '10px';
                        p.style.borderRadius = '8px';
                    }
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
                    p.style.backgroundColor = '';
                    p.style.padding = '';
                    p.style.borderRadius = '';
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
        localStorage.setItem('colorsChecklist', JSON.stringify(states));
    };

    const loadState = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('colorsChecklist'));
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
    ColorDemo.init();
    ColorGuessGame.init();

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