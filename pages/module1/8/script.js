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
  
  // Гра Drag & Drop
  dragItems: document.querySelector('#itemsContainer'),
  dropZones: document.querySelectorAll('.drop-zone'),
  dragGameMessage: document.querySelector('#dragGameMessage'),
  dragGameScore: document.querySelector('#dragGameScore'),
  startDragBtn: document.querySelector('#startDragBtn'),
  resetDragBtn: document.querySelector('#resetDragBtn'),
  
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
    <title>Моє хобі - Фотографія</title>
</head>
<body>
    <h1>📸 Моє хобі - фотографія</h1>
    
    <img src="images/camera.jpg" alt="Фотоапарат" width="400">
    
    <p>Фотографія — це моє улюблене заняття. Я люблю фотографувати природу та тварин. Ось що мені подобається найбільше:</p>
    
    <ul>
        <li>
            <img src="images/travel-icon.png" alt="Подорожі" width="30">
            Подорожувати та фотографувати нові місця
        </li>
        <li>
            <img src="images/nature-icon.png" alt="Природа" width="30">
            Знімати пейзажі та захід сонця
        </li>
        <li>
            <img src="images/animals-icon.png" alt="Тварини" width="30">
            Фотографувати тварин у дикій природі
        </li>
    </ul>
    
    <p>Фотографія допомагає мені <strong>запам'ятовувати важливі моменти</strong> та ділитися ними з іншими!</p>
