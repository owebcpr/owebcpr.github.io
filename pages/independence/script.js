// --- Інтерактив 1: Пазл ---
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
    const isCorrect = e.dataTransfer.getData("text");
    const imgSrc = e.dataTransfer.getData("id");

    const droppedImg = document.createElement("img");
    droppedImg.src = imgSrc;
    droppedImg.style.width = "50px";
    droppedImg.style.position = "absolute";
    droppedImg.style.left = (e.offsetX - 25) + "px";
    droppedImg.style.top = (e.offsetY - 25) + "px";
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
});


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