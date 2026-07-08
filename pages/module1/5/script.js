// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),
  showSolutionBtn: document.querySelector('#showSolutionBtn'),
  solutionContent: document.querySelector('#solutionContent'),
  checklist: document.querySelector('#challengeChecklist'),
  resetChecklistBtn: document.querySelector('#resetChecklistBtn'),
  
  // Гра "Лопни кульку"
  balloonGame: document.querySelector('#balloonGame'),
  balloonQuestion: document.querySelector('#balloonQuestion'),
  balloonsContainer: document.querySelector('#balloonsContainer'),
  balloonScore: document.querySelector('#balloonScore'),
  balloonFeedback: document.querySelector('#balloonFeedback'),
  startBalloonBtn: document.querySelector('#startBalloonBtn'),
  resetBalloonBtn: document.querySelector('#resetBalloonBtn'),
  
  // Вікторини
  quizTagsContainer: document.querySelector('#quizTagsContainer'),
  quizTagsFeedback: document.querySelector('#quizTagsFeedback'),
  checkTagsQuizBtn: document.querySelector('#checkTagsQuizBtn'),
  resetTagsQuizBtn: document.querySelector('#resetTagsQuizBtn'),
  quizControlContainer: document.querySelector('#quizControlContainer'),
  quizControlFeedback: document.querySelector('#quizControlFeedback'),
  checkControlQuizBtn: document.querySelector('#checkControlQuizBtn'),
  resetControlQuizBtn: document.querySelector('#resetControlQuizBtn'),
  
  randomFactBtn: document.querySelector('#randomFactBtn'),
  factDisplay: document.querySelector('#randomFactDisplay'),
};

// ==================== КОНСТАНТИ ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моя улюблена тварина - Панда</title>
</head>
<body>
    <h1>🐼 Велика панда</h1>
    
    <h2>Опис</h2>
    <p>Велика панда - це <strong>рідкісна тварина</strong>, яка мешкає в гірських регіонах Китаю. Вона відома своїм <em>чорно-білим забарвленням</em> та любов'ю до бамбука.</p>
    
    <h2>Цікаві факти</h2>
    <ul>
        <li>Панди їдять <strong>до 14 годин на день</strong></li>
        <li>Новонароджені панди <em>важать лише 100 грамів</em></li>
        <li>У панд <strong>6 пальців</strong> на передніх лапах</li>
    </ul>
    
    <h3>Харчування</h3>
    <p>Панди харчуються переважно <strong>бамбуком</strong> - до <em>38 кг на день</em>!</p>
