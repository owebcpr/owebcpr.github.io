// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  clearBtn: document.querySelector('#clearCodeBtn'),
  loadExampleBtn: document.querySelector('#loadExampleBtn'),
  showSolutionBtn: document.querySelector('#showSolutionBtn'),
  solutionContent: document.querySelector('#solutionContent'),
  
  // Гра "Створи форму-рятувальника"
  formGame: document.querySelector('#formGame'),
  formPreviewContent: document.querySelector('#formPreviewContent'),
  elementsContainer: document.querySelector('#elementsContainer'),
  formGameFeedback: document.querySelector('#formGameFeedback'),
  checkFormBtn: document.querySelector('#checkFormBtn'),
  resetFormBtn: document.querySelector('#resetFormBtn'),
  
  // Вікторини
  quizFormsContainer: document.querySelector('#quizFormsContainer'),
  quizFormsFeedback: document.querySelector('#quizFormsFeedback'),
  checkFormsQuizBtn: document.querySelector('#checkFormsQuizBtn'),
  resetFormsQuizBtn: document.querySelector('#resetFormsQuizBtn'),
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
    <title>Форма реєстрації</title>
</head>
<body>
    <h1>📝 Реєстрація на сайті</h1>
    
    <form action="/register" method="POST">
        <label>👤 Ім'я: </label>
        <input type="text" name="name" placeholder="Введіть ваше ім'я" required>
        <br><br>
        
        <label>📧 Email: </label>
        <input type="email" name="email" placeholder="example@mail.com" required>
        <br><br>
        
        <label>🔒 Пароль: </label>
        <input type="password" name="password" placeholder="Введіть пароль" required>
        <br><br>
        
        <label>🚻 Стать: </label>
        <input type="radio" name="gender" value="male"> Чоловік
        <input type="radio" name="gender" value="female"> Жінка
        <br><br>
        
        <label>🎯 Інтереси: </label>
        <input type="checkbox" name="interests" value="it"> Програмування
        <input type="checkbox" name="interests" value="sport"> Спорт
        <input type="checkbox" name="interests" value="music"> Музика
        <br><br>
        
        <label>🌍 Країна: </label>
        <select name="country">
            <option value="ukraine">Україна</option>
            <option value="poland">Польща</option>
            <option value="germany">Німеччина</option>
        </select>
        <br><br>
        
        <label>📝 Про себе: </label>
        <textarea name="about" rows="4" cols="40" placeholder="Розкажи трохи про себе..."></textarea>
        <br><br>
        
        <input type="submit" value="Зареєструватися">
    </form>
