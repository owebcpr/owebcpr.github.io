// ============================================================
// 1. ГЕНЕРАТОР ПРЕВ'Ю
// ============================================================
(() => {
    const titleInput = document.getElementById('projectName');
    const descInput = document.getElementById('projectDesc');
    const colorInput = document.getElementById('bgColor');
    const previewCard = document.getElementById('previewCard');
    const previewTitle = document.getElementById('previewTitle');
    const previewDesc = document.getElementById('previewDesc');

    if (!titleInput || !descInput || !colorInput || !previewCard) return;

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const getColorBrightness = (hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return 200;
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };

    const updatePreview = () => {
        const title = titleInput.value.trim() || 'Назва проєкту';
        const desc = descInput.value.trim() || 'Опис вашої доброї справи...';
        const color = colorInput.value;

        previewTitle.textContent = title;
        previewDesc.textContent = desc;
        previewCard.style.backgroundColor = color;

        const brightness = getColorBrightness(color);
        previewCard.style.color = brightness < 128 ? '#ffffff' : '#1e2a3e';
        previewCard.style.borderColor = brightness < 128 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)';
    };

    titleInput.addEventListener('input', updatePreview);
    descInput.addEventListener('input', updatePreview);
    colorInput.addEventListener('input', updatePreview);

    // Ініціалізація
    updatePreview();
})();

// ============================================================
// 2. ВІКТОРИНА
// ============================================================
(() => {
    const quizStartBtn = document.getElementById('quizStartBtn');
    const quizStatus = document.getElementById('quizStatus');
    const quizQuestion = document.getElementById('quizQuestion');

    if (!quizStartBtn || !quizStatus || !quizQuestion) return;

    const quizData = [
        {
            question: 'Як найкраще допомогти безпритульним тваринам через інтернет?',
            options: [
                'Поставити лайк під фото',
                'Поширити інформацію про тварину в соцмережах або задонатити',
                'Написати гнівний коментар'
            ],
            correct: 1
        },
        {
            question: 'Що таке волонтерський портал?',
            options: [
                'Сайт для продажу речей',
                'Місце, де можна знайти можливості для волонтерства',
                'Соціальна мережа для спілкування'
            ],
            correct: 1
        },
        {
            question: 'Яка з цих дій є прикладом "добра в інтернеті"?',
            options: [
                'Створення сайту для збору коштів на лікування дитини',
                'Розсилання спаму',
                'Купівля підписників'
            ],
            correct: 0
        },
        {
            question: 'Що таке "лендінг" (landing page)?',
            options: [
                'Сторінка з багатьма розділами',
                'Односторінковий сайт для збору уваги до певної ідеї або продукту',
                'Сторінка для входу в соціальну мережу'
            ],
            correct: 1
        },
        {
            question: 'Як можна допомогти через інтернет, не виходячи з дому?',
            options: [
                'Поширювати інформацію про зниклих людей',
                'Брати участь у волонтерських онлайн-проєктах',
                'Донатити на благодійні збори',
                'Усі вищезазначені варіанти'
            ],
            correct: 3
        }
    ];

    let currentQuestionIndex = 0;
    let isQuizActive = false;
    let isAnswering = false;

    const resetQuiz = () => {
        currentQuestionIndex = 0;
        isQuizActive = false;
        isAnswering = false;
        quizStatus.innerHTML = '<i class="fas fa-info-circle"></i> Натисни кнопку "Почати вікторину" щоб почати.';
        quizQuestion.style.display = 'none';
        quizStartBtn.innerHTML = '<i class="fas fa-play"></i> Почати вікторину';
    };

    const showQuestion = () => {
        if (currentQuestionIndex >= quizData.length) {
            quizStatus.innerHTML = '🎉 <strong>Вітаємо!</strong> Ви пройшли вікторину. Ви справжній знавець добрих справ! 🌟';
            quizQuestion.style.display = 'none';
            quizStartBtn.innerHTML = '<i class="fas fa-redo-alt"></i> Пройти ще раз';
            isQuizActive = false;
            return;
        }

        const data = quizData[currentQuestionIndex];
        const optionsHtml = data.options
            .map((option, index) => `
                <button class="btn btn-secondary quiz-option" data-index="${index}" style="width: 100%; max-width: 400px; margin: 6px auto; display: block;">
                    ${option}
                </button>
            `)
            .join('');

        quizQuestion.innerHTML = `
            <h3 style="margin-bottom: 15px;">${data.question}</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
                ${optionsHtml}
            </div>
        `;
        quizQuestion.style.display = 'block';
        quizStatus.innerHTML = `📝 <strong>Питання ${currentQuestionIndex + 1} з ${quizData.length}</strong>`;

        // Обробники для кнопок відповідей
        document.querySelectorAll('.quiz-option').forEach((btn) => {
            btn.addEventListener('click', handleAnswer);
        });
    };

    const handleAnswer = (event) => {
        if (isAnswering) return;
        const button = event.currentTarget;
        const selectedIndex = parseInt(button.dataset.index);
        const isCorrect = selectedIndex === quizData[currentQuestionIndex].correct;

        isAnswering = true;

        // Блокуємо всі кнопки
        document.querySelectorAll('.quiz-option').forEach((btn) => {
            btn.disabled = true;
        });

        if (isCorrect) {
            button.style.background = 'linear-gradient(135deg, #27ae60, #1e8449)';
            button.style.color = 'white';
            button.style.borderColor = '#1e8449';
            quizStatus.innerHTML = '✅ <strong>Правильно!</strong> Чудова відповідь! 🎉';
        } else {
            button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            button.style.color = 'white';
            button.style.borderColor = '#c0392b';
            // Показуємо правильну відповідь
            document.querySelectorAll('.quiz-option').forEach((btn) => {
                if (parseInt(btn.dataset.index) === quizData[currentQuestionIndex].correct) {
                    btn.style.background = 'linear-gradient(135deg, #27ae60, #1e8449)';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#1e8449';
                }
            });
            quizStatus.innerHTML = '❌ <strong>Не зовсім.</strong> Правильна відповідь виділена зеленим.';
        }

        setTimeout(() => {
            currentQuestionIndex++;
            isAnswering = false;
            showQuestion();
        }, 2000);
    };

    const startQuiz = () => {
        if (isQuizActive) return;
        isQuizActive = true;
        currentQuestionIndex = 0;
        showQuestion();
        quizStartBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Відповідай...';
    };

    quizStartBtn.addEventListener('click', () => {
        const isRestart = quizStartBtn.innerHTML.includes('Ще раз');
        if (isRestart) {
            resetQuiz();
            return;
        }
        startQuiz();
    });
})();

