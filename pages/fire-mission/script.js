function checkAnswer(button, correct, level) {
    if (correct) {
        button.classList.add("correct");
        setTimeout(() => {
            document.getElementById("level" + level).classList.remove("active");
            document.getElementById("level" + (level + 1)).classList.add("active");
        }, 800);
    } else {
        button.classList.add("wrong");
    }
}

// Drag & Drop
const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(el => {
    el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("id", el.id);
    });
});

dropzones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", e => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const item = document.getElementById(id);
        zone.appendChild(item);
    });
});

function finishGame() {
    document.querySelectorAll(".level").forEach(l => l.classList.remove("active"));
    document.getElementById("final").classList.add("active");
}