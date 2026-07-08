        // ========== 1. ВІКТОРИНА З БЕЗПЕКИ ==========
        const quizData = [
            {
                question: "🔐 Що з цього є НАЙБІЛЬШ безпечним паролем?",
                options: ["123456", "password", "K&t9#mFq2@xL", "qwerty"],
                correct: 2
            },
            {
                question: "📧 Тобі приходить лист від незнайомця з файлом «Суперприз.exe». Що робити?",
                options: ["Відкрити файл, цікаво ж!", "Написати йому особисті дані", "Не відкривати, повідомити дорослим", "Надіслати друзям"],
                correct: 2
            },
            {
                question: "🖥️ Скільки часу рекомендується безперервно працювати за комп'ютером без перерви?",
                options: ["2 години", "30 хвилин (бажано перерва кожні 20-30 хв)", "5 годин", "Поки не втомишся"],
                correct: 1
            },
            {
                question: "🌐 Що таке web-сайт?",
                options: ["Комп'ютерна гра", "Набір веб-сторінок в Інтернеті", "Антивірусна програма", "Пошукова система"],
                correct: 1
            }
        ];

        let selectedAnswers = new Array(quizData.length).fill(null);

        function renderQuiz() {
            const container = document.getElementById('quizContainer');
            if (!container) return;
            container.innerHTML = '';
            quizData.forEach((item, idx) => {
                const questionDiv = document.createElement('div');
                questionDiv.style.marginBottom = '25px';
                questionDiv.style.background = '#fffcf0';
                questionDiv.style.padding = '15px';
                questionDiv.style.borderRadius = '24px';
                const qText = document.createElement('div');
                qText.className = 'quiz-question';
                qText.innerHTML = `${idx+1}. ${item.question}`;
                questionDiv.appendChild(qText);
                item.options.forEach((opt, optIdx) => {
                    const optDiv = document.createElement('div');
                    optDiv.className = `quiz-option ${selectedAnswers[idx] === optIdx ? 'selected' : ''}`;
                    optDiv.innerHTML = `${String.fromCharCode(65+optIdx)}. ${opt}`;
                    optDiv.addEventListener('click', () => {
                        selectedAnswers[idx] = optIdx;
                        renderQuiz(); // оновлюємо підсвітку
                    });
                    questionDiv.appendChild(optDiv);
                });
                container.appendChild(questionDiv);
            });
        }

        function checkQuiz() {
            let score = 0;
            quizData.forEach((item, idx) => {
                if (selectedAnswers[idx] === item.correct) score++;
            });
            const feedbackDiv = document.getElementById('quizFeedback');
            if (score === quizData.length) {
                feedbackDiv.innerHTML = '🎉 <span style="color:green;">Чудово! Ти справжній експерт з безпеки та знаєш про Інтернет!</span> 🎉';
                feedbackDiv.style.background = '#d4edda';
            } else {
                feedbackDiv.innerHTML = `📘 Ти набрав ${score} з ${quizData.length}. Переглянь правильні відповіді ще раз: безпека понад усе! Запам'ятай: міцні паролі, обережність з файлами та перерви.`;
                feedbackDiv.style.background = '#ffecb3';
            }
        }

        function resetQuiz() {
            selectedAnswers.fill(null);
            renderQuiz();
            document.getElementById('quizFeedback').innerHTML = '';
            document.getElementById('quizFeedback').style.background = 'transparent';
        }

        // ========== 2. ІНТЕРАКТИВНА ВПРАВА drag & drop ==========
        const terms = [
            { name: "Заголовки, абзаци, списки", category: "HTML" },
            { name: "Колір фону, шрифти, рамки", category: "CSS" },
            { name: "Анімація, обробка кліків", category: "JS" },
            { name: "Теги <h1>, <p>, <div>", category: "HTML" },
            { name: "Властивість color, margin", category: "CSS" },
            { name: "Функції, змінні, події", category: "JS" }
        ];

        let dragItem = null;

        function renderTerms() {
            const termsContainer = document.getElementById('termsList');
            if (!termsContainer) return;
            termsContainer.innerHTML = '';
            terms.forEach((term, index) => {
                const termEl = document.createElement('div');
                termEl.setAttribute('draggable', 'true');
                termEl.setAttribute('data-term-index', index);
                termEl.style.background = '#ffffffd9';
                termEl.style.padding = '10px';
                termEl.style.margin = '5px 0';
                termEl.style.borderRadius = '40px';
                termEl.style.border = '1px solid #ccc';
                termEl.style.cursor = 'grab';
                termEl.style.textAlign = 'center';
                termEl.innerText = term.name;
                termEl.addEventListener('dragstart', (e) => {
                    dragItem = term;
                    e.dataTransfer.setData('text/plain', index);
                    termEl.style.opacity = '0.5';
                });
                termEl.addEventListener('dragend', () => {
                    termEl.style.opacity = '1';
                    dragItem = null;
                });
                termsContainer.appendChild(termEl);
            });
        }

        function setupDropZones() {
            const dropZones = [
                { element: document.getElementById('htmlDrop'), category: 'HTML' },
                { element: document.getElementById('cssDrop'), category: 'CSS' },
                { element: document.getElementById('jsDrop'), category: 'JS' }
            ];
            dropZones.forEach(zone => {
                if (!zone.element) return;
                zone.element.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });
                zone.element.addEventListener('drop', (e) => {
                    e.preventDefault();
                    if (dragItem) {
                        if (dragItem.category === zone.category) {
                            // правильне переміщення
                            const msgDiv = document.getElementById('dragMessage');
                            msgDiv.innerHTML = `✅ Молодець! "${dragItem.name}" правильно відноситься до ${zone.category}.`;
                            msgDiv.style.color = "green";
                            // видаляємо зі списку термінів
                            const index = terms.findIndex(t => t.name === dragItem.name && t.category === dragItem.category);
                            if (index !== -1) {
                                terms.splice(index, 1);
                                renderTerms();
                            }
                            // створити елемент в drop зоні як підтвердження
                            const droppedSpan = document.createElement('div');
                            droppedSpan.style.background = '#ffffffba';
                            droppedSpan.style.padding = '6px 12px';
                            droppedSpan.style.margin = '6px';
                            droppedSpan.style.borderRadius = '30px';
                            droppedSpan.style.fontSize = '0.85rem';
                            droppedSpan.innerText = dragItem.name;
                            zone.element.appendChild(droppedSpan);
                            dragItem = null;
                            if (terms.length === 0) {
                                msgDiv.innerHTML = '🎉 Супер! Ти запам`ятав складові вебсайту! Ти готовий творити! 🎉';
                                msgDiv.style.color = "#1e5f7a";
                                msgDiv.style.fontWeight = "bold";
                            }
                        } else {
                            document.getElementById('dragMessage').innerHTML = `❌ Ой! "${dragItem.name}" не належить до категорії ${zone.category}. Спробуй ще раз!`;
                            document.getElementById('dragMessage').style.color = "brown";
                        }
                    }
                });
            });
        }

        // ========== 3. Додатковий ефект: привітання та анімація ==========
        function init() {
            renderQuiz();
            const checkBtn = document.getElementById('checkQuizBtn');
            if (checkBtn) checkBtn.addEventListener('click', checkQuiz);
            const resetBtn = document.getElementById('resetQuizBtn');
            if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
            renderTerms();
            setupDropZones();
            // невеличке привітання в консолі
            console.log("Вітання! Сторінка Вступ, Безпека, WEB-сайти готова.");
        }

        // Запускаємо після завантаження DOM
        document.addEventListener('DOMContentLoaded', init);