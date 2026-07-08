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
  
  // Гра "Знайди правильне посилання"
  linksGame: document.querySelector('#linksGame'),
  linksQuestion: document.querySelector('#linksQuestion'),
  linksOptions: document.querySelector('#linksOptions'),
  linksScore: document.querySelector('#linksScore'),
  linksFeedback: document.querySelector('#linksFeedback'),
  startLinksBtn: document.querySelector('#startLinksBtn'),
  resetLinksBtn: document.querySelector('#resetLinksBtn'),
  
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
  
  // Демонстрація
  demoLinks: document.querySelectorAll('[data-demo-page]'),
  demoInnerContent: document.querySelector('#demoInnerContent'),
  demoLoading: document.querySelector('#demoLoading'),
};

// ==================== КОНСТАНТИ ====================
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Моя улюблена подорож</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #1e5f7a;
            border-left: 4px solid #ff9f4a;
            padding-left: 15px;
        }
        h2 {
            color: #2c6e8f;
            margin-top: 30px;
            border-bottom: 2px solid #ff9f4a;
            padding-bottom: 5px;
        }
        ul {
            background: #e8f4fd;
            padding: 15px 15px 15px 35px;
            border-radius: 12px;
        }
        li {
            margin: 8px 0;
        }
        a {
            color: #1e5f7a;
            text-decoration: none;
            border-bottom: 1px dashed #1e5f7a;
        }
        a:hover {
            color: #ff9f4a;
            border-bottom-color: #ff9f4a;
        }
        .nav-links {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
        }
        .nav-links a {
            margin: 0 10px;
            display: inline-block;
        }
        .back-to-top {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1 id="top">🌍 Моя улюблена подорож: Японія</h1>
    
    <div class="nav-links">
        <strong>📋 Зміст:</strong>
        <a href="javascript:void(0)" onclick="document.getElementById('about').scrollIntoView({behavior:'smooth', block:'start'})">🗻 Про подорож</a> |
        <a href="javascript:void(0)" onclick="document.getElementById('gallery').scrollIntoView({behavior:'smooth', block:'start'})">📸 Галерея</a> |
        <a href="javascript:void(0)" onclick="document.getElementById('tips').scrollIntoView({behavior:'smooth', block:'start'})">💡 Поради</a>
    </div>
    
    <!-- Зовнішні посилання -->
    <p>📚 Дізнатися більше: 
        <a href="https://www.japan.travel/uk/" target="_blank" title="Офіційний туристичний сайт Японії">
            🇯🇵 Japan Travel (відкриється в новій вкладці)
        </a>
    </p>
    
    <!-- Внутрішнє посилання -->
    <p>📖 <a href="tips.html" title="Корисні поради">Переглянути детальні поради</a></p>
    
    <!-- Посилання на пошту -->
    <p>📧 Пишіть мені: 
        <a href="mailto:travel@example.com" title="Написати листа">travel@example.com</a>
    </p>
    
    <h2 id="about">🗻 Про подорож</h2>
    <p>Японія - це неймовірна країна з багатою культурою, традиціями та сучасними технологіями. Тут неймовірна природа: від засніжених гір до тропічних пляжів. <strong>Токіо</strong> - одне з найбільших мегаполісів світу, де поєднуються хмарочоси та стародавні храми. <strong>Кіото</strong> - культурна столиця з сотнями храмів та садів. А <strong>гора Фудзі</strong> - символ країни та улюблене місце туристів.</p>
    <p>Японська кухня відома на весь світ: <strong>суші</strong>, <strong>рамен</strong>, <strong>темпура</strong> та <strong>моті</strong> (рисові цукерки). А японський чай <strong>матча</strong> став популярним у всьому світі завдяки своїм корисним властивостям.</p>
    
    <h2 id="gallery">📸 Галерея</h2>
    <p>Ось що варто побачити в Японії:</p>
    <ul>
        <li>🗻 <strong>Гора Фудзі</strong> - найвища вершина Японії (3776 м)</li>
        <li>🏯 <strong>Кіото</strong> - місто з 1600 буддійськими храмами</li>
        <li>🌸 <strong>Сакура</strong> - період цвітіння вишні (кінець березня - початок квітня)</li>
        <li>🎌 <strong>Токіо</strong> - столиця з районом Акіхабара (світ аніме та манги)</li>
        <li>♨️ <strong>Хаконе</strong> - гарячі джерела біля підніжжя Фудзі</li>
    </ul>
    
    <h2 id="tips">💡 Поради для мандрівників</h2>
    <ul>
        <li>🎫 Купіть <strong>Japan Rail Pass</strong> до поїздки - це вигідно для подорожей потягами</li>
        <li>📱 Завантажте <strong>Google Translate</strong> - японці не дуже добре знають англійську</li>
        <li>💴 Готуйте <strong>готівку</strong> - багато місць не приймають картки</li>
        <li>🍜 Спробуйте <strong>рамен</strong> в місцевих магазинчиках - це смачно та недорого</li>
        <li>🎎 Поважайте <strong>традиції</strong>: знімайте взуття перед входом в храми та традиційні ресторани</li>
    </ul>
    
    <div class="back-to-top">
        <a href="javascript:void(0)" onclick="document.getElementById('top').scrollIntoView({behavior:'smooth', block:'start'})">⬆ Наверх</a>
    </div>
</body>
</html>`;
// Питання для гри
const LINKS_QUESTIONS = [
  { text: "Як відкрити посилання в новій вкладці?", options: ["target='_blank'", "target='_new'", "target='_self'", "open='new'"], correct: 0 },
  { text: "Який атрибут вказує адресу посилання?", options: ["src", "link", "href", "url"], correct: 2 },
  { text: "Який HTML-тег створює гіперпосилання?", options: ["тег link", "тег a", "тег href", "тег url"], correct: 1 },
  { text: "Як зробити якір на сторінці?", options: ["href='#id'", "href='page.html'", "href='https://...'", "href='mailto:'"], correct: 0 },
  { text: "Який атрибут додає підказку при наведенні?", options: ["alt", "title", "hint", "tooltip"], correct: 1 },
  { text: "Що робить атрибут download?", options: ["Відкриває файл", "Завантажує файл", "Видаляє файл", "Копіює файл"], correct: 1 },
  { text: "Яке значення target відкриває посилання в поточній вкладці?", options: ["_blank", "_new", "_self", "_top"], correct: 2 },
  { text: "Для чого використовуються внутрішні посилання?", options: ["На інші сайти", "На інші сторінки сайту", "На пошту", "На телефон"], correct: 1 },
  { text: "Як зробити посилання на email?", options: ["href='email:...'", "href='mail:...'", "href='mailto:...'", "href='emailto:...'"], correct: 2 },
  { text: "Що таке якір на сторінці?", options: ["Посилання на інший сайт", "Посилання на іншу сторінку", "Посилання на місце на тій самій сторінці", "Посилання на файл"], correct: 2 }
];

// Вікторина
const TAGS_QUIZ = [
  { text: "Який тег створює гіперпосилання?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"], correct: 1 },
  { text: "Який атрибут відкриває посилання в новій вкладці?", options: ["target='_self'", "target='_blank'", "target='_new'", "target='_top'"], correct: 1 },
  { text: "Який атрибут вказує адресу посилання?", options: ["src", "link", "href", "ref"], correct: 2 },
  { text: "Для чого використовуються якоря?", options: ["Для зовнішніх сайтів", "Для навігації всередині сторінки", "Для завантаження файлів", "Для пошти"], correct: 1 }
];

// Контрольна вікторина
const CONTROL_QUIZ = [
  { text: "Як відкрити посилання в новій вкладці?", options: ["target='_self'", "target='_blank'", "target='_parent'", "target='_top'"], correct: 1 },
  { text: "Який атрибут додає підказку до посилання?", options: ["alt", "title", "hint", "tooltip"], correct: 1 },
  { text: "Що означає 'href'?", options: ["Hyperlink Reference", "Hyper Reference", "HTML Reference", "High Reference"], correct: 0 },
  { text: "Де використовується символ # в посиланні?", options: ["Для зовнішніх сайтів", "Для якорів", "Для пошти", "Для файлів"], correct: 1 }
];

const FACTS = [
  "Перше у світі гіперпосилання вело з сайту http://info.cern.ch на інформацію про проект WorldWideWeb!",
  "Сьогодні в інтернеті більше трильйона посилань!",
  "Термін 'серфінг по мережі' з'явився завдяки тому, що користувачі 'переходять' по посиланнях, як хвилі.",
  "Синій колір підкреслених посилань став стандартом ще з перших браузерів!",
  "Посилання - це те, що робить веб Всесвітньою павутиною. Без них інтернет був би просто набором файлів."
];

const STORAGE_KEYS = {
  CHECKLIST: 'linksChecklist',
};

// ==================== ДЕМОНСТРАЦІЯ "САЙТ В САЙТІ" ====================
class DemoSite {
  static pages = {
    home: `<h2>🏠 Ласкаво просимо!</h2>
            <p>Це головна сторінка нашої демонстрації. Тут ми показуємо, як працюють гіперпосилання.</p>
            <p>Спробуй клікнути на інші посилання ліворуч!</p>
            <p><strong>✨ Цікаво:</strong> У реальному веб-сайті кожне посилання веде на окрему HTML-сторінку.</p>`,
    about: `<h2>📖 Про наш проект</h2>
            <p>Ця демонстрація створена для вивчення гіперпосилань в HTML.</p>
            <p>Ми використовуємо JavaScript для імітації переходів, але в реальному житті тег <code>&lt;a&gt;</code> самостійно переводить на іншу сторінку.</p>
            <p><strong>🔗 Приклад реального посилання:</strong> <a href="https://uk.wikipedia.org/wiki/Гіперпосилання" target="_blank">Вікіпедія про гіперпосилання</a></p>`,
    services: `<h2>⚙️ Наші послуги</h2>
               <ul>
                   <li>Навчання HTML/CSS</li>
                   <li>Курси з веб-розробки</li>
                   <li>Створення сайтів</li>
               </ul>
               <p><a href="https://www.w3schools.com/html/" target="_blank">Дізнатися більше на W3Schools</a></p>`,
    contact: `<h2>📞 Контакти</h2>
              <p>Email: <a href="mailto:study@example.com">study@example.com</a></p>
              <p>Telegram: <a href="#">@web_course</a></p>
              <p>Телефон: <a href="tel:+380123456789">+38 (012) 345-67-89</a></p>`,
    external: `<h2>🔗 Ви перейшли за зовнішнім посиланням!</h2>
               <p>Це посилання мало б відкритися в новій вкладці. У реальному HTML використовується атрибут <code>target="_blank"</code>.</p>
               <p><strong>Приклад:</strong> <code>&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;</code></p>
               <p><a href="#" onclick="return false;">↩ Повернутися назад</a></p>`
  };
  
  static init() {
    this.showPage('home');
    DOM.demoLinks?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.demoPage;
        if (link.getAttribute('target') === '_blank') {
          window.open('#', '_blank');
          alert('У реальному HTML це посилання відкрилося б у новій вкладці!');
        } else {
          this.showPage(page);
          DOM.demoLinks.forEach(l => l.classList.remove('demo-link-active'));
          link.classList.add('demo-link-active');
        }
      });
    });
  }
  
  static showPage(pageId) {
    if (DOM.demoInnerContent) {
      DOM.demoInnerContent.innerHTML = this.pages[pageId] || this.pages.home;
    }
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

// ==================== ГРА "ЗНАЙДИ ПРАВИЛЬНЕ ПОСИЛАННЯ" ====================
class LinksGame {
  static currentQuestion = 0;
  static score = 0;
  static isGameActive = false;
  static totalQuestions = LINKS_QUESTIONS.length;

  static init() {
    DOM.startLinksBtn?.addEventListener('click', () => this.startGame());
    DOM.resetLinksBtn?.addEventListener('click', () => this.resetGame());
    this.updateUI();
  }

  static startGame() {
    if (this.isGameActive) return;
    this.resetGameState();
    this.isGameActive = true;
    this.loadQuestion();
    this.updateUI();
    if (DOM.linksFeedback) DOM.linksFeedback.innerHTML = '';
  }

  static resetGame() {
    this.resetGameState();
    this.updateUI();
    if (DOM.linksQuestion) DOM.linksQuestion.innerHTML = 'Натисни "Почати гру" щоб розпочати!';
    if (DOM.linksOptions) DOM.linksOptions.innerHTML = '';
    if (DOM.linksFeedback) DOM.linksFeedback.innerHTML = '';
  }

  static resetGameState() {
    this.currentQuestion = 0;
    this.score = 0;
    this.isGameActive = false;
    this.updateScoreDisplay();
  }

  static updateScoreDisplay() {
    if (DOM.linksScore) {
      DOM.linksScore.innerHTML = `Рахунок: ${this.score} / ${this.totalQuestions}`;
    }
  }

  static updateUI() {
    if (DOM.startLinksBtn) {
      DOM.startLinksBtn.style.display = this.isGameActive ? 'none' : 'inline-flex';
    }
  }

  static loadQuestion() {
    if (!this.isGameActive) return;
    
    if (this.currentQuestion >= this.totalQuestions) {
      this.gameWin();
      return;
    }

    const q = LINKS_QUESTIONS[this.currentQuestion];
    if (DOM.linksQuestion) DOM.linksQuestion.innerHTML = q.text;

    // Перемішуємо варіанти відповідей
    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const optionsHtml = shuffled.map((opt, idx) => `
      <button class="links-btn" data-value="${opt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}" data-original="${opt}">${opt}</button>
    `).join('');
    
    if (DOM.linksOptions) DOM.linksOptions.innerHTML = optionsHtml;

    DOM.linksOptions?.querySelectorAll('.links-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleAnswer(btn));
    });
  }

  static handleAnswer(btn) {
    if (!this.isGameActive) return;
    
    const selectedValue = btn.dataset.original || btn.dataset.value;
    const currentQ = LINKS_QUESTIONS[this.currentQuestion];
    const correctValue = currentQ.options[currentQ.correct];
    
    // Порівнюємо нормалізовані значення
    const isCorrect = (selectedValue === correctValue);
    
    btn.disabled = true;
    btn.style.opacity = '0.5';
    
    if (isCorrect) {
      this.score++;
      this.updateScoreDisplay();
      if (DOM.linksFeedback) {
        DOM.linksFeedback.innerHTML = '<p style="color:#27ae60;">✅ Правильно! Робот Боб рухається далі! +1 бал</p>';
        setTimeout(() => {
          if (DOM.linksFeedback && this.isGameActive) DOM.linksFeedback.innerHTML = '';
        }, 800);
      }
    } else {
      if (DOM.linksFeedback) {
        DOM.linksFeedback.innerHTML = `<p style="color:#e67e22;">❌ Неправильно! Правильна відповідь: ${correctValue}</p>`;
        setTimeout(() => {
          if (DOM.linksFeedback && this.isGameActive) DOM.linksFeedback.innerHTML = '';
        }, 1200);
      }
    }
    
    this.currentQuestion++;
    setTimeout(() => this.loadQuestion(), 600);
  }

  static gameWin() {
    this.isGameActive = false;
    if (DOM.linksFeedback) {
      DOM.linksFeedback.innerHTML = `<p style="color:#fafd25; font-size:1.2rem;">🎉 ВІТАЮ! 🎉<br>Робот Боб повернувся додому!<br>Рахунок: ${this.score} / ${this.totalQuestions}</p>`;
    }
    if (DOM.startLinksBtn) DOM.startLinksBtn.style.display = 'inline-flex';
    if (DOM.linksOptions) DOM.linksOptions.innerHTML = '';
    if (DOM.linksQuestion) DOM.linksQuestion.innerHTML = 'Гру завершено! Натисни "Почати гру" щоб зіграти ще раз!';
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
  LinksGame.init();
  TagsQuiz.init();
  ControlQuiz.init();
  RandomFact.init();
  SmoothScroll.init();
  DemoSite.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}