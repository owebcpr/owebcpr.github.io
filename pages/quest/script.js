// ============================================================
// ГЛОБАЛЬНИЙ СТАН КВЕСТУ
// ============================================================
const state = {
    currentTeam: 1,
    currentMission: 0,
    totalSeconds: 7200,
    timerInterval: null,
    kvestStarted: false,
    fitnessInterval: null,
    fitnessTimeout: null,
    fitnessActive: false,
    checklistChecked: 0,
    presentationTimer: null,
    presentationSeconds: 60,
    musicAudio: null,
    teamCode: { 1: '', 2: '' },
};

const teamData = {
    1: { projectName: '', projectDesc: '' },
    2: { projectName: '', projectDesc: '' },
};

const missionOrder = [0, 1, 2, 'fitness', 3, 4, 5];

// ============================================================
// DOM-ЕЛЕМЕНТИ
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    timerDisplay: $('#timerDisplay'),
    timerBox: $('#timerBox'),
    missionScreens: $$('.mission-screen'),
    missionDots: $$('.mission-dot'),
    missionConnectors: $$('.mission-connector'),
    navLinks: $$('.nav a'),
    teamBtns: $$('.team-btn'),
    startBtn: $('#startBtn'),
    projectName: $('#projectName'),
    projectDesc: $('#projectDesc'),
    m1Btn: $('#m1Btn'),
    mission1Result: $('#mission1Result'),
    mission1Summary: $('#mission1Summary'),
    sortableArea: $('#sortableArea'),
    m2Btn: $('#m2Btn'),
    mission2Feedback: $('#mission2Feedback'),
    fitnessOverlay: $('#fitnessOverlay'),
    fitnessShape: $('#fitnessShape'),
    fitnessHint: $('#fitnessHint'),
    fitnessRound: $('#fitnessRound'),
    fitnessCountdown: $('#fitnessCountdown'),
    fitnessRules: $('#fitnessRules'),
    fitnessStartBtn: $('#fitnessStartBtn'),
    fitnessSkipBtn: $('#fitnessSkipBtn'),
    htmlCode: $('#htmlCode'),
    previewFrame: $('#previewFrame'),
    updatePreviewBtn: $('#updatePreviewBtn'),
    m3Btn: $('#m3Btn'),
    checklist: $('#checklist'),
    m4Btn: $('#m4Btn'),
    presentTimer: $('#presentTimer'),
    presTimerBtn: $('#presTimerBtn'),
    finishBtn: $('#finishBtn'),
    finishModal: $('#finishModal'),
    certProjectName: $('#certProjectName'),
    certMessage: $('#certMessage'),
    reloadBtn: $('#reloadBtn'),
    // Модальне вікно для повідомлень
    messageModal: $('#messageModal'),
    messageModalText: $('#messageModalText'),
    messageModalClose: $('#messageModalClose'),
    messageModalOverlay: $('#messageModalOverlay'),
};

// ============================================================
// МОДАЛЬНЕ ВІКНО ДЛЯ ПОВІДОМЛЕНЬ
// ============================================================
function showMessage(text) {
    if (dom.messageModal && dom.messageModalText) {
        dom.messageModalText.textContent = text;
        dom.messageModal.classList.add('active');
    } else {
        alert(text);
    }
}

function hideMessage() {
    if (dom.messageModal) {
        dom.messageModal.classList.remove('active');
    }
}

if (dom.messageModalClose) {
    dom.messageModalClose.addEventListener('click', hideMessage);
}

if (dom.messageModalOverlay) {
    dom.messageModalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.messageModalOverlay) {
            hideMessage();
        }
    });
}

// Закриття по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideMessage();
    }
});

