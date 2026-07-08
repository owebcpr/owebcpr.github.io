// ========== ВІКТОРИНА ПРО ІНСТРУМЕНТИ ==========
const toolsQuizData = [
    {
        question: "Який інструмент дозволяє побачити код сайту прямо в браузері?",
        options: ["Live Server", "Інструменти розробника (F12)", "Git", "Node.js"],
        correct: 1
    },
    {
        question: "Яке розширення VSCode автоматично оновлює сторінку в браузері?",
        options: ["Live Server", "Auto Rename Tag", "vscode-icons", "Prettier"],
        correct: 0
    },
    {
        question: "Для чого потрібен Git?",
        options: ["Для написання HTML", "Для зберігання історії змін коду", "Для запуску сервера", "Для компіляції CSS"],
        correct: 1
    },
    {
        question: "Який редактор коду є найкращим вибором для сучасної веб-розробки?",
        options: ["Блокнот", "Notepad++", "Visual Studio Code", "Brackets"],
        correct: 2
    }
];

let toolsSelectedAnswers = new Array(toolsQuizData.length).fill(null);

function renderToolsQuiz() {
    const container = document.getElementById('quizToolsContainer');
    if (!container) return;
    container.innerHTML = '';
    toolsQuizData.forEach((item, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.style.marginBottom = '25px';
        questionDiv.style.background = '#fffcf0';
        questionDiv.style.padding = '15px';
        questionDiv.style.borderRadius = '24px';
        
        const qText = document.createElement('div');
        qText.className = 'quiz-question';
        qText.innerHTML = `${idx+1}. ${item.question}`;
        questionDiv.appendChild(qText);
        
        item.options.forEach((opt, optIdx) => {
            const optDiv = document.createElement('div');
            optDiv.className = `quiz-option ${toolsSelectedAnswers[idx] === optIdx ? 'selected' : ''}`;
            optDiv.innerHTML = `${String.fromCharCode(65+optIdx)}. ${opt}`;
            optDiv.addEventListener('click', () => {
                toolsSelectedAnswers[idx] = optIdx;
                renderToolsQuiz();
            });
            questionDiv.appendChild(optDiv);
        });
        container.appendChild(questionDiv);
    });
}

function checkToolsQuiz() {
    let score = 0;
    toolsQuizData.forEach((item, idx) => {
        if (toolsSelectedAnswers[idx] === item.correct) score++;
    });
    const feedbackDiv = document.getElementById('quizToolsFeedback');
    if (score === toolsQuizData.length) {
        feedbackDiv.innerHTML = '🎉 Блискуче! Ти чудово знаєш інструменти веб-розробника! 🎉';
        feedbackDiv.style.background = '#d4edda';
    } else {
        feedbackDiv.innerHTML = `📘 Ти набрав ${score} з ${toolsQuizData.length}. Переглянь ще раз матеріал про браузери, VSCode та Git!`;
        feedbackDiv.style.background = '#ffecb3';
    }
}

function resetToolsQuiz() {
    toolsSelectedAnswers.fill(null);
    renderToolsQuiz();
    document.getElementById('quizToolsFeedback').innerHTML = '';
    document.getElementById('quizToolsFeedback').style.background = 'transparent';
}

// ========== ВИПАДКОВІ ФАКТИ ПРО ПЗ ==========
const toolFacts = [
    "💡 Перший редактор коду для веб-розробки називався 'HTML Editor' і був створений у 1994 році.",
    "⚡ Розширення Live Server має понад 10 мільйонів завантажень у VSCode Marketplace!",
    "📦 Git був створений Лінусом Торвальдсом у 2005 році для розробки ядра Linux.",
    "🌐 Chrome DevTools (F12) містить понад 30 окремих панелей для аналізу сайтів.",
    "💰 VSCode став найпопулярнішим редактором коду у 2019 році, обігнавши Sublime Text.",
    "🧩 У VSCode понад 30 000 розширень — це найбільша екосистема серед редакторів коду!",
    "🎨 Emmet (колишній Zen Coding) спочатку був створений для Sublime Text, а тепер вбудований у VSCode."
];

function showRandomToolFact() {
    const randomIndex = Math.floor(Math.random() * toolFacts.length);
    const factDisplay = document.getElementById('randomToolFactDisplay');
    if (factDisplay) {
        factDisplay.innerHTML = `✨ ${toolFacts[randomIndex]} ✨`;
    }
}

// ========== АНІМАЦІЯ ПРИ СКРОЛІ ==========
function observeToolElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.tool-card, .step-card, .ext-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// ========== ІНІЦІАЛІЗАЦІЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    renderToolsQuiz();
    observeToolElements();
    
    const checkBtn = document.getElementById('checkToolsQuizBtn');
    if (checkBtn) checkBtn.addEventListener('click', checkToolsQuiz);
    
    const resetBtn = document.getElementById('resetToolsQuizBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetToolsQuiz);
    
    const factBtn = document.getElementById('randomToolFactBtn');
    if (factBtn) factBtn.addEventListener('click', showRandomToolFact);
    
    console.log("Сторінка 'Програмне забезпечення Web-розробника' завантажена!");
});