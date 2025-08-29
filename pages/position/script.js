// Ініціалізація всіх демо
document.addEventListener('DOMContentLoaded', function () {
    initRelativeDemo();
    initAbsoluteDemo();
    initFixedDemo();
    hljs.highlightAll();
});

// Relative Demo
function initRelativeDemo() {
    const topSlider = document.getElementById('relative-top');
    const leftSlider = document.getElementById('relative-left');
    const demoElement = document.getElementById('relative-demo');
    const codeElement = document.getElementById('relative-code');

    function updateRelativeDemo() {
        const topValue = topSlider.value + 'px';
        const leftValue = leftSlider.value + 'px';

        demoElement.style.top = topValue;
        demoElement.style.left = leftValue;

        document.getElementById('relative-top-value').textContent = topValue;
        document.getElementById('relative-left-value').textContent = leftValue;

        updateCode(codeElement, 'relative', { top: topValue, left: leftValue });
    }

    topSlider.addEventListener('input', updateRelativeDemo);
    leftSlider.addEventListener('input', updateRelativeDemo);
    updateRelativeDemo();
}

// Absolute Demo
function initAbsoluteDemo() {
    const topSlider = document.getElementById('absolute-top');
    const rightSlider = document.getElementById('absolute-right');
    const demoElement = document.getElementById('absolute-demo');
    const codeElement = document.getElementById('absolute-code');

    function updateAbsoluteDemo() {
        const topValue = topSlider.value + 'px';
        const rightValue = rightSlider.value + 'px';

        demoElement.style.top = topValue;
        demoElement.style.right = rightValue;

        document.getElementById('absolute-top-value').textContent = topValue;
        document.getElementById('absolute-right-value').textContent = rightValue;

        updateCode(codeElement, 'absolute', { top: topValue, right: rightValue });
    }

    topSlider.addEventListener('input', updateAbsoluteDemo);
    rightSlider.addEventListener('input', updateAbsoluteDemo);
    updateAbsoluteDemo();
}

// Fixed Demo - імітація
function initFixedDemo() {
    const bottomSlider = document.getElementById('fixed-bottom');
    const rightSlider = document.getElementById('fixed-right');
    const demoElement = document.getElementById('fixed-demo');
    const codeElement = document.getElementById('fixed-code');
    const scrollContent = document.querySelector('.fixed-container .scroll-content');

    function updateFixedDemo() {
        const bottomValue = bottomSlider.value + 'px';
        const rightValue = rightSlider.value + 'px';

        // Для імітації fixed використовуємо absolute всередині scroll контейнера
        demoElement.style.bottom = bottomValue;
        demoElement.style.right = rightValue;

        document.getElementById('fixed-bottom-value').textContent = bottomValue;
        document.getElementById('fixed-right-value').textContent = rightValue;

        updateCode(codeElement, 'fixed', { bottom: bottomValue, right: rightValue });
    }

    // Додаємо обробник прокрутки для демонстрації "фіксованості"
    scrollContent.addEventListener('scroll', function () {
        // Оновлюємо положення при прокрутці
        demoElement.style.bottom = bottomSlider.value + 'px';
        demoElement.style.right = rightSlider.value + 'px';
    });

    bottomSlider.addEventListener('input', updateFixedDemo);
    rightSlider.addEventListener('input', updateFixedDemo);
    updateFixedDemo();
}

// Допоміжна функція для оновлення коду
function updateCode(codeElement, positionType, properties) {
    let cssCode = `#element {\n  position: ${positionType};`;

    for (const [prop, value] of Object.entries(properties)) {
        cssCode += `\n  ${prop}: ${value};`;
    }

    cssCode += '\n}';

    codeElement.textContent = cssCode;
    hljs.highlightElement(codeElement);
}