// ============================================================
// АУДІО СИСТЕМА (HTML5 Audio)
// ============================================================
function createMusicAudio() {
    if (state.musicAudio) return state.musicAudio;
    const audio = new Audio('fitness-music.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    state.musicAudio = audio;
    console.log('🔊 Аудіо створено: fitness-music.mp3');
    return audio;
}

function startMusic() {
    const audio = createMusicAudio();
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().then(() => {
        console.log('🎵 Музика грає!');
        updateTabMediaIndicator(true);
    }).catch((err) => {
        console.error('❌ Помилка відтворення музики:', err);
    });
}

function stopMusic() {
    if (state.musicAudio) {
        state.musicAudio.pause();
        state.musicAudio.currentTime = 0;
        console.log('🔇 Музика зупинена');
        updateTabMediaIndicator(false);
    }
}

function updateTabMediaIndicator(isPlaying) {
    const tabAudio = document.getElementById('tabAudioIndicator');
    if (!tabAudio) return;
    if (isPlaying) {
        tabAudio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
        tabAudio.play().catch(() => { });
    } else {
        tabAudio.pause();
        tabAudio.src = '';
    }
}

// ============================================================
// ТАЙМЕР ХАКАТОНУ
// ============================================================
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    dom.timerDisplay.textContent = formatTime(state.totalSeconds);
    if (state.totalSeconds <= 300) {
        dom.timerBox.classList.add('warning');
    }
}

function startGlobalTimer() {
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.totalSeconds--;
        updateTimerDisplay();
        if (state.totalSeconds <= 0) {
            clearInterval(state.timerInterval);
            showMessage('⏰ Час хакатону вичерпано! Переходьте до фіналу.');
            goToMission(5);
        }
    }, 1000);
}

// ============================================================
// ПЕРЕМИКАННЯ МІСІЙ
// ============================================================
function goToMission(missionIndex) {
    dom.missionScreens.forEach((screen) => screen.classList.remove('active'));

    let targetId;
    if (missionIndex === 'fitness') {
        targetId = null;
    } else {
        targetId = `mission${missionIndex}`;
    }

    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
        target.classList.add('active');
    }

    updateMissionTracker(missionIndex);
    updateNavActive(missionIndex);

    state.currentMission = missionIndex;

    if (missionIndex === 2) initMission2();
    if (missionIndex === 3) initMission3();
    if (missionIndex === 4) initMission4();
    if (missionIndex === 5) initMission5();
}

function updateMissionTracker(activeMission) {
    dom.missionDots.forEach((dot) => {
        const dotMission = dot.dataset.mission;
        dot.classList.remove('active', 'done');
        const activeIdx = missionOrder.indexOf(activeMission);
        const dotIdx = missionOrder.indexOf(dotMission === 'fitness' ? 'fitness' : parseInt(dotMission));
        if (dotIdx === activeIdx) dot.classList.add('active');
        else if (dotIdx < activeIdx) dot.classList.add('done');
    });

    dom.missionConnectors.forEach((conn, i) => {
        const activeIdx = missionOrder.indexOf(activeMission);
        if (i < activeIdx) conn.classList.add('done');
        else conn.classList.remove('done');
    });
}

function updateNavActive(missionIndex) {
    dom.navLinks.forEach((link) => {
        const linkMission = link.dataset.mission;
        link.classList.remove('active');
        if (
            (missionIndex === 'fitness' && linkMission === 'fitness') ||
            (typeof missionIndex === 'number' && parseInt(linkMission) === missionIndex)
        ) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// ВИБІР КОМАНДИ
// ============================================================
dom.teamBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const team = parseInt(btn.dataset.team);
        state.currentTeam = team;
        dom.teamBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        loadTeamData();
    });
});

function loadTeamData() {
    const data = teamData[state.currentTeam];
    if (dom.projectName) dom.projectName.value = data.projectName || '';
    if (dom.projectDesc) dom.projectDesc.value = data.projectDesc || '';
}

function saveTeamData() {
    teamData[state.currentTeam].projectName = dom.projectName?.value?.trim() || '';
    teamData[state.currentTeam].projectDesc = dom.projectDesc?.value?.trim() || '';
}

