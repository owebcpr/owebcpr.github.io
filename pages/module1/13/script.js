// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),
  
  // Гра "Вгадай атрибут"
  attrGame: document.querySelector('#attributeGame'),
  attrQuestion: document.querySelector('#attrQuestion'),
  attrOptions: document.querySelector('#attrOptions'),
  attrScore: document.querySelector('#attrScore'),
  attrFeedback: document.querySelector('#attrFeedback'),
  startAttrBtn: document.querySelector('#startAttrBtn'),
  resetAttrBtn: document.querySelector('#resetAttrBtn'),
  
  // Вікторина
  quizMediaContainer: document.querySelector('#quizMediaContainer'),
  quizMediaFeedback: document.querySelector('#quizMediaFeedback'),
  checkMediaQuizBtn: document.querySelector('#checkMediaQuizBtn'),
  resetMediaQuizBtn: document.querySelector('#resetMediaQuizBtn'),
  
  randomFactBtn: document.querySelector('#randomFactBtn'),
  factDisplay: document.querySelector('#randomFactDisplay'),
};

// Приховані стилі, які не будуть відображатися в редакторі
const HIDDEN_STYLES = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
    }
    h1 {
        color: #1e5f7a;
        margin-bottom: 20px;
        font-size: 24px;
    }
    h2 {
        color: #2c6e8f;
        margin: 20px 0 10px 0;
        font-size: 20px;
    }
    .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        margin-bottom: 20px;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
    }
    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
    audio {
        width: 100%;
        margin: 10px 0;
    }
    p {
        margin-top: 15px;
        color: #666;
    }
`;

// Чистий HTML без стилів (для відображення в редакторі)
const CLEAN_HTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моє відео</title>
</head>
<body>
    <h1>🎬 Моє улюблене відео</h1>
    
    <div class="video-wrapper">
        <iframe 
            src="https://www.youtube.com/embed/Vr3dEE0QXtg" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
    
    <h2>🎵 Улюблена музика</h2>
    <audio controls>
        <source src="myaudio.mp3" type="audio/mpeg">
        Ваш браузер не підтримує аудіо
    </audio>
    
    <p>💡 Спробуй замінити посилання на відео з YouTube!</p>
</body>
</html>`;

// Повний код зі стилями (для відображення в iframe)
const FULL_CODE_WITH_STYLES = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моє відео</title>
    <style>${HIDDEN_STYLES}</style>
</head>
<body>
    <h1>🎬 Моє улюблене відео</h1>
    
    <div class="video-wrapper">
        <iframe 
            src="https://www.youtube.com/embed/Vr3dEE0QXtg" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
    
    <h2>🎵 Улюблена музика</h2>
    <audio controls>
        <source src="myaudio.mp3" type="audio/mpeg">
        Ваш браузер не підтримує аудіо
    </audio>
    
    <p>💡 Спробуй замінити посилання на відео з YouTube!</p>
