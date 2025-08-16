function checkQuiz() {
  const answers = {
    q1: 'b',
    q2: 'b',
    q3: 'a',
    q4: 'b',
    q5: 'b',
    q6: 'b'
  };

  let score = 0;
  const form = document.querySelector('#quizForm');
  const resultDiv = document.querySelector('#result');

  // Очистити попереднє підсвічування
  form.querySelectorAll('label').forEach(label => {
    label.style.backgroundColor = '';
    label.style.padding = '';
    label.style.borderRadius = '';
  });

  for (let key in answers) {
    const options = form.querySelectorAll(`input[name="${key}"]`);
    options.forEach(option => {
      const label = option.parentElement;
      if (option.value === answers[key]) {
        label.style.backgroundColor = '#c8e6c9'; // зелений для правильної відповіді
        label.style.borderRadius = '5px';
        label.style.padding = '2px 5px';
      }
      if (option.checked && option.value !== answers[key]) {
        label.style.backgroundColor = '#ffcdd2'; // червоний для неправильної відповіді
        label.style.borderRadius = '5px';
        label.style.padding = '2px 5px';
      }
    });
    const selected = form.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === answers[key]) {
      score++;
    }
  }

  if (score === Object.keys(answers).length) {
    resultDiv.textContent = `Вітаємо! Ви відповіли правильно на всі ${score} з ${Object.keys(answers).length} питань! 🎉`;
    resultDiv.className = 'result correct';
  } else {
    resultDiv.textContent = `Ви дали ${score} правильних відповідей з ${Object.keys(answers).length}. Подивіться, де помилка, та спробуйте ще раз! 💪`;
    resultDiv.className = 'result incorrect';
  }
}