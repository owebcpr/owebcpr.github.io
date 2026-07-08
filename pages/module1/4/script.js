// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  // Редактор коду
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),
  showSolutionBtn: document.querySelector('#showSolutionBtn'),
  solutionContent: document.querySelector('#solutionContent'),

  // Чекліст
  checklist: document.querySelector('#challengeChecklist'),
  resetChecklistBtn: document.querySelector('#resetChecklistBtn'),

  // Гра з таймером
  gameArea: document.querySelector('#tagGame'),
  gameQuestion: document.querySelector('#gameQuestion'),
  gameOptions: document.querySelector('#gameOptions'),
  gameFeedback: document.querySelector('#gameFeedback'),
  gameScore: document.querySelector('#gameScore'),
  gameTimerDisplay: document.querySelector('#gameTimerDisplay'),
  timerValue: document.querySelector('#timerValue'),
  startGameBtn: document.querySelector('#startGameBtn'),
  resetGameBtn: document.querySelector('#resetGameBtn'),
  totalQuestionsSpan: document.querySelector('#totalQuestions'),

  // Вікторина про теги
  quizTagsContainer: document.querySelector('#quizTagsContainer'),
  quizTagsFeedback: document.querySelector('#quizTagsFeedback'),
  checkTagsQuizBtn: document.querySelector('#checkTagsQuizBtn'),
  resetTagsQuizBtn: document.querySelector('#resetTagsQuizBtn'),

  // Контрольна вікторина
  quizControlContainer: document.querySelector('#quizControlContainer'),
  quizControlFeedback: document.querySelector('#quizControlFeedback'),
  checkControlQuizBtn: document.querySelector('#checkControlQuizBtn'),
  resetControlQuizBtn: document.querySelector('#resetControlQuizBtn'),

  // Факти
  randomFactBtn: document.querySelector('#randomFactBtn'),
  factDisplay: document.querySelector('#randomFactDisplay'),
};

// ==================== КОНСТАНТИ ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моя улюблена книга</title>
</head>
<body>
    <h1>🌍 "Мандри Гуллівера" - Джонатан Свіфт</h1>
    <p>Це моя улюблена книга, яку я прочитав уже кілька разів. Вона розповідає про неймовірні пригоди Лемюеля Гуллівера у країнах ліліпутів та велетнів.</p>
    
    <hr>
    
    <h2>📖 Цікаві факти про книгу</h2>
    <ul>
        <li>Книга була написана <strong>в 1726 році</strong> і одразу стала бестселером</li>
        <li>Спочатку <em>Джонатан Свіфт</em> видав книгу анонімно</li>
        <li>Мова книги вважається <strong>шедевром сатири</strong> світової літератури</li>
    </ul>
    
    <p>Я <strong>дуже рекомендую</strong> прочитати цю книгу кожному!</p>