</body>
</html>`;

// Питання для гри
const ATTR_QUESTIONS = [
  { text: "Який атрибут показує кнопки керування?", options: ["controls", "buttons", "panel", "show"], correct: 0 },
  { text: "Який атрибут відповідає за автоматичне відтворення?", options: ["auto", "autoplay", "play", "start"], correct: 1 },
  { text: "Який атрибут зациклює відтворення відео?", options: ["repeat", "cycle", "loop", "again"], correct: 2 },
  { text: "Який атрибут вимикає звук за замовчуванням?", options: ["silent", "muted", "nosound", "volume=0"], correct: 1 },
  { text: "Який атрибут задає зображення-заставку для відео?", options: ["image", "poster", "cover", "preview"], correct: 1 },
  { text: "Який тег використовується для вставки відео з YouTube?", options: ["video", "embed", "iframe", "object"], correct: 2 },
  { text: "Який атрибут вказує шлях до відеофайлу?", options: ["href", "link", "src", "path"], correct: 2 },
  { text: "Який атрибут встановлює ширину відеоплеєра?", options: ["width", "size", "w", "wide"], correct: 0 },
  { text: "Який атрибут дозволяє відео на весь екран?", options: ["fullscreen", "allowfullscreen", "full", "screen"], correct: 1 },
  { text: "Який формат аудіо найпоширеніший у вебі?", options: ["wav", "ogg", "mp3", "flac"], correct: 2 }
];

// Вікторина
const MEDIA_QUIZ = [
  { text: "Який тег використовується для вставки відео?", options: ["&lt;video&gt;", "&lt;movie&gt;", "&lt;media&gt;", "&lt;film&gt;"], correct: 0 },
  { text: "Який атрибут додає панель керування?", options: ["controls", "panel", "buttons", "toolbar"], correct: 0 },
  { text: "Який сервіс найчастіше використовують для вставки відео?", options: ["Vimeo", "YouTube", "Dailymotion", "Twitch"], correct: 1 },
  { text: "Який тег використовується для вставки аудіо?", options: ["&lt;music&gt;", "&lt;audio&gt;", "&lt;sound&gt;", "&lt;mp3&gt;"], correct: 1 },
  { text: "Який атрибут зациклює відео?", options: ["repeat", "cycle", "loop", "again"], correct: 2 }
];

const FACTS = [
  "Перше відео в інтернеті було завантажено у 1997 році!",
  "YouTube був створений у 2005 році, а перше відео називалося 'Me at the zoo'!",
  "Відео становить понад 80% всього інтернет-трафіку!",
  "HTML5 додав підтримку відео без Flash у 2009 році!",
  "Найдовше відео на YouTube триває понад 600 годин!",
  "Формат MP3 був створений у 1993 році німецькими вченими!"
];

// ==================== РЕДАКТОР КОДУ ====================
class CodeEditor {
  static init() {
    if (DOM.codeEditor) {
      // Показуємо користувачеві чистий HTML без стилів
      DOM.codeEditor.value = CLEAN_HTML;
      this.run();
    }
    DOM.runBtn?.addEventListener('click', () => this.run());
    DOM.clearBtn?.addEventListener('click', () => this.clear());
    DOM.loadExampleBtn?.addEventListener('click', () => this.loadExample());
  }

  static run() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    let code = DOM.codeEditor.value;
    
    // Перевіряємо, чи є в коді стилі, якщо ні - додаємо приховані стилі автоматично
    if (!code.includes('<style>') && code.includes('<head>')) {
      code = code.replace('<head>', `<head><style>${HIDDEN_STYLES}</style>`);
    }
    // Якщо немає <head>, додаємо стилі на початок body
    else if (!code.includes('<style>') && !code.includes('<head>')) {
      code = code.replace('<body>', `<body><style>${HIDDEN_STYLES}</style>`);
    }
    
    DOM.previewFrame.srcdoc = code;
  }

  static clear() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    DOM.codeEditor.value = '';
    DOM.previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;text-align:center;">👈 Встав код для вставки відео та натисни "Запустити код"</body></html>';
  }

  static loadExample() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    // Показуємо користувачеві чистий HTML без стилів
    DOM.codeEditor.value = CLEAN_HTML;
    this.run();
  }
}

// ==================== ГРА "ВГАДАЙ АТРИБУТ" ====================
class AttributeGame {
  static currentQuestion = 0;
  static score = 0;
  static isGameActive = false;
  static totalQuestions = ATTR_QUESTIONS.length;
  static timer = null;
  static timeLeft = 60;

  static init() {
    DOM.startAttrBtn?.addEventListener('click', () => this.startGame());
    DOM.resetAttrBtn?.addEventListener('click', () => this.resetGame());
    this.updateUI();
  }

  static startGame() {
    if (this.isGameActive) return;
    this.resetGameState();
    this.isGameActive = true;
    this.startTimer();
    this.loadQuestion();
    this.updateUI();
    if (DOM.attrFeedback) DOM.attrFeedback.innerHTML = '';
  }

  static startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      if (!this.isGameActive) return;
      if (this.timeLeft <= 0) {
        this.gameLose('Час вийшов!');
      } else {
        this.timeLeft--;
        this.updateTimerDisplay();
      }
    }, 1000);
  }

  static stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  static updateTimerDisplay() {
    const timerElement = document.querySelector('#attrTimer');
    if (timerElement) timerElement.textContent = this.timeLeft;
  }

  static resetGame() {
    this.stopTimer();
    this.resetGameState();
    this.updateUI();
    if (DOM.attrFeedback) DOM.attrFeedback.innerHTML = '';
    if (DOM.attrQuestion) DOM.attrQuestion.innerHTML = 'Натисни "Почати гру" щоб розпочати!';
    if (DOM.attrOptions) DOM.attrOptions.innerHTML = '';
  }

  static resetGameState() {
    this.currentQuestion = 0;
    this.score = 0;
    this.timeLeft = 60;
    this.isGameActive = false;
    this.updateScoreDisplay();
    this.updateTimerDisplay();
  }

  static updateScoreDisplay() {
    if (DOM.attrScore) {
      DOM.attrScore.innerHTML = `✅ Правильних відповідей: ${this.score} / ${this.totalQuestions}`;
    }
  }

  static updateUI() {
    if (DOM.startAttrBtn) {
      DOM.startAttrBtn.style.display = this.isGameActive ? 'none' : 'inline-flex';
    }
  }

  static loadQuestion() {
    if (!this.isGameActive) return;
    if (this.currentQuestion >= this.totalQuestions) {
      this.checkWinLose();
      return;
    }

    const q = ATTR_QUESTIONS[this.currentQuestion];
    if (DOM.attrQuestion) DOM.attrQuestion.innerHTML = q.text;

    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const optionsHtml = shuffled.map(opt => `<button class="attr-btn" data-value="${opt}">${opt}</button>`).join('');
    if (DOM.attrOptions) DOM.attrOptions.innerHTML = optionsHtml;

    DOM.attrOptions?.querySelectorAll('.attr-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleAnswer(btn));
    });
  }

  static highlightCorrectAnswer() {
    const currentQ = ATTR_QUESTIONS[this.currentQuestion];
    const correctAnswer = currentQ.options[currentQ.correct];
    const btns = DOM.attrOptions?.querySelectorAll('.attr-btn');
    btns?.forEach(btn => {
      if (btn.dataset.value === correctAnswer) {
        btn.style.background = '#27ae60';
        btn.style.color = 'white';
      }
    });
  }

  static handleAnswer(btn) {
    if (!this.isGameActive) return;
    
    const selectedValue = btn.dataset.value;
    const currentQ = ATTR_QUESTIONS[this.currentQuestion];
    const isCorrect = (selectedValue === currentQ.options[currentQ.correct]);
    
    const allBtns = DOM.attrOptions?.querySelectorAll('.attr-btn');
    allBtns?.forEach(b => { b.disabled = true; });
    
    if (isCorrect) {
      this.score++;
      this.updateScoreDisplay();
      if (DOM.attrFeedback) {
        DOM.attrFeedback.innerHTML = '<p style="color:#27ae60;">✅ Правильно! Молодець!</p>';
      }
    } else {
      this.highlightCorrectAnswer();
      btn.style.background = '#e67e22';
      btn.style.color = 'white';
      if (DOM.attrFeedback) {
        DOM.attrFeedback.innerHTML = `<p style="color:#e67e22;">❌ Неправильно! Правильна відповідь: <strong>${currentQ.options[currentQ.correct]}</strong></p>`;
      }
    }
    
    this.currentQuestion++;
    setTimeout(() => { if (this.isGameActive) this.loadQuestion(); }, 1500);
  }

  static checkWinLose() {
    this.isGameActive = false;
    this.stopTimer();
    if (this.score === this.totalQuestions) {
      this.gameWin();
    } else {
      this.gameLose(`Правильних відповідей: ${this.score} з ${this.totalQuestions}`);
    }
  }

  static gameWin() {
    if (DOM.attrFeedback) {
      DOM.attrFeedback.innerHTML = `<p style="color:#fafd25; font-size:1.3rem;">🎉 ВІТАЮ! 🎉<br>Ти відповів правильно на всі ${this.totalQuestions} запитань!<br>Ти справжній знавець атрибутів! 🌟</p>`;
    }
    if (DOM.attrOptions) DOM.attrOptions.innerHTML = '';
    if (DOM.attrQuestion) DOM.attrQuestion.innerHTML = 'Гру завершено! Ти переміг! 🏆';
    if (DOM.startAttrBtn) DOM.startAttrBtn.style.display = 'inline-flex';
  }

  static gameLose(reason) {
    if (DOM.attrFeedback) {
      DOM.attrFeedback.innerHTML = `<p style="color:#ff6b6b; font-size:1.2rem;">💔 ГРА ЗАКІНЧЕНА! 💔<br>${reason}<br>Спробуй ще раз, у тебе обов'язково вийде!</p>`;
    }
    if (DOM.attrOptions) DOM.attrOptions.innerHTML = '';
    if (DOM.attrQuestion) DOM.attrQuestion.innerHTML = 'Натисни "Почати гру" щоб спробувати ще раз!';
    if (DOM.startAttrBtn) DOM.startAttrBtn.style.display = 'inline-flex';
  }
}

