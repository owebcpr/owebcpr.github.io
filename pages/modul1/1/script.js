// Дані для вікторини про HTML-теги
const htmlQuestions = [
    {
        text: "Який тег використовується для створення найбільш важливого заголовка?",
        options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;header&gt;", "&lt;title&gt;"],
        correct: 1
    },
    {
        text: "Який тег створює абзац тексту?",
        options: ["&lt;text&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;span&gt;"],
        correct: 2
    },
    {
        text: "За допомогою якого тега створюють посилання?",
        options: ["&lt;link&gt;", "&lt;href&gt;", "&lt;a&gt;", "&lt;url&gt;"],
        correct: 2
    },
    {
        text: "Де зберігається метаінформація про сторінку (кодування, заголовок вкладки)?",
        options: ["&lt;body&gt;", "&lt;footer&gt;", "&lt;header&gt;", "&lt;head&gt;"],
        correct: 3
    },
    {
        text: "Який атрибут використовується в тегу &lt;img&gt; для альтернативного тексту?",
        options: ["src", "href", "alt", "title"],
        correct: 2
    },
    {
        text: "Який тег створює маркований список?",
        options: ["&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;", "&lt;ul&gt;"],
        correct: 3
    }
];

let htmlUserAnswers = new Array(htmlQuestions.length).fill(null);

// Функція для рендеру вікторини
function renderHtmlQuiz() {
    const container = document.getElementById('quizHtmlContainer');
    if (!container) return;

    let html = '';
    htmlQuestions.forEach((q, idx) => {
        html += `<div class="quiz-question" style="margin-top: 20px;">${idx + 1}. ${q.text}</div>`;
        q.options.forEach((opt, optIdx) => {
            const isSelected = (htmlUserAnswers[idx] === optIdx);
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
    document.querySelectorAll('#quizHtmlContainer .quiz-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            const qidx = parseInt(opt.dataset.qidx);
            const oidx = parseInt(opt.dataset.oidx);
            htmlUserAnswers[qidx] = oidx;
            renderHtmlQuiz();
        });
    });
}

// Перевірка вікторини
function checkHtmlQuiz() {
    let allCorrect = true;
    let correctCount = 0;
    let resultsHtml = '';
    for (let i = 0; i < htmlQuestions.length; i++) {
        const userAnswer = htmlUserAnswers[i];
        const isCorrect = (userAnswer === htmlQuestions[i].correct);
        if (isCorrect) correctCount++;
        else allCorrect = false;
        const correctText = htmlQuestions[i].options[htmlQuestions[i].correct];
        const status = isCorrect ? '✅' : '❌';
        resultsHtml += `<p>${status} Питання ${i + 1}: ${isCorrect ? 'Вірно!' : `Невірно. Правильна відповідь: ${correctText}`}</p>`;
    }
    if (allCorrect) {
        resultsHtml = '<p style="color: green; font-size: 1.2rem;">🎉 Супер! Ти чудово знаєш HTML-теги! 🎉</p>' + resultsHtml;
    } else {
        resultsHtml = `<p style="color: #e67e22;">📘 Правильних відповідей: ${correctCount} з ${htmlQuestions.length}</p>` + resultsHtml;
    }
    const feedbackDiv = document.getElementById('quizHtmlFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = resultsHtml;
}

function resetHtmlQuiz() {
    htmlUserAnswers = new Array(htmlQuestions.length).fill(null);
    renderHtmlQuiz();
    const feedbackDiv = document.getElementById('quizHtmlFeedback');
    if (feedbackDiv) feedbackDiv.innerHTML = '';
}

// Факти про HTML
const htmlFacts = [
    "HTML був створений Тімом Бернерсом-Лі у 1991 році. Саме він вважається 'батьком' Всесвітньої павутини.",
    "Перша версія HTML мала лише 18 тегів. Сьогодні їх більше 100!",
    "Абревіатура HTML розшифровується як HyperText Markup Language (мова розмітки гіпертексту).",
    "<!DOCTYPE html> — це не тег, а спеціальне оголошення, яке повідомляє браузеру, що документ використовує HTML5.",
    "В HTML можна вставляти коментарі, які не відображаються на сторінці: &lt;!-- це коментар --&gt;",
    "Тег &lt;marquee&gt; колись використовувався для рядка, що біжить, але зараз він застарілий.",
    "Спеціальні символи в HTML пишуться через &amp;: &amp;lt; — це <, &amp;gt; — це >."
];

function showRandomHtmlFact() {
    const factDisplay = document.getElementById('randomHtmlFactDisplay');
    if (factDisplay) {
        const randomIndex = Math.floor(Math.random() * htmlFacts.length);
        factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${htmlFacts[randomIndex]}`;
    }
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    renderHtmlQuiz();

    const checkBtn = document.getElementById('checkHtmlQuizBtn');
    if (checkBtn) checkBtn.addEventListener('click', checkHtmlQuiz);

    const resetBtn = document.getElementById('resetHtmlQuizBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetHtmlQuiz);

    const factBtn = document.getElementById('randomHtmlFactBtn');
    if (factBtn) factBtn.addEventListener('click', showRandomHtmlFact);

    showRandomHtmlFact();
});