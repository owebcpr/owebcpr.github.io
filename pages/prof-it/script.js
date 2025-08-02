function showResult() {
      const q1 = document.querySelector('input[name="q1"]:checked');
      const q2 = document.querySelector('input[name="q2"]:checked');

      if (!q1 || !q2) {
        document.getElementById("result").textContent = "Будь ласка, обери відповіді на всі питання!";
        return;
      }

      const answers = [q1.value, q2.value];
      const count = { code: 0, design: 0, data: 0 };

      answers.forEach(answer => count[answer]++);

      let result = '';
      if (count.code >= 2) {
        result = 'Тобі чудово підходить професія Програміста!';
      } else if (count.design >= 2) {
        result = 'Ти майбутній UI/UX дизайнер!';
      } else if (count.data >= 2) {
        result = 'Тобі цікаво працювати з даними — спробуй себе як Data-аналітик!';
      } else {
        result = 'У тебе є інтерес до кількох напрямів — досліджуй їх далі!';
      }

      document.getElementById("result").textContent = result;
    }