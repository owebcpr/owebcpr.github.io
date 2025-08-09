function checkAnswer(element, isCorrect) {
      const options = element.parentElement.querySelectorAll('.quiz-option');
      options.forEach(opt => opt.style.pointerEvents = 'none');
      if (isCorrect) {
        element.classList.add('correct');
      } else {
        element.classList.add('incorrect');
      }
    }

const wordPairs = [
  { word: "окрайок", meanings: ["Маленький шматок хліба з краю", "Старовинна монета", "Назва жіночої прикраси"], correct: 0 },
  { word: "кочергá", meanings: ["Металева палка для печі", "Старовинна одиниця довжини", "Невеликий човен"], correct: 0 },
  { word: "молодиця", meanings: ["Молода заміжня жінка", "Дівчина, що ворожить", "Хатня робітниця"], correct: 0 },
  { word: "божниця", meanings: ["Домашній куточок з іконами", "Храм язичницький", "Місце для обрядів"], correct: 0 },
  { word: "вежа", meanings: ["Оборонна споруда", "Стара міра ваги", "Слово, що означає «пильність»"], correct: 0 },
  { word: "торок", meanings: ["Шкіряна прикраса до пояса", "Дерев’яна миска", "Низький табурет"], correct: 0 },
];

const container = document.getElementById("match-game");

wordPairs.forEach((pair, index) => {
  const block = document.createElement("div");
  block.style.marginBottom = "1em";

  const question = document.createElement("p");
  question.innerHTML = `<strong>${pair.word}</strong>:`;

  const select = document.createElement("select");
  select.innerHTML = `<option disabled selected>Вибери значення</option>`;
  pair.meanings.forEach((meaning, i) => {
    const option = document.createElement("option");
    option.textContent = meaning;
    option.value = i;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    select.style.color = "white";
    if (parseInt(select.value) === pair.correct) {
      select.style.backgroundColor = "green";
    } else {
      select.style.backgroundColor = "red";
    }
  });

  block.appendChild(question);
  block.appendChild(select);
  container.appendChild(block);
});