// ==================== ВІКТОРИНА ====================
class MediaQuiz {
  static userAnswers = new Array(MEDIA_QUIZ.length).fill(null);

  static render() {
    if (!DOM.quizMediaContainer) return;
    const html = MEDIA_QUIZ.map((q, idx) => `
      <div class="quiz-question">${idx + 1}. ${q.text}</div>
      ${q.options.map((opt, optIdx) => `
        <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
             data-qidx="${idx}" data-oidx="${optIdx}">
          ${String.fromCharCode(65 + optIdx)}. ${opt}
        </div>
      `).join('')}
    `).join('');
    DOM.quizMediaContainer.innerHTML = html;
    
    DOM.quizMediaContainer.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const { qidx, oidx } = e.currentTarget.dataset;
        this.userAnswers[parseInt(qidx)] = parseInt(oidx);
        this.render();
      });
    });
  }

  static check() {
    let correctCount = 0;
    const results = MEDIA_QUIZ.map((q, i) => {
      const isCorrect = this.userAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
      return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
    });
    const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${MEDIA_QUIZ.length}</p>
      ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
    if (DOM.quizMediaFeedback) DOM.quizMediaFeedback.innerHTML = html;
  }

  static reset() {
    this.userAnswers = new Array(MEDIA_QUIZ.length).fill(null);
    this.render();
    if (DOM.quizMediaFeedback) DOM.quizMediaFeedback.innerHTML = '';
  }

  static init() {
    this.render();
    DOM.checkMediaQuizBtn?.addEventListener('click', () => this.check());
    DOM.resetMediaQuizBtn?.addEventListener('click', () => this.reset());
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
  AttributeGame.init();
  MediaQuiz.init();
  RandomFact.init();
  SmoothScroll.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}