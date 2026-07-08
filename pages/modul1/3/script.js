// ------------------ Редактор коду ------------------
const codeEditor = document.getElementById('htmlCodeEditor');
const previewFrame = document.getElementById('previewFrame');

const defaultCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моя улюблена тварина</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="example">
    <h1>Моя улюблена тварина - Кіт</h1>
    <p>Коти - це пухнасті, грайливі та дуже розумні тварини. Вони люблять спати, гратися та отримувати ласку.</p>
    <p><img src="img/cat.png" alt="Кіт" width="150"></p>
    <h2>Цікаві факти про котів:</h2>
    <ul>
        <li>Коти можуть видавати близько 100 різних звуків</li>
        <li>Коти сплять приблизно 16 годин на добу</li>
        <li>Коти мають чудовий нюх</li>
    </ul>
    <a href="https://uk.wikipedia.org/wiki/Кіт_свійський" target="_blank">Дізнатися більше про котів на Вікіпедії</a>
</body>
</html>`;

function runCode() {
    if (!codeEditor || !previewFrame) return;
    const code = codeEditor.value;
    previewFrame.srcdoc = code;
}

function clearCode() {
    if (!codeEditor || !previewFrame) return;
    codeEditor.value = '';
    previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;">👈 Напиши код ліворуч і натисни "Запустити код"</body></html>';
}

function loadExample() {
    if (!codeEditor || !previewFrame) return;
    codeEditor.value = defaultCode;
    runCode();
}

// ------------------ Чекліст завдань ------------------
let checklistItems = document.querySelectorAll('#challengeChecklist li');

function saveChecklistState() {
    const states = [];
    checklistItems.forEach((item, index) => {
        states.push(item.classList.contains('completed'));
    });
    localStorage.setItem('htmlChecklist', JSON.stringify(states));
}

function loadChecklistState() {
    const saved = localStorage.getItem('htmlChecklist');
    if (saved) {
        const states = JSON.parse(saved);
        checklistItems.forEach((item, index) => {
            if (states[index]) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    }
}

checklistItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('completed');
        saveChecklistState();
    });
});

document.getElementById('resetChecklistBtn').addEventListener('click', () => {
    checklistItems.forEach(item => {
        item.classList.remove('completed');
    });
    saveChecklistState();
});

loadChecklistState();

// ------------------ Гра "Впіймай тег" ------------------
const gameQuestions = [
    { text: "Який тег створює заголовок першого рівня?", options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;header&gt;", "&lt;title&gt;"], correct: 1 },
    { text: "Який тег використовується для абзацу?", options: ["&lt;text&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;span&gt;"], correct: 2 },
    { text: "Який тег створює посилання?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"], correct: 1 },
    { text: "Який тег вставляє зображення?", options: ["&lt;img&gt;", "&lt;image&gt;", "&lt;pic&gt;", "&lt;src&gt;"], correct: 0 },
    { text: "Який тег створює маркований список?", options: ["&lt;ol&gt;", "&lt;list&gt;", "&lt;ul&gt;", "&lt;li&gt;"], correct: 2 },
    { text: "Де знаходиться &lt;title&gt;?", options: ["&lt;body&gt;", "&lt;footer&gt;", "&lt;head&gt;", "&lt;header&gt;"], correct: 2 },
    { text: "Який тег створює елемент списку?", options: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;ol&gt;", "&lt;list&gt;"], correct: 1 },
    { text: "Який тег використовується для переносу рядка?", options: ["&lt;br&gt;", "&lt;p&gt;", "&lt;hr&gt;", "&lt;break&gt;"], correct: 0 },
    { text: "Який тег створює заголовок другого рівня?", options: ["&lt;h2&gt;", "&lt;h1&gt;", "&lt;heading&gt;", "&lt;sub&gt;"], correct: 0 },
    { text: "Який атрибут вказує шлях до зображення в тегу &lt;img&gt;?", options: ["alt", "href", "src", "link"], correct: 2 }
];

let currentGameQuestion = 0;
let gameScore = 0;

function loadGameQuestion() {
    if (currentGameQuestion >= gameQuestions.length) {
        document.getElementById('gameQuestion').innerHTML = "🎉 Вітаю! Ти пройшов гру! 🎉";
        document.getElementById('gameOptions').innerHTML = '';
        document.getElementById('gameFeedback').innerHTML = '<p style="color:#ffd966;">Ти чудово знаєш HTML-теги! Молодець!</p>';
        return;
    }

    const q = gameQuestions[currentGameQuestion];
    document.getElementById('gameQuestion').innerHTML = q.text;

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
        optionsHtml += `<button class="game-btn" data-opt="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>`;
    });
    document.getElementById('gameOptions').innerHTML = optionsHtml;

    document.querySelectorAll('#gameOptions .game-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selected = parseInt(btn.dataset.opt);
            if (selected === q.correct) {
                gameScore++;
                document.getElementById('gameFeedback').innerHTML = '<p style="color:#27ae60;">✅ Правильно! +1 бал</p>';
            } else {
                document.getElementById('gameFeedback').innerHTML = `<p style="color:#e67e22;">❌ Неправильно! Правильна відповідь: ${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}</p>`;
            }
            document.getElementById('gameScore').innerHTML = `Рахунок: ${gameScore} / ${gameQuestions.length}`;
            currentGameQuestion++;
            loadGameQuestion();
        });
    });
}