// ============================================================
// СТАРТ КВЕСТУ
// ============================================================
dom.startBtn?.addEventListener('click', () => {
    if (state.kvestStarted) return;
    state.kvestStarted = true;
    dom.startBtn.innerHTML = '<i class="fas fa-check"></i> Квест розпочато';
    dom.startBtn.disabled = true;
    startGlobalTimer();
    goToMission(1);
});

// ============================================================
// МІСІЯ 1: РОЗВІДКА
// ============================================================
dom.m1Btn?.addEventListener('click', () => {
    const name = dom.projectName?.value?.trim() || '';
    const desc = dom.projectDesc?.value?.trim() || '';

    if (!name || !desc) {
        showMessage('Будь ласка, заповніть і назву, і опис проєкту!');
        return;
    }

    saveTeamData();
    dom.mission1Result.style.display = 'block';
    dom.mission1Summary.textContent = `«${name}» — ${desc}`;
    dom.m1Btn.disabled = true;
    dom.m1Btn.innerHTML = '<i class="fas fa-check-circle"></i> Ідею зафіксовано';

    setTimeout(() => goToMission(2), 1500);
});

// ============================================================
// МІСІЯ 2: ПРОТОТИП (DRAG & DROP)
// ============================================================
const correctOrder = [
    { id: 'header', label: 'Хедер (шапка сайту)', emoji: '🔝' },
    { id: 'hero', label: 'Герой (головний банер)', emoji: '🌟' },
    { id: 'cards', label: 'Картки (інформаційні блоки)', emoji: '📋' },
    { id: 'form', label: 'Форма (зворотний зв\'язок)', emoji: '📝' },
    { id: 'footer', label: 'Футер (підвал сайту)', emoji: '🔻' },
];

let currentOrder = [];

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.every((item, i) => item.id === correctOrder[i].id)) {
        return shuffleArray(arr);
    }
    return shuffled;
}

function renderSortable() {
    currentOrder = shuffleArray(correctOrder);
    dom.sortableArea.innerHTML = '';

    currentOrder.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'sortable-item';
        div.draggable = true;
        div.dataset.id = item.id;
        div.dataset.index = index;
        div.innerHTML = `${item.emoji} <span>${item.label}</span>`;

        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('dragleave', handleDragLeave);
        div.addEventListener('drop', handleDrop);
        div.addEventListener('dragend', handleDragEnd);

        div.addEventListener('touchstart', handleTouchStart, { passive: false });
        div.addEventListener('touchmove', handleTouchMove, { passive: false });
        div.addEventListener('touchend', handleTouchEnd);

        dom.sortableArea.appendChild(div);
    });

    dom.m2Btn.disabled = true;
    dom.mission2Feedback.textContent = '↕️ Перетягніть блоки у правильному порядку';
    dom.mission2Feedback.style.color = 'var(--text-light)';
}

let draggedItem = null;
let draggedIndex = null;

function handleDragStart(e) {
    draggedItem = this;
    draggedIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (this !== draggedItem) this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    if (!draggedItem || draggedItem === this) return;

    const targetIndex = parseInt(this.dataset.index);
    [currentOrder[draggedIndex], currentOrder[targetIndex]] = [currentOrder[targetIndex], currentOrder[draggedIndex]];
    rebuildSortableFromOrder();
    checkMission2();
}

function handleDragEnd() {
    if (draggedItem) draggedItem.classList.remove('dragging');
    $$('.sortable-item').forEach((item) => item.classList.remove('drag-over'));
    draggedItem = null;
    draggedIndex = null;
}

let touchItem = null;

function handleTouchStart(e) {
    touchItem = this;
    this.classList.add('dragging');
}

