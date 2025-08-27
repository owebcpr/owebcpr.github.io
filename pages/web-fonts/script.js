function switchTab(tabName) {
    const htmlTab = document.querySelector('.tab-btn:nth-child(1)');
    const cssTab = document.querySelector('.tab-btn:nth-child(2)');
    const htmlCode = document.getElementById('htmlCode');
    const cssCode = document.getElementById('cssCode');

    if (tabName === 'html') {
        htmlTab.classList.add('active');
        cssTab.classList.remove('active');
        htmlCode.style.display = 'block';
        cssCode.style.display = 'none';
    } else {
        cssTab.classList.add('active');
        htmlTab.classList.remove('active');
        htmlCode.style.display = 'none';
        cssCode.style.display = 'block';
    }

    updatePreview();
}

function updatePreview() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const preview = document.getElementById('preview');

    const previewDoc = preview.contentDocument || preview.contentWindow.document;

    previewDoc.open();
    previewDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        </html>
    `);
    previewDoc.close();
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    // Встановлюємо початковий стан - показуємо тільки HTML
    const htmlTab = document.querySelector('.tab-btn:nth-child(1)');
    const cssTab = document.querySelector('.tab-btn:nth-child(2)');
    const htmlCode = document.getElementById('htmlCode');
    const cssCode = document.getElementById('cssCode');

    htmlTab.classList.add('active');
    cssTab.classList.remove('active');
    htmlCode.style.display = 'block';
    cssCode.style.display = 'none';

    updatePreview();

    // Оновлення прев'ю при зміні коду
    document.getElementById('htmlCode').addEventListener('input', updatePreview);
    document.getElementById('cssCode').addEventListener('input', updatePreview);
});