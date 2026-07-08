// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),
  showSolutionBtn: document.querySelector('#showSolutionBtn'),
  solutionContent: document.querySelector('#solutionContent'),
  
  // Гра з кульками
  balloonGame: document.querySelector('#balloonGame'),
  gameTimer: document.querySelector('#gameTimer'),
  gameScore: document.querySelector('#gameScore'),
  gameQuestion: document.querySelector('#gameQuestion'),
  balloonsContainer: document.querySelector('#balloonsContainer'),
  gameFeedback: document.querySelector('#gameFeedback'),
  startGameBtn: document.querySelector('#startGameBtn'),
  resetGameBtn: document.querySelector('#resetGameBtn'),
  totalQuestionsSpan: document.querySelector('#totalQuestions'),
  
  // Вікторина
  quizContainer: document.querySelector('#quizContainer'),
  quizFeedback: document.querySelector('#quizFeedback'),
  checkQuizBtn: document.querySelector('#checkQuizBtn'),
  resetQuizBtn: document.querySelector('#resetQuizBtn'),
  
  // Інтерактивне завдання
  copyInitialBtn: document.querySelector('#copyInitialBtn'),
  checkTaskBtn: document.querySelector('#checkTaskBtn'),
  resetTaskBtn: document.querySelector('#resetTaskBtn'),
  tryTaskAgainBtn: document.querySelector('#tryTaskAgainBtn'),
  loadTaskCodeBtn: document.querySelector('#loadTaskCodeBtn'),
  userCodeEditor: document.querySelector('#userCodeEditor'),
  taskResult: document.querySelector('#taskResult'),
  
  randomFactBtn: document.querySelector('#randomFactBtn'),
  factDisplay: document.querySelector('#randomFactDisplay'),
};

// ==================== КОНСТАНТИ ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Семантична сторінка</title>
</head>
<body>
    <div class="header">
        <h1>Мій сайт</h1>
    </div>
    
    <div class="nav">
        <a href="#">Головна</a>
        <a href="#">Про нас</a>
        <a href="#">Контакти</a>
    </div>
    
    <div class="main">
        <div class="article">
            <h2>Стаття 1</h2>
            <p>Це цікава стаття про семантичні теги.</p>
        </div>
        
        <div class="section">
            <h3>Розділ</h3>
            <p>Додаткова інформація.</p>
        </div>
    </div>
    
    <div class="aside">
        <h4>Бічна панель</h4>
        <p>Реклама або посилання.</p>
    </div>
    
    <div class="footer">
        <p>© 2026 Мій сайт</p>
    </div>
</body>
</html>`;

// Питання для гри з кульками
const BALLOON_QUESTIONS = [
    { text: "Який тег використовується для верхньої частини сторінки?", correct: "header", options: ["header", "head", "top", "div"] },
    { text: "Який тег призначений для навігаційного меню?", correct: "nav", options: ["menu", "nav", "navigation", "ul"] },
    { text: "Який тег містить основний унікальний контент сторінки?", correct: "main", options: ["main", "content", "body", "section"] },
    { text: "Який тег використовується для окремої статті або посту?", correct: "article", options: ["post", "article", "entry", "div"] },
    { text: "Який тег групує контент за темою (розділ)?", correct: "section", options: ["group", "section", "part", "div"] },
    { text: "Який тег призначений для бічного контенту (сайдбару)?", correct: "aside", options: ["sidebar", "aside", "side", "right"] },
    { text: "Який тег використовується для нижньої частини сторінки?", correct: "footer", options: ["bottom", "footer", "end", "div"] }
];

// Питання для вікторини
const SEMANTIC_QUIZ = [
    { text: "Який тег є семантичним?", options: ["&lt;div&gt;", "&lt;span&gt;", "&lt;article&gt;", "&lt;b&gt;"], correct: 2 },
    { text: "Для чого використовується тег &lt;nav&gt;?", options: ["Для навігації", "Для заголовка", "Для картинок", "Для тексту"], correct: 0 },
    { text: "Скільки тегів &lt;main&gt; може бути на одній сторінці?", options: ["0", "1", "2", "Скільки завгодно"], correct: 1 },
    { text: "Який тег використовується для підвалу сайту?", options: ["&lt;header&gt;", "&lt;footer&gt;", "&lt;bottom&gt;", "&lt;end&gt;"], correct: 1 },
    { text: "Семантичні теги важливі для...", options: ["SEO", "Доступності", "Структури коду", "Усього перерахованого"], correct: 3 }
];

const FACTS = [
    "Семантичні теги з'явилися в HTML5 у 2014 році!",
    "Google рекомендує використовувати семантичні теги для кращої індексації!",
    "Screen readers (екранні диктори) використовують семантичні теги для навігації!",
    "Правильна семантика може підвищити позиції сайту в пошуку до 30%!",
    "Тег &lt;header&gt; може використовуватися декілька разів на сторінці!",
    "Семантичний код легше підтримувати та розширювати!"
];

// Початковий код для інтерактивного завдання
const INITIAL_TASK_CODE = `<div class="header">
    <h1>Мій сайт</h1>
