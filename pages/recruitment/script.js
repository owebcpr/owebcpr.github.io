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
    zone.appendChild(dragging);
  });
});

function checkDragDrop() {
  let result = "";
  const safe = document.querySelector('.dropzone[data-type="safe"]').innerText;
  const unsafe = document.querySelector('.dropzone[data-type="unsafe"]').innerText;

  let correct = 0;

  if (safe.includes("Поговорити з батьками")) correct++;
  if (safe.includes("Використовувати нікнейм")) correct++;
  if (unsafe.includes("Додати в друзі незнайомця")) correct++;
  if (unsafe.includes("Розкрити свій номер")) correct++;
  if (unsafe.includes("Виконувати \"завдання\"")) correct++;

  result = "Правильних відповідей: " + correct + " з 5";

  document.querySelector('#dragResult').innerText = result;
}