// ========== ТЕСТ: Вгадай професію ==========
const profQuizData = [
    {
        question: "Хто створює макети, підбирає кольори та шрифти для сайту?",
        options: ["Frontend-розробник", "Web-дизайнер", "Backend-розробник", "QA-тестувальник"],
        correct: 1
    },
    {
        question: "Хто відповідає за серверну частину та бази даних?",
        options: ["Fullstack-розробник", "Frontend-розробник", "Backend-розробник", "Project Manager"],
        correct: 2
    },
    {
        question: "Хто шукає помилки та перевіряє якість сайту?",
        options: ["QA-тестувальник", "Web-дизайнер", "Backend-розробник", "Team Lead"],
        correct: 0
    },
    {
        question: "Яку професію називають 'універсальним солдатом' веброзробки?",
        options: ["Frontend", "Backend", "Fullstack", "DevOps"],
        correct: 2
    },
    {
        question: "Хто керує командою та ставить задачі?",
        options: ["Project Manager", "Team Lead", "Senior Developer", "CEO"],
        correct: 0
    }
];

let profSelectedAnswers = new Array(profQuizData.length).fill(null);

function renderProfQuiz() {
    const container = document.getElementById('quizProfContainer');
    if (!container) return;
    container.innerHTML = '';
    profQuizData.forEach((item, idx) => {
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
            optDiv.className = `quiz-option ${profSelectedAnswers[idx] === optIdx ? 'selected' : ''}`;
            optDiv.innerHTML = `${String.fromCharCode(65+optIdx)}. ${opt}`;
            optDiv.addEventListener('click', () => {
                profSelectedAnswers[idx] = optIdx;
                renderProfQuiz();
            });
            questionDiv.appendChild(optDiv);
        });
        container.appendChild(questionDiv);
    });
}

function checkProfQuiz() {
    let score = 0;
    profQuizData.forEach((item, idx) => {
        if (profSelectedAnswers[idx] === item.correct) score++;
    });
    const feedbackDiv = document.getElementById('quizProfFeedback');
    if (score === profQuizData.length) {
        feedbackDiv.innerHTML = '🏆 Вітаю! Ти чудово знаєшся на вебпрофесіях! Став +10 до карми розробника! 🏆';
        feedbackDiv.style.background = '#d4edda';
    } else {
        feedbackDiv.innerHTML = `📊 Ти набрав ${score} з ${profQuizData.length}. Перегляньте правильні відповіді: кожна професія важлива! Бажаєш дізнатися більше?`;
        feedbackDiv.style.background = '#ffecb3';
    }
}

function resetProfQuiz() {
    profSelectedAnswers.fill(null);
    renderProfQuiz();
    document.getElementById('quizProfFeedback').innerHTML = '';
    document.getElementById('quizProfFeedback').style.background = 'transparent';
}

// ========== Анімація карток професій ==========
function initProfCards() {
    const cards = document.querySelectorAll('.prof-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Прибираємо активний клас у всіх
            cards.forEach(c => c.classList.remove('active'));
            // Додаємо активний клас поточній картці
            this.classList.add('active');
            
            // Показуємо повідомлення з інформацією про професію
            const profName = this.querySelector('h3')?.innerText || '';
            const profInfo = this.querySelector('p')?.innerText || '';
            // Можна показати додаткове сповіщення
            const randomFactDiv = document.getElementById('randomFactDisplay');
            if (randomFactDiv) {
                randomFactDiv.innerHTML = `🔍 Ти обрала професію: ${profName}. ${profInfo.substring(0, 80)}...`;
                setTimeout(() => {
                    if (randomFactDiv.innerHTML.includes("Ти обрала")) {
                        setTimeout(() => {
                            if (randomFactDiv.innerHTML.includes("Ти обрала")) 
                                randomFactDiv.innerHTML = "Натисни кнопку, щоб дізнатися щось цікаве!";
                        }, 3000);
                    }
                }, 4000);
            }
        });
    });
}

// ========== Анімація заповнення шкал ==========
function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 200);
    });
}

// ========== Випадкові факти про IT-професії ==========
const randomFacts = [
    "💡 Перший у світі вебсайт досі працює! http://info.cern.ch/",
    "🎮 Багато гейм-дизайнерів починали з верстки сайтів!",
    "💰 Найбагатший програміст світу — CEO Microsoft Сатья Наделла, його статки ~$1 млрд.",
    "👩‍💻 У Кремнієвій долині середня зарплата розробника $150,000/рік",
    "🧠 Перша комп'ютерна програма написана жінкою — Адою Лавлейс у 1843 році!",
    "📱 Найбільш затребувана професія 2025 — AI/Machine Learning Engineer",
    "🎨 Web-дизайнери заробляють до $80,000/рік у США",
    "🚀 Fullstack-розробники можуть створити цілий додаток самостійно!"
];

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * randomFacts.length);
    const factDisplay = document.getElementById('randomFactDisplay');
    if (factDisplay) {
        factDisplay.innerHTML = `✨ ${randomFacts[randomIndex]} ✨`;
    }
}

// ========== Ефект появи при скролі ==========
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.prof-card, .fact-item, .step');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// ========== Ініціалізація ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProfQuiz();
    initProfCards();
    animateSkillBars();
    observeElements();
    
    const checkBtn = document.getElementById('checkProfQuizBtn');
    if (checkBtn) checkBtn.addEventListener('click', checkProfQuiz);
    
    const resetBtn = document.getElementById('resetProfQuizBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetProfQuiz);
    
    const randomFactBtn = document.getElementById('randomFactBtn');
    if (randomFactBtn) randomFactBtn.addEventListener('click', showRandomFact);
    
    // Додаємо ефект появи перших шкал при завантаженні
    setTimeout(() => {
        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            const currentWidth = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = currentWidth;
            }, 100);
        });
    }, 300);
    
    console.log("Сторінка 'Професії у Web-розробці' завантажена!");
});