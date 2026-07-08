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
  
  // Гра "Впіймай елемент списку"
  catchGame: document.querySelector('#catchGame'),
  catchQuestion: document.querySelector('#catchQuestion'),
  catchContainer: document.querySelector('#catchContainer'),
  catchScore: document.querySelector('#catchScore'),
  catchFeedback: document.querySelector('#catchFeedback'),
  startCatchBtn: document.querySelector('#startCatchBtn'),
  resetCatchBtn: document.querySelector('#resetCatchBtn'),
  
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
    <title>Мій ідеальний день</title>
</head>
<body>
    <h1>🌟 Мій ідеальний день</h1>
    
    <h2>📝 Плани на день</h2>
    <ul>
        <li>Ранкова зарядка</li>
        <li>Сніданок</li>
        <li>Навчання</li>
        <li>Прогулянка</li>
    </ul>
    
    <h2>⏰ Розклад по годинах</h2>
    <ol>
        <li>08:00 - Підйом</li>
        <li>09:00 - Сніданок</li>
        <li>10:00 - Навчання</li>
        <li>14:00 - Обід</li>
        <li>16:00 - Прогулянка</li>
    </ol>
    
    <h2>🍕 Меню ресторану (вкладений список)</h2>
    <ul>
        <li>Основні страви
            <ul>
                <li>Піца Маргарита</li>
                <li>Паста Карбонара</li>
            </ul>
        </li>
        <li>Десерти
            <ul>
                <li>Тірамісу</li>
                <li>Чізкейк</li>
            </ul>
        </li>
    </ul>
    
    <h2>📖 Словник термінів</h2>
    <dl>
        <dt>HTML</dt>
        <dd>Мова розмітки веб-сторінок</dd>
        <dt>CSS</dt>
        <dd>Мова стилів для оформлення</dd>
        <dt>UL</dt>
        <dd>Маркований список (unordered list)</dd>
    </dl>