function handleTouchMove(e) {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    $$('.sortable-item').forEach((item) => item.classList.remove('drag-over'));
    const elBelow = document.elementFromPoint(touchX, touchY);
    if (elBelow) {
        const sortableEl = elBelow.closest('.sortable-item');
        if (sortableEl && sortableEl !== touchItem) sortableEl.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    this.classList.remove('dragging');
    $$('.sortable-item').forEach((item) => item.classList.remove('drag-over'));
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    const elBelow = document.elementFromPoint(touchX, touchY);
    if (elBelow) {
        const sortableEl = elBelow.closest('.sortable-item');
        if (sortableEl && sortableEl !== touchItem) {
            const targetIndex = parseInt(sortableEl.dataset.index);
            const sourceIndex = parseInt(touchItem.dataset.index);
            [currentOrder[sourceIndex], currentOrder[targetIndex]] = [currentOrder[targetIndex], currentOrder[sourceIndex]];
            rebuildSortableFromOrder();
            checkMission2();
        }
    }
    touchItem = null;
}

function rebuildSortableFromOrder() {
    const items = $$('.sortable-item');
    items.forEach((item, i) => {
        const data = currentOrder[i];
        if (!data) return;
        item.dataset.id = data.id;
        item.dataset.index = i;
        item.innerHTML = `${data.emoji} <span>${data.label}</span>`;
        item.classList.remove('correct', 'incorrect', 'dragging', 'drag-over');
    });
}

function checkMission2() {
    const isCorrect = currentOrder.every((item, i) => item.id === correctOrder[i].id);
    const items = $$('.sortable-item');
    items.forEach((item, i) => {
        item.classList.remove('correct', 'incorrect');
        if (currentOrder[i] && currentOrder[i].id === correctOrder[i].id) {
            item.classList.add('correct');
        } else {
            item.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        dom.m2Btn.disabled = false;
        dom.mission2Feedback.textContent = '✅ Чудово! Макет зібрано у правильному порядку!';
        dom.mission2Feedback.style.color = 'var(--success)';
    } else {
        dom.m2Btn.disabled = true;
        dom.mission2Feedback.textContent = '❌ Не зовсім правильно. Хедер має бути першим, футер — останнім.';
        dom.mission2Feedback.style.color = 'var(--danger)';
    }
}

function initMission2() {
    renderSortable();
}

dom.m2Btn?.addEventListener('click', () => {
    dom.m2Btn.disabled = true;
    dom.m2Btn.innerHTML = '<i class="fas fa-check-circle"></i> Макет зібрано!';
    setTimeout(() => openFitness(), 1200);
});

// ============================================================
// ФІЗКУЛЬТХВИЛИНКА-ГРА (З МУЗИКОЮ)
// ============================================================
const shapes = [
    { emoji: '🔵', hint: 'Руки вгору!', name: 'circle' },
    { emoji: '🔺', hint: 'Присісти!', name: 'triangle', scale: 1.4 },
    { emoji: '⬛', hint: 'Нахилитися праворуч!', name: 'square-right' },
    { emoji: '⭐', hint: 'Стрибок!', name: 'star' },
    { emoji: '🟨', hint: 'Руки в сторони!', name: 'square-arms' },
    { emoji: '🔷', hint: 'Нахилитися ліворуч!', name: 'diamond-left' },
];

const fitnessPhases = [
    { name: 'Повільно 🐢', interval: 2500, showHint: true, duration: 20 },
    { name: 'Швидше 🐇', interval: 1500, showHint: true, duration: 20 },
    { name: 'Дуже швидко ⚡', interval: 800, showHint: true, duration: 20 },
];

let currentPhase = 0;
let phaseTimeLeft = 0;
let fitnessCountdownValue = 3;
let fitnessShapeInterval = null;

function openFitness() {
    state.fitnessActive = true;
    dom.fitnessOverlay.classList.add('active');
    dom.fitnessRules.style.display = 'block';
    dom.fitnessStartBtn.style.display = 'inline-block';
    dom.fitnessSkipBtn.style.display = 'none';
    dom.fitnessShape.style.display = 'none';
    dom.fitnessHint.style.display = 'none';
    dom.fitnessRound.textContent = '';
    dom.fitnessCountdown.textContent = '';
    currentPhase = 0;
    clearInterval(fitnessShapeInterval);
    stopMusic();
}

function closeFitness() {
    state.fitnessActive = false;
    dom.fitnessOverlay.classList.remove('active');
    clearInterval(fitnessShapeInterval);
    clearTimeout(state.fitnessTimeout);
    stopMusic();
    goToMission(3);
}

function startFitness() {
    // Зупиняємо все, що могло залишитися
    clearInterval(fitnessShapeInterval);
    clearTimeout(state.fitnessTimeout);
    stopMusic();

    dom.fitnessRules.style.display = 'none';
    dom.fitnessStartBtn.style.display = 'none';
    dom.fitnessSkipBtn.style.display = 'inline-block';
    dom.fitnessShape.style.display = 'block';
    dom.fitnessHint.style.display = 'block';

    fitnessCountdownValue = 3;
    dom.fitnessCountdown.textContent = fitnessCountdownValue;

    const countdownInterval = setInterval(() => {
        fitnessCountdownValue--;
        if (fitnessCountdownValue <= 0) {
            clearInterval(countdownInterval);
            if (!state.fitnessActive) {
                stopMusic();
                return;
            }
            dom.fitnessCountdown.textContent = 'ПОЇХАЛИ! 🎵';
            startMusic();
            state.fitnessTimeout = setTimeout(() => {
                if (!state.fitnessActive) {
                    stopMusic();
                    return;
                }
                dom.fitnessCountdown.textContent = '';
                runFitnessPhase();
            }, 800);
        } else {
            dom.fitnessCountdown.textContent = fitnessCountdownValue;
        }
    }, 800);
}

function runFitnessPhase() {
    if (currentPhase >= fitnessPhases.length) {
        stopMusic();
        closeFitness();
        return;
    }

    const phase = fitnessPhases[currentPhase];
    phaseTimeLeft = phase.duration;
    dom.fitnessRound.textContent = `Режим: ${phase.name}`;

    let shapeIndex = -1;

    const showRandomShape = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * shapes.length);
        } while (newIndex === shapeIndex && shapes.length > 1);
        shapeIndex = newIndex;

        const shape = shapes[shapeIndex];
        dom.fitnessShape.textContent = shape.emoji;
        dom.fitnessShape.style.animation = 'none';
        dom.fitnessShape.style.transform = shape.scale ? `scale(${shape.scale})` : 'scale(1)';
        void dom.fitnessShape.offsetWidth;
        dom.fitnessShape.style.animation = 'shapePop 0.4s ease';
        dom.fitnessHint.textContent = phase.showHint ? shape.hint : '';
    };

    showRandomShape();

    fitnessShapeInterval = setInterval(() => {
        phaseTimeLeft--;
        if (phaseTimeLeft <= 0) {
            clearInterval(fitnessShapeInterval);
            currentPhase++;
            runFitnessPhase();
            return;
        }
        showRandomShape();
    }, phase.interval);
}