</body>
</html>`;

// Питання для гри "Лопни кульку"
const BALLOON_QUESTIONS = [
  { text: "Який тег робить текст жирним (важливим)?", correct: "<strong>", options: ["&lt;b&gt;", "&lt;strong&gt;", "&lt;bold&gt;", "&lt;weight&gt;"] },
  { text: "Який тег створює найголовніший заголовок?", correct: "<h1>", options: ["&lt;h1&gt;", "&lt;h6&gt;", "&lt;head&gt;", "&lt;header&gt;"] },
  { text: "Який тег робить текст курсивним (логічний наголос)?", correct: "<em>", options: ["&lt;i&gt;", "&lt;em&gt;", "&lt;italic&gt;", "&lt;cursive&gt;"] },
  { text: "Який тег створює заголовок другого рівня?", correct: "<h2>", options: ["&lt;h1&gt;", "&lt;h2&gt;", "&lt;h3&gt;", "&lt;heading&gt;"] },
  { text: "Який тег виділяє текст маркером?", correct: "<mark>", options: ["&lt;highlight&gt;", "&lt;mark&gt;", "&lt;yellow&gt;", "&lt;color&gt;"] },
  { text: "Який тег робить текст дрібним?", correct: "<small>", options: ["&lt;small&gt;", "&lt;tiny&gt;", "&lt;size&gt;", "&lt;min&gt;"] },
  { text: "Який тег використовується для закресленого тексту?", correct: "<del>", options: ["&lt;strike&gt;", "&lt;del&gt;", "&lt;cross&gt;", "&lt;line&gt;"] },
  { text: "Який тег створює заголовок третього рівня?", correct: "<h3>", options: ["&lt;h1&gt;", "&lt;h2&gt;", "&lt;h3&gt;", "&lt;h4&gt;"] },
  { text: "Який тег робить текст жирним (тільки візуально)?", correct: "<b>", options: ["&lt;strong&gt;", "&lt;b&gt;", "&lt;bold&gt;", "&lt;important&gt;"] },
  { text: "Який тег створює підкреслений текст (вставлений)?", correct: "<ins>", options: ["&lt;u&gt;", "&lt;ins&gt;", "&lt;underline&gt;", "&lt;under&gt;"] }
];

// Вікторина про теги
const TAGS_QUIZ = [
  { text: "Який тег використовується для найголовнішого заголовка?", options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;", "&lt;header&gt;"], correct: 1 },
  { text: "Скільки рівнів заголовків існує в HTML?", options: ["7", "4", "5", "6"], correct: 3 },
  { text: "Який тег використовується для важливого жирного тексту (семантичний)?", options: ["&lt;b&gt;", "&lt;bold&gt;", "&lt;strong&gt;", "&lt;weight&gt;"], correct: 2 },
  { text: "Який тег використовується для курсивного тексту з логічним наголосом?", options: ["&lt;i&gt;", "&lt;em&gt;", "&lt;italic&gt;", "&lt;cursive&gt;"], correct: 1 }
];

// Контрольна вікторина
const CONTROL_QUIZ = [
  { text: "Скільки разів можна використовувати &lt;h1&gt; на сторінці?", options: ["Скільки завгодно", "Один раз", "Два рази", "Тільки в header"], correct: 1 },
  { text: "Який тег є семантичним (важливим для SEO)?", options: ["&lt;b&gt;", "&lt;i&gt;", "&lt;strong&gt;", "&lt;u&gt;"], correct: 2 },
  { text: "Який тег створює найменший заголовок?", options: ["&lt;h1&gt;", "&lt;h3&gt;", "&lt;h5&gt;", "&lt;h6&gt;"], correct: 3 },
  { text: "Для чого використовується тег &lt;mark&gt;?", options: ["Для жирного тексту", "Для виділення маркером", "Для курсиву", "Для списку"], correct: 1 }
];

const FACTS = [
  "Тім Бернерс-Лі створив HTML у 1991 році, і заголовки були серед перших 18 тегів!",
  "Спочатку планувалося 7 рівнів заголовків, але зупинилися на 6.",
  "Тег &lt;strong&gt; вважається семантичним, а &lt;b&gt; - ні. Це важливо для пошукових систем!",
  "Заголовок &lt;h1&gt; повинен бути лише один на сторінці - це правило SEO.",
  "Тег &lt;em&gt; означає 'emphasis' (наголос), а &lt;i&gt; - просто 'italic' (курсив)."
];

const STORAGE_KEYS = {
  CHECKLIST: 'headingsChecklist',
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

// ==================== ГРА "ЛОПНИ КУЛЬКУ" ====================
class BalloonGame {
  static currentQuestion = 0;
  static score = 0;
  static isGameActive = false;
  static totalQuestions = BALLOON_QUESTIONS.length;

  static init() {
    DOM.startBalloonBtn?.addEventListener('click', () => this.startGame());
    DOM.resetBalloonBtn?.addEventListener('click', () => this.resetGame());
    this.updateUI();
  }

  static startGame() {
    if (this.isGameActive) return;
    this.resetGameState();
    this.isGameActive = true;
    this.loadQuestion();
    this.updateUI();
    if (DOM.balloonFeedback) DOM.balloonFeedback.innerHTML = '';
  }

  static resetGame() {
    this.resetGameState();
    this.updateUI();
    if (DOM.balloonQuestion) DOM.balloonQuestion.innerHTML = 'Натисни "Почати гру" щоб розпочати!';
    if (DOM.balloonsContainer) DOM.balloonsContainer.innerHTML = '';
    if (DOM.balloonFeedback) DOM.balloonFeedback.innerHTML = '';
  }

  static resetGameState() {
    this.currentQuestion = 0;
    this.score = 0;
    this.isGameActive = false;
    this.updateScoreDisplay();
  }

  static updateScoreDisplay() {
    if (DOM.balloonScore) {
      DOM.balloonScore.innerHTML = `Рахунок: ${this.score} / ${this.totalQuestions}`;
    }
  }

  static updateUI() {
    if (DOM.startBalloonBtn) {
      DOM.startBalloonBtn.style.display = this.isGameActive ? 'none' : 'inline-flex';
    }
  }

  static loadQuestion() {
    if (!this.isGameActive) return;
    
    if (this.currentQuestion >= this.totalQuestions) {
      this.gameWin();
      return;
    }

    const q = BALLOON_QUESTIONS[this.currentQuestion];
    if (DOM.balloonQuestion) DOM.balloonQuestion.innerHTML = q.text;

    // Перемішуємо варіанти відповідей
    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const balloonsHtml = shuffled.map(opt => `
      <div class="balloon" data-value="${opt}">
        <div class="balloon-string"></div>
        <div class="balloon-body">
          <span>${opt}</span>
        </div>
      </div>
    `).join('');
    
    if (DOM.balloonsContainer) DOM.balloonsContainer.innerHTML = balloonsHtml;

    DOM.balloonsContainer?.querySelectorAll('.balloon').forEach(balloon => {
      balloon.addEventListener('click', () => this.handleAnswer(balloon));
    });
  }

  static handleAnswer(balloon) {
    if (!this.isGameActive) return;
    
    const selectedValue = balloon.dataset.value;
    const currentQ = BALLOON_QUESTIONS[this.currentQuestion];
    const isCorrect = (selectedValue === currentQ.correct);
    
    balloon.classList.add('pop');
    
    setTimeout(() => {
      if (isCorrect) {
        this.score++;
        this.updateScoreDisplay();
        if (DOM.balloonFeedback) {
          DOM.balloonFeedback.innerHTML = '<p style="color:#27ae60;">🎈 Правильно! Кулька лопнула! +1 бал</p>';
          setTimeout(() => {
            if (DOM.balloonFeedback && this.isGameActive) DOM.balloonFeedback.innerHTML = '';
          }, 800);
        }
      } else {
        if (DOM.balloonFeedback) {
          DOM.balloonFeedback.innerHTML = `<p style="color:#e67e22;">❌ Неправильно! Правильна відповідь: ${currentQ.correct}</p>`;
          setTimeout(() => {
            if (DOM.balloonFeedback && this.isGameActive) DOM.balloonFeedback.innerHTML = '';
          }, 1200);
        }
      }
      
      this.currentQuestion++;
      this.loadQuestion();
    }, 300);
  }

  static gameWin() {
    this.isGameActive = false;
    if (DOM.balloonFeedback) {
      DOM.balloonFeedback.innerHTML = `<p style="color:#fafd25; font-size:1.2rem;">🎉 ВІТАЮ! 🎉<br>Ти пройшов гру!<br>Рахунок: ${this.score} / ${this.totalQuestions}</p>`;
    }
    if (DOM.startBalloonBtn) DOM.startBalloonBtn.style.display = 'inline-flex';
    if (DOM.balloonsContainer) DOM.balloonsContainer.innerHTML = '';
    if (DOM.balloonQuestion) DOM.balloonQuestion.innerHTML = 'Гру завершено! Натисни "Почати гру" щоб зіграти ще раз!';
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
  BalloonGame.init();
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