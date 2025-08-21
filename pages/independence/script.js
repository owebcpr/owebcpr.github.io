// --- Інтерактив 1: Пазл ---
// Визначаємо: чи це пристрій з "грубим" покажчиком (переважно телефони/планшети)
const isTouchLike = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchLike) {
    const symbols = document.querySelectorAll(".draggable");
    const mapZone = document.getElementById("mapZone");
    const result = document.getElementById("result");

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
            // неправильні на карту не додаємо
            result.innerText = "Це не символ України ❌";
            result.style.color = "red";
        }
    });
}


const canvas = document.getElementById("flagCanvas");
const canvasBlock = document.getElementById("canvas-block");
const infoBlock = document.getElementById("info-block");
const canvasInfo = document.getElementById("canvas-info");
const ctx = canvas.getContext("2d");
let painting = false;

// Функция для определения типа устройства
function isTouchDevice() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

// Проверка устройства и показ соответствующего блока
function checkDevice() {
    if (isTouchDevice()) {
        // Это мобильное устройство или планшет
        canvasBlock.style.display = "none";
        infoBlock.style.display = "block";
        canvasInfo.style.display = "block";
    } else {
        // Это компьютер
        canvasBlock.style.display = "block";
        infoBlock.style.display = "none";
        canvasInfo.style.display = "none";

        // Инициализируем canvas только для компьютеров
        initCanvas();
    }
}

// Инициализация canvas (только для компьютеров)
function initCanvas() {
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
        ctx.lineWidth = document.getElementById("brushSize").value;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("colorPicker").value;

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    // Добавляем обработчики событий
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mouseleave", endPosition);
    canvas.addEventListener("mousemove", draw);

    // Очистити
    document.getElementById("clearCanvas").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Зберегти
    document.getElementById("saveCanvas").addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "prapor-moieyi-mrii.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// Проверяем устройство при загрузке страницы
document.addEventListener("DOMContentLoaded", checkDevice);

// Также проверяем при изменении размера окна (на случай изменения ориентации)
window.addEventListener("resize", checkDevice);