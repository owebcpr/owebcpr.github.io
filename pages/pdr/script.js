function toggleAnswer(card) {
    const answer = card.querySelector('.scenario-answer');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

function checkAnswer(option, isCorrect) {
    const options = option.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.onclick = null;
    });

    option.classList.add(isCorrect ? 'correct' : 'incorrect');

    if (!isCorrect) {
        const correctOption = options[2];
        correctOption.classList.add('correct');
    }
}

// Додатковий JavaScript для drag&drop гри
document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable');
    const dropzone = document.querySelector('.dropzone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
        });
    });

    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        this.textContent = `Додано: ${data}`;
        this.style.background = '#d4edda';
    });
});