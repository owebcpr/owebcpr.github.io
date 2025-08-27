// Готові пресети трансформацій
// Готові пресети трансформацій
const presets = {
    translate: "transform: translate(50px, 30px);",
    rotate: "transform: rotate(45deg);",
    scale: "transform: scale(1.5);",
    skew: "transform: skew(20deg, 10deg);",
    combine: "transform: translate(40px, 20px) rotate(30deg) scale(1.2) skew(5deg, 5deg);"
};

function applyPreset(presetName) {
    const preset = presets[presetName];
    if (preset) {
        // Отримуємо тільки значення transform
        const transformValue = preset.replace('transform:', '').replace(';', '').trim();
        applyTransform(transformValue);

        // Оновлюємо текстове поле
        document.getElementById('custom-transform').value = `transform: ${transformValue};`;
    }
}

function applyCustomTransform() {
    const customCode = document.getElementById('custom-transform').value.trim();

    if (!customCode) {
        alert('Будь ласка, введіть CSS код');
        return;
    }

    // Вилучаємо значення transform з коду
    const transformMatch = customCode.match(/transform:\s*(.*?)(;|$)/i);
    if (transformMatch && transformMatch[1]) {
        applyTransform(transformMatch[1].trim());
    } else {
        // Спробуємо інтерпретувати як чисте значення transform
        if (customCode.includes('(') || customCode.includes('deg') || customCode.includes('px')) {
            applyTransform(customCode);
        } else {
            alert('Будь ласка, введіть коректний CSS код з властивістю transform\nНаприклад: translate(50px) rotate(45deg)');
        }
    }
}

function clearCustomTransform() {
    document.getElementById('custom-transform').value = '';
}

function applyTransform(transformValue) {
    const preview = document.getElementById('transform-preview');
    const codeElement = document.getElementById('css-code');

    // Застосовуємо трансформацію
    preview.style.transform = transformValue;

    // Оновлюємо код
    const cssCode = `#element {
  transform: ${transformValue};
}`;

    codeElement.textContent = cssCode;
    hljs.highlightElement(codeElement);
}

function resetTransform() {
    const preview = document.getElementById('transform-preview');
    const codeElement = document.getElementById('css-code');
    const textarea = document.getElementById('custom-transform');

    // Скидаємо трансформацію
    preview.style.transform = 'none';
    textarea.value = '';

    // Оновлюємо код
    const cssCode = `#element {
  transform: none;
}`;

    codeElement.textContent = cssCode;
    hljs.highlightElement(codeElement);
}

// Додаємо обробник для клавіші Enter
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('custom-transform');

    // Видаляємо старий обробник oninput з HTML
    textarea.removeAttribute('oninput');

    // Додаємо новий обробник для Enter
    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            applyCustomTransform();
        }
    });

    // Підсвічуємо код при завантаженні
    hljs.highlightAll();
});