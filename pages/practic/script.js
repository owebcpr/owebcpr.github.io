function switchTab(tab) {
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelector('.tabs button:nth-child(' + (tab === 'html' ? 1 : 2) + ')').classList.add('active');
    document.getElementById(tab + '-tab').classList.add('active');
}

function runCode() {
    const html = document.getElementById('html-code').value;
    const css = document.getElementById('css-code').value;
    const iframe = document.getElementById('result');
    iframe.srcdoc = html.replace('</head>', '<style>' + css + '</style></head>');
}