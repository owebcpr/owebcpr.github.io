const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    dropzone.appendChild(dragging);
  });
});

function checkAnswers() {
  let correct = 0;
  let total = draggables.length;

  dropzones.forEach(zone => {
    const answer = zone.id;
    [...zone.children].forEach(child => {
      if (child.dataset.answer === answer) {
        child.classList.add('correct');
        correct++;
      } else {
        child.classList.add('incorrect');
      }
    });
  });

  document.getElementById('result').textContent =
    `Правильних відповідей: ${correct} з ${total}`;
}