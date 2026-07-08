// Контрольні питання
const controlQuestions = [
    {
        text: "Яке оголошення має бути на початку кожного HTML-документа?",
        options: ["&lt;html&gt;", "&lt;!DOCTYPE html&gt;", "&lt;head&gt;", "&lt;body&gt;"],
        correct: 1
    },
    {
        text: "В якому тезі знаходиться весь видимий контент сторінки?",
        options: ["&lt;head&gt;", "&lt;title&gt;", "&lt;body&gt;", "&lt;html&gt;"],
        correct: 2
    },
    {
        text: "Який тег створює найбільший заголовок?",
        options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;heading&gt;", "&lt;title&gt;"],
        correct: 1
    },
    {
        text: "Для чого потрібен тег &lt;meta charset='UTF-8'&gt;?",
        options: ["Для підключення стилів", "Для правильного відображення українських літер", "Для додавання картинок", "Для створення посилань"],
        correct: 1
    }
];

let controlAnswers = new Array(controlQuestions.length).fill(null);

function renderControlQuiz() {
    const container = document.getElementById('quizControlContainer');
    if (!container) return;

    let html = '';
    controlQuestions.forEach((q, idx) => {
        html += `<div class="quiz-question" style="margin-top:20px;">${idx + 1}. ${q.text}</div>`;
        q.options.forEach((opt, optIdx) => {
            const isSelected = (controlAnswers[idx] === optIdx);
            const selectedClass = isSelected ? 'selected' : '';
            html += `<div class="quiz-option ${selectedClass}" data-qidx="${idx}" data-oidx="${optIdx}">${String.fromCharCode(65 + optIdx)}. ${opt}</div>`;
        });
    });
    container.innerHTML = html;

    document.querySelectorAll('#quizControlContainer .quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const qidx = parseInt(opt.dataset.qidx);
            const oidx = parseInt(opt.dataset.oidx);
            controlAnswers[qidx] = oidx;
            renderControlQuiz();
        });
    });
}

function checkControlQuiz() {
    let correctCount = 0;
    let resultsHtml = '';
    for (let i = 0; i < controlQuestions.length; i++) {
        const isCorrect = (controlAnswers[i] === controlQuestions[i].correct);
        if (isCorrect) correctCount++;
        const correctText = controlQuestions[i].options[controlQuestions[i].correct];
        resultsHtml += `<p>${isCorrect ? '✅' : '❌'} Питання ${i + 1}: ${isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${correctText}`}</p>`;
    }
    resultsHtml = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${controlQuestions.length}</p>` + resultsHtml;
    const feedbackDiv = document.getElementById('quizControlFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = resultsHtml;
}

function resetControlQuiz() {
    controlAnswers = new Array(controlQuestions.length).fill(null);
    renderControlQuiz();
    const feedbackDiv = document.getElementById('quizControlFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = '';
}

// Редактор коду
const codeEditor = document.getElementById('htmlCodeEditor');
const previewFrame = document.getElementById('previewFrame');

// Початковий приклад коду
const defaultCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Мій перший сайт</title>
</head>
<body>
    <h1>Ласкаво просимо на мій перший сайт!</h1>
    <p>Мене звати [Твоє ім'я], і це моя перша веб-сторінка.</p>
    <h2>Мої захоплення:</h2>
    <ul>
        <li>Програмування</li>
        <li>Спорт</li>
        <li>Музика</li>
    </ul>
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

// Показати/сховати приклад
const showSolutionBtn = document.getElementById('showSolutionBtn');
const solutionContent = document.getElementById('solutionContent');

function toggleSolution() {
    if (!solutionContent || !showSolutionBtn) return;
    solutionContent.classList.toggle('show');
    if (solutionContent.classList.contains('show')) {
        showSolutionBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Сховати приклад';
    } else {
        showSolutionBtn.innerHTML = '<i class="fas fa-eye"></i> Показати приклад';
    }
}

// Випадковий факт
const facts = [
    "Перший веб-сайт у світі був створений у 1991 році!",
    "Спочатку HTML мав лише 18 тегів, сьогодні їх більше 100!",
    "Тім Бернерс-Лі, творець HTML, створив перший браузер і веб-сервер.",
    "HTML не є мовою програмування, це мова розмітки.",
    "Символ «#» у веб-адресах називається «хеш»."
];

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    const factDisplay = document.getElementById('randomFactDisplay');
    if (factDisplay) {
        factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${facts[randomIndex]}`;
    }
}

// Ініціалізація всіх подій
document.addEventListener('DOMContentLoaded', () => {
    // Контрольні питання
    renderControlQuiz();

    const checkBtn = document.getElementById('checkControlQuizBtn');
    const resetQuizBtn = document.getElementById('resetControlQuizBtn');

    if (checkBtn) checkBtn.addEventListener('click', checkControlQuiz);
    if (resetQuizBtn) resetQuizBtn.addEventListener('click', resetControlQuiz);

    // Редактор коду
    const runBtn = document.getElementById('runCodeBtn');
    const clearBtn = document.getElementById('clearCodeBtn');

    if (runBtn) runBtn.addEventListener('click', runCode);
    if (clearBtn) clearBtn.addEventListener('click', clearCode);

    // Встановлюємо початковий код
    if (codeEditor) {
        codeEditor.value = defaultCode;
        runCode();
    }

    // Кнопка прикладу
    if (showSolutionBtn) showSolutionBtn.addEventListener('click', toggleSolution);

    // Кнопка випадкового факту
    const factBtn = document.getElementById('randomFactBtn');
    if (factBtn) factBtn.addEventListener('click', showRandomFact);
});