</body>
</html>`;

// Питання для гри
const GAME_QUESTIONS = [
  { text: "Який тег створює заголовок першого рівня?", options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;header&gt;", "&lt;title&gt;"], correct: 1 },
  { text: "Який тег використовується для абзацу?", options: ["&lt;text&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;span&gt;"], correct: 2 },
  { text: "Який тег створює жирне виділення (важливий текст)?", options: ["&lt;b&gt;", "&lt;strong&gt;", "&lt;bold&gt;", "&lt;weight&gt;"], correct: 1 },
  { text: "Який тег створює курсивне виділення (семантичний - логічний наголос)?", options: ["&lt;i&gt;", "&lt;em&gt;", "&lt;italic&gt;", "&lt;cursive&gt;"], correct: 1 },
  { text: "Який тег створює маркований список?", options: ["&lt;ol&gt;", "&lt;list&gt;", "&lt;ul&gt;", "&lt;li&gt;"], correct: 2 },
  { text: "Який тег створює нумерований список?", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;number&gt;"], correct: 1 },
  { text: "Який тег створює елемент списку?", options: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;ol&gt;", "&lt;list&gt;"], correct: 1 },
  { text: "Який тег використовується для переносу рядка?", options: ["&lt;br&gt;", "&lt;p&gt;", "&lt;hr&gt;", "&lt;break&gt;"], correct: 0 },
  { text: "Який тег створює горизонтальну лінію?", options: ["&lt;br&gt;", "&lt;line&gt;", "&lt;hr&gt;", "&lt;hline&gt;"], correct: 2 },
  { text: "Який тег використовується для важливого тексту (семантичний)?", options: ["&lt;b&gt;", "&lt;strong&gt;", "&lt;bold&gt;", "&lt;important&gt;"], correct: 1 }
];

// Питання для вікторини про теги
const TAGS_QUIZ = [
  { text: "Який тег використовується для найважливішого заголовка?", options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;", "&lt;header&gt;"], correct: 1 },
  { text: "Який з цих тегів є непарним (самозакривним)?", options: ["&lt;p&gt;", "&lt;strong&gt;", "&lt;br&gt;", "&lt;li&gt;"], correct: 2 },
  { text: "Тег &lt;ul&gt; створює:", options: ["Нумерований список", "Маркований список", "Таблицю", "Посилання"], correct: 1 },
  { text: "Який тег використовується для курсивного тексту (семантичний)?", options: ["&lt;i&gt;", "&lt;italic&gt;", "&lt;em&gt;", "&lt;cursive&gt;"], correct: 2 },
  { text: "Який тег є застарілим і НЕ рекомендується до використання?", options: ["&lt;strong&gt;", "&lt;em&gt;", "&lt;font&gt;", "&lt;p&gt;"], correct: 2 }
];

// Контрольні питання для практичної частини
const CONTROL_QUIZ = [
  { text: "Який тег містить весь видимий контент сторінки?", options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;html&gt;", "&lt;main&gt;"], correct: 1 },
  { text: "Для чого використовується тег &lt;meta charset='UTF-8'&gt;?", options: ["Для заголовка сторінки", "Для підтримки українських літер", "Для картинок", "Для стилів"], correct: 1 },
  { text: "Який тег створює посилання?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"], correct: 1 },
  { text: "Атрибут href використовується в тегу:", options: ["&lt;img&gt;", "&lt;a&gt;", "&lt;link&gt;", "&lt;src&gt;"], correct: 1 }
];

const FACTS = [
  "Перший веб-сайт у світі досі доступний за адресою http://info.cern.ch/",
  "Спочатку HTML мав лише 18 тегів, сьогодні їх більше 100!",
  "Тім Бернерс-Лі створив HTML у 1991 році, коли працював у CERN.",
  "HTML не є мовою програмування, це мова розмітки гіпертексту.",
  "Тег &lt;title&gt; впливає на те, як сторінка відображається в закладках браузера.",
  "Непарні теги ще називають 'порожніми' (void elements).",
  "Тег &lt;strong&gt; вважається семантичним, а &lt;b&gt; — ні."
];

const STORAGE_KEYS = {
  CHECKLIST: 'htmlTagsChecklist',
};

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

// ==================== ЧЕКЛІСТ ====================
class Checklist {
  static getItems() {
    return DOM.checklist ? [...DOM.checklist.querySelectorAll('li')] : [];
  }

  static saveState() {
    const items = this.getItems();
    const states = items.map(item => item.classList.contains('completed'));
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(states));
  }

  static loadState() {
    const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (!saved) return;
    const states = JSON.parse(saved);
    const items = this.getItems();
    items.forEach((item, index) => {
      if (states[index]) item.classList.add('completed');
      else item.classList.remove('completed');
    });
  }

  static reset() {
    this.getItems().forEach(item => item.classList.remove('completed'));
    this.saveState();
  }

  static init() {
    this.loadState();
    this.getItems().forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('completed');
        this.saveState();
      });
    });
    DOM.resetChecklistBtn?.addEventListener('click', () => this.reset());
  }
}

// ==================== ГРА З ТАЙМЕРОМ ====================
class TagGame {
  static currentQuestion = 0;
  static score = 0;
  static timer = null;
  static timeLeft = 45;
  static totalTime = 45;
  static isGameActive = false;
  static isGameFinished = false;
  static totalQuestions = GAME_QUESTIONS.length;
  static answersRecord = [];

  static init() {
    if (DOM.totalQuestionsSpan) {
      DOM.totalQuestionsSpan.textContent = this.totalQuestions;
    }
    DOM.startGameBtn?.addEventListener('click', () => this.startGame());
    DOM.resetGameBtn?.addEventListener('click', () => this.resetGame());
    this.updateUI();
  }

  static startGame() {
    if (this.isGameActive) return;
    this.resetGameState();
    this.isGameActive = true;
    this.isGameFinished = false;
    this.startTimer();
    this.loadQuestion();
    this.updateUI();
    if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = '';
    if (DOM.gameOptions) DOM.gameOptions.style.pointerEvents = 'auto';
  }

  static resetGame() {
    this.stopTimer();
    this.resetGameState();
    this.updateUI();
    if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = '';
    if (DOM.gameQuestion) DOM.gameQuestion.innerHTML = 'Натисни "Почати гру" щоб розпочати!';
    if (DOM.gameOptions) DOM.gameOptions.innerHTML = '';
  }

  static resetGameState() {
    this.currentQuestion = 0;
    this.score = 0;
    this.timeLeft = this.totalTime;
    this.isGameActive = false;
    this.isGameFinished = false;
    this.answersRecord = [];
    this.updateScoreDisplay();
    this.updateTimerDisplay();
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
    if (DOM.timerValue) DOM.timerValue.textContent = this.timeLeft;
  }

  static updateScoreDisplay() {
    if (DOM.gameScore) DOM.gameScore.innerHTML = `Рахунок: ${this.score} / ${this.totalQuestions}`;
  }

  static updateUI() {
    if (DOM.startGameBtn) {
      DOM.startGameBtn.style.display = this.isGameActive ? 'none' : 'inline-flex';
    }
    if (DOM.resetGameBtn) {
      DOM.resetGameBtn.style.display = 'inline-flex';
    }
  }

  static loadQuestion() {
    if (!this.isGameActive) return;
    
    if (this.currentQuestion >= this.totalQuestions) {
      this.checkWinLose();
      return;
    }

    const q = GAME_QUESTIONS[this.currentQuestion];
    if (DOM.gameQuestion) DOM.gameQuestion.innerHTML = q.text;

    const optionsHtml = q.options.map((opt, idx) => 
      `<button class="game-btn" data-opt="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>`
    ).join('');
    
    if (DOM.gameOptions) DOM.gameOptions.innerHTML = optionsHtml;

    // Використовуємо одноразові обробники подій, щоб уникнути дублювання
    const btns = DOM.gameOptions.querySelectorAll('.game-btn');
    btns.forEach(btn => {
      btn.removeEventListener('click', this.handleAnswer);
      btn.addEventListener('click', this.handleAnswer);
    });
  }

  static handleAnswer = (e) => {
    if (!TagGame.isGameActive) return;
    
    const btn = e.currentTarget;
    const selected = parseInt(btn.dataset.opt);
    const currentQ = GAME_QUESTIONS[TagGame.currentQuestion];
    
    const isCorrect = (selected === currentQ.correct);
    
    TagGame.answersRecord.push({
      question: currentQ.text,
      isCorrect: isCorrect,
      correctAnswer: currentQ.options[currentQ.correct],
      userAnswer: currentQ.options[selected]
    });
    
    if (isCorrect) {
      TagGame.score++;
      TagGame.updateScoreDisplay();
      if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = '<p style="color:#27ae60;">✅ Правильно!</p>';
      setTimeout(() => {
        if (DOM.gameFeedback && TagGame.isGameActive) DOM.gameFeedback.innerHTML = '';
      }, 800);
    } else {
      if (DOM.gameFeedback) DOM.gameFeedback.innerHTML = `<p style="color:#e67e22;">❌ Неправильно! Правильна відповідь: ${String.fromCharCode(65 + currentQ.correct)}. ${currentQ.options[currentQ.correct]}</p>`;
      setTimeout(() => {
        if (DOM.gameFeedback && TagGame.isGameActive) DOM.gameFeedback.innerHTML = '';
      }, 1200);
    }
    
    TagGame.currentQuestion++;
    TagGame.loadQuestion();
  };

  static checkWinLose() {
    this.isGameActive = false;
    this.stopTimer();
    
    // Перевіряємо чи всі відповіді правильні
    const allCorrect = this.answersRecord.length === this.totalQuestions && 
                       this.answersRecord.every(record => record.isCorrect === true);
    
    if (allCorrect && this.score === this.totalQuestions) {
      this.gameWin();
    } else {
      this.gameLose('Є неправильні відповіді!');
    }
  }

  static gameWin() {
    this.isGameFinished = true;
    this.isGameActive = false;
    this.stopTimer();
    if (DOM.gameOptions) DOM.gameOptions.style.pointerEvents = 'none';
    if (DOM.gameFeedback) {
      DOM.gameFeedback.innerHTML = `<p style="color:#fafd25; font-size:1.2rem;">🎉 ВІТАЮ! 🎉<br>Ти пройшов гру!<br>Рахунок: ${this.score} / ${this.totalQuestions}<br>Час: ${this.totalTime - this.timeLeft} сек</p>`;
    }
    if (DOM.startGameBtn) DOM.startGameBtn.style.display = 'inline-flex';
  }

  static gameLose(reason) {
    this.isGameFinished = true;
    this.isGameActive = false;
    this.stopTimer();
    if (DOM.gameOptions) DOM.gameOptions.style.pointerEvents = 'none';
    if (DOM.gameFeedback) {
      DOM.gameFeedback.innerHTML = `<p style="color:#ff6b6b; font-size:1.2rem;">💔 ПОРАЗКА! 💔<br>${reason}<br>Правильних відповідей: ${this.score} з ${this.totalQuestions}</p>`;
    }
    if (DOM.startGameBtn) DOM.startGameBtn.style.display = 'inline-flex';
  }
}
// ==================== ВІКТОРИНА ПРО ТЕГИ ====================
class TagsQuiz {
  static userAnswers = new Array(TAGS_QUIZ.length).fill(null);