dom.fitnessStartBtn?.addEventListener('click', startFitness);
dom.fitnessSkipBtn?.addEventListener('click', () => {
    clearInterval(fitnessShapeInterval);
    clearTimeout(state.fitnessTimeout);
    stopMusic();
    closeFitness();
});

// ============================================================
// МІСІЯ 3: РЕДАКТОР КОДУ
// ============================================================
const defaultTemplate = `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мій добрий проєкт</title>
    <style>
        :root {
            --primary: #0b2b3b;
            --accent: #ff6b2c;
            --bg: #f4f7fc;
            --text: #1e2a3e;
            --white: #ffffff;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
        }
        .header {
            background: var(--primary);
            color: var(--white);
            padding: 20px;
            text-align: center;
        }
        .hero {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #fff3e0, #ffe8cc);
        }
        .hero h1 {
            font-size: 2rem;
            color: var(--accent);
            margin-bottom: 10px;
        }
        .hero p {
            font-size: 1.1rem;
            color: #5d4037;
        }
        .content {
            max-width: 800px;
            margin: 30px auto;
            padding: 0 20px;
        }
        .card {
            background: var(--white);
            border-radius: 16px;
            padding: 20px;
            margin: 15px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .btn {
            display: inline-block;
            padding: 12px 28px;
            background: var(--accent);
            color: var(--white);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 10px;
        }
        .footer {
            background: var(--primary);
            color: #ccc;
            text-align: center;
            padding: 15px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>🌱 Назва вашого проєкту</h2>
    </div>
    <div class="hero">
        <h1>Допоможемо разом!</h1>
        <p>Опишіть тут вашу добру справу.</p>
        <!-- МІСІЯ: Вставте сюди гасло вашого проєкту -->
        <a href="#" class="btn">Підтримати</a>
    </div>
    <div class="content">
        <div class="card">
            <h3>📋 Про проєкт</h3>
            <p>Тут ви можете розповісти детальніше про вашу ініціативу.</p>
        </div>
        <div class="card">
            <h3>🤝 Як допомогти</h3>
            <p>Опишіть, як люди можуть долучитися до вашої справи.</p>
        </div>
    </div>
    <div class="footer">
        <p>© 2026 Ваш добрий проєкт</p>
    </div>
</body>
</html>`;