</body>
</html>`;

// Питання для вікторини про форми
const FORMS_QUIZ = [
  { text: "Який тег створює форму?", options: ["&lt;form&gt;", "&lt;input&gt;", "&lt;field&gt;", "&lt;label&gt;"], correct: 0 },
  { text: "Який атрибут вказує адресу відправки даних форми?", options: ["method", "action", "href", "src"], correct: 1 },
  { text: "Який тип input використовується для пароля?", options: ["text", "password", "hidden", "secret"], correct: 1 },
  { text: "Який атрибут робить поле обов'язковим?", options: ["must", "required", "need", "obligatory"], correct: 1 },
  { text: "Який тег створює випадаючий список?", options: ["&lt;list&gt;", "&lt;dropdown&gt;", "&lt;select&gt;", "&lt;option&gt;"], correct: 2 }
];

// Контрольна вікторина
const CONTROL_QUIZ = [
  { text: "Який метод відправки даних приховує їх у URL?", options: ["GET", "POST", "HIDE", "SECRET"], correct: 1 },
  { text: "Який атрибут використовується для тексту-підказки в полі?", options: ["hint", "title", "placeholder", "tooltip"], correct: 2 },
  { text: "Який тип input використовується для вибору дати?", options: ["date", "calendar", "datetime", "time"], correct: 0 },
  { text: "Який тег використовується для багаторядкового тексту?", options: ["&lt;input&gt;", "&lt;text&gt;", "&lt;textarea&gt;", "&lt;field&gt;"], correct: 2 }
];

const FACTS = [
  "Перша форма в інтернеті з'явилася в 1991 році на сайті CERN!",
  "Атрибут 'placeholder' з'явився тільки в HTML5, до цього використовували JavaScript!",
  "Сучасні форми можуть перевіряти правильність email, телефону та навіть пароля без JavaScript!",
  "Найдовша форма в інтернеті містила понад 1000 полів!",
  "Кнопка 'submit' може мати різний текст: 'Надіслати', 'Відправити', 'OK', 'Готово' тощо."
];

// ==================== ГРА "ФОРМА-КОНСТРУКТОР" ====================
class FormMatchGame {
    static selectedLeft = null;
    static matchedPairs = 0;
    static totalPairs = 8;
    
    static init() {
        console.log('FormMatchGame init');
        
        this.leftItems = document.querySelectorAll('#leftItems .match-item');
        this.rightItems = document.querySelectorAll('#rightItems .match-item');
        this.matchedCountSpan = document.querySelector('#matchedCount');
        this.totalCountSpan = document.querySelector('#totalCount');
        this.resetBtn = document.querySelector('#resetMatchBtn');
        this.matchFeedback = document.querySelector('#matchFeedback');
        
        // Створюємо модальне вікно тільки для фінального вітання
        this.createWinModal();
        
        if (this.totalCountSpan) {
            this.totalCountSpan.textContent = this.totalPairs;
        }
        
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetGame());
        }
        
        this.setupEventListeners();
        this.updateProgress();
    }
    
    static createWinModal() {
        if (document.querySelector('#winModal')) return;
        
        const modalHTML = `
            <div id="winModal" class="win-modal">
                <div class="win-modal-content">
                    <div class="win-modal-header">
                        <i class="fas fa-trophy"></i> ПЕРЕМОГА!
                        <button class="win-modal-close" id="closeWinModalBtn">&times;</button>
                    </div>
                    <div class="win-modal-body" id="winModalBody">
                        <div class="win-emoji">🎉✨🌟</div>
                        <h2>ВІТАЮ!</h2>
                        <p>Ти знаєш всі елементи форми!</p>
                        <p>Тепер ти готовий створювати власні форми!</p>
                        <div class="win-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="win-modal-footer">
                        <button id="winOkBtn" class="btn-run">Супер! 🚀</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        this.winModal = document.querySelector('#winModal');
        this.closeWinBtn = document.querySelector('#closeWinModalBtn');
        this.winOkBtn = document.querySelector('#winOkBtn');
        
        this.closeWinBtn?.addEventListener('click', () => this.hideWinModal());
        this.winOkBtn?.addEventListener('click', () => this.hideWinModal());
        
        this.winModal?.addEventListener('click', (e) => {
            if (e.target === this.winModal) {
                this.hideWinModal();
            }
        });
    }
    
    static showWinModal() {
        if (this.winModal) {
            this.winModal.style.display = 'flex';
        }
    }
    
    static hideWinModal() {
        if (this.winModal) {
            this.winModal.style.display = 'none';
        }
    }
    
    static showErrorTemporary(item) {
        // Тимчасове червоне підсвічування для неправильної пари
        item.style.transition = 'all 0.2s ease';
        item.style.background = 'rgba(230, 126, 34, 0.5)';
        item.style.borderColor = '#e67e22';
        
        setTimeout(() => {
            item.style.background = '';
            item.style.borderColor = '';
        }, 500);
    }
    
    static setupEventListeners() {
        // Ліві елементи (типи полів)
        this.leftItems.forEach(item => {
            item.removeEventListener('click', this.leftClickHandler);
            item.addEventListener('click', this.leftClickHandler.bind(this, item));
        });
        
        // Праві елементи (призначення)
        this.rightItems.forEach(item => {
            item.removeEventListener('click', this.rightClickHandler);
            item.addEventListener('click', this.rightClickHandler.bind(this, item));
        });
    }
    
    static leftClickHandler(item, e) {
        e.stopPropagation();
        if (item.classList.contains('matched')) return;
        
        // Знімаємо виділення з усіх лівих
        this.leftItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        this.selectedLeft = item;
        
        // Якщо вже був вибраний правий - пробуємо з'єднати
        const selectedRight = document.querySelector('#rightItems .match-item.selected');
        if (selectedRight && !selectedRight.classList.contains('matched')) {
            this.tryMatch(this.selectedLeft, selectedRight);
        }
    }
    
    static rightClickHandler(item, e) {
        e.stopPropagation();
        if (item.classList.contains('matched')) return;
        
        // Знімаємо виділення з усіх правих
        this.rightItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        
        // Якщо вже був вибраний лівий - пробуємо з'єднати
        if (this.selectedLeft && !this.selectedLeft.classList.contains('matched')) {
            this.tryMatch(this.selectedLeft, item);
        }
    }
    
    static tryMatch(leftItem, rightItem) {
        const leftType = leftItem.dataset.type;
        const rightMatch = rightItem.dataset.match;
        
        if (leftType === rightMatch) {
            // Правильне з'єднання - стає зеленим і закреслюється
            leftItem.classList.add('matched');
            rightItem.classList.add('matched');
            leftItem.classList.remove('selected');
            rightItem.classList.remove('selected');
            this.selectedLeft = null;
            this.matchedPairs++;
            this.updateProgress();
            
            // Показуємо легке повідомлення в прогресс-барі
            if (this.matchFeedback) {
                this.matchFeedback.innerHTML = '✅ +1 бал!';
                this.matchFeedback.className = 'game-feedback-match success';
                setTimeout(() => {
                    if (this.matchFeedback) this.matchFeedback.innerHTML = '';
                }, 800);
            }
            
            if (this.matchedPairs === this.totalPairs) {
                this.gameWin();
            }
        } else {
            // Неправильне з'єднання - червоне підсвічування
            this.showErrorTemporary(leftItem);
            this.showErrorTemporary(rightItem);
            
            // Показуємо повідомлення в прогресс-барі
            if (this.matchFeedback) {
                this.matchFeedback.innerHTML = '❌ Неправильно! Спробуй ще раз!';
                this.matchFeedback.className = 'game-feedback-match error';
                setTimeout(() => {
                    if (this.matchFeedback) this.matchFeedback.innerHTML = '';
                }, 1000);
            }
            
            // Знімаємо виділення
            leftItem.classList.remove('selected');
            rightItem.classList.remove('selected');
            this.selectedLeft = null;
        }
    }
    
    static updateProgress() {
        if (this.matchedCountSpan) {
            this.matchedCountSpan.textContent = this.matchedPairs;
        }
    }
    
    static gameWin() {
        // Показуємо модальне вікно тільки при перемозі!
        this.showWinModal();
    }
    
    static resetGame() {
        this.matchedPairs = 0;
        this.selectedLeft = null;
        this.updateProgress();
        
        // Очищаємо всі класи
        this.leftItems.forEach(item => {
            item.classList.remove('matched', 'selected');
        });
        this.rightItems.forEach(item => {
            item.classList.remove('matched', 'selected');
        });
        
        if (this.matchFeedback) {
            this.matchFeedback.innerHTML = '🔄 Гру перезапущено!';
            this.matchFeedback.className = 'game-feedback-match success';
            setTimeout(() => {
                if (this.matchFeedback) this.matchFeedback.innerHTML = '';
            }, 1000);
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

// ==================== ВІКТОРИНИ ====================
class FormsQuiz {
  static userAnswers = new Array(FORMS_QUIZ.length).fill(null);
  
  static render() {
    if (!DOM.quizFormsContainer) return;
    const html = FORMS_QUIZ.map((q, idx) => `
      <div class="quiz-question">${idx + 1}. ${q.text}</div>
      ${q.options.map((opt, optIdx) => `
        <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
             data-qidx="${idx}" data-oidx="${optIdx}">
          ${String.fromCharCode(65 + optIdx)}. ${opt}
        </div>
      `).join('')}
    `).join('');
    DOM.quizFormsContainer.innerHTML = html;
    
    DOM.quizFormsContainer.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const { qidx, oidx } = e.currentTarget.dataset;
        this.userAnswers[parseInt(qidx)] = parseInt(oidx);
        this.render();
      });
    });
  }
  
  static check() {
    let correctCount = 0;
    const results = FORMS_QUIZ.map((q, i) => {
      const isCorrect = this.userAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
      return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
    });
    const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${FORMS_QUIZ.length}</p>
      ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
    if (DOM.quizFormsFeedback) DOM.quizFormsFeedback.innerHTML = html;
  }
  
  static reset() {
    this.userAnswers = new Array(FORMS_QUIZ.length).fill(null);
    this.render();
    if (DOM.quizFormsFeedback) DOM.quizFormsFeedback.innerHTML = '';
  }
  
  static init() {
    this.render();
    DOM.checkFormsQuizBtn?.addEventListener('click', () => this.check());
    DOM.resetFormsQuizBtn?.addEventListener('click', () => this.reset());
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
  FormMatchGame.init();
  FormsQuiz.init();
  ControlQuiz.init();
  RandomFact.init();
  SmoothScroll.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}