</body>
</html>`;

// Питання для гри "Впіймай елемент списку"
const CATCH_QUESTIONS = [
  { text: "Знайди тег для створення маркованого списку", correct: "&lt;ul&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"] },
  { text: "Знайди тег для створення нумерованого списку", correct: "&lt;ol&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"] },
  { text: "Знайди тег для елемента списку", correct: "&lt;li&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"] },
  { text: "Знайди тег для терміна у списку визначень", correct: "&lt;dt&gt;", options: ["&lt;dl&gt;", "&lt;dt&gt;", "&lt;dd&gt;", "&lt;li&gt;"] },
  { text: "Знайди тег для опису терміна у списку визначень", correct: "&lt;dd&gt;", options: ["&lt;dl&gt;", "&lt;dt&gt;", "&lt;dd&gt;", "&lt;li&gt;"] },
  { text: "Знайди тег для списку визначень", correct: "&lt;dl&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"] },
  { text: "Який тег створює маркерований список з кружечками?", correct: "&lt;ul&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;menu&gt;"] },
  { text: "Який тег створює нумерований список з римськими цифрами?", correct: "&lt;ol&gt;", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;"] },
  { text: "Який атрибут змінює тип нумерації в ol?", correct: "type", options: ["type", "style", "class", "id"] },
  { text: "Яка CSS властивість змінює тип маркера?", correct: "list-style-type", options: ["marker-type", "list-type", "list-style-type", "bullet-type"] }
];

// Вікторина про списки
const TAGS_QUIZ = [
  { text: "Який тег створює маркований список?", options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;li&gt;", "&lt;dl&gt;"], correct: 1 },
  { text: "Який тег створює нумерований список?", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"], correct: 1 },
  { text: "Який тег використовується для елемента списку?", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;dl&gt;"], correct: 2 },
  { text: "Що таке &lt;dl&gt;?", options: ["Маркований список", "Нумерований список", "Список визначень", "Елемент списку"], correct: 2 },
  { text: "Який атрибут змінює тип нумерації в &lt;ol&gt;?", options: ["style", "type", "class", "id"], correct: 1 },
  { text: "Яка CSS властивість змінює тип маркера?", options: ["list-marker", "list-type", "list-style-type", "bullet-type"], correct: 2 }
];

// Контрольна вікторина
const CONTROL_QUIZ = [
  { text: "Який тег створює маркований список?", options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;li&gt;", "&lt;dl&gt;"], correct: 1 },
  { text: "Як зробити вкладений список?", options: ["Вкласти &lt;ul&gt; всередину &lt;li&gt;", "Вкласти &lt;ol&gt; всередину &lt;ul&gt;", "Використати &lt;dl&gt;", "Додати атрибут nested"], correct: 0 },
  { text: "Що означає 'ul'?", options: ["Universal List", "Unordered List", "Under List", "Upper List"], correct: 1 },
  { text: "Що означає 'ol'?", options: ["Ordered List", "Original List", "Orange List", "Only List"], correct: 0 }
];

const FACTS = [
  "Списки в HTML можна вкладати один в одного без обмежень - створюйте меню будь-якої складності!",
  "Сучасні веб-сайти використовують списки для створення навігаційних меню, карток товарів, галерей зображень!",
  "Тег &lt;li&gt; може містити не тільки текст, але й зображення, посилання, інші списки - будь-які HTML-елементи!",
  "За допомогою CSS властивості 'list-style-image' можна використовувати власні зображення як маркери списку!",
  "Списки визначень (&lt;dl&gt;) ідеально підходять для створення словників, глосаріїв та FAQ-секцій!"
];

const STORAGE_KEYS = {
  CHECKLIST: 'listsChecklist',
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

// ==================== ГРА "РЯТУВАЛЬНА МІСІЯ" ====================
// ==================== ГРА "РЯТУВАЛЬНА МІСІЯ" ====================
class RescueGame {
    static currentLevel = 0;
    static score = 0;
    static isGameActive = false;
    static totalLevels = 5;
    static draggedItem = null;
    
    static levels = [
        { text: "Створи маркований список з назвами планет (Марс, Венера, Земля)", correctType: "ul", correctItems: ["Марс", "Венера", "Земля"] },
        { text: "Створи нумерований список з кроками порятунку (Сигнал, Стикування, Відкриття люка)", correctType: "ol", correctItems: ["Сигнал", "Стикування", "Відкриття люка"] },
        { text: "Створи маркований список з інструментами (Динамо-ключ, Лазерний різак, Кисневий балон)", correctType: "ul", correctItems: ["Динамо-ключ", "Лазерний різак", "Кисневий балон"] },
        { text: "Створи нумерований список з правилами безпеки (Перевірити скафандр, Загерметизувати шлюз, Активувати рятувальну капсулу)", correctType: "ol", correctItems: ["Перевірити скафандр", "Загерметизувати шлюз", "Активувати рятувальну капсулу"] },
        { text: "Створи маркований список з рятувальниками (Капітан, Інженер, Лікар)", correctType: "ul", correctItems: ["Капітан", "Інженер", "Лікар"] }
    ];
    
    static allItems = [
        "Марс", "Венера", "Земля", "Юпітер", "Сатурн",
        "Сигнал", "Стикування", "Відкриття люка", "Запуск двигунів", "Перевірка систем",
        "Динамо-ключ", "Лазерний різак", "Кисневий балон", "Ракетний ранець", "Магнітні черевики",
        "Перевірити скафандр", "Загерметизувати шлюз", "Активувати рятувальну капсулу", "Запустити протокол", "Евакуювати екіпаж",
        "Капітан", "Інженер", "Лікар", "Пілот", "Навігатор"
    ];
    
    static init() {
        DOM.startRescueBtn = document.querySelector('#startRescueBtn');
        DOM.resetRescueBtn = document.querySelector('#resetRescueBtn');
        DOM.rescueMessage = document.querySelector('#rescueMessage');
        DOM.rescueScore = document.querySelector('#rescueScore');
        DOM.rescueStatus = document.querySelector('#rescueStatus');
        DOM.missionText = document.querySelector('#missionText');
        DOM.itemsContainer = document.querySelector('#itemsContainer');
        DOM.dropZoneUl = document.querySelector('#dropZoneUl');
        DOM.dropZoneOl = document.querySelector('#dropZoneOl');
        DOM.rescueGame = document.querySelector('#rescueGame');
        DOM.rescueMission = document.querySelector('#rescueMission');
        
        DOM.startRescueBtn?.addEventListener('click', () => this.startGame());
        DOM.resetRescueBtn?.addEventListener('click', () => this.resetGame());
        this.setupDragAndDrop();
    }
    
    static setupDragAndDrop() {
        // Drag start
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
            const dropZones = document.querySelectorAll('.drop-zone');
            dropZones.forEach(zone => zone.classList.remove('drag-over'));
        });
        
        // Drop zones
        const dropZones = [DOM.dropZoneUl, DOM.dropZoneOl];
        dropZones.forEach(zone => {
            if (!zone) return;
            const parentZone = zone.closest('.drop-zone');
            
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!this.isGameActive) return;
                parentZone.classList.add('drag-over');
                e.dataTransfer.dropEffect = 'move';
            });
            
            zone.addEventListener('dragleave', (e) => {
                parentZone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                if (!this.isGameActive) return;
                parentZone.classList.remove('drag-over');
                
                const itemText = e.dataTransfer.getData('text/plain');
                const draggedElement = this.draggedItem;
                if (!draggedElement || draggedElement.classList.contains('disabled')) return;
                
                const listType = parentZone.dataset.listType;
                const currentLevelData = this.levels[this.currentLevel];
                
                if (listType !== currentLevelData.correctType) {
                    this.showMessage(`❌ Неправильний тип списку! Потрібен ${currentLevelData.correctType === 'ul' ? 'маркований' : 'нумерований'} список!`, 'fail');
                    return;
                }
                
                if (!currentLevelData.correctItems.includes(itemText)) {
                    this.showMessage(`❌ "${itemText}" не потрібен для цього завдання!`, 'fail');
                    return;
                }
                
                // Перевіряємо чи цей елемент вже додано
                const existingItems = zone.querySelectorAll('.drop-item');
                const alreadyAdded = Array.from(existingItems).some(item => item.textContent === itemText);
                if (alreadyAdded) {
                    this.showMessage(`⚠️ "${itemText}" вже додано до списку!`, 'fail');
                    return;
                }
                
                // Додаємо елемент в зону
                const dropItem = document.createElement('div');
                dropItem.className = 'drop-item';
                dropItem.textContent = itemText;
                zone.appendChild(dropItem);
                
                // Позначаємо елемент як використаний
                draggedElement.classList.add('disabled');
                draggedElement.setAttribute('draggable', 'false');
                draggedElement.style.opacity = '0.4';
                draggedElement.style.cursor = 'not-allowed';
                
                this.showMessage(`✅ "${itemText}" додано!`, 'success');
                
                // Перевіряємо чи зібрано весь список
                const currentItems = Array.from(zone.querySelectorAll('.drop-item')).map(item => item.textContent);
                const isComplete = currentLevelData.correctItems.every(item => currentItems.includes(item));
                
                if (isComplete) {
                    this.completeLevel();
                }
            });
        });
    }
    
    static showMessage(msg, type) {
        if (DOM.rescueMessage) {
            DOM.rescueMessage.innerHTML = msg;
            DOM.rescueMessage.className = `rescue-message ${type}`;
            setTimeout(() => {
                if (DOM.rescueMessage && !this.isGameActive === false) {
                    DOM.rescueMessage.innerHTML = '';
                }
            }, 2000);
        }
    }
    
    static completeLevel() {
        this.score++;
        if (DOM.rescueScore) DOM.rescueScore.innerHTML = `Рівень: ${this.score} / ${this.totalLevels}`;
        
        if (this.currentLevel + 1 >= this.totalLevels) {
            this.gameWin();
        } else {
            this.showMessage(`🎉 Рівень ${this.currentLevel + 1} пройдено! Переходь до наступного! 🎉`, 'success');
            this.currentLevel++;
            this.loadLevel();
        }
    }
    
    static startGame() {
        if (this.isGameActive) return;
        this.isGameActive = true;
        this.currentLevel = 0;
        this.score = 0;
        
        // Показуємо ігрову зону, ховаємо фінальне повідомлення
        if (DOM.rescueMission) DOM.rescueMission.style.display = 'block';
        const victoryDiv = document.querySelector('#victoryScreen');
        if (victoryDiv) victoryDiv.remove();
        
        if (DOM.rescueScore) DOM.rescueScore.innerHTML = `Рівень: 0 / ${this.totalLevels}`;
        if (DOM.rescueStatus) {
            DOM.rescueStatus.innerHTML = '🚀 Статус: Рятувальна місія розпочата!';
            DOM.rescueStatus.className = 'success';
        }
        if (DOM.startRescueBtn) DOM.startRescueBtn.style.display = 'none';
        if (DOM.resetRescueBtn) DOM.resetRescueBtn.style.display = 'inline-flex';
        
        this.loadLevel();
    }
    
    static loadLevel() {
        const levelData = this.levels[this.currentLevel];
        if (DOM.missionText) DOM.missionText.innerHTML = levelData.text;
        
        // Очищаємо зони
        if (DOM.dropZoneUl) DOM.dropZoneUl.innerHTML = '';
        if (DOM.dropZoneOl) DOM.dropZoneOl.innerHTML = '';
        
        // Перемішуємо та відображаємо доступні елементи
        const availableItems = [...this.allItems];
        for (let i = availableItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
        }
        
        if (DOM.itemsContainer) {
            DOM.itemsContainer.innerHTML = availableItems.map(item => `
                <div class="drag-item" draggable="true">${item}</div>
            `).join('');
        }
        
        DOM.itemsContainer?.querySelectorAll('.drag-item').forEach(el => {
            el.setAttribute('draggable', 'true');
            el.style.opacity = '1';
            el.classList.remove('disabled');
        });
        
        this.showMessage(`📝 Рівень ${this.currentLevel + 1}: Перетягни ${levelData.correctItems.length} правильні елементи в ${levelData.correctType === 'ul' ? 'маркований' : 'нумерований'} список!`, 'success');
    }
    
    static resetGame() {
        this.isGameActive = false;
        this.currentLevel = 0;
        this.score = 0;
        
        // Ховаємо фінальне повідомлення
        const victoryDiv = document.querySelector('#victoryScreen');
        if (victoryDiv) victoryDiv.remove();
        
        // Показуємо ігрову зону
        if (DOM.rescueMission) DOM.rescueMission.style.display = 'block';
        
        if (DOM.rescueScore) DOM.rescueScore.innerHTML = `Рівень: 0 / ${this.totalLevels}`;
        if (DOM.rescueStatus) {
            DOM.rescueStatus.innerHTML = '🚀 Статус: Місію скинуто. Натисни "Почати місію"!';
            DOM.rescueStatus.className = '';
        }
        if (DOM.missionText) DOM.missionText.innerHTML = 'Натисни "Почати місію" щоб розпочати порятунок!';
        if (DOM.itemsContainer) DOM.itemsContainer.innerHTML = '';
        if (DOM.dropZoneUl) DOM.dropZoneUl.innerHTML = '';
        if (DOM.dropZoneOl) DOM.dropZoneOl.innerHTML = '';
        if (DOM.rescueMessage) DOM.rescueMessage.innerHTML = '';
        if (DOM.startRescueBtn) DOM.startRescueBtn.style.display = 'inline-flex';
        if (DOM.resetRescueBtn) DOM.resetRescueBtn.style.display = 'inline-flex';
    }
    
    static gameWin() {
        this.isGameActive = false;
        
        // Ховаємо ігрову зону
        if (DOM.rescueMission) DOM.rescueMission.style.display = 'none';
        
        // Створюємо фінальне повідомлення
        const victoryHtml = `
            <div id="victoryScreen" class="victory-screen">
                <div class="victory-content">
                    <div class="victory-emoji">🎉✨🌟</div>
                    <h1 class="victory-title">ПОРЯТУНОК УСПІШНИЙ!</h1>
                    <div class="victory-image">
                        <img src="img/kosmonavt.png" alt="Космонавт" style="max-width: 200px; border-radius: 20px;">
                    </div>
                    <p class="victory-text">Астронавт Марк врятований!</p>
                    <p class="victory-text">Ти успішно створив усі списки та відкрив рятувальну капсулу!</p>
                    <p class="victory-text"><strong>🌟 Ти справжній герой! 🌟</strong></p>
                    <button id="victoryResetBtn" class="btn-run" style="margin-top: 20px;"><i class="fas fa-redo-alt"></i> Зіграти ще раз</button>
                </div>
            </div>
        `;
        
        DOM.rescueGame?.insertAdjacentHTML('beforeend', victoryHtml);
        
        // Додаємо обробник для кнопки "Зіграти ще раз"
        const victoryResetBtn = document.querySelector('#victoryResetBtn');
        if (victoryResetBtn) {
            victoryResetBtn.addEventListener('click', () => {
                this.resetGame();
            });
        }
        
        if (DOM.startRescueBtn) DOM.startRescueBtn.style.display = 'inline-flex';
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
  RescueGame.init();
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