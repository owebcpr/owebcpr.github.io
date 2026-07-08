// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
    randomFactBtn: document.querySelector('#randomFactBtn'),
    factDisplay: document.querySelector('#randomFactDisplay'),
    
    // Вікторина про структуру
    quizStructureContainer: document.querySelector('#quizStructureContainer'),
    quizStructureFeedback: document.querySelector('#quizStructureFeedback'),
    checkStructureQuizBtn: document.querySelector('#checkStructureQuizBtn'),
    resetStructureQuizBtn: document.querySelector('#resetStructureQuizBtn'),
    
    // Гра з розташуванням блоків
    layoutCanvas: document.querySelector('#layoutCanvas'),
    layoutItems: document.querySelector('#layoutItems'),
    layoutFeedback: document.querySelector('#layoutFeedback'),
    checkLayoutBtn: document.querySelector('#checkLayoutBtn'),
    resetLayoutBtn: document.querySelector('#resetLayoutBtn'),
    
    // Чек-лист
    checklistItems: document.querySelectorAll('.checklist-checkbox'),
    resetChecklistBtn: document.querySelector('#resetChecklistBtn'),
    
    // Підказки
    toggleHintBtns: document.querySelectorAll('.toggle-hint'),
    
    finalCongrats: document.querySelector('#finalCongrats')
};

// ==================== КОНСТАНТИ ====================
const STRUCTURE_QUIZ = [
    { text: "Що таке вайрфрейм?", options: ["Кольоровий макет", "Чорно-біла схема сторінки", "Готова сторінка", "Карта сайту"], correct: 1 },
    { text: "Який тег використовується для навігації?", options: ["&lt;header&gt;", "&lt;nav&gt;", "&lt;menu&gt;", "&lt;navigation&gt;"], correct: 1 },
    { text: "Скільки тегів &lt;main&gt; може бути на сторінці?", options: ["0", "1", "2", "Скільки завгодно"], correct: 1 },
    { text: "Що таке sitemap?", options: ["Карта сайту", "Стилі", "Скрипти", "Зображення"], correct: 0 },
    { text: "Який етап передує верстці?", options: ["Дизайн", "Проєктування", "Тестування", "Публікація"], correct: 1 }
];

const FACTS = [
    "Перший сайт в історії був створений у 1991 році в CERN!",
    "Steve Jobs особисто затверджував дизайн першого iPhone!",
    "70% користувачів залишають сайт, якщо він погано виглядає на телефоні!",
    "На розробку дизайну Facebook пішло більше року!",
    "Середній час життя сайту - 2-3 роки!",
    "Колір кнопки 'Купити' може вплинути на продажі на 30%!"
];

// Правильні відповіді для гри з розташуванням
const CORRECT_LAYOUT = {
    header: 'header',
    nav: 'nav',
    main: 'main',
    sidebar: 'sidebar',
    footer: 'footer'
};

// ==================== ВІКТОРИНА ====================
class StructureQuiz {
    static userAnswers = new Array(STRUCTURE_QUIZ.length).fill(null);

    static render() {
        if (!DOM.quizStructureContainer) return;
        const html = STRUCTURE_QUIZ.map((q, idx) => `
            <div class="quiz-question">${idx + 1}. ${q.text}</div>
            ${q.options.map((opt, optIdx) => `
                <div class="quiz-option ${this.userAnswers[idx] === optIdx ? 'selected' : ''}" 
                     data-qidx="${idx}" data-oidx="${optIdx}">
                    ${String.fromCharCode(65 + optIdx)}. ${opt}
                </div>
            `).join('')}
        `).join('');
        DOM.quizStructureContainer.innerHTML = html;
        
        DOM.quizStructureContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                const { qidx, oidx } = e.currentTarget.dataset;
                this.userAnswers[parseInt(qidx)] = parseInt(oidx);
                this.render();
            });
        });
    }

    static check() {
        let correctCount = 0;
        const results = STRUCTURE_QUIZ.map((q, i) => {
            const isCorrect = this.userAnswers[i] === q.correct;
            if (isCorrect) correctCount++;
            return { isCorrect, correctText: q.options[q.correct], number: i + 1 };
        });
        const html = `<p style="color:#1e5f7a;">📊 Результат: ${correctCount} з ${STRUCTURE_QUIZ.length}</p>
            ${results.map(r => `<p>${r.isCorrect ? '✅' : '❌'} Питання ${r.number}: ${r.isCorrect ? 'Вірно!' : `Невірно. Відповідь: ${r.correctText}`}</p>`).join('')}`;
        if (DOM.quizStructureFeedback) DOM.quizStructureFeedback.innerHTML = html;
    }

    static reset() {
        this.userAnswers = new Array(STRUCTURE_QUIZ.length).fill(null);
        this.render();
        if (DOM.quizStructureFeedback) DOM.quizStructureFeedback.innerHTML = '';
    }

    static init() {
        this.render();
        DOM.checkStructureQuizBtn?.addEventListener('click', () => this.check());
        DOM.resetStructureQuizBtn?.addEventListener('click', () => this.reset());
    }
}

// ==================== ГРА "РОЗТАШУЙ БЛОКИ" ====================
class LayoutGame {
    static slots = {};
    static dragItem = null;

    static init() {
        this.setupDragAndDrop();
        DOM.checkLayoutBtn?.addEventListener('click', () => this.check());
        DOM.resetLayoutBtn?.addEventListener('click', () => this.reset());
    }

