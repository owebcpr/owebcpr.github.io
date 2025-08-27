function loadBackground() {
    const imageUrl = document.getElementById('bg-image').value.trim();

    if (imageUrl) {
        updateBackground();
    } else {
        alert('Будь ласка, введіть посилання на зображення');
    }
}

function updateBackground() {
    const imageUrl = document.getElementById('bg-image').value.trim();
    const preview = document.getElementById('background-preview');
    const size = document.getElementById('bg-size').value;
    const position = document.getElementById('bg-position').value;
    const repeat = document.getElementById('bg-repeat').value;

    if (imageUrl) {
        preview.style.backgroundImage = `url('${imageUrl}')`;
        preview.style.backgroundSize = size;
        preview.style.backgroundPosition = position;
        preview.style.backgroundRepeat = repeat;
        preview.innerHTML = '';

        // Оновлюємо код
        updateGeneratedCode(imageUrl, size, position, repeat);
    }
}

function updateGeneratedCode(imageUrl, size, position, repeat) {
    const codeElement = document.getElementById('css-code');
    const code = `#your-element {
  background-image: url('${imageUrl}');
  background-size: ${size};
  background-position: ${position};
  background-repeat: ${repeat};
}`;

    codeElement.textContent = code;
    hljs.highlightElement(codeElement);
}

function setExampleBackground(imageUrl) {
    document.getElementById('bg-image').value = imageUrl;
    loadBackground();
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', function () {
    // Додаємо обробник події для Enter в полі вводу
    document.getElementById('bg-image').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            loadBackground();
        }
    });

    // Підсвічуємо код при завантаженні
    hljs.highlightAll();
});