let mission3Completed = false;
let mission3Checked = { slogan: false, colors: false, title: false, text: false };

function checkMission3Tasks() {
    const code = dom.htmlCode?.value || '';

    // 1. Перевірка гасла: коментар МІСІЯ замінено
    mission3Checked.slogan = !code.includes('<!-- МІСІЯ');

    // 2. Перевірка кольорів: змінено хоча б одну CSS-змінну
    mission3Checked.colors = !code.includes('--primary: #0b2b3b') || !code.includes('--accent: #ff6b2c');

    // 3. Перевірка назви: змінено "Назва вашого проєкту"
    mission3Checked.title = !code.includes('Назва вашого проєкту');

    // 4. Перевірка тексту: змінено "Опишіть тут вашу добру справу"
    mission3Checked.text = !code.includes('Опишіть тут вашу добру справу.');

    const completed = Object.values(mission3Checked).filter(Boolean).length;
    const total = Object.keys(mission3Checked).length;

    // Оновлюємо індикатор виконання
    updateMission3Status(completed, total);

    return completed >= 3; // Достатньо 3 з 4 завдань
}

function updateMission3Status(completed, total) {
    const statusEl = document.getElementById('mission3Status');
    if (!statusEl) return;

    statusEl.innerHTML = `
        <div style="margin-top:15px; padding:15px; background:#f8f9fa; border-radius:14px;">
            <p style="font-weight:600; margin-bottom:10px;">📋 Виконано завдань: ${completed} з ${total}</p>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <span class="m3-task-badge ${mission3Checked.slogan ? 'done' : ''}">
                    ${mission3Checked.slogan ? '✅' : '⬜'} Гасло
                </span>
                <span class="m3-task-badge ${mission3Checked.colors ? 'done' : ''}">
                    ${mission3Checked.colors ? '✅' : '⬜'} Кольори
                </span>
                <span class="m3-task-badge ${mission3Checked.title ? 'done' : ''}">
                    ${mission3Checked.title ? '✅' : '⬜'} Назва
                </span>
                <span class="m3-task-badge ${mission3Checked.text ? 'done' : ''}">
                    ${mission3Checked.text ? '✅' : '⬜'} Текст
                </span>
            </div>
        </div>
    `;

    if (completed >= 3 && !mission3Completed) {
        dom.m3Btn.disabled = false;
    } else if (completed < 3) {
        dom.m3Btn.disabled = true;
    }
}

