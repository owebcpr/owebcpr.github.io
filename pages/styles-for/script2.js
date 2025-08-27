const htmlTextarea = document.getElementById('htmlCode');
const cssTextarea = document.getElementById('cssCode');
const iframe = document.getElementById('preview');
const tabs = document.querySelectorAll('.tab-btn');

function switchTab(tab) {
    tabs.forEach(btn => btn.classList.remove('active'));
    if (tab === 'html') {
        htmlTextarea.style.display = 'block';
        cssTextarea.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        htmlTextarea.style.display = 'none';
        cssTextarea.style.display = 'block';
        tabs[1].classList.add('active');
    }
    updatePreview();
}

function updatePreview() {
    const html = htmlTextarea.value;
    const css = `<style>${cssTextarea.value}</style>`;
    const content = css + html;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
}

htmlTextarea.addEventListener('input', updatePreview);
cssTextarea.addEventListener('input', updatePreview);

updatePreview();