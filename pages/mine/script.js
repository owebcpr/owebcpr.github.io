const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) zone.appendChild(dragging);
  });
});

function checkDragDrop() {
  let result = "";
  const safe = document.querySelector('.dropzone[data-type="safe"]').innerText;
  const unsafe = document.querySelector('.dropzone[data-type="unsafe"]').innerText;

  let correct = 0;

  if (safe.includes("Повідомити дорослих")) correct++;
  if (safe.includes("Обійти місце")) correct++;
  if (unsafe.includes("Доторкнутися до незнайомого предмета")) correct++;
  if (unsafe.includes("Сфотографувати міну")) correct++;
  if (unsafe.includes("Гратися з дивним металевим предметом")) correct++;

  result = "Правильних відповідей: " + correct + " з 5";

  document.getElementById('dragResult').innerText = result;
}