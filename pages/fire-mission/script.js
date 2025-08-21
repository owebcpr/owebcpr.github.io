document.addEventListener('DOMContentLoaded', () => {

    // --- Підйом/перехід між рівнями ---
    // function nextLevel(currId, nextId) {
    //     const curr = document.getElementById(currId);
    //     const next = document.getElementById(nextId);
    //     if (curr) curr.classList.remove('active');
    //     if (next) next.classList.add('active');
    //     // очистити повідомлення рівня 3, якщо є
    //     const msg = document.getElementById('message');
    //     if (msg) msg.textContent = '';
    // }

    let currentLevel = 1;

    function showLevel(level) {
        document.querySelectorAll('.level').forEach(el => el.style.display = 'none');
        document.getElementById('level' + level).style.display = 'block';
        currentLevel = level;
    }

    function nextLevel(levelId, nextLevelId) {
        if (nextLevelId === 'final') {
            // ховаємо всі рівні
            document.querySelectorAll('.level').forEach(el => el.style.display = 'none');
            // ховаємо заголовок, якщо він був
            const questTitle = document.querySelector('.heading');
            if (questTitle) questTitle.style.display = 'none';
            // показуємо фінальний екран
            document.getElementById('final').style.display = 'block';
        } else {
            let next = currentLevel + 1;
            if (document.getElementById('level' + next)) {
                showLevel(next);
            }
        }
    }

    // --- Одиночний вибір (рівні 1-4) ---
    window.checkAnswer = function (button, correct, level) {
        const box = button.closest('.answers');
        if (box) {
            // скидаємо попереднє підсвічування в цьому блоці
            box.querySelectorAll('button').forEach(b => b.classList.remove('correct', 'wrong'));
        }
        // підсвічування для натиснутої кнопки
        button.classList.add(correct ? 'correct' : 'wrong');

        if (correct) {
            // заблокувати кнопки, щоб не спамили
            if (box) box.querySelectorAll('button').forEach(b => b.disabled = true);
            setTimeout(() => nextLevel('level' + level, 'level' + (level + 1)), 800);
        }
    };

    // --- Drag & Drop (рівень 3) ---
    const draggables = document.querySelectorAll(".draggable");
    const dropzones = document.querySelectorAll(".dropzone");

    draggables.forEach(el => {
        el.addEventListener("dragstart", e => {
            e.dataTransfer.setData("id", el.id);
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener("dragover", e => e.preventDefault());
        zone.addEventListener("dragenter", () => zone.classList.add('zone-hover'));
        zone.addEventListener("dragleave", () => zone.classList.remove('zone-hover'));
        zone.addEventListener("drop", e => {
            e.preventDefault();
            zone.classList.remove('zone-hover');
            const id = e.dataTransfer.getData("id");
            const item = document.getElementById(id);
            if (item) zone.appendChild(item);
            updateColors();
        });
    });

    // Очікуваний розподіл для рівня 3 (по ID)
    const expected = {
        safe: ['item1', 'item3'],   // Вогнегасник і Ліхтарик
        danger: ['item2']          // Сірники
    };

    function getIds(selector) {
        return Array.from(document.querySelectorAll(selector)).map(n => n.id);
    }

    function sameMembers(a, b) {
        return a.length === b.length && a.every(x => b.includes(x));
    }

    // Оновлює кольори карток у рівні 3 (правильно/неправильно)
    function updateColors() {
        const safeIds = getIds('#safe .draggable');
        const dangerIds = getIds('#danger .draggable');

        document.querySelectorAll('.draggable').forEach(el => {
            el.classList.remove('correct', 'wrong');
        });

        safeIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add(expected.safe.includes(id) ? 'correct' : 'wrong');
        });
        dangerIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add(expected.danger.includes(id) ? 'correct' : 'wrong');
        });
    }

    // Після натискання "Завершити квест" на рівні 3 — йдемо на рівень 4 (як просили)
    window.finishGame = function () {
        const safeIds = getIds('#safe .draggable');
        const dangerIds = getIds('#danger .draggable');
        const isCorrect = sameMembers(safeIds, expected.safe) && sameMembers(dangerIds, expected.danger);
        const msg = document.getElementById("message");
        if (msg) {
            if (isCorrect) {
                msg.textContent = "✅ Все правильно! Молодець!";
                msg.style.color = "green";
                setTimeout(() => nextLevel('level3', 'level4'), 900);
            } else {
                msg.textContent = "❌ Ти помилився! Подумай ще раз 😉";
                msg.style.color = "red";
            }
        }
        updateColors();
    };

    // --- Ініціалізатор мультивибору (рівні 5 та 6) ---
    // levelId: 'level5' або 'level6', nextLevelId: 'level6' або 'final'
    function initMultiSelect(levelId, nextLevelId) {
        const container = document.getElementById(levelId);
        if (!container) return;
        // шукаємо кнопки всередині .answers (як у твоєму HTML)
        const buttons = Array.from(container.querySelectorAll('.answers button'));
        if (!buttons.length) return;

        // Визначаємо, які кнопки правильні:
        // 1) спочатку — data-correct attribute (data-correct="true")
        // 2) якщо його нема — парсимо старий onclick="checkAnswer(..., true/false, ...)"
        const correctness = new Map();
        buttons.forEach(btn => {
            let isCorrect = false;
            if (btn.dataset && btn.dataset.correct !== undefined) {
                isCorrect = btn.dataset.correct === 'true';
            } else if (btn.getAttribute('onclick')) {
                const onclickText = btn.getAttribute('onclick');
                const m = onclickText.match(/checkAnswer\([^,]*,\s*(true|false)\s*,/i);
                if (m) isCorrect = m[1].toLowerCase() === 'true';
            } else {
                // fallback: можна додати правила по тексту (не надійно), залишимо false
                isCorrect = false;
            }
            correctness.set(btn, isCorrect);
        });

        // Підсумкова кількість правильних
        const totalCorrect = Array.from(correctness.values()).filter(Boolean).length;
        let chosenCorrect = 0;

        // Видаляємо старі onclick (щоб не викликався checkAnswer) і чистимо класи/стани
        buttons.forEach(btn => {
            btn.removeAttribute('onclick');
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
        });

        // Додаємо feedback блок, якщо його нема
        let feedback = container.querySelector('.multi-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'multi-feedback';
            feedback.style.marginTop = '10px';
            container.querySelector('.answers').after(feedback);
        }
        feedback.textContent = '';

        // Обробник кліку для мультивибору
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                const isCorr = correctness.get(btn);
                if (isCorr) {
                    btn.classList.add('correct');
                    btn.disabled = true;
                    chosenCorrect++;
                    feedback.textContent = 'Правильно! Обери всі правильні варіанти.';
                    feedback.style.color = 'green';
                    // Якщо вибрані всі правильні — перехід далі
                    if (chosenCorrect === totalCorrect) {
                        setTimeout(() => nextLevel(levelId, nextLevelId), 700);
                    }
                } else {
                    // Помилка: підсвічуємо червоним, але не блокуємо весь рівень
                    btn.classList.add('wrong');
                    btn.disabled = true;
                    feedback.textContent = 'Ні, це неправильно. Спробуй ще!';
                    feedback.style.color = 'red';
                }
            });
        });
    }

    // --- Ініціалізація рівнів 5 і 6 ---
    // викличе парсер onclick або використає data-correct, тож HTML міняти не обов'язково
    initMultiSelect('level5', 'level6');
    initMultiSelect('level6', 'final');

    // (на всякий випадок) початковий апдейт кольорів для рівня 3
    updateColors();

}); // DOMContentLoaded end