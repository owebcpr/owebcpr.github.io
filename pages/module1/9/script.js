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
  
  // Гра "Склади таблицю"
  buildGame: document.querySelector('#buildGame'),
  buildQuestion: document.querySelector('#buildQuestion'),
  tagsContainer: document.querySelector('#tagsContainer'),
  buildContainer: document.querySelector('#buildContainer'),
  buildMessage: document.querySelector('#buildMessage'),
  buildScore: document.querySelector('#buildScore'),
  startBuildBtn: document.querySelector('#startBuildBtn'),
  resetBuildBtn: document.querySelector('#resetBuildBtn'),
  checkBuildBtn: document.querySelector('#checkBuildBtn'),
  
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
    <title>Мій розклад уроків</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f4f7fc;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #1e5f7a;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        th, td {
            border: 2px solid #2c3e4e;
            padding: 12px;
            text-align: center;
            vertical-align: middle;
        }
        th {
            background: #1e5f7a;
            color: white;
            font-size: 1.1rem;
        }
        td {
            background: #f8f9fa;
        }
        .math { background: #ffe6e6; }
        .ukr { background: #e6ffe6; }
        .eng { background: #e6e6ff; }
        .break {
            background: #ffd966;
            font-weight: bold;
        }
        caption {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1e5f7a;
        }
    </style>
</head>
<body>
    <h1>📚 Мій розклад уроків</h1>
    
    <table>
        <caption>Розклад на тиждень (5-Б клас)</caption>
        <thead>
            <tr>
                <th>Час</th>
                <th>Понеділок</th>
                <th>Вівторок</th>
                <th>Середа</th>
                <th>Четвер</th>
                <th>П'ятниця</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>8:30</td>
                <td class="math">Математика</td>
                <td class="ukr">Українська</td>
                <td class="eng">Англійська</td>
                <td class="math">Математика</td>
                <td class="ukr">Українська</td>
            </tr>
            <tr>
                <td>9:30</td>
                <td class="eng">Англійська</td>
                <td class="math">Математика</td>
                <td class="ukr">Українська</td>
                <td class="eng">Англійська</td>
                <td class="math">Математика</td>
            </tr>
            <tr>
                <td>10:30</td>
                <td class="break" colspan="5">🥪 ВЕЛИКА ЗМІНА (20 хв)</td>
            </tr>
            <tr>
                <td>11:00</td>
                <td>Фізкультура</td>
                <td>Історія</td>
                <td>Фізкультура</td>
                <td>Історія</td>
                <td>Мистецтво</td>
            </tr>
            <tr>
                <td>12:00</td>
                <td>Інформатика</td>
                <td>Біологія</td>
                <td>Інформатика</td>
                <td>Географія</td>
                <td>Трудове</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`;

// Питання для вікторини
const TAGS_QUIZ = [
  { text: "Який тег створює рядок таблиці?", options: ["&lt;td&gt;", "&lt;tr&gt;", "&lt;th&gt;", "&lt;table&gt;"], correct: 1 },
  { text: "Який атрибут об'єднує комірки по горизонталі?", options: ["rowspan", "colspan", "merge", "span"], correct: 1 },
  { text: "Який тег використовується для заголовкової комірки?", options: ["&lt;td&gt;", "&lt;tr&gt;", "&lt;th&gt;", "&lt;thead&gt;"], correct: 2 },
  { text: "Де сьогодні використовують таблиці?", options: ["Для верстки сайтів", "Тільки для табличних даних", "Для анімації", "Для стилів"], correct: 1 },
  { text: "Що означає &lt;td&gt;?", options: ["Table Data", "Table Division", "Table Display", "Table Document"], correct: 0 }
];

const CONTROL_QUIZ = [
  { text: "Який атрибут об'єднує комірки по вертикалі?", options: ["colspan", "rowspan", "merge", "span"], correct: 1 },
  { text: "Чи можна використовувати таблиці для верстки сайтів?", options: ["Так", "Ні", "Лише в HTML5", "Лише в старих версіях"], correct: 1 },
  { text: "Як правильно стилізувати таблиці?", options: ["Застарілими атрибутами", "Через CSS", "Тільки inline стилями", "Не стилізувати"], correct: 1 },
  { text: "Який тег групує заголовки таблиці?", options: ["&lt;thead&gt;", "&lt;tbody&gt;", "&lt;tfoot&gt;", "&lt;caption&gt;"], correct: 0 }
];

const FACTS = [
  "У 90-х роках таблиці використовували для верстки цілих сайтів! Іноді вкладали таблиці одна в одну до 10 рівнів!",
  "Перша таблиця в HTML з'явилася в 1993 році, але спочатку працювала тільки в браузері Mosaic.",
  "Сучасна верстка використовує CSS Grid та Flexbox, але таблиці все ще незамінні для прайс-листів та розкладів.",
  "Атрибут border='0' робить таблицю невидимою - так ховали табличну верстку!",
  "Таблиці досі використовують в email-листах, бо CSS-верстка підтримується не всіма поштовими клієнтами."
];

const STORAGE_KEYS = {
  CHECKLIST: 'tablesChecklist',
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

// ==================== ГРА "СКЛАДИ ПРАВИЛЬНУ ТАБЛИЦЮ" ====================
class BuildGame {
  static isGameActive = false;
  
  // ПРАВИЛЬНА послідовність для перевірки
  static correctSequence = [
    "<table>",
    "<caption>Розклад занять на вівторок</caption>",
    "<tr>",
    "<th>№</th>",
    "<th>Урок</th>",
    "</tr>",
    "<tr>",
    "<td>1</td>",
    "<td>Математика</td>",
    "</tr>",
    "<tr>",
    "<td>2</td>",
    "<td>Інформатика</td>",
    "</tr>",
    "<tr>",
    "<td>3</td>",
    "<td>Фізкультура</td>",
    "</tr>",
    "</table>"
  ];

  static init() {
    DOM.startBuildBtn?.addEventListener('click', () => this.startGame());
    DOM.resetBuildBtn?.addEventListener('click', () => this.resetGame());
    DOM.checkBuildBtn?.addEventListener('click', () => this.checkLevel());
    this.setupClickEvents();
  }

  static setupClickEvents() {
    if (!DOM.tagsContainer) return;
    
    DOM.tagsContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.build-item');
      if (!item) return;
      if (!this.isGameActive) return;
      if (item.classList.contains('disabled')) return;
      
      const tag = item.dataset.tag;
      this.addTagToBuild(tag, item);
    });
  }

  static addTagToBuild(tag, sourceItem) {
    if (!DOM.buildContainer) return;
    
    const lineDiv = document.createElement('div');
    lineDiv.className = 'build-line';
    
    const tagSpan = document.createElement('span');
    tagSpan.className = 'build-tag-simple';
    tagSpan.textContent = tag;
    
    lineDiv.appendChild(tagSpan);
    DOM.buildContainer.appendChild(lineDiv);
    
    sourceItem.classList.add('disabled');
    sourceItem.style.opacity = '0.4';
    sourceItem.style.cursor = 'not-allowed';
    
    lineDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  static startGame() {
    if (this.isGameActive) return;
    
    const existingResult = document.querySelector('.build-result-overlay');
    if (existingResult) existingResult.remove();
    
    this.isGameActive = true;
    
    if (DOM.startBuildBtn) DOM.startBuildBtn.style.display = 'none';
    if (DOM.resetBuildBtn) DOM.resetBuildBtn.style.display = 'inline-flex';
    if (DOM.checkBuildBtn) DOM.checkBuildBtn.style.display = 'inline-flex';
    
    if (DOM.buildQuestion) DOM.buildQuestion.innerHTML = `<strong>📋 Завдання:</strong> Склади таблицю розкладу занять на вівторок (3 уроки). Обери елементи в правильному порядку!`;
    
    if (DOM.buildContainer) DOM.buildContainer.innerHTML = '';
    if (DOM.buildMessage) DOM.buildMessage.innerHTML = '';
    
    DOM.tagsContainer?.querySelectorAll('.build-item').forEach(item => {
      item.classList.remove('disabled');
      item.style.opacity = '1';
      item.style.cursor = 'pointer';
    });
  }

  static resetGame() {
    this.isGameActive = false;
    
    const existingResult = document.querySelector('.build-result-overlay');
    if (existingResult) existingResult.remove();
    
    if (DOM.startBuildBtn) DOM.startBuildBtn.style.display = 'inline-flex';
    if (DOM.resetBuildBtn) DOM.resetBuildBtn.style.display = 'inline-flex';
    if (DOM.checkBuildBtn) DOM.checkBuildBtn.style.display = 'inline-flex';
    
    if (DOM.buildContainer) DOM.buildContainer.innerHTML = '';
    if (DOM.buildMessage) DOM.buildMessage.innerHTML = '';
    
    DOM.tagsContainer?.querySelectorAll('.build-item').forEach(item => {
      item.classList.remove('disabled');
      item.style.opacity = '1';
      item.style.cursor = 'pointer';
    });
  }

  static getCurrentBuild() {
    const tags = [];
    DOM.buildContainer?.querySelectorAll('.build-tag-simple').forEach(tag => {
      tags.push(tag.textContent);
    });
    return tags;
  }

  static checkLevel() {
    if (!this.isGameActive) return;
    
    const expected = this.correctSequence;
    const actual = this.getCurrentBuild();
    
    const existingResult = document.querySelector('.build-result-overlay');
    if (existingResult) existingResult.remove();
    
    if (actual.length !== expected.length) {
      this.showErrorResult(
        `Кількість елементів не збігається!`,
        `Потрібно: ${expected.length} елементів`,
        `Ви додали: ${actual.length} елементів`
      );
      return;
    }
    
    let isCorrect = true;
    let errorIndex = -1;
    
    for (let i = 0; i < expected.length; i++) {
      if (actual[i] !== expected[i]) {
        isCorrect = false;
        errorIndex = i + 1;
        break;
      }
    }
    
    if (isCorrect) {
      this.showSuccessResult();
    } else {
      this.showErrorResult(
        `Помилка на позиції ${errorIndex}!`,
        `Очікувалось: ${this.escapeHtml(expected[errorIndex - 1])}`,
        `Отримано: ${this.escapeHtml(actual[errorIndex - 1])}`
      );
    }
  }

  static showSuccessResult() {
    this.isGameActive = false;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'build-result-overlay success-overlay';
    resultDiv.innerHTML = `
      <div class="result-modal">
        <div class="result-emoji">🎉✨🌟</div>
        <h2 class="result-title success-title">ВІТАЮ!</h2>
        <p class="result-text">Ти правильно склав таблицю розкладу!</p>
        <div class="result-table">
          <table class="success-table" border="1" style="border-collapse: collapse; width: 100%;">
            <caption style="font-weight: bold; margin-bottom: 10px;">Розклад занять на вівторок</caption>
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 8px;">№</th>
                <th style="border: 1px solid #000; padding: 8px;">Урок</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">1</td>
                <td style="border: 1px solid #000; padding: 8px;">Математика</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">2</td>
                <td style="border: 1px solid #000; padding: 8px;">Інформатика</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">3</td>
                <td style="border: 1px solid #000; padding: 8px;">Фізкультура</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button id="closeSuccessBtn" class="btn-success-close"><i class="fas fa-check"></i> Чудово!</button>
      </div>
    `;
    
    document.body.appendChild(resultDiv);
    
    document.getElementById('closeSuccessBtn')?.addEventListener('click', () => {
      resultDiv.remove();
      this.resetGame();
    });
  }

  static showErrorResult(errorMsg, expectedMsg, actualMsg) {
    this.isGameActive = false;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'build-result-overlay error-overlay';
    resultDiv.innerHTML = `
      <div class="result-modal">
        <div class="result-emoji">😔</div>
        <h2 class="result-title error-title">ПОМИЛКА!</h2>
        <p class="result-error-msg">${errorMsg}</p>
        <div class="error-details">
          <div class="error-expected">
            <span class="error-label">✅ Правильно:</span>
            <code>${expectedMsg}</code>
          </div>
          <div class="error-actual">
            <span class="error-label">❌ Твоя відповідь:</span>
            <code>${actualMsg}</code>
          </div>
        </div>
        <button id="closeErrorBtn" class="btn-error-close"><i class="fas fa-redo-alt"></i> Спробувати ще раз</button>
      </div>
    `;
    
    document.body.appendChild(resultDiv);
    
    document.getElementById('closeErrorBtn')?.addEventListener('click', () => {
      resultDiv.remove();
      this.resetGame();
    });
  }
  
  static escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

// ==================== ВІКТОРИНИ ====================
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
  Checklist.init();
  BuildGame.init();
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