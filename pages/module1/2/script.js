const DOM = {
  // Редактор коду
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),

  // Чекліст
  checklist: document.querySelector('#challengeChecklist'),
  resetChecklistBtn: document.querySelector('#resetChecklistBtn'),

  // Вікторина
  quizContainer: document.querySelector('#quizStructureContainer'),
  quizFeedback: document.querySelector('#quizStructureFeedback'),
  checkQuizBtn: document.querySelector('#checkStructureQuizBtn'),
  resetQuizBtn: document.querySelector('#resetStructureQuizBtn'),

  // Факти
  randomFactBtn: document.querySelector('#randomFactBtn'),
  factDisplay: document.querySelector('#randomFactDisplay'),
};

// ==================== Константи ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Моє хобі</title>
</head>
<body>
    <h1>Моє улюблене хобі</h1>
    <p>Я люблю малювати та грати на гітарі. Це допомагає мені відпочивати та розвивати творчі здібності.</p>
</body>
</html>`;

const STORAGE_KEYS = {
  CHECKLIST: 'htmlChecklist_v2',
};

// Питання для вікторини
const QUIZ_QUESTIONS = [
  {
    text: "Яке ім'я зазвичай має головна сторінка веб-сайту?",
    options: ["main.html", "start.html", "index.html", "home.html"],
    correct: 2,
  },
  {
    text: "Який тег є кореневим для всієї HTML-сторінки?",
    options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;html&gt;", "&lt;!DOCTYPE html&gt;"],
    correct: 2,
  },
  {
    text: "Де знаходиться &lt;title&gt; (заголовок вкладки)?",
    options: ["У &lt;body&gt;", "У &lt;head&gt;", "У &lt;footer&gt;", "У &lt;header&gt;"],
    correct: 1,
  },
  {
    text: "Для чого створюють папку images/ у проєкті?",
    options: ["Для збереження HTML-файлів", "Для зображень", "Для CSS-стилів", "Для відео"],
    correct: 1,
  },
  {
    text: "Яке розширення мають HTML-файли?",
    options: [".htm", ".html", "Обидва варіанти правильні", ".txt"],
    correct: 2,
  },
  {
    text: "Що робить рядок &lt;!DOCTYPE html&gt;?",
    options: [
      "Показує текст на сторінці",
      "Повідомляє браузеру версію HTML",
      "Створює заголовок",
      "Підключає стилі",
    ],
    correct: 1,
  },
  {
    text: "Який тег містить весь видимий контент сторінки?",
    options: ["&lt;head&gt;", "&lt;main&gt;", "&lt;body&gt;", "&lt;content&gt;"],
    correct: 2,
  },
];

const FACTS = [
  "Назва index.html використовується з 1990-х років, бо веб-сервери за замовчуванням шукають саме цей файл.",
  "HTML-файли можна відкривати будь-яким текстовим редактором — навіть Блокнотом!",
  "Папки в проєкті допомагають організувати файли: css/, js/, images/, fonts/.",
  "Перший веб-сайт у світі мав назву http://info.cern.ch/ і досі працює!",
  "Правильна структура HTML допомагає пошуковим системам краще розуміти сайт.",
  "Тег &lt;title&gt; впливає на те, як сторінка відображається в закладках браузера.",
];

// ==================== Редактор коду ====================
const EditorModule = {
  run() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    const code = DOM.codeEditor.value;
    DOM.previewFrame.srcdoc = code;
  },

  clear() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    DOM.codeEditor.value = '';
    DOM.previewFrame.srcdoc = '<html><body style="font-family:sans-serif;padding:20px;color:#666;">👈 Напиши код ліворуч і натисни "Запустити код"</body></html>';
  },

  loadExample() {
    if (!DOM.codeEditor || !DOM.previewFrame) return;
    DOM.codeEditor.value = DEFAULT_CODE;
    this.run();
  },

  init() {
    if (DOM.codeEditor) {
      DOM.codeEditor.value = DEFAULT_CODE;
      this.run();
    }
    DOM.runBtn?.addEventListener('click', () => this.run());
    DOM.clearBtn?.addEventListener('click', () => this.clear());
    DOM.loadExampleBtn?.addEventListener('click', () => this.loadExample());
  },
};

// ==================== Чекліст завдань ====================
const ChecklistModule = {
  getItems() {
    return DOM.checklist ? [...DOM.checklist.querySelectorAll('li')] : [];
  },

  saveState() {
    const items = this.getItems();
    const states = items.map(item => item.classList.contains('completed'));
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(states));
  },

  loadState() {
    const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (!saved) return;

    const states = JSON.parse(saved);
    const items = this.getItems();

    items.forEach((item, index) => {
      if (states[index]) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    });
  },

  reset() {
    const items = this.getItems();
    items.forEach(item => item.classList.remove('completed'));
    this.saveState();
  },

  init() {
    this.loadState();

    // Додаємо обробники для кожного пункту
    this.getItems().forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('completed');
        this.saveState();
      });
    });

    DOM.resetChecklistBtn?.addEventListener('click', () => this.reset());
  },
};

// ==================== Вікторина ====================
const QuizModule = {
  userAnswers: new Array(QUIZ_QUESTIONS.length).fill(null),

  render() {
    if (!DOM.quizContainer) return;

    const html = QUIZ_QUESTIONS.map((q, idx) => `
      <div class="quiz-question">${idx + 1}. ${q.text}</div>
      ${q.options
        .map(
          (opt, optIdx) => `
        <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
             data-qidx="${idx}" 
             data-oidx="${optIdx}">
          ${String.fromCharCode(65 + optIdx)}. ${opt}
        </div>
      `
        )
        .join('')}
    `).join('');

    DOM.quizContainer.innerHTML = html;

    // Додаємо обробники подій
    DOM.quizContainer.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const { qidx, oidx } = e.currentTarget.dataset;
        if (qidx !== undefined && oidx !== undefined) {
          this.userAnswers[parseInt(qidx)] = parseInt(oidx);
          this.render();
        }
      });
    });
  },

  check() {
    let correctCount = 0;
    const results = QUIZ_QUESTIONS.map((q, i) => {
      const isCorrect = this.userAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
      return {
        isCorrect,
        correctText: q.options[q.correct],
        number: i + 1,
      };
    });

    const resultHtml = `
      <p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${QUIZ_QUESTIONS.length}</p>
      ${results
        .map(
          r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Правильна відповідь: ${r.correctText}`}</p>`
        )
        .join('')}
    `;

    if (DOM.quizFeedback) {
      DOM.quizFeedback.innerHTML = resultHtml;
    }
  },

  reset() {
    this.userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    this.render();
    if (DOM.quizFeedback) {
      DOM.quizFeedback.innerHTML = '';
    }
  },

  init() {
    this.render();
    DOM.checkQuizBtn?.addEventListener('click', () => this.check());
    DOM.resetQuizBtn?.addEventListener('click', () => this.reset());
  },
};

// ==================== Випадкові факти ====================
const FactsModule = {
  showRandom() {
    const randomIndex = Math.floor(Math.random() * FACTS.length);
    if (DOM.factDisplay) {
      DOM.factDisplay.innerHTML = `<i class="fas fa-info-circle"></i> ${FACTS[randomIndex]}`;
    }
  },

  init() {
    DOM.randomFactBtn?.addEventListener('click', () => this.showRandom());
  },
};

// ==================== Ініціалізація ====================
const init = () => {
  EditorModule.init();
  ChecklistModule.init();
  QuizModule.init();
  FactsModule.init();
};

// Запускаємо після повного завантаження DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}