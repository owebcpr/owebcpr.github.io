// ==================== DOM ЕЛЕМЕНТИ ====================
const DOM = {
  codeEditor: document.querySelector('#htmlCodeEditor'),
  previewFrame: document.querySelector('#previewFrame'),
  runBtn: document.querySelector('#runCodeBtn'),
  checkTaskBtn: document.querySelector('#checkTaskBtn'),
  taskTitle: document.querySelector('#taskTitle'),
  taskDescription: document.querySelector('#taskDescription'),
  taskFeedback: document.querySelector('#taskFeedback'),
  step1Done: document.querySelector('#step1Done'),
  step2Done: document.querySelector('#step2Done'),
  step3Done: document.querySelector('#step3Done'),
  progressLines: document.querySelectorAll('.progress-line'),
  currentTask: document.querySelector('#currentTask'),
  practiceSection: document.querySelector('#practice'),
  vscodeSection: document.querySelector('#vscode-project'),
  resetProjectBtn: document.querySelector('#resetProjectBtn'),
};

// Стан завдань
let currentStep = 1;
const taskChecks = {
  1: false,
  2: false,
  3: false
};

// ==================== ЗАВДАННЯ ====================
const tasks = {
  1: {
    title: "Завдання 1: Створи таблицю з продуктами",
    description: `
      <p>Створи таблицю з продуктами, яку потрібно купити. Таблиця повинна мати:</p>
      <ul>
        <li>Заголовок таблиці: <strong>"Список покупок"</strong> (тег &lt;caption&gt;)</li>
        <li>Заголовки колонок: <strong>№</strong>, <strong>Назва</strong>, <strong>Кількість</strong></li>
        <li>3 рядки з товарами (наприклад: молоко, хліб, яблука)</li>
        <li>Границі таблиці: <strong>border="1"</strong></li>
      </ul>
      <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: використай теги: &lt;table&gt;, &lt;caption&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;</div>
    `,
    check: function(html) {
      const hasTable = /<table[\s>]/i.test(html);
      const hasCaption = /<caption>[\s\S]*?<\/caption>/i.test(html);
      const hasTh = /<th>[\s\S]*?<\/th>/i.test(html);
      const hasTr = /<tr>[\s\S]*?<\/tr>/i.test(html);
      const hasTd = /<td>[\s\S]*?<\/td>/i.test(html);
      const hasBorder = /border\s*=\s*["']?1["']?/i.test(html);
      
      // Перевіряємо наявність рядків з даними
      const trMatches = html.match(/<tr>/gi);
      const rowCount = trMatches ? trMatches.length - 1 : 0;
      
      return hasTable && hasCaption && hasTh && hasTr && hasTd && hasBorder && rowCount >= 3;
    },
    successMessage: "✅ Чудово! Таблицю створено правильно! Переходимо до наступного завдання!"
  },
  2: {
    title: "Завдання 2: Додай об'єднання комірок",
    description: `
      <p>Додай до таблиці об'єднання комірок. Створи таблицю розкладу занять:</p>
      <ul>
        <li>Заголовки колонок: <strong>Час</strong>, <strong>Понеділок</strong>, <strong>Вівторок</strong>, <strong>Середа</strong></li>
        <li>Додай рядок з об'єднаними комірками для <strong>обіду</strong> (colspan="3")</li>
        <li>Додай рядок з об'єднаними комірками для <strong>прогулянки</strong> (colspan="3")</li>
        <li>Використай атрибути <strong>colspan</strong> або <strong>rowspan</strong></li>
      </ul>
      <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: &lt;td colspan="3"&gt;Обідня перерва&lt;/td&gt;</div>
    `,
    check: function(html) {
      const hasColspan = /colspan\s*=\s*["']?\d+["']?/i.test(html);
      const hasRowspan = /rowspan\s*=\s*["']?\d+["']?/i.test(html);
      return hasColspan || hasRowspan;
    },
    successMessage: "✅ Супер! Ти навчився об'єднувати комірки! Останнє завдання!"
  },
  3: {
    title: "Завдання 3: Створи складну таблицю з групуванням",
    description: `
      <p>Створи таблицю "Мої улюблені книги" з використанням &lt;thead&gt;, &lt;tbody&gt; та &lt;tfoot&gt;:</p>
      <ul>
        <li>Заголовки колонок: <strong>Назва книги</strong>, <strong>Автор</strong>, <strong>Рік</strong>, <strong>Оцінка</strong></li>
        <li>3-4 рядки з книгами у &lt;tbody&gt;</li>
        <li>Рядок-підсумок у &lt;tfoot&gt;: "Всього книг: X" (з об'єднанням комірок colspan="4")</li>
        <li>Використай &lt;thead&gt; для заголовків</li>
      </ul>
      <div class="hint-mini"><i class="fas fa-lightbulb"></i> Підказка: структура: &lt;table&gt; → &lt;thead&gt; → &lt;tr&gt; → &lt;th&gt;, потім &lt;tbody&gt;, потім &lt;tfoot&gt;</div>
    `,
    check: function(html) {
      const hasThead = /<thead>[\s\S]*?<\/thead>/i.test(html);
      const hasTbody = /<tbody>[\s\S]*?<\/tbody>/i.test(html);
      const hasTfoot = /<tfoot>[\s\S]*?<\/tfoot>/i.test(html);
      const hasColspan = /colspan\s*=\s*["']?\d+["']?/i.test(html);
      
      // Перевіряємо кількість рядків у tbody
      const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
      let rowCount = 0;
      if (tbodyMatch) {
        const rows = tbodyMatch[1].match(/<tr>/gi);
        rowCount = rows ? rows.length : 0;
      }
      
      return hasThead && hasTbody && hasTfoot && hasColspan && rowCount >= 3;
    },
    successMessage: "🎉 ВІТАЮ! 🎉 Ти пройшов всі завдання! Тепер створимо проєкт у VS Code!"
  }
};

// ==================== РЕДАКТОР КОДУ ====================
function runCode() {
  if (!DOM.codeEditor || !DOM.previewFrame) return;
  const code = DOM.codeEditor.value;
  DOM.previewFrame.srcdoc = code;
}

// ==================== ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ ====================
function updateProgress() {
  const steps = [DOM.step1Done, DOM.step2Done, DOM.step3Done];
  const lines = DOM.progressLines;
  
  steps.forEach((step, index) => {
    const stepNum = index + 1;
    if (step) {
      if (taskChecks[stepNum]) {
        step.classList.add('done');
        step.classList.remove('active');
      } else if (stepNum === currentStep) {
        step.classList.add('active');
        step.classList.remove('done');
      } else {
        step.classList.remove('done', 'active');
      }
    }
  });
  
  if (lines) {
    lines.forEach((line, index) => {
      if (taskChecks[index + 1]) {
        line.classList.add('done');
      } else {
        line.classList.remove('done');
      }
    });
  }
}

function loadTask(step) {
  const task = tasks[step];
  if (task && DOM.taskTitle && DOM.taskDescription) {
    DOM.taskTitle.innerHTML = '<i class="fas fa-star-of-life"></i> ' + task.title;
    DOM.taskDescription.innerHTML = task.description;
    if (DOM.codeEditor) DOM.codeEditor.value = '';
    if (DOM.previewFrame) DOM.previewFrame.srcdoc = '';
    if (DOM.taskFeedback) {
      DOM.taskFeedback.style.display = 'none';
      DOM.taskFeedback.innerHTML = '';
      DOM.taskFeedback.className = 'task-feedback';
    }
  }
}

function checkTask() {
  if (!DOM.codeEditor) {
    console.log('Editor not found');
    return;
  }
  
  const code = DOM.codeEditor.value;
  const task = tasks[currentStep];
  
  if (!task) return;
  
  const isCorrect = task.check(code);
  
  if (!DOM.taskFeedback) return;
  
  if (isCorrect) {
    taskChecks[currentStep] = true;
    updateProgress();
    
    DOM.taskFeedback.innerHTML = '<i class="fas fa-check-circle"></i> ' + task.successMessage;
    DOM.taskFeedback.className = 'task-feedback success';
    DOM.taskFeedback.style.display = 'block';
    
    if (currentStep < 3) {
      currentStep++;
      loadTask(currentStep);
      if (DOM.currentTask) {
        DOM.currentTask.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setTimeout(function() {
        DOM.taskFeedback.innerHTML = '<i class="fas fa-trophy"></i> 🎉 Молодець! Ти виконав всі завдання! Тепер переходимо до створення проєкту в VS Code! 🎉';
        DOM.taskFeedback.className = 'task-feedback success';
        
        if (DOM.practiceSection) DOM.practiceSection.style.display = 'none';
        if (DOM.vscodeSection) {
          DOM.vscodeSection.style.display = 'block';
          DOM.vscodeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1000);
    }
  } else {
    DOM.taskFeedback.innerHTML = '<i class="fas fa-times-circle"></i> ❌ Неправильно! Перевір ще раз умови завдання. Спробуй ще!';
    DOM.taskFeedback.className = 'task-feedback error';
    DOM.taskFeedback.style.display = 'block';
  }
}

// ==================== ПЕРЕВІРКА ПРИКЛАДУ ====================
function showExampleSolution() {
  const exampleCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Список покупок</title>
</head>
<body>
    <table border="1">
        <caption>Список покупок</caption>
        <tr>
            <th>№</th>
            <th>Назва</th>
            <th>Кількість</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Молоко</td>
            <td>2 л</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Хліб</td>
            <td>1 шт</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Яблука</td>
            <td>1 кг</td>
        </tr>
    </table>
</body>
</html>`;
  
  if (DOM.codeEditor) {
    DOM.codeEditor.value = exampleCode;
    runCode();
  }
}

// ==================== СКИДАННЯ ====================
function resetProject() {
  taskChecks[1] = false;
  taskChecks[2] = false;
  taskChecks[3] = false;
  currentStep = 1;
  
  updateProgress();
  loadTask(1);
  
  if (DOM.practiceSection) DOM.practiceSection.style.display = 'block';
  if (DOM.vscodeSection) DOM.vscodeSection.style.display = 'none';
  if (DOM.taskFeedback) {
    DOM.taskFeedback.style.display = 'none';
    DOM.taskFeedback.innerHTML = '';
  }
  if (DOM.codeEditor) DOM.codeEditor.value = '';
  if (DOM.previewFrame) DOM.previewFrame.srcdoc = '';
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
function init() {
  console.log('Initializing...');
  
  // Кнопки редактора
  if (DOM.runBtn) {
    DOM.runBtn.addEventListener('click', runCode);
  }
  
  if (DOM.checkTaskBtn) {
    DOM.checkTaskBtn.addEventListener('click', checkTask);
  }
  
  if (DOM.resetProjectBtn) {
    DOM.resetProjectBtn.addEventListener('click', resetProject);
  }
  
  // Завантажуємо перше завдання
  loadTask(1);
  updateProgress();
  
  // Ховаємо секцію VS Code спочатку
  if (DOM.vscodeSection) {
    DOM.vscodeSection.style.display = 'none';
  }
  
  console.log('Initialized. Current step: ' + currentStep);
}

// Запускаємо після завантаження сторінки
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}