// Drag & Drop
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');
let droppedCorrect = 0;

cards.forEach(card => {
    card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('type', card.dataset.type);
        e.dataTransfer.setData('text', card.textContent);
        e.target.classList.add('dragging');
    });
    card.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
    });
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.style.background = "#d0f0ff";
    });
    zone.addEventListener('dragleave', e => {
        zone.style.background = "#f0f8ff";
    });
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.style.background = "#f0f8ff";
        const type = e.dataTransfer.getData('type');
        const text = e.dataTransfer.getData('text');
        const card = document.querySelector(`.card.dragging`);
        if (card) {
            zone.appendChild(card);
        }
    });
});

function checkLevel1() {
    const zones = document.querySelectorAll('.dropzone');
    let correct = true;
    zones.forEach(zone => {
        const expected = zone.dataset.accept;
        zone.querySelectorAll('.card').forEach(c => {
            if (c.dataset.type !== expected) {
                correct = false;
            }
        });
    });
    const result = document.getElementById('result1');
    if (correct) {
        result.textContent = "✅ Молодець! Ти правильно розподілив предмети!";
        setTimeout(() => {
            document.getElementById('level1').style.display = "none";
            document.getElementById('level2').style.display = "block";
        }, 1500);
    } else {
        result.textContent = "❌ Є помилки. Спробуй ще раз!";
    }
}

function nextLevel(level, wrongChoice) {
    const result = document.getElementById(`result${level}`);
    if (wrongChoice) {
        result.textContent = "❌ Це небезпечний шлях. Подумай уважніше!";
    } else {
        result.textContent = "✅ Правильно! Це безпечний маршрут.";
        setTimeout(() => {
            document.getElementById('level2').style.display = "none";
            document.getElementById('level3').style.display = "block";
        }, 1500);
    }
}

function finishGame(correct) {
    const result = document.getElementById('result3');
    if (correct) {
        result.textContent = "✅ Правильна відповідь!";
        setTimeout(() => {
            document.getElementById('level3').style.display = "none";
            document.getElementById('level4').style.display = "block";
        }, 1500);
    } else {
        result.textContent = "❌ Це небезпечно! Подумай ще.";
    }
}

function nextLevel4(correct) {
    const result = document.getElementById('result4');
    if (correct) {
        result.textContent = "✅ Правильно! Це знак мінної небезпеки.";
        setTimeout(() => {
            document.getElementById('level4').style.display = "none";
            document.getElementById('level5').style.display = "block";
        }, 1500);
    } else {
        result.textContent = "❌ Ні, цей знак означає інше. Подумай!";
    }
}

function finishGameExtra(correct) {
    const result = document.getElementById('result5');
    if (correct) {
        result.textContent = "✅ Молодець! Це найправильніше рішення!";
        setTimeout(() => {
            document.getElementById('level5').style.display = "none";
            document.getElementById('final').style.display = "block";
        }, 1500);
    } else {
        result.textContent = "❌ Це небезпечно! Спробуй ще!";
    }
}