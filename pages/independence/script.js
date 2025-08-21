// --- Інтерактив 1: Пазл ---
const symbols = document.querySelectorAll(".draggable");
const mapZone = document.getElementById("mapZone");
const result = document.getElementById("result");

let correctCount = 0;
const totalCorrect = document.querySelectorAll(".draggable[data-correct='true']").length;

// ---- Для миші (стандартний drag&drop) ----
symbols.forEach(symbol => {
    symbol.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", e.target.dataset.correct);
        e.dataTransfer.setData("id", e.target.src);
    });
});

mapZone.addEventListener("dragover", e => e.preventDefault());

mapZone.addEventListener("drop", e => {
    e.preventDefault();
    handleDrop(e.offsetX, e.offsetY, e.dataTransfer.getData("text"), e.dataTransfer.getData("id"));
});

// ---- Для телефону (touch events) ----
symbols.forEach(symbol => {
    symbol.addEventListener("touchstart", e => {
        const touch = e.touches[0];
        symbol.dataset.dragging = "true";
        symbol.dataset.startX = touch.clientX;
        symbol.dataset.startY = touch.clientY;
    });

    symbol.addEventListener("touchmove", e => {
        const touch = e.touches[0];
        const elem = e.target;

        elem.style.position = "absolute";
        elem.style.left = (touch.pageX - elem.width / 2) + "px";
        elem.style.top = (touch.pageY - elem.height / 2) + "px";
        elem.style.zIndex = 1000;
    });

    symbol.addEventListener("touchend", e => {
        const touch = e.changedTouches[0];
        const rect = mapZone.getBoundingClientRect();

        // Перевіряємо, чи відпустили ПАЛЕЦЬ на карті
        if (
            touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom
        ) {
            handleDrop(
                touch.clientX - rect.left,
                touch.clientY - rect.top,
                symbol.dataset.correct,
                symbol.src
            );
        }

        // Повертаємо елемент на місце
        symbol.style.position = "";
        symbol.style.left = "";
        symbol.style.top = "";
        symbol.style.zIndex = "";
        symbol.dataset.dragging = "false";
    });
});

// ---- Функція для вставки картинки ----
function handleDrop(x, y, isCorrect, imgSrc) {
    const droppedImg = document.createElement("img");
    droppedImg.src = imgSrc;
    droppedImg.style.width = "50px";
    droppedImg.style.position = "absolute";
    droppedImg.style.left = (x - 25) + "px";
    droppedImg.style.top = (y - 25) + "px";
    mapZone.appendChild(droppedImg);

    if (isCorrect === "true") {
        correctCount++;
        result.innerText = "Молодець! Ти додав символ України ✅ (" + correctCount + "/" + totalCorrect + ")";
        result.style.color = "green";

        if (correctCount === totalCorrect) {
            setTimeout(() => {
                result.innerText = "Вітаємо! Ти зібрав усі символи України!";
                result.style.color = "#0057b7";
                result.style.fontWeight = "bold";
            }, 500);
        }
    } else {
        result.innerText = "Це не символ України ❌";
        result.style.color = "red";
    }
}

// --- Інтерактив 2: Прапор ---
const canvas = document.getElementById("flagCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = document.getElementById("brushSize").value;
    ctx.lineCap = "round";
    ctx.strokeStyle = document.getElementById("colorPicker").value;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Очистити
document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Зберегти
document.getElementById("saveCanvas").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "prapor-moieyi-mrii.png";
    link.href = canvas.toDataURL();
    link.click();
});