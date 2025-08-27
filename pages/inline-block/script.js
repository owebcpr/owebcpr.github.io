// Функції для drag and drop
let draggedItem = null;

document.addEventListener('DOMContentLoaded', function () {
    const tags = document.querySelectorAll('.tag');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Додаємо обробники подій для тегів
    tags.forEach(tag => {
        tag.addEventListener('dragstart', handleDragStart);
        tag.addEventListener('dragend', handleDragEnd);
    });

    // Додаємо обробники подій для зон скидання
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
});

function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (draggedItem) {
        // Створюємо копію елемента для вставки
        const clone = draggedItem.cloneNode(true);
        clone.setAttribute('draggable', 'false');
        clone.style.cursor = 'pointer';
        clone.addEventListener('click', function () {
            this.remove();
        });

        this.appendChild(clone);
    }

    return false;
}

// Функція перевірки відповідей
function checkAnswers() {
    const blockDrop = document.getElementById('block-drop');
    const inlineDrop = document.getElementById('inline-drop');
    const resultMessage = document.getElementById('result-message');

    let correct = true;
    let message = '';

    // Перевіряємо блочні елементи
    const blockTags = blockDrop.querySelectorAll('.tag');
    blockTags.forEach(tag => {
        const originalText = tag.textContent;
        const shouldBeBlock = ['div', 'p', 'h1', 'ul', 'section'].includes(originalText);
        if (!shouldBeBlock) {
            correct = false;
            message += `Елемент "${originalText}" не є блочним! `;
        }
    });

    // Перевіряємо рядкові елементи
    const inlineTags = inlineDrop.querySelectorAll('.tag');
    inlineTags.forEach(tag => {
        const originalText = tag.textContent;
        const shouldBeInline = ['span', 'a', 'strong', 'img', 'em'].includes(originalText);
        if (!shouldBeInline) {
            correct = false;
            message += `Елемент "${originalText}" не є рядковим! `;
        }
    });

    // Перевіряємо, чи всі елементи розміщені
    const totalTags = document.querySelectorAll('.tags-container .tag').length;
    const placedTags = blockTags.length + inlineTags.length;

    if (placedTags < totalTags) {
        correct = false;
        message += `Не всі елементи розміщені! `;
    }

    // Показуємо результат
    if (correct) {
        resultMessage.textContent = 'Вітаю! Всі відповіді правильні!';
        resultMessage.className = 'correct';
    } else {
        resultMessage.textContent = message || 'Знайдені помилки. Спробуй ще раз!';
        resultMessage.className = 'incorrect';
    }
}