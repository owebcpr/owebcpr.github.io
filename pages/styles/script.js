function runCode() {
    const editor = document.querySelector('#editor');
    const code = editor.value;

    if (code.includes('<style') || code.includes('<script')) {
        alert('Вставка <style> та <script> заборонена з міркувань безпеки.');
        return;
    }

    document.querySelector('#output').innerHTML = code;
}