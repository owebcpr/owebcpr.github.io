// --- Інструмент: побудова простого HTML для прев'ю ---
document.getElementById('buildBtn').addEventListener('click', function () {
    const title = document.getElementById('projTitle').value.trim() || 'Мій добрий проєкт';
    const desc = document.getElementById('projDesc').value.trim() || 'Короткий опис';
    const bg = document.getElementById('bgColor').value.trim() || '#ffffff';

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title>
                <style>body{font-family:Segoe UI, sans-serif;padding:20px;background:${escapeHtml(bg)};color:#111} .card{max-width:700px;margin:0 auto;background:#fff;padding:16px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,.1)} h1{color:#003366}</style>
                </head><body><div class="card"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(desc)}</p><p><strong>Як допомогти:</strong></p><ul><li>Зателефонувати</li><li>Принести речі</li><li>Стати волонтером</li></ul></div></body></html>`;

    const iframe = document.getElementById('preview');
    iframe.srcdoc = html;
    // Зберігаємо результат в атрибуті для можливого скачування
    iframe.setAttribute('data-last-html', html);
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const iframe = document.getElementById('preview');
    const html = iframe.getAttribute('data-last-html');
    if (!html) {
        alert('Спочатку натисніть "Показати попередній перегляд"');
        return;
    }
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-good-project.html';
    a.click();
    URL.revokeObjectURL(url);
});

function escapeHtml(str) {
    return str.replace(/[&<>\"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; });
}

// --- Вікторина ---
const quizQ = [
    {
        q: 'Що важливо перевірити перед тим, як перекладати гроші через сайт?',
        a: ['Чи є контактні дані і відгуки', 'Надіслати свої дані першому, хто напише', 'Платити лише готівкою'],
        correct: 0
    },
    {
        q: 'Як ще можна робити добро онлайн без грошей?',
        a: ['Писати історії, допомагати з кодом, розповідати про проблему', 'Нічого не робити', 'Тільки лайкати'],
        correct: 0
    },
    {
        q: 'Який контент НЕ слід публікувати про людину, якій ви допомагаєте?',
        a: ['Історію хвороби з дозволу', 'Особисті паспортні дані', 'Загальні побажання одужання'],
        correct: 1
    }
];

let qIndex = 0, score = 0;
const startBtn = document.getElementById('startQuiz');
const qText = document.getElementById('questionText');
const answersWrap = document.getElementById('answers');
const resultP = document.getElementById('quizResult');

startBtn.addEventListener('click', function () {
    qIndex = 0; score = 0; resultP.textContent = '';
    startBtn.style.display = 'none';
    showQuestion();
});

function showQuestion() {
    const q = quizQ[qIndex];
    qText.textContent = `Питання ${qIndex + 1}: ${q.q}`;
    answersWrap.innerHTML = '';
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = ans;
        btn.style.display = 'block';
        btn.style.margin = '6px 0';
        btn.addEventListener('click', function () { selectAnswer(i); });
        answersWrap.appendChild(btn);
    });
}

function selectAnswer(i) {
    const q = quizQ[qIndex];
    if (i === q.correct) score++;
    qIndex++;
    if (qIndex < quizQ.length) {
        showQuestion();
    } else {
        qText.textContent = 'Вікторина завершена!';
        answersWrap.innerHTML = '';
        resultP.textContent = `Ви набрали ${score} з ${quizQ.length} правильних відповідей. Молодець!`;
        startBtn.style.display = 'block';
        startBtn.textContent = 'Почати ще раз';
    }
}
