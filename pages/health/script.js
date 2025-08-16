function checkQuiz() {
      const questions = [
        {name: 'q1', correct: 'q1a'},
        {name: 'q2', correct: 'q2a'},
        {name: 'q3', correct: 'q3a'},
        {name: 'q4', correct: 'q4a'},
        {name: 'q5', correct: 'q5a'}
      ];
      let score = 0;
      questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.name}"]:checked`);
        if(selected) {
          const label = selected.nextElementSibling;
          if(selected.id === q.correct) {
            label.classList.add('answer', 'correct');
            score++;
          } else {
            label.classList.add('answer', 'wrong');
          }
        }
      });
      const resultDiv = document.getElementById('quizResult');
      resultDiv.innerHTML = `<p>Ваш результат: ${score} з ${questions.length}</p>`;
    }