// ============================================================
// 3. ВИПАДКОВІ ЦИТАТИ ПРО ДОБРО
// ============================================================
(() => {
    const factBtn = document.getElementById('randomFactBtn');
    const factDisplay = document.getElementById('randomFactDisplay');

    if (!factBtn || !factDisplay) return;

    const quotes = [
        '💖 Добро — це єдина інвестиція, яка завжди приносить прибуток.',
        '🌟 Найменша добра справа вартує більше, ніж найбільший намір.',
        '🌱 Добро починається з маленького кроку. Зроби його сьогодні!',
        '🤝 Коли ти робиш добро, ти змінюєш не тільки світ, а й себе.',
        '💫 Доброта — це мова, яку глухі можуть чути, а сліпі бачити.',
        '🌸 Кожна добра справа — це квітка в саду людяності.',
        '🌈 Добро повертається. Завжди. Навіть якщо не одразу.',
        '🌞 Найкращий спосіб знайти себе — це загубитися в служінні іншим.',
        '⭐ Світ стає кращим не від гучних слів, а від тихих добрих вчинків.',
        '🕊️ Посій добро — і воно проросте там, де ти навіть не очікуєш.',
        '💪 Навіть маленька допомога може змінити чиєсь життя.',
        '🌍 Разом ми — сила. Кожен з нас може зробити світ трохи кращим.',
        '📚 Найбільше багатство — це доброта, яку ми даруємо іншим.',
        '🎯 Не чекай великої нагоди. Почни з малої доброї справи сьогодні.',
        '✨ Коли ти робиш добро, ти стаєш зіркою в чиємусь темному небі.',
        '🌺 Доброта — це сонячне світло, в якому розквітає людяність.',
        '🦋 Кожна добра думка — це метелик, що створює буревій змін.',
        '💎 Найдорожчий скарб — це добре серце, готове допомогти.',
        '🌿 Добро — це коріння, на якому тримається світ.',
        '🌟 Ти можеш бути зіркою для когось, просто зробивши маленьку добру справу.'
    ];

    let currentQuoteIndex = -1;

    const getRandomQuote = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);
        currentQuoteIndex = newIndex;
        return quotes[currentQuoteIndex];
    };

    const showRandomQuote = () => {
        const quote = getRandomQuote();
        factDisplay.textContent = quote;
        factDisplay.classList.remove('show');

        // Тригер перемальовування для анімації
        void factDisplay.offsetWidth;
        factDisplay.classList.add('show');
    };

    // Обробник кнопки
    const handleFactClick = () => {
        showRandomQuote();

        // Візуальний зворотний зв'язок
        factBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            factBtn.style.transform = '';
        }, 150);
    };

    factBtn.addEventListener('click', handleFactClick);

    // Показуємо першу цитату при завантаженні
    setTimeout(showRandomQuote, 300);
})();

// ============================================================
// 4. ПЛАВНА ПРОКРУТКА ДЛЯ НАВІГАЦІЇ
// ============================================================
(() => {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
})();

// ============================================================
// 5. ВІДСЛІДКУВАННЯ АКТИВНОГО ПОСИЛАННЯ В НАВІГАЦІЇ
// ============================================================
(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;
                    navLinks.forEach((link) => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.style.color = '#ffd966';
                            link.style.borderBottom = '2px solid #ffd966';
                        } else {
                            link.style.color = '';
                            link.style.borderBottom = '';
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-80px 0px 0px 0px'
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
})();

// ============================================================
// 6. ДОДАТКОВІ ЕФЕКТИ
// ============================================================
(() => {
    // Плавне з'явлення карток
    const cards = document.querySelectorAll('.card');

    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        cards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }
})();

// ============================================================
// 7. ОБРОБКА ПОМИЛОК ТА ЛОГУВАННЯ
// ============================================================
console.log('🌸 Квітневий хакатон добра завантажено!');
console.log('💖 Робіть добро, і воно повернеться!');

// Поліфіл для старих браузерів (якщо потрібно)
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}