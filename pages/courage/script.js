document.querySelectorAll('ul li').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        // Забороняємо повторний вибір у цьому питанні
        if (parent.classList.contains('answered')) return;
        parent.classList.add('answered');

        if (item.dataset.correct === "true") {
            item.classList.add('correct');
        } else {
            item.classList.add('wrong');
            // підсвічуємо правильну відповідь
            parent.querySelector('[data-correct="true"]').classList.add('correct');
        }
    });
});

// символ мужності - ВИПРАВЛЕНА ВЕРСІЯ
function initCourageGame() {
    const imageItems = document.querySelectorAll('#courage-images-grid .image-item');
    const feedbackText = document.getElementById('courage-feedback-text');
    let gameCompleted = false;

    // Додаємо обробники подій для картинок
    imageItems.forEach(item => {
        item.addEventListener('click', function () {
            // Якщо гра вже завершена, перезапускаємо її при наступному кліку
            if (gameCompleted) {
                // Скидаємо всі стилі
                imageItems.forEach(img => {
                    img.classList.remove('correct', 'incorrect');
                });
                feedbackText.textContent = "Оберіть картинку, яка символізує мужність";
                feedbackText.style.color = "#00557f";
                gameCompleted = false;
                return;
            }

            const isCorrect = this.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                this.classList.add('correct');
                feedbackText.textContent = "Вітаю! Молодець! Калина - символ мужності!";
                feedbackText.style.color = "#4CAF50";
                gameCompleted = true;
            } else {
                this.classList.add('incorrect');
                feedbackText.textContent = "Спробуйте ще! Це не символ мужності.";
                feedbackText.style.color = "#F44336";

                // Автоматично прибираємо червону рамку через 1 секунду
                setTimeout(() => {
                    this.classList.remove('incorrect');
                }, 1000);
            }
        });
    });
}

// Додаємо ініціалізацію гри
document.addEventListener('DOMContentLoaded', function () {
    initCourageGame();
});