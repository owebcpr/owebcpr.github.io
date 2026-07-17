// ===== ОДИН ГОЛОВНИЙ СЛУХАЧ ДЛЯ ВСЬОГО =====
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ---------- 1. ПАЗЛ (тільки для комп'ютерів) ----------
    const isTouchLike = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isTouchLike) {
        const symbols = document.querySelectorAll(".draggable");
        const mapZone = document.getElementById("mapZone");
        const result = document.getElementById("result");

        if (symbols.length && mapZone && result) {
            let correctCount = 0;
            const totalCorrect = document.querySelectorAll(".draggable[data-correct='true']").length;

            symbols.forEach(symbol => {
                symbol.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text", e.target.dataset.correct);
                    e.dataTransfer.setData("id", e.target.src);
                });
            });

            mapZone.addEventListener("dragover", e => e.preventDefault());

            mapZone.addEventListener("drop", e => {
                e.preventDefault();
                const isCorrect = e.dataTransfer.getData("text") === "true";
                const imgSrc = e.dataTransfer.getData("id");

                if (isCorrect) {
                    const droppedImg = document.createElement("img");
                    droppedImg.src = imgSrc;
                    droppedImg.style.width = "50px";
                    droppedImg.style.position = "absolute";
                    droppedImg.style.left = (e.offsetX - 25) + "px";
                    droppedImg.style.top = (e.offsetY - 25) + "px";
                    mapZone.appendChild(droppedImg);

                    correctCount++;
                    result.innerText = `Молодець! Ти додав символ України ✅ (${correctCount}/${totalCorrect})`;
                    result.style.color = "green";

                    if (correctCount === totalCorrect) {
                        setTimeout(() => {
                            result.innerText = "Вітаємо! Ти зібрав усі символи України!";
                            result.style.color = "#0057b7";
                            result.style.fontWeight = "bold";
                        }, 400);
                    }
                } else {
                    result.innerText = "Це не символ України ❌";
                    result.style.color = "red";
                }
            });
        }
    }

    // ---------- 2. CANVAS (малювання прапора) ----------
    const canvas = document.getElementById("flagCanvas");
    const canvasBlock = document.getElementById("canvas-block");
    const infoBlock = document.getElementById("info-block");
    const canvasInfo = document.getElementById("canvas-info");

    // Функція для визначення типу пристрою
    function isTouchDevice() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }

    // Функція ініціалізації canvas
    function initCanvas() {
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let painting = false;

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }

        function startPosition(e) {
            painting = true;
            const { x, y } = getPos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function endPosition() {
            painting = false;
        }

        function draw(e) {
            if (!painting) return;
            const { x, y } = getPos(e);
            const brushSize = document.getElementById("brushSize");
            const colorPicker = document.getElementById("colorPicker");

            ctx.lineWidth = brushSize ? parseInt(brushSize.value, 10) : 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = colorPicker ? colorPicker.value : "#0057b7";

            ctx.lineTo(x, y);
            ctx.stroke();
        }

        canvas.addEventListener("mousedown", startPosition);
        canvas.addEventListener("mouseup", endPosition);
        canvas.addEventListener("mouseleave", endPosition);
        canvas.addEventListener("mousemove", draw);

        const clearBtn = document.getElementById("clearCanvas");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }

        const saveBtn = document.getElementById("saveCanvas");
        if (saveBtn) {
            saveBtn.addEventListener("click", () => {
                const link = document.createElement("a");
                link.download = "prapor-moieyi-mrii.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }
    }

    // Перевірка пристрою та показ відповідного блоку
    function checkDevice() {
        if (!canvasBlock || !infoBlock || !canvasInfo) return;

        if (isTouchDevice()) {
            canvasBlock.style.display = "none";
            infoBlock.style.display = "block";
            canvasInfo.style.display = "block";
        } else {
            canvasBlock.style.display = "block";
            infoBlock.style.display = "none";
            canvasInfo.style.display = "none";
            initCanvas();
        }
    }

    checkDevice();

    // ---------- 3. ВІКТОРИНА "Символи України" ----------
    const container = document.getElementById('quiz-container');
    const resultDiv = document.getElementById('quiz-result');
    const checkBtn = document.getElementById('check-answers-btn');

    if (container && resultDiv && checkBtn) {
        const questions = [
            {
                question: 'Який колір є символом мирного неба та спокою на прапорі України?',
                options: ['Зелений', 'Синій', 'Жовтий', 'Білий'],
                correct: 1
            },
            {
                question: 'Що символізує жовтий колір на Державному Прапорі України?',
                options: ['Пшеничні поля та достаток', 'Золоті куполи церков', 'Багатство надр', 'Піски пустелі'],
                correct: 0
            },
            {
                question: 'Який символ зображено на Державному Гербі України?',
                options: ['Хрест', 'Тризуб', 'Сонце', 'Калина'],
                correct: 1
            },
            {
                question: 'Як називається старовинний український символ, який є оберегом і часто вишивається на сорочках?',
                options: ['Писанка', 'Калина', 'Вишиванка', 'Рушник'],
                correct: 2
            },
            {
                question: 'Яка рослина є символом життя, роду та незламності в українській культурі?',
                options: ['Соняшник', 'Калина', 'Верба', 'Барвінок'],
                correct: 1
            },
            {
                question: 'Яке свято ми відзначаємо 24 серпня?',
                options: ['День Конституції', 'День Незалежності України', 'День Української Державності', 'День Перемоги'],
                correct: 1
            },
            {
                question: 'Який символ є найдавнішим українським символом, якому понад 1000 років?',
                options: ['Тризуб', 'Писанка', 'Вишиванка', 'Калина'],
                correct: 1
            },
            {
                question: 'Які кольори є основними на Державному Прапорі України?',
                options: ['Червоний та чорний', 'Зелений та жовтий', 'Синій та жовтий', 'Білий та синій'],
                correct: 2
            }
        ];

        // Рендеринг питань
        function renderQuiz() {
            let html = '';
            questions.forEach((q, index) => {
                html += `<div class="question" data-q="${index}">
                    <span class="question-text">${index + 1}. ${q.question}</span>
                    <div class="options">`;
                q.options.forEach((opt, optIndex) => {
                    html += `
                        <label>
                            <input type="radio" name="q${index}" value="${optIndex}">
                            ${opt}
                        </label>
                    `;
                });
                html += `</div></div>`;
            });
            container.innerHTML = html;
        }

        renderQuiz();

        // Перевірка відповідей
        function checkAnswers() {
            let correctCount = 0;
            let detailsHTML = '';

            questions.forEach((q, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                const userAnswer = selected ? parseInt(selected.value, 10) : null;
                const isCorrect = (userAnswer === q.correct);
                if (isCorrect) correctCount++;

                const correctText = q.options[q.correct];
                detailsHTML += `
                    <div style="margin-bottom: 8px; padding: 8px 12px; border-radius: 8px; background: ${isCorrect ? '#e8f5e9' : '#ffebee'}; border-left: 4px solid ${isCorrect ? '#4caf50' : '#ef5350'};">
                        <strong>${index + 1}.</strong> ${q.question}<br>
                        <span style="font-size: 14px;">
                            Ваша відповідь: ${userAnswer !== null ? q.options[userAnswer] : 'Не обрано'}
                            ${!isCorrect ? ` → Правильно: <span class="correct-answer">${correctText}</span>` : ' ✅'}
                        </span>
                    </div>
                `;
            });

            const total = questions.length;
            const percent = Math.round((correctCount / total) * 100);

            let emoji = '';
            if (percent === 100) emoji = '🏆';
            else if (percent >= 80) emoji = '🌟';
            else if (percent >= 60) emoji = '💪';
            else if (percent >= 40) emoji = '📖';
            else emoji = '💪';

            let message = '';
            if (percent === 100) message = 'Вітаємо! Ви справжній знавець України! 🇺🇦';
            else if (percent >= 80) message = 'Чудовий результат! Ви добре знаєте символи нашої держави!';
            else if (percent >= 60) message = 'Непогано! Є ще над чим попрацювати. Рекомендуємо повторити матеріали.';
            else if (percent >= 40) message = 'Варто ще раз згадати символи України. Успіхів!';
            else message = 'Не засмучуйтесь! Спробуйте ще раз, уважніше прочитавши питання.';

            resultDiv.innerHTML = `
                <div class="score">${emoji} ${correctCount} / ${total} (${percent}%)</div>
                <p style="text-align: center; font-size: 18px; margin-bottom: 16px;">${message}</p>
                <div class="details">${detailsHTML}</div>
            `;

            resultDiv.classList.add('show');
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        checkBtn.addEventListener('click', checkAnswers);
    } else {
        console.warn('Елементи вікторини не знайдені. Перевірте ID: #quiz-container, #quiz-result, #check-answers-btn');
    }
});

// ---------- 4. ДОДАТКОВИЙ СЛУХАЧ ДЛЯ РЕСАЙЗУ ----------
window.addEventListener("resize", function () {
    const canvasBlock = document.getElementById("canvas-block");
    const infoBlock = document.getElementById("info-block");
    const canvasInfo = document.getElementById("canvas-info");

    if (!canvasBlock || !infoBlock || !canvasInfo) return;

    function isTouchDevice() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }

    if (isTouchDevice()) {
        canvasBlock.style.display = "none";
        infoBlock.style.display = "block";
        canvasInfo.style.display = "block";
    } else {
        canvasBlock.style.display = "block";
        infoBlock.style.display = "none";
        canvasInfo.style.display = "none";
    }
});