    static setupDragAndDrop() {
        // Налаштовуємо перетягування елементів
        const dragItems = document.querySelectorAll('.drag-item');
        const slots = document.querySelectorAll('.layout-slot');
        
        dragItems.forEach(item => {
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', (e) => {
                this.dragItem = item.dataset.item;
                e.dataTransfer.setData('text/plain', item.dataset.item);
                item.classList.add('dragging');
            });
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
            });
        });
        
        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const slotName = slot.dataset.slot;
                const itemValue = e.dataTransfer.getData('text/plain');
                
                if (this.dragItem) {
                    this.placeItem(slot, slotName, this.dragItem);
                }
            });
            
            // Також додаємо клік для зручності
            slot.addEventListener('click', () => {
                if (this.dragItem) {
                    this.placeItem(slot, slot.dataset.slot, this.dragItem);
                }
            });
        });
    }
    
    static placeItem(slot, slotName, itemValue) {
        // Перевіряємо чи правильний елемент кладеться
        const expected = CORRECT_LAYOUT[slotName];
        
        if (itemValue === expected) {
            slot.innerHTML = this.getItemIcon(itemValue);
            slot.classList.add('filled');
            slot.dataset.value = itemValue;
            
            // Видаляємо перетягнутий елемент зі списку
            const draggedElement = document.querySelector(`.drag-item[data-item="${itemValue}"]`);
            if (draggedElement) {
                draggedElement.style.display = 'none';
            }
            this.dragItem = null;
            
            if (DOM.layoutFeedback) {
                DOM.layoutFeedback.innerHTML = '<p style="color:#27ae60;">✅ Правильно!</p>';
                setTimeout(() => {
                    if (DOM.layoutFeedback) DOM.layoutFeedback.innerHTML = '';
                }, 1000);
            }
            
            // Перевіряємо чи всі слоти заповнені
            this.checkAllFilled();
        } else {
            if (DOM.layoutFeedback) {
                DOM.layoutFeedback.innerHTML = `<p style="color:#e67e22;">❌ Неправильно! &lt;${itemValue}&gt; не підходить для цього місця.</p>`;
                setTimeout(() => {
                    if (DOM.layoutFeedback) DOM.layoutFeedback.innerHTML = '';
                }, 1500);
            }
        }
    }
    
    static getItemIcon(item) {
        const icons = {
            'header': '🏠 header',
            'nav': '🔗 nav',
            'main': '📄 main',
            'sidebar': '📌 sidebar',
            'footer': '📞 footer'
        };
        return icons[item] || item;
    }
    
    static checkAllFilled() {
        const slots = document.querySelectorAll('.layout-slot');
        let allFilled = true;
        
        slots.forEach(slot => {
            if (!slot.classList.contains('filled')) {
                allFilled = false;
            }
        });
        
        if (allFilled) {
            if (DOM.layoutFeedback) {
                DOM.layoutFeedback.innerHTML = '<p style="color:#27ae60; font-size:1.2rem;">🎉 Вітаю! Ти правильно розташував всі блоки!</p>';
            }
            if (DOM.finalCongrats) DOM.finalCongrats.style.display = 'block';
            DOM.finalCongrats?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    static check() {
        const slots = document.querySelectorAll('.layout-slot');
        let correct = 0;
        let total = slots.length;
        
        slots.forEach(slot => {
            if (slot.classList.contains('filled') && slot.dataset.value === CORRECT_LAYOUT[slot.dataset.slot]) {
                correct++;
            }
        });
        
        if (DOM.layoutFeedback) {
            if (correct === total) {
                DOM.layoutFeedback.innerHTML = '<p style="color:#27ae60;">🎉 Чудово! Всі блоки на своїх місцях!</p>';
                if (DOM.finalCongrats) DOM.finalCongrats.style.display = 'block';
            } else {
                DOM.layoutFeedback.innerHTML = `<p style="color:#e67e22;">⚠️ Правильно розташовано ${correct} з ${total} блоків. Спробуй ще раз!</p>`;
            }
        }
    }
    
    static reset() {
        // Очищаємо всі слоти
        const slots = document.querySelectorAll('.layout-slot');
        slots.forEach(slot => {
            slot.innerHTML = '???';
            slot.classList.remove('filled');
            delete slot.dataset.value;
        });
        
        // Показуємо всі елементи знову
        const dragItems = document.querySelectorAll('.drag-item');
        dragItems.forEach(item => {
            item.style.display = 'block';
        });
        
        if (DOM.layoutFeedback) DOM.layoutFeedback.innerHTML = '';
        if (DOM.finalCongrats) DOM.finalCongrats.style.display = 'none';
    }
}

// ==================== ЧЕК-ЛИСТ ====================
class Checklist {
    static init() {
        DOM.checklistItems.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const label = e.target.closest('.checklist-item');
                if (e.target.checked) {
                    label.classList.add('completed');
                } else {
                    label.classList.remove('completed');
                }
            });
        });
        
        DOM.resetChecklistBtn?.addEventListener('click', () => this.reset());
    }
    
    static reset() {
        DOM.checklistItems.forEach(checkbox => {
            checkbox.checked = false;
            const label = checkbox.closest('.checklist-item');
            label.classList.remove('completed');
        });
    }
}

// ==================== ПІДКАЗКИ ====================
class Hints {
    static init() {
        DOM.toggleHintBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const step = btn.dataset.step;
                const hint = document.getElementById(`hint-${step}`);
                if (hint) {
                    if (hint.style.display === 'none') {
                        hint.style.display = 'block';
                        btn.innerHTML = '📖 Сховати';
                    } else {
                        hint.style.display = 'none';
                        btn.innerHTML = '📖 Підказка';
                    }
                }
            });
        });
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
    StructureQuiz.init();
    LayoutGame.init();
    Checklist.init();
    Hints.init();
    RandomFact.init();
    SmoothScroll.init();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}