  static render() {
    if (!DOM.quizTagsContainer) return;
    const html = TAGS_QUIZ.map((q, idx) => `
      <div class="quiz-question">${idx + 1}. ${q.text}</div>
      ${q.options.map((opt, optIdx) => `
        <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
             data-qidx="${idx}" data-oidx="${optIdx}">
          ${String.fromCharCode(65 + optIdx)}. ${opt}
        </div>
      `).join('')}
    `).join('');
    DOM.quizTagsContainer.innerHTML = html;
    
    DOM.quizTagsContainer.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const { qidx, oidx } = e.currentTarget.dataset;
        this.userAnswers[parseInt(qidx)] = parseInt(oidx);
        this.render();
      });
    });
  }

  static check() {
    let correctCount = 0;
    const results = TAGS_QUIZ.map((q, i) => {
      const isCorrect = this.userAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
      return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
    });
    const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${TAGS_QUIZ.length}</p>
      ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
    if (DOM.quizTagsFeedback) DOM.quizTagsFeedback.innerHTML = html;
  }

  static reset() {
    this.userAnswers = new Array(TAGS_QUIZ.length).fill(null);
    this.render();
    if (DOM.quizTagsFeedback) DOM.quizTagsFeedback.innerHTML = '';
  }

  static init() {
    this.render();
    DOM.checkTagsQuizBtn?.addEventListener('click', () => this.check());
    DOM.resetTagsQuizBtn?.addEventListener('click', () => this.reset());
  }
}

