function checkAnswer(button, isCorrect) {
      if (isCorrect) {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
      // Disable all buttons in the same question
      const buttons = button.parentElement.querySelectorAll("button");
      buttons.forEach(btn => btn.disabled = true);
    }
    
const pairs = [
      ['Се', 'Це'],
      ['Вельми', 'Дуже'],
      ['Сяєво', 'Світло'],
      ['Бранці', 'Полонені'],
      ['Лан', 'Поле'],
      ['Вітрила', 'Паруси']
    ];

    let selected = [];
    let matchedPairs = 0;

    const gameBoard = document.getElementById('gameBoard');
    const resultMessage = document.getElementById('resultMessage');

    const shuffledCards = pairs.flat().sort(() => 0.5 - Math.random());

    shuffledCards.forEach(text => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.textContent = text;
      div.dataset.value = text;
      gameBoard.appendChild(div);
    });

    gameBoard.addEventListener('click', e => {
      const card = e.target;
      if (!card.classList.contains('card') || card.classList.contains('matched') || card.classList.contains('selected')) return;

      card.classList.add('selected');
      selected.push(card);

      if (selected.length === 2) {
        const [first, second] = selected;
        const isMatch = pairs.some(([a, b]) =>
          (a === first.dataset.value && b === second.dataset.value) ||
          (b === first.dataset.value && a === second.dataset.value)
        );

        if (isMatch) {
          first.classList.add('matched');
          second.classList.add('matched');
          matchedPairs++;
          if (matchedPairs === pairs.length) {
            resultMessage.textContent = 'Вітаємо! Ви знайшли всі пари!';
          }
        } else {
          setTimeout(() => {
            first.classList.remove('selected');
            second.classList.remove('selected');
          }, 800);
        }

        selected = [];
      }
    });