function initMission3() {
    mission3Completed = false;
    mission3Checked = { slogan: false, colors: false, title: false, text: false };
    dom.m3Btn.disabled = true;
    dom.m3Btn.innerHTML = '<i class="fas fa-check"></i> Код готовий (3+ завдання)';

    // Завантажуємо збережений код команди або шаблон за замовчуванням
    const savedCode = state.teamCode[state.currentTeam];
    if (dom.htmlCode) {
        dom.htmlCode.value = savedCode || defaultTemplate;
    }

    let statusEl = document.getElementById('mission3Status');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'mission3Status';
        dom.m3Btn.parentNode.insertBefore(statusEl, dom.m3Btn);
    }
    updateMission3Status(0, 4);
    updatePreview();
}

function updatePreview() {
    if (!dom.previewFrame || !dom.htmlCode) return;
    dom.previewFrame.srcdoc = dom.htmlCode.value;
}

dom.updatePreviewBtn?.addEventListener('click', updatePreview);

dom.htmlCode?.addEventListener('input', () => {
    // Зберігаємо код команди при кожній зміні
    state.teamCode[state.currentTeam] = dom.htmlCode.value;
    clearTimeout(dom.htmlCode._debounce);
    dom.htmlCode._debounce = setTimeout(() => {
        updatePreview();
        if (!mission3Completed) {
            checkMission3Tasks();
        }
    }, 600);
});

dom.m3Btn?.addEventListener('click', () => {
    if (mission3Completed) return;

    const completed = Object.values(mission3Checked).filter(Boolean).length;

    if (completed < 3) {
        const missing = [];
        if (!mission3Checked.slogan) missing.push('• Знайти коментар <!-- МІСІЯ --> в блоці hero і замінити його на гасло проєкту');
        if (!mission3Checked.colors) missing.push('• Змінити кольори в :root (--primary або --accent)');
        if (!mission3Checked.title) missing.push('• Змінити "Назва вашого проєкту" на свою');
        if (!mission3Checked.text) missing.push('• Змінити текст "Опишіть тут вашу добру справу" на свій опис');

        showMessage('⚠️ Виконайте хоча б 3 завдання з 4:\n\n' + missing.join('\n'));
        return;
    }

    mission3Completed = true;
    dom.m3Btn.disabled = true;
    dom.m3Btn.innerHTML = '<i class="fas fa-check-circle"></i> Код готовий!';
    updatePreview();
    setTimeout(() => goToMission(4), 1500);
});

// ============================================================
// МІСІЯ 4: ТЕСТУВАННЯ
// ============================================================
function initMission4() {
    state.checklistChecked = 0;
    dom.m4Btn.disabled = true;
    $$('#checklist li').forEach((item) => {
        item.classList.remove('checked');
        const icon = item.querySelector('i');
        if (icon) icon.className = 'far fa-square';
    });

    // Показуємо свою сторінку в табі «Наша сторінка»
    const myCode = state.teamCode[state.currentTeam] || '<p style="padding:40px;text-align:center;color:#999;">⏳ Сторінка ще не створена</p>';
    const myFrame = document.getElementById('myPagePreview');
    if (myFrame) myFrame.srcdoc = myCode;

    // Активуємо таб «Наша сторінка» за замовчуванням
    switchTab('tab-my-page');

    // Ініціалізуємо кнопки табів
    initTabButtons();
}

function switchTab(tabId) {
    // Деактивуємо всі таби
    $$('.tab-btn').forEach(btn => btn.classList.remove('active'));
    $$('.tab-content').forEach(content => content.classList.remove('active'));

    // Активуємо вибраний
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function initTabButtons() {
    $$('.tab-btn').forEach(btn => {
        // Видаляємо старі обробники, щоб не дублювалися
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            const tabId = newBtn.dataset.tab;
            switchTab(tabId);
        });
    });
}