// ==================== КОНТРОЛЬНА ВІКТОРИНА ====================
class ControlQuiz {
  static userAnswers = new Array(CONTROL_QUIZ.length).fill(null);

  static render() {
    if (!DOM.quizControlContainer) return;
    const html = CONTROL_QUIZ.map((q, idx) => `
      <div class="quiz-question">${idx + 1}. ${q.text}</div>
      ${q.options.map((opt, optIdx) => `
        <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
             data-qidx="${idx}" data-oidx="${optIdx}">
          ${String.fromCharCode(65 + optIdx)}. ${opt}
        </div>
      `).join('')}
    `).join('');
    DOM.quizControlContainer.innerHTML = html;
    
    DOM.quizControlContainer.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const { qidx, oidx } = e.currentTarget.dataset;
        this.userAnswers[parseInt(qidx)] = parseInt(oidx);
        this.render();
      });
    });
  }

  static check() {
    let correctCount = 0;
    const results = CONTROL_QUIZ.map((q, i) => {
      const isCorrect = this.userAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
      return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
    });
    const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${CONTROL_QUIZ.length}</p>
      ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
    if (DOM.quizControlFeedback) DOM.quizControlFeedback.innerHTML = html;
  }

  static reset() {
    this.userAnswers = new Array(CONTROL_QUIZ.length).fill(null);
    this.render();
    if (DOM.quizControlFeedback) DOM.quizControlFeedback.innerHTML = '';
  }

  static init() {
    this.render();
    DOM.checkControlQuizBtn?.addEventListener('click', () => this.check());
    DOM.resetControlQuizBtn?.addEventListener('click', () => this.reset());
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
        if (href && href.startsWith('#')) {
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
  Checklist.init();
  TagGame.init();
  TagsQuiz.init();
  ControlQuiz.init();
  RandomFact.init();
  SmoothScroll.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}