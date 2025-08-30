function toggleCard(card) {
    // Закриваємо всі інші картки
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('active');
        }
    });

    // Перемикаємо поточну картку
    card.classList.toggle('active');
}

// Додаємо обробник кліку на картки
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    // Додаємо обробник для закриття при кліку поза карткою
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.card')) {
            cards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });

    // Додаємо обробник клавіші ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            cards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});

function toggleSituation(card) {
    // Закриваємо всі інші картки ситуацій
    const allSituationCards = document.querySelectorAll('.situation-card');
    allSituationCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('active');
        }
    });

    // Перемикаємо поточну картку
    card.classList.toggle('active');
}

// Додаємо обробник для ситуаційних карток
document.addEventListener('DOMContentLoaded', function () {
    const situationCards = document.querySelectorAll('.situation-card');

    // Додаємо обробник для закриття при кліку поза карткою
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.situation-card')) {
            situationCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });

    // Додаємо обробник клавіші ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            situationCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});