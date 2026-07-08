// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    codeEditor: document.querySelector('#htmlCodeEditor'),
    previewFrame: document.querySelector('#previewFrame'),
    runBtn: document.querySelector('#runCodeBtn'),
    checkTaskBtn: document.querySelector('#checkTaskBtn'),
    taskTitle: document.querySelector('#taskTitle'),
    taskDescription: document.querySelector('#taskDescription'),
    taskFeedback: document.querySelector('#taskFeedback'),
    step1Done: document.querySelector('#step1Done'),
    step2Done: document.querySelector('#step2Done'),
    step3Done: document.querySelector('#step3Done'),
    progressLines: document.querySelectorAll('.progress-line'),
    currentTask: document.querySelector('#currentTask'),
    practiceSection: document.querySelector('#practice'),
    vscodeSection: document.querySelector('#vscode-project'),
    resetProjectBtn: document.querySelector('#resetProjectBtn'),
};

// Стан завдань
let currentStep = 1;
let userCode = ''; // Зберігаємо код, який написав користувач

const taskChecks = {
    1: false,
    2: false,
    3: false
};

// ==================== ЗАВДАННЯ ====================
const tasks = {
    1: {
        title: "Завдання 1: Створи форму входу",
        description: `
            <p>Створи форму для входу на сайт. Форма повинна мати:</p>
            <ul>
                <li>Поле для <strong>логіну</strong> (type="text") з підказкою "Введіть логін"</li>
                <li>Поле для <strong>пароля</strong> (type="password") з підказкою "Введіть пароль"</li>
                <li>Кнопку <strong>відправки</strong> (type="submit") з текстом "Увійти"</li>
                <li>Тег <strong>&lt;form&gt;</strong> з атрибутами action="/login" та method="POST"</li>
                <li>Атрибут <strong>required</strong> для обох полів обов'язкове заполнення</li>
            </ul>
            <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: використай &lt;form&gt;, &lt;input&gt;, placeholder, value</div>
        `,
        check: function(html) {
            const hasForm = /<form[\s>]/i.test(html);
            const hasAction = /action\s*=\s*["']?\/login["']?/i.test(html);
            const hasMethod = /method\s*=\s*["']?POST["']?/i.test(html);
            const hasTextInput = /<input[^>]*type\s*=\s*["']?text["']?[^>]*>/i.test(html);
            const hasPasswordInput = /<input[^>]*type\s*=\s*["']?password["']?[^>]*>/i.test(html);
            const hasSubmit = /<input[^>]*type\s*=\s*["']?submit["']?[^>]*>/i.test(html);
            const hasRequired = /required/i.test(html);
            
            return hasForm && hasAction && hasMethod && hasTextInput && hasPasswordInput && hasSubmit && hasRequired;
        },
        successMessage: "✅ Чудово! Форма входу створена правильно! Тепер додай до неї нові поля (завдання 2)!"
    },
    2: {
        title: "Завдання 2: Додай різні типи полів",
        description: `
            <p>Додай до вже створеної форми нові поля:</p>
            <ul>
                <li>Поле <strong>Email</strong> (type="email") з підказкою "Ваш email"</li>
                <li>Поле <strong>Вік</strong> (type="number") з підказкою "Ваш вік"</li>
                <li>Поле <strong>Дата народження</strong> (type="date")</li>
                <li>Прапорці <strong>checkbox</strong> (хоча б один: "Підписатися на новини")</li>
                <li>Перемикачі <strong>radio</strong> (хоча б два: "Чоловік", "Жінка")</li>
            </ul>
            <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: додай нові поля всередину тегу &lt;form&gt;, не видаляючи старі! Використовуй тег <p> для написання кожного поля на окремому рядку</p></div>
        `,
        check: function(html) {
            const hasEmail = /<input[^>]*type\s*=\s*["']?email["']?[^>]*>/i.test(html);
            const hasNumber = /<input[^>]*type\s*=\s*["']?number["']?[^>]*>/i.test(html);
            const hasDate = /<input[^>]*type\s*=\s*["']?date["']?[^>]*>/i.test(html);
            const hasCheckbox = /<input[^>]*type\s*=\s*["']?checkbox["']?[^>]*>/i.test(html);
            const hasRadio = /<input[^>]*type\s*=\s*["']?radio["']?[^>]*>/i.test(html);
            
            return hasEmail && hasNumber && hasDate && hasCheckbox && hasRadio;
        },
        successMessage: "✅ Супер! Ти додав різноманітні поля! Тепер додай останні елементи (завдання 3)!"
    },
    3: {
        title: "Завдання 3: Додай випадаючий список та текстову область",
        description: `
            <p>Додай до форми:</p>
            <ul>
                <li><strong>Випадаючий список</strong> (&lt;select&gt;) з вибором країни (Україна, Польща, Німеччина)</li>
                <li><strong>Текстову область</strong> (&lt;textarea&gt;) для коментаря або побажань</li>
                <li>Додай <strong>кнопку скидання</strong> (type="reset") з текстом "Очистити форму"</li>
            </ul>
            <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: &lt;select&gt; + &lt;option&gt;, &lt;textarea rows="4" cols="50"&gt;</div>
        `,
        check: function(html) {
            const hasSelect = /<select[\s>]/i.test(html);
            const hasOption = /<option[\s>]/i.test(html);
            const hasTextarea = /<textarea[\s>]/i.test(html);
            const hasReset = /<input[^>]*type\s*=\s*["']?reset["']?[^>]*>/i.test(html);
            
            return hasSelect && hasOption && hasTextarea && hasReset;
        },
        successMessage: "🎉 ВІТАЮ! 🎉 Ти пройшов всі завдання! Тепер створимо проєкт у VS Code!"
    }
};

// ==================== РЕДАКТОР КОДУ ====================
function runCode() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    const code = DOM.codeEditor.value;
    DOM.previewFrame.srcdoc = code;
}

// ==================== ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ ====================
function updateProgress() {
    const steps = [DOM.step1Done, DOM.step2Done, DOM.step3Done];
    const lines = DOM.progressLines;
    
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        if (step) {
            if (taskChecks[stepNum]) {
                step.classList.add('done');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('done');
            } else {
                step.classList.remove('done', 'active');
            }
        }
    });
    
    if (lines) {
        lines.forEach((line, index) => {
            if (taskChecks[index + 1]) {
                line.classList.add('done');
            } else {
                line.classList.remove('done');
            }
        });
    }
}

function loadTask(step) {
    const task = tasks[step];
    if (task && DOM.taskTitle && DOM.taskDescription) {
        DOM.taskTitle.innerHTML = '<i class="fas fa-star-of-life"></i> ' + task.title;
        DOM.taskDescription.innerHTML = task.description;
        
        // НЕ ОЧИЩУЄМО редактор коду! Зберігаємо попередній код
        // Тільки оновлюємо умови завдання
        
        if (DOM.taskFeedback) {
            DOM.taskFeedback.style.display = 'none';
            DOM.taskFeedback.innerHTML = '';
            DOM.taskFeedback.className = 'task-feedback';
        }
    }
}

function checkTask() {
    if (!DOM.codeEditor) {
        console.log('Editor not found');
        return;
    }
    
    const code = DOM.codeEditor.value;
    const task = tasks[currentStep];
    
    if (!task) return;
    
    const isCorrect = task.check(code);
    
    if (!DOM.taskFeedback) return;
    
    if (isCorrect) {
        taskChecks[currentStep] = true;
        updateProgress();
        
        DOM.taskFeedback.innerHTML = '<i class="fas fa-check-circle"></i> ' + task.successMessage;
        DOM.taskFeedback.className = 'task-feedback success';
        DOM.taskFeedback.style.display = 'block';
        
        // Зберігаємо код користувача
        userCode = DOM.codeEditor.value;
        
        if (currentStep < 3) {
            currentStep++;
            loadTask(currentStep);
            if (DOM.currentTask) {
                DOM.currentTask.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            setTimeout(function() {
                DOM.taskFeedback.innerHTML = '<i class="fas fa-trophy"></i> 🎉 Молодець! Ти виконав всі завдання! Тепер переходимо до створення проєкту в VS Code! 🎉';
                DOM.taskFeedback.className = 'task-feedback success';
                
                if (DOM.practiceSection) DOM.practiceSection.style.display = 'none';
                if (DOM.vscodeSection) {
                    DOM.vscodeSection.style.display = 'block';
                    DOM.vscodeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 1000);
        }
    } else {
        DOM.taskFeedback.innerHTML = '<i class="fas fa-times-circle"></i> ❌ Неправильно! Перевір ще раз умови завдання. Спробуй ще!';
        DOM.taskFeedback.className = 'task-feedback error';
        DOM.taskFeedback.style.display = 'block';
    }
}

// ==================== СКИДАННЯ ====================
function resetProject() {
    taskChecks[1] = false;
    taskChecks[2] = false;
    taskChecks[3] = false;
    currentStep = 1;
    userCode = '';
    
    updateProgress();
    loadTask(1);
    
    if (DOM.codeEditor) DOM.codeEditor.value = '';
    if (DOM.previewFrame) DOM.previewFrame.srcdoc = '';
    
    if (DOM.practiceSection) DOM.practiceSection.style.display = 'block';
    if (DOM.vscodeSection) DOM.vscodeSection.style.display = 'none';
    if (DOM.taskFeedback) {
        DOM.taskFeedback.style.display = 'none';
        DOM.taskFeedback.innerHTML = '';
    }
}

// ==================== ПРИКЛАД РІШЕННЯ ДЛЯ 1 ЗАВДАННЯ ====================
function showExample() {
    const exampleCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Форма реєстрації</title>
</head>
<body>
    <form action="/login" method="POST">
        <label>Логін:</label>
        <input type="text" name="login" placeholder="Введіть логін" required>
        <br><br>
        
        <label>Пароль:</label>
        <input type="password" name="password" placeholder="Введіть пароль" required>
        <br><br>
        
        <label>Email:</label>
        <input type="email" name="email" placeholder="Ваш email">
        <br><br>
        
        <label>Вік:</label>
        <input type="number" name="age" placeholder="Ваш вік">
        <br><br>
        
        <label>Дата народження:</label>
        <input type="date" name="birthdate">
        <br><br>
        
        <label>Стать:</label>
        <input type="radio" name="gender" value="male"> Чоловік
        <input type="radio" name="gender" value="female"> Жінка
        <br><br>
        
        <label><input type="checkbox" name="newsletter"> Підписатися на новини</label>
        <br><br>
        
        <label>Країна:</label>
        <select name="country">
            <option value="ukraine">Україна</option>
            <option value="poland">Польща</option>
            <option value="germany">Німеччина</option>
        </select>
        <br><br>
        
        <label>Коментар:</label>
        <textarea name="comment" rows="4" cols="50" placeholder="Ваші побажання..."></textarea>
        <br><br>
        
        <input type="submit" value="Зареєструватися">
        <input type="reset" value="Очистити форму">
    </form>
</body>
</html>`;
    
    if (DOM.codeEditor) {
        DOM.codeEditor.value = exampleCode;
        runCode();
    }
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
function init() {
    console.log('Initializing...');
    
    if (DOM.runBtn) {
        DOM.runBtn.addEventListener('click', runCode);
    }
    
    if (DOM.checkTaskBtn) {
        DOM.checkTaskBtn.addEventListener('click', checkTask);
    }
    
    if (DOM.resetProjectBtn) {
        DOM.resetProjectBtn.addEventListener('click', resetProject);
    }
    
    // Додаємо кнопку прикладу
    const loadExampleBtn = document.querySelector('#loadExampleBtn');
    if (loadExampleBtn) {
        loadExampleBtn.addEventListener('click', showExample);
    }
    
    loadTask(1);
    updateProgress();
    
    if (DOM.vscodeSection) {
        DOM.vscodeSection.style.display = 'none';
    }
    
    console.log('Initialized. Current step: ' + currentStep);
}

// Запускаємо після завантаження сторінки
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}