// ------------------ Вікторина про структуру HTML ------------------
const structureQuestions = [
    {
        text: "Який тег є кореневим для всієї HTML-сторінки?",
        options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;html&gt;", "&lt;!DOCTYPE html&gt;"],
        correct: 2
    },
    {
        text: "Де знаходиться мета-інформація про сторінку (кодування, заголовок вкладки)?",
        options: ["&lt;body&gt;", "&lt;head&gt;", "&lt;footer&gt;", "&lt;header&gt;"],
        correct: 1
    },
    {
        text: "Який тег відповідає за заголовок вкладки браузера?",
        options: ["&lt;h1&gt;", "&lt;header&gt;", "&lt;title&gt;", "&lt;head&gt;"],
        correct: 2
    },
    {
        text: "Що відображається на сторінці з тегу &lt;body&gt;?",
        options: ["Метадані", "Весь видимий контент", "Підключення стилів", "Скрипти"],
        correct: 1
    }
];

let structureAnswers = new Array(structureQuestions.length).fill(null);

function renderStructureQuiz() {
    const container = document.getElementById('quizStructureContainer');
    if (!container) return;

    let html = '';
    structureQuestions.forEach((q, idx) => {
        html += `<div class="quiz-question" style="margin-top:20px;">${idx + 1}. ${q.text}</div>`;
        q.options.forEach((opt, optIdx) => {
            const isSelected = (structureAnswers[idx] === optIdx);
            const selectedClass = isSelected ? 'selected' : '';
            html += `<div class="quiz-option ${selectedClass}" data-qidx="${idx}" data-oidx="${optIdx}">${String.fromCharCode(65 + optIdx)}. ${opt}</div>`;
        });
    });
    container.innerHTML = html;

    document.querySelectorAll('#quizStructureContainer .quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const qidx = parseInt(opt.dataset.qidx);
            const oidx = parseInt(opt.dataset.oidx);
            structureAnswers[qidx] = oidx;
            renderStructureQuiz();
        });
    });
}

function checkStructureQuiz() {
    let correctCount = 0;
    let resultsHtml = '';
    for (let i = 0; i < structureQuestions.length; i++) {
        const isCorrect = (structureAnswers[i] === structureQuestions[i].correct);
        if (isCorrect) correctCount++;
        const correctText = structureQuestions[i].options[structureQuestions[i].correct];
        resultsHtml += `<p>${isCorrect ? '✅' : '❌'} Питання ${i + 1}: ${isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${correctText}`}</p>`;
    }
    resultsHtml = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${structureQuestions.length}</p>` + resultsHtml;
    document.getElementById('quizStructureFeedback').innerHTML = resultsHtml;
}

function resetStructureQuiz() {
    structureAnswers = new Array(structureQuestions.length).fill(null);
    renderStructureQuiz();
    document.getElementById('quizStructureFeedback').innerHTML = '';
}

// ------------------ Випадкові факти ------------------
const facts = [
    "Перший веб-сайт у світі досі доступний за адресою http://info.cern.ch/",
    "Спочатку HTML мав лише 18 тегів, сьогодні їх більше 100!",
    "Тім Бернерс-Лі створив HTML у 1991 році, коли працював у CERN.",
    "HTML не є мовою програмування, це мова розмітки гіпертексту.",
    "Символ «#» у веб-адресах називається «хеш» і використовується для якорів.",
    "Перший браузер називався WorldWideWeb (пізніше перейменований у Nexus)."
];

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    document.getElementById('randomFactDisplay').innerHTML = `<i class="fas fa-info-circle"></i> ${facts[randomIndex]}`;
}

// ------------------ Ініціалізація ------------------
document.addEventListener('DOMContentLoaded', () => {
    // Редактор коду
    const runBtn = document.getElementById('runCodeBtn');
    const clearBtn = document.getElementById('clearCodeBtn');
    const loadExampleBtn = document.getElementById('loadExampleBtn');

    if (runBtn) runBtn.addEventListener('click', runCode);
    if (clearBtn) clearBtn.addEventListener('click', clearCode);
    if (loadExampleBtn) loadExampleBtn.addEventListener('click', loadExample);

    codeEditor.value = defaultCode;
    runCode();

    // Гра
    loadGameQuestion();

    // Вікторина
    renderStructureQuiz();
    document.getElementById('checkStructureQuizBtn').addEventListener('click', checkStructureQuiz);
    document.getElementById('resetStructureQuizBtn').addEventListener('click', resetStructureQuiz);

    // Факти
    document.getElementById('randomFactBtn').addEventListener('click', showRandomFact);
});