dom.checklist?.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    li.classList.toggle('checked');
    const icon = li.querySelector('i');
    if (!icon) return;
    if (li.classList.contains('checked')) {
        icon.className = 'far fa-check-square';
        state.checklistChecked++;
    } else {
        icon.className = 'far fa-square';
        state.checklistChecked--;
    }
    const totalItems = $$('#checklist li').length;
    dom.m4Btn.disabled = state.checklistChecked < totalItems;
});

dom.m4Btn?.addEventListener('click', () => {
    dom.m4Btn.disabled = true;
    dom.m4Btn.innerHTML = '<i class="fas fa-check-circle"></i> Тестування завершено!';
    setTimeout(() => goToMission(5), 1500);
});
// ============================================================
// МІСІЯ 5: ФІНАЛ
// ============================================================
function initMission5() {
    state.presentationSeconds = 60;
    dom.presentTimer.textContent = '1:00';
    dom.presentTimer.classList.remove('warning');
    dom.presTimerBtn.disabled = false;
    dom.presTimerBtn.innerHTML = '<i class="fas fa-play"></i> Запустити таймер презентації';
    clearInterval(state.presentationTimer);
}

function startPresentationTimer() {
    state.presentationSeconds = 60;
    dom.presentTimer.textContent = '1:00';
    dom.presentTimer.classList.remove('warning');
    dom.presTimerBtn.disabled = true;
    dom.presTimerBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Іде презентація...';
    clearInterval(state.presentationTimer);

    state.presentationTimer = setInterval(() => {
        state.presentationSeconds--;
        const mins = Math.floor(state.presentationSeconds / 60);
        const secs = state.presentationSeconds % 60;
        dom.presentTimer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        if (state.presentationSeconds <= 10) dom.presentTimer.classList.add('warning');
        if (state.presentationSeconds <= 0) {
            clearInterval(state.presentationTimer);
            dom.presentTimer.textContent = '0:00';
            dom.presTimerBtn.textContent = '✅ Час вичерпано';
            dom.presTimerBtn.disabled = true;
            showMessage('⏰ Хвилина презентації завершилась!');
        }
    }, 1000);
}

dom.presTimerBtn?.addEventListener('click', startPresentationTimer);

dom.finishBtn?.addEventListener('click', () => {
    clearInterval(state.presentationTimer);
    clearInterval(state.timerInterval);
    stopMusic();
    finishKvest();
});

function finishKvest() {
    const data = teamData[state.currentTeam];
    dom.certProjectName.textContent = data.projectName || 'Добрий проєкт';
    dom.certMessage.textContent = data.projectDesc
        ? `Ваш проєкт «${data.projectName}» — це чудовий приклад того, як технології можуть служити добру!`
        : 'Ви успішно пройшли всі місії Квітневого хакатону добра!';
    dom.finishModal.classList.add('active');
}

dom.reloadBtn?.addEventListener('click', () => location.reload());

// ============================================================
// НАВІГАЦІЯ
// ============================================================
dom.navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const mission = link.dataset.mission;
        if (mission === 'fitness') {
            if (typeof state.currentMission === 'number' && state.currentMission >= 2) {
                openFitness();
            } else {
                showMessage('🔒 Руханка ще не відкрита! Спочатку виконайте Місії 1 та 2.');
            }
            return;
        }
        const missionNum = parseInt(mission);
        const currentNum = typeof state.currentMission === 'number' ? state.currentMission : 3;
        if (missionNum <= currentNum) goToMission(missionNum);
        else showMessage('🔒 Ця місія ще не відкрита! Виконайте попередні завдання.');
    });
});

// ============================================================
// ІНІЦІАЛІЗАЦІЯ
// ============================================================
function init() {
    goToMission(0);
    updateMissionTracker(0);
    console.log('🌸 Квітневий хакатон добра завантажено!');
    console.log('💖 Робіть добро, і воно повернеться!');
    console.log('🎮 Квест готовий. Оберіть команду та натисніть "Розпочати квест".');
    console.log('🎵 Музика для фізкультхвилинки: fitness-music.mp3');
}

init();