</div>

<div class="nav">
    <a href="#">Головна</a>
    <a href="#">Про нас</a>
    <a href="#">Контакти</a>
</div>

<div class="main">
    <div class="article">
        <h2>Стаття 1</h2>
        <p>Це цікава стаття про семантичні теги.</p>
    </div>
    
    <div class="section">
        <h3>Розділ</h3>
        <p>Додаткова інформація.</p>
    </div>
</div>

<div class="aside">
    <h4>Бічна панель</h4>
    <p>Реклама або посилання.</p>
</div>

<div class="footer">
    <p>© 2026 Мій сайт</p>
</div>`;

// Правильні відповіді для перевірки кроків
const CORRECT_TAGS = {
    'class="header"': 'header',
    'class="nav"': 'nav',
    'class="main"': 'main',
    'class="article"': 'article',
    'class="section"': 'section',
    'class="aside"': 'aside',
    'class="footer"': 'footer'
};

// ==================== ГРА З КУЛЬКАМИ ====================
class BalloonGame {
    static currentQuestion = 0;
    static score = 0;
    static isActive = false;
    static timer = null;
    static timeLeft = 90;
    static wrongAnswers = [];

    static init() {
        if (DOM.totalQuestionsSpan) DOM.totalQuestionsSpan.textContent = BALLOON_QUESTIONS.length;
        DOM.startGameBtn?.addEventListener('click', () => this.start());
        DOM.resetGameBtn?.addEventListener('click', () => this.reset());
        
        // Показуємо кульки до початку гри
        this.showIdleBalloons();
    }
    
    static showIdleBalloons() {
        // Показуємо красиві кульки до початку гри
        const idleBalloonsHtml = `
            <div class="balloon idle-balloon">
                <div class="balloon-icon">🎈</div>
            </div>
            <div class="balloon idle-balloon">
                <div class="balloon-icon">🎈</div>
            </div>
            <div class="balloon idle-balloon">
                <div class="balloon-icon">🎈</div>
            </div>
            <div class="balloon idle-balloon">
                <div class="balloon-icon">🎈</div>
            </div>
            <div class="balloon idle-balloon">
                <div class="balloon-icon">🎈</div>
            </div>
        `;
        if (DOM.balloonsContainer) {
            DOM.balloonsContainer.innerHTML = idleBalloonsHtml;
        }
        if (DOM.gameQuestion) {
            DOM.gameQuestion.innerHTML = '🎮 Натисни "Почати гру" щоб розпочати! 🎮';
        }
    }

    static start() {
        if (this.isActive) return;
        this.reset();
        this.isActive = true;
        this.startTimer();
        this.loadQuestion();
        if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = '';
    }

    static startTimer() {
        this.stopTimer();
        this.timer = setInterval(() => {
            if (!this.isActive) return;
            if (this.timeLeft <= 0) {
                this.gameOver('Час вийшов! ⏰');
            } else {
                this.timeLeft--;
                if (DOM.gameTimer) DOM.gameTimer.textContent = this.timeLeft;
            }
        }, 1000);
    }

    static stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    static loadQuestion() {
        if (this.currentQuestion >= BALLOON_QUESTIONS.length) {
            this.gameWin();
            return;
        }

        const q = BALLOON_QUESTIONS[this.currentQuestion];
        if (DOM.gameQuestion) DOM.gameQuestion.textContent = q.text;

        const options = [...q.options];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const balloonsHtml = options.map(opt => `
            <div class="balloon game-balloon" data-value="${opt}">
                <div class="balloon-icon">🎈</div>
                <div class="balloon-label">${opt}</div>
            </div>
        `).join('');

        if (DOM.balloonsContainer) DOM.balloonsContainer.innerHTML = balloonsHtml;

        DOM.balloonsContainer?.querySelectorAll('.balloon').forEach(balloon => {
            balloon.addEventListener('click', () => this.handleAnswer(balloon));
        });
    }

    static handleAnswer(balloon) {
        if (!this.isActive) return;
        
        const selectedValue = balloon.dataset.value;
        const currentQ = BALLOON_QUESTIONS[this.currentQuestion];
        const isCorrect = (selectedValue === currentQ.correct);
        
        if (!isCorrect) {
            this.wrongAnswers.push({
                question: currentQ.text,
                userAnswer: selectedValue,
                correctAnswer: currentQ.correct
            });
        }
        
        if (isCorrect) {
            balloon.classList.add('balloon-fly-up');
            this.score++;
            if (DOM.gameScore) DOM.gameScore.textContent = this.score;
            
            this.currentQuestion++;
            setTimeout(() => {
                if (this.isActive) this.loadQuestion();
            }, 800);
        } else {
            balloon.classList.add('balloon-pop');
            this.isActive = false;
            this.stopTimer();
            
            if (DOM.gameFeedback) {
                DOM.gameFeedback.innerHTML = `<p style="color:#ffaaaa;">❌ Неправильно! Правильна відповідь: <strong>${currentQ.correct}</strong></p>`;
            }
            
            setTimeout(() => {
                this.showWrongAnswers();
            }, 1000);
        }
        
        DOM.balloonsContainer?.querySelectorAll('.balloon').forEach(b => {
            b.style.pointerEvents = 'none';
        });
    }

    static showWrongAnswers() {
        let wrongAnswersHtml = '<div class="wrong-answers-modal">';
        wrongAnswersHtml += '<h4>📝 Правильні відповіді:</h4>';
        wrongAnswersHtml += '<ul>';
        
        BALLOON_QUESTIONS.forEach((q, idx) => {
            const wasWrong = this.wrongAnswers.some(wa => wa.question === q.text);
            wrongAnswersHtml += `<li><strong>${idx + 1}. ${q.text}</strong><br>`;
            wrongAnswersHtml += `✅ <span style="color:#aaffaa;">${q.correct}</span>`;
            if (wasWrong) wrongAnswersHtml += ` <span style="color:#ffaaaa;">(ти помилився)</span>`;
            wrongAnswersHtml += '</li>';
        });
        
        wrongAnswersHtml += '</ul>';
        wrongAnswersHtml += '<button id="tryAgainBtn" class="btn-run"><i class="fas fa-redo-alt"></i> Спробувати ще раз</button>';
        wrongAnswersHtml += '</div>';
        
        if (DOM.gameFeedback) {
            DOM.gameFeedback.innerHTML += wrongAnswersHtml;
        }
        
        document.querySelector('#tryAgainBtn')?.addEventListener('click', () => {
            this.reset();
            this.start();
        });
    }

    static gameWin() {
        this.isActive = false;
        this.stopTimer();
        
        let winMessage = `<div class="win-message"><p style="color:#ffffaa; font-size:1.3rem;">🎉 ВІТАЮ! 🎉</p>`;
        winMessage += `<p>Ти відповів правильно на всі ${BALLOON_QUESTIONS.length} запитань!</p>`;
        winMessage += '<button id="playAgainBtn" class="btn-run"><i class="fas fa-play"></i> Зіграти ще раз</button></div>';
        
        if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = winMessage;
        if (DOM.balloonsContainer) DOM.balloonsContainer.innerHTML = '<div class="win-emoji">🏆🎈🏆</div>';
        
        document.querySelector('#playAgainBtn')?.addEventListener('click', () => {
            this.reset();
            this.start();
        });
    }

    static gameOver(reason) {
        this.isActive = false;
        this.stopTimer();
        
        let gameOverHtml = `<div class="gameover-message"><p style="color:#ffaaaa; font-size:1.2rem;">💔 ${reason}</p>`;
        gameOverHtml += '<button id="tryAgainBtn" class="btn-run"><i class="fas fa-redo-alt"></i> Спробувати ще раз</button></div>';
        
        if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = gameOverHtml;
        
        document.querySelector('#tryAgainBtn')?.addEventListener('click', () => {
            this.reset();
            this.start();
        });
    }

    static reset() {
        this.stopTimer();
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 90;
        this.isActive = false;
        this.wrongAnswers = [];
        if (DOM.gameScore) DOM.gameScore.textContent = '0';
        if (DOM.gameTimer) DOM.gameTimer.textContent = '90';
        if (DOM.gameQuestion) DOM.gameQuestion.textContent = 'Натисни "Почати гру"!';
        if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = '';
        
        // Показуємо красиві кульки до початку гри
        this.showIdleBalloons();
    }
}
// ==================== ВІКТОРИНА ====================
class SemanticQuiz {
    static userAnswers = new Array(SEMANTIC_QUIZ.length).fill(null);

    static render() {
        if (!DOM.quizContainer) return;
        const html = SEMANTIC_QUIZ.map((q, idx) => `
            <div class="quiz-question">${idx + 1}. ${q.text}</div>
            ${q.options.map((opt, optIdx) => `
                <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
                     data-qidx="${idx}" data-oidx="${optIdx}">
                    ${String.fromCharCode(65 + optIdx)}. ${opt}
                </div>
            `).join('')}
        `).join('');
        DOM.quizContainer.innerHTML = html;
        
        DOM.quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                const { qidx, oidx } = e.currentTarget.dataset;
                this.userAnswers[parseInt(qidx)] = parseInt(oidx);
                this.render();
            });
        });
    }

    static check() {
        let correctCount = 0;
        const results = SEMANTIC_QUIZ.map((q, i) => {
            const isCorrect = this.userAnswers[i] === q.correct;
            if (isCorrect) correctCount++;
            return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
        });
        const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${SEMANTIC_QUIZ.length}</p>
            ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
        if (DOM.quizFeedback) DOM.quizFeedback.innerHTML = html;
    }

    static reset() {
        this.userAnswers = new Array(SEMANTIC_QUIZ.length).fill(null);
        this.render();
        if (DOM.quizFeedback) DOM.quizFeedback.innerHTML = '';
    }

    static init() {
        this.render();
        DOM.checkQuizBtn?.addEventListener('click', () => this.check());
        DOM.resetQuizBtn?.addEventListener('click', () => this.reset());
    }
}

// ==================== ІНТЕРАКТИВНЕ ЗАВДАННЯ ====================
// ==================== ІНТЕРАКТИВНЕ ЗАВДАННЯ ====================
class InteractiveTask {
    static init() {
        DOM.copyInitialBtn?.addEventListener('click', () => this.copyInitialCode());
        DOM.checkTaskBtn?.addEventListener('click', () => this.checkCode());
        DOM.resetTaskBtn?.addEventListener('click', () => this.resetUserCode());
        DOM.tryTaskAgainBtn?.addEventListener('click', () => this.resetAndTryAgain());
        DOM.loadTaskCodeBtn?.addEventListener('click', () => this.loadTaskToEditor());
        
        if (DOM.userCodeEditor) {
            DOM.userCodeEditor.value = INITIAL_TASK_CODE;
        }
    }
    
    static copyInitialCode() {
        if (INITIAL_TASK_CODE) {
            navigator.clipboard.writeText(INITIAL_TASK_CODE);
            this.showToast('Код скопійовано! 📋');
        }
    }
    
    static loadTaskToEditor() {
        if (DOM.codeEditor) {
            DOM.codeEditor.value = DEFAULT_CODE;
            if (DOM.runBtn) DOM.runBtn.click();
            this.showToast('Завдання завантажено в редактор!');
        }
    }
    
    static checkCode() {
        const userCode = DOM.userCodeEditor?.value || '';
        const results = [];
        let allCorrect = true;
        
        for (const [wrongClass, correctTag] of Object.entries(CORRECT_TAGS)) {
            const hasCorrectOpening = userCode.includes(`<${correctTag}>`);
            const hasCorrectClosing = userCode.includes(`</${correctTag}>`);
            const hasOldDiv = userCode.includes(wrongClass);
            
            if (hasOldDiv && !hasCorrectOpening) {
                allCorrect = false;
                results.push({
                    tag: correctTag,
                    status: 'missing',
                    message: `❌ Не знайдено &lt;${correctTag}&gt; (потрібно замінити div ${wrongClass})`
                });
            } else if (hasCorrectOpening && hasCorrectClosing) {
                results.push({
                    tag: correctTag,
                    status: 'correct',
                    message: `✅ &lt;${correctTag}&gt; використано правильно`
                });
            } else if (hasCorrectOpening && !hasCorrectClosing) {
                allCorrect = false;
                results.push({
                    tag: correctTag,
                    status: 'missing',
                    message: `❌ &lt;${correctTag}&gt; відкрито, але не закрито!`
                });
            }
        }
        
        if (DOM.taskResult) DOM.taskResult.style.display = 'block';
        
        const resultIcon = document.querySelector('#resultIcon');
        const resultMessage = document.querySelector('#resultMessage');
        const resultDetails = document.querySelector('#resultDetails');
        const tryAgainBtn = DOM.tryTaskAgainBtn;
        
        if (allCorrect) {
            if (resultIcon) {
                resultIcon.className = 'fas fa-check-circle';
                resultIcon.style.color = '#27ae60';
            }
            if (resultMessage) resultMessage.innerHTML = '<strong>🎉 Чудово! Всі семантичні теги використано правильно!</strong>';
            if (resultDetails) resultDetails.innerHTML = '<p style="color: #27ae60;">✨ Ти справжній майстер семантики!</p>';
            if (tryAgainBtn) tryAgainBtn.style.display = 'none';
            
            const congrats = document.querySelector('#finalCongrats');
            if (congrats) congrats.style.display = 'block';
            
            // Прокручуємо до вітання
            setTimeout(() => {
                congrats?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            if (resultIcon) {
                resultIcon.className = 'fas fa-times-circle';
                resultIcon.style.color = '#e67e22';
            }
            if (resultMessage) resultMessage.innerHTML = '<strong>⚠️ Знайдені помилки. Виправ їх та спробуй ще раз!</strong>';
            
            let detailsHtml = '<ul style="margin-top: 10px;">';
            results.forEach(r => {
                detailsHtml += `<li style="margin: 8px 0;">${r.message}</li>`;
            });
            detailsHtml += '</ul>';
            if (resultDetails) resultDetails.innerHTML = detailsHtml;
            if (tryAgainBtn) tryAgainBtn.style.display = 'inline-flex';
            
            const congrats = document.querySelector('#finalCongrats');
            if (congrats) congrats.style.display = 'none';
            
            // Прокручуємо до результатів з помилками
            setTimeout(() => {
                const taskResult = DOM.taskResult;
                if (taskResult) {
                    taskResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Додаємо підсвічування для привернення уваги
                    taskResult.style.transition = 'box-shadow 0.3s ease';
                    taskResult.style.boxShadow = '0 0 0 3px #e67e22, 0 0 0 6px rgba(230, 126, 34, 0.3)';
                    setTimeout(() => {
                        taskResult.style.boxShadow = '';
                    }, 2000);
                }
            }, 100);
        }
    }
    
    static resetUserCode() {
        if (DOM.userCodeEditor) {
            DOM.userCodeEditor.value = INITIAL_TASK_CODE;
        }
        if (DOM.taskResult) DOM.taskResult.style.display = 'none';
        const congrats = document.querySelector('#finalCongrats');
        if (congrats) congrats.style.display = 'none';
        this.showToast('Код скинуто до початкового');
    }
    
    static resetAndTryAgain() {
        this.resetUserCode();
        this.showToast('Спробуй ще раз! Уважно подивись на підказки');
    }
    
    static showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e5f7a;
            color: white;
            padding: 12px 24px;
            border-radius: 40px;
            z-index: 1000;
            animation: fadeInOut 2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}

// ==================== РЕДАКТОР КОДУ ====================
class CodeEditor {
    static init() {
        if (DOM.codeEditor) {
            DOM.codeEditor.value = DEFAULT_CODE;
            this.run();
        }
        DOM.runBtn?.addEventListener('click', () => this.run());
        DOM.clearBtn?.addEventListener('click', () => this.clear());
        DOM.loadExampleBtn?.addEventListener('click', () => this.loadExample());
        DOM.showSolutionBtn?.addEventListener('click', () => this.toggleSolution());
    }
    
    static run() {
        if (!DOM.codeEditor || !DOM.previewFrame) return;
        DOM.previewFrame.srcdoc = DOM.codeEditor.value;
    }
    
    static clear() {
        if (!DOM.codeEditor || !DOM.previewFrame) return;
        DOM.codeEditor.value = '';
        DOM.previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;">👈 Напиши код ліворуч і натисни "Запустити код"</body></html>';
    }
    
    static loadExample() {
        if (!DOM.codeEditor || !DOM.previewFrame) return;
        DOM.codeEditor.value = DEFAULT_CODE;
        this.run();
    }
    
    static toggleSolution() {
        if (!DOM.solutionContent) return;
        DOM.solutionContent.classList.toggle('show');
    }
}

// ==================== ВИПАДКОВІ ФАКТИ ====================
class RandomFact {
    static show() {
        const randomIndex = Math.floor(Math.random() * FACTS.length);
        if (DOM.factDisplay) {
            DOM.factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${FACTS[randomIndex]}`;
        }
    }
    
    static init() {
        DOM.randomFactBtn?.addEventListener('click', () => this.show());
    }
}

// ==================== ПЛАВНА НАВІГАЦІЯ ====================
class SmoothScroll {
    static init() {
        document.querySelectorAll('.nav a, a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
const init = () => {
    CodeEditor.init();
    BalloonGame.init();
    SemanticQuiz.init();
    InteractiveTask.init();
    RandomFact.init();
    SmoothScroll.init();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}