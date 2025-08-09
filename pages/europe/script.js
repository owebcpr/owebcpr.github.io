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