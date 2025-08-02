function gradeQuiz() {
      const q1 = document.querySelector('input[name="q1"]:checked');
      const q2 = document.querySelector('input[name="q2"]:checked');
      const output = document.getElementById('symbolResult');
      if (!q1 || !q2) {
        output.textContent = 'Оберіть обидва варіанти, будь ласка!';
        return;
      }
      const choices = [q1.value, q2.value];
      const counts = { tree: 0, hops: 0, sun: 0 };
      choices.forEach(val => counts[val]++);
      let res = '';
      if (counts.tree >= 2) res = 'Ви — символ мудрості: дерево життя';
      else if (counts.hops >= 2) res = 'Ви — символ радості: хміль';
      else if (counts.sun >= 2) res = 'Ви — символ світла: сонце';
      else res = 'Ви гармонійна людина — поєднання символів!';
      output.textContent = res;
    }