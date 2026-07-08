// Дані для вікторини про розширення VSCode
const extensionQuestions = [
    {
        text: "Яке розширення автоматично оновлює сторінку в браузері при зміні коду?",
        options: ["Live Server", "Code Runner", "Auto Rename Tag", "vscode-icons"],
        correct: 0
    },
    {
        text: "Яке розширення автоматично змінює обидва теги (відкриваючий і закриваючий) одночасно?",
        options: ["Auto Close Tag", "Auto Rename Tag", "Auto Complete Tag", "All Autocomplete"],
        correct: 1
    },
    {
        text: "Яке розширення додає гарні іконки до файлів і папок у провіднику VSCode?",
        options: ["Theme - Oceanic Next", "Sass", "vscode-icons", "Live Sass Compiler"],
        correct: 2
    },
    {
        text: "Яке розширення дозволяє запускати код (HTML, CSS, JS) прямо у VSCode?",
        options: ["Live Server", "Code Runner", "JavaScript snippets", "Multiple clipboards"],
        correct: 1
    },
    {
        text: "Яке розширення автоматично додає закриваючі HTML-теги?",
        options: ["Auto Rename Tag", "Auto Complete Tag", "Auto Close Tag", "All Autocomplete"],
        correct: 2
    }
];

let extensionUserAnswers = new Array(extensionQuestions.length).fill(null);

// Функція для рендеру вікторини
function renderExtensionsQuiz() {
    const container = document.getElementById('quizExtensionsContainer');
    if (!container) return;

    let html = '';
    extensionQuestions.forEach((q, idx) => {
        html += `<div class="quiz-question" style="margin-top: 20px;">${idx + 1}. ${q.text}</div>`;
        q.options.forEach((opt, optIdx) => {
            const isSelected = (extensionUserAnswers[idx] === optIdx);
            const selectedClass = isSelected ? 'selected' : '';
            html += `
                        <div class="quiz-option ${selectedClass}" data-qidx="${idx}" data-oidx="${optIdx}">
                            ${String.fromCharCode(65 + optIdx)}. ${opt}
                        </div>
                    `;
        });
    });
    container.innerHTML = html;

    // Додаємо обробники подій для вибору варіантів
    document.querySelectorAll('#quizExtensionsContainer .quiz-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            const qidx = parseInt(opt.dataset.qidx);
            const oidx = parseInt(opt.dataset.oidx);
            extensionUserAnswers[qidx] = oidx;
            renderExtensionsQuiz(); // перерендер
        });
    });
}

// Перевірка вікторини
function checkExtensionsQuiz() {
    let allCorrect = true;
    let resultsHtml = '';
    for (let i = 0; i < extensionQuestions.length; i++) {
        const userAnswer = extensionUserAnswers[i];
        const isCorrect = (userAnswer === extensionQuestions[i].correct);
        if (!isCorrect) allCorrect = false;
        const correctText = extensionQuestions[i].options[extensionQuestions[i].correct];
        const status = isCorrect ? '✅' : '❌';
        resultsHtml += `<p>${status} Питання ${i + 1}: ${isCorrect ? 'Вірно!' : `Невірно. Правильна відповідь: ${correctText}`}</p>`;
    }
    if (allCorrect) {
        resultsHtml = '<p style="color: green; font-size: 1.2rem;">🎉 Чудово! Ти знаєш розширення VSCode! 🎉</p>' + resultsHtml;
    } else {
        resultsHtml = '<p style="color: #e67e22;">📘 Перевір відповіді ще раз, ось що вийшло:</p>' + resultsHtml;
    }
    const feedbackDiv = document.getElementById('quizExtensionsFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = resultsHtml;
}

function resetExtensionsQuiz() {
    extensionUserAnswers = new Array(extensionQuestions.length).fill(null);
    renderExtensionsQuiz();
    const feedbackDiv = document.getElementById('quizExtensionsFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = '';
}

// Факти про VSCode
const vscodeFacts = [
    "Visual Studio Code вперше був анонсований Microsoft на конференції Build у квітні 2015 року.",
    "VSCode працює на основі Electron — фреймворку, що дозволяє створювати десктопні додатки з веб-технологій.",
    "VSCode має вбудовану підтримку Git, тому ви можете робити коміти прямо з редактора!",
    "За даними опитувань Stack Overflow, VSCode — найпопулярніший редактор коду серед розробників.",
    "VSCode є повністю безкоштовним і з відкритим кодом (ліцензія MIT).",
    "У VSCode можна налаштувати власні «сніпети» (шаблони коду) для прискорення роботи.",
    "Live Server (розширення) має понад 30 мільйонів завантажень у маркетплейсі VSCode!"
];

function showRandomVSCodeFact() {
    const factDisplay = document.getElementById('randomVSCodeFactDisplay');
    if (factDisplay) {
        const randomIndex = Math.floor(Math.random() * vscodeFacts.length);
        factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${vscodeFacts[randomIndex]}`;
    }
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    renderExtensionsQuiz();

    const checkBtn = document.getElementById('checkExtensionsQuizBtn');
    if (checkBtn) checkBtn.addEventListener('click', checkExtensionsQuiz);

    const resetBtn = document.getElementById('resetExtensionsQuizBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetExtensionsQuiz);

    const factBtn = document.getElementById('randomVSCodeFactBtn');
    if (factBtn) factBtn.addEventListener('click', showRandomVSCodeFact);

    // Встановити перший випадковий факт при завантаженні
    showRandomVSCodeFact();
});