</body>
</html>`;

// Питання для вікторини
const TAGS_QUIZ = [
  { text: "Який атрибут є обов'язковим для тега &lt;img&gt;?", options: ["alt", "src", "width", "title"], correct: 1 },
  { text: "Для чого використовується атрибут alt?", options: ["Для підказки", "Для альтернативного тексту", "Для розміру", "Для посилання"], correct: 1 },
  { text: "Який формат найкраще підходить для фотографій?", options: ["PNG", "GIF", "JPEG", "BMP"], correct: 2 },
  { text: "Який формат підтримує прозорість?", options: ["JPEG", "GIF", "PNG", "WebP"], correct: 2 },
  { text: "Що робить атрибут loading='lazy'?", options: ["Пришвидшує завантаження", "Збільшує якість", "Змінює розмір", "Додає рамку"], correct: 0 }
];

const CONTROL_QUIZ = [
  { text: "Який тег використовується для вставки зображень?", options: ["&lt;image&gt;", "&lt;img&gt;", "&lt;pic&gt;", "&lt;src&gt;"], correct: 1 },
  { text: "Який формат підтримує анімацію?", options: ["JPEG", "PNG", "GIF", "WebP"], correct: 2 },
  { text: "Чи є тег &lt;img&gt; парним?", options: ["Так", "Ні", "Залежить від атрибутів", "Тільки в HTML5"], correct: 1 },
  { text: "Як змінити ширину зображення?", options: ["Атрибут size", "Атрибут width", "Атрибут height", "Атрибут big"], correct: 1 }
];

const FACTS = [
  "Перше зображення в інтернеті з'явилося в 1992 році! Це була фотографія гурту CERN.",
  "Сайти з якісними зображеннями отримують на 94% більше переглядів!",
  "Атрибут alt важливий не тільки для SEO, але й для людей з вадами зору (екранні читачки).",
  "Формат WebP стискає зображення на 25-35% краще за JPEG при тій самій якості.",
  "Зображення становлять близько 65% всього трафіку в інтернеті!"
];

const STORAGE_KEYS = {
  CHECKLIST: 'imagesChecklist',
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

// ==================== ГРА DRAG & DROP ====================
class DragDropGame {
  static score = 0;
  static totalItems = 6;
  static isGameActive = false;
  static draggedItem = null;

  static init() {
    DOM.startDragBtn?.addEventListener('click', () => this.startGame());
    DOM.resetDragBtn?.addEventListener('click', () => this.resetGame());
    this.setupDragAndDrop();
  }

  static setupDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
      if (!this.isGameActive) return;
      const target = e.target.closest('.drag-item');
      if (target && !target.classList.contains('disabled')) {
        this.draggedItem = target;
        target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', target.textContent);
        e.dataTransfer.effectAllowed = 'move';
      }
    });

    document.addEventListener('dragend', (e) => {
      if (this.draggedItem) {
        this.draggedItem.classList.remove('dragging');
        this.draggedItem = null;
      }
      DOM.dropZones?.forEach(zone => zone.classList.remove('drag-over'));
    });

    DOM.dropZones?.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!this.isGameActive) return;
        zone.classList.add('drag-over');
        e.dataTransfer.dropEffect = 'move';
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!this.isGameActive) return;

        const acceptType = zone.dataset.accept;
        const dragged = this.draggedItem;
        if (!dragged || dragged.classList.contains('disabled')) return;

        const itemType = dragged.dataset.type;
        const itemText = dragged.textContent;

        if (itemType !== acceptType) {
          this.showMessage(`❌ "${itemText}" не підходить для категорії ${zone.querySelector('.drop-zone-title')?.textContent || ''}!`, 'fail');
          return;
        }

        // Додаємо в зону
        const dropContainer = zone.querySelector('.drop-zone-container');
        const dropItem = document.createElement('div');
        dropItem.className = 'drop-item';
        dropItem.textContent = itemText;
        dropContainer.appendChild(dropItem);

        dragged.classList.add('disabled');
        dragged.setAttribute('draggable', 'false');
        dragged.style.opacity = '0.4';

        this.score++;
        this.updateScore();
        this.showMessage(`✅ "${itemText}" правильно додано! +1 бал`, 'success');

        if (this.score === this.totalItems) {
          this.gameWin();
        }
      });
    });
  }

  static startGame() {
    if (this.isGameActive) return;
    this.resetGameState();
    this.isGameActive = true;
    if (DOM.startDragBtn) DOM.startDragBtn.style.display = 'none';
    if (DOM.resetDragBtn) DOM.resetDragBtn.style.display = 'inline-flex';
    this.showMessage('🎮 Гра розпочата! Перетягуй зображення в правильні категорії!', 'success');
  }

  static resetGame() {
    this.resetGameState();
    if (DOM.startDragBtn) DOM.startDragBtn.style.display = 'inline-flex';
    if (DOM.resetDragBtn) DOM.resetDragBtn.style.display = 'inline-flex';
    this.showMessage('Гру скинуто. Натисни "Почати гру"', 'info');
  }

  static resetGameState() {
    this.isGameActive = false;
    this.score = 0;
    this.updateScore();

    // Очищаємо зони
    DOM.dropZones?.forEach(zone => {
      const container = zone.querySelector('.drop-zone-container');
      if (container) container.innerHTML = '';
    });

    // Відновлюємо елементи
    const items = document.querySelectorAll('.drag-item');
    items.forEach(item => {
      item.classList.remove('disabled');
      item.setAttribute('draggable', 'true');
      item.style.opacity = '1';
    });
  }

  static updateScore() {
    if (DOM.dragGameScore) {
      DOM.dragGameScore.innerHTML = `Зібрано: ${this.score} / ${this.totalItems}`;
    }
  }

  static showMessage(msg, type) {
    if (DOM.dragGameMessage) {
      DOM.dragGameMessage.innerHTML = msg;
      DOM.dragGameMessage.style.color = type === 'success' ? '#27ae60' : type === 'fail' ? '#e67e22' : '#ffd966';
      setTimeout(() => {
        if (DOM.dragGameMessage) DOM.dragGameMessage.innerHTML = '';
      }, 2000);
    }
  }

  static gameWin() {
    this.isGameActive = false;
    if (DOM.dragGameMessage) {
      DOM.dragGameMessage.innerHTML = '🎉 ВІТАЮ! 🎉 Ти правильно розклав усі зображення! 🎉';
      DOM.dragGameMessage.style.color = '#fafd25';
    }
    if (DOM.startDragBtn) DOM.startDragBtn.style.display = 'inline-flex';
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
  DragDropGame.init();
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