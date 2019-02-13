'use strict';
/*jslint es6 */
document.querySelector('#Menu li.Menu-item[data-work="14"]').addEventListener('click', renderHW_14);
document.querySelector('#Menu--tablet li.Menu-item[data-work="14"]').addEventListener('click', renderHW_14);


const HW_14 = {
    task1: {
      taskItem: '',
      render: function () {
        //Clear container before load task
        HW_14.clearContentContainer();

        const renderArea = document.getElementById('Content-area');

        // if we already load this task we load them from static variable
        if (this.taskItem) {
          renderArea.appendChild(this.taskItem);
          return;
        }

        // Create and define task variables
        let taskContainer = document.createElement('div');
        let caption = document.createElement('h4');
        let paragraphsText = ['Написать функцию кеша, которая принимает два аргумента.',
          'Если такие аргументы ранее использовались - получить их из кеша. Если нет - записать в кеш и вернуть результат.',
          'Функцию можно вызвать из консоли: cache(arg1,arg2)'];
        let paragraph;
        let i;
        //Result tags
        let cache = document.createElement('p');
        let result = document.createElement('p');

        cache.dataset.role = 'cache';
        cache.className = 'Task-text';
        result.dataset.role = 'result';
        result.className = 'Task-text';

        // Create and define task form
        let form = document.createElement('form');
        let row = document.createElement('div');

        // media container variables
        let mediaContainer;

        // Input variables
        let input;
        let inputCaptionText = ['Argument #1:', 'Argument #2:'];
        let inputsPlaceholders = ['Number or text', 'Number or text'];
        let label;
        let inputCaption;

        // Create form
        form.setAttribute('action', '#');
        form.id = 'Cache';
        row.className = 'row';
        form.appendChild(row);

        // Create mediaContainers and inputs, then append them to row container
        for (i = 0; i < 3; i++) {
          // Media
          mediaContainer = document.createElement('div');
          mediaContainer.className = i !== 2 ? 'cell-5 cell-ml' : 'cell-2 cell-ml';

          //Inputs
          input = document.createElement('input');
          if (i !== 2) {
            label = document.createElement('label');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', inputsPlaceholders[i]);
            input.className = 'Task-input';

            // Input Caption
            inputCaption = document.createElement('span');
            inputCaption.className = 'Task-text Task-text--decorated';
            inputCaption.innerText = inputCaptionText[i];

            label.appendChild(inputCaption);
            label.appendChild(input);
            mediaContainer.appendChild(label);
          } else {
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Generate');
            input.className = 'Button Button-submit';

            mediaContainer.appendChild(input);
          }

          row.appendChild(mediaContainer);
        }

        // Set classes
        taskContainer.classList.add('Task-container');
        caption.classList.add('Task-title');
        caption.innerText = 'Задача №1';
        taskContainer.appendChild(caption);

        // Create and append paragraphs
        for (i = 0; i < paragraphsText.length; i++) {
          paragraph = document.createElement('p');
          paragraph.className = 'Task-text';
          paragraph.innerText = paragraphsText[i];
          taskContainer.appendChild(paragraph);
        }

        taskContainer.appendChild(form);
        taskContainer.appendChild(cache);
        taskContainer.appendChild(result);
        renderArea.appendChild(taskContainer);

        this.cacheFunction = this.makeCache(this.complexFunction);
        form.addEventListener('submit', this.cacheFunction.bind(this));
        this.taskItem = taskContainer;
      },
      cache: [],
      complexFunction: function (a, b) {
        return a + b;
      },
      makeCache: function (func) {
        return function (event) {
          event.preventDefault();
          const formData = document.getElementsByClassName('Task-input');
          const cacheParagraph = document.querySelector('p[data-role="cache"]');
          const resultParagraph = document.querySelector('p[data-role="result"]');

          let arg1Value = formData[0].value;
          let arg2Value = formData[1].value;
          let arg1IsMatch;
          let arg2IsMatch;
          let cachedResult;
          let result;
          let i;


          arg1Value = isFinite(arg1Value)
            ? +arg1Value
            : arg1Value;

          arg2Value = isFinite(arg2Value)
            ? +arg2Value
            : arg2Value;


          formData[0].value = '';
          formData[1].value = '';

          if (typeof arg1Value === 'number' && typeof  arg2Value === 'number') {
            for (i = 0; i < this.cache.length; i++) {
              cachedResult = this.cache[i];
              arg1IsMatch = cachedResult[0] === arg1Value;

              if (!arg1IsMatch) {
                arg1IsMatch = cachedResult[0] === arg2Value;
                arg2IsMatch = cachedResult[1] === arg1Value;
              } else {
                arg2IsMatch = cachedResult[1] === arg2Value;
              }

              if (arg1IsMatch && arg2IsMatch) {
                result = cachedResult[2];
                break;
              }
            }
          }
          else {
            for (i = 0; i < this.cache.length; i++) {
              cachedResult = this.cache[i];
              if (cachedResult[0] === arg1Value && cachedResult[1] === arg2Value) {
                return cachedResult[2];
              }
            }
          }

          if (result === undefined) {
            result = func(arg1Value, arg2Value);
            this.cache.push([arg1Value, arg2Value, result]);
          }

          console.log(this.cache);

          cacheParagraph.innerText = `Current cache is : ${this.cache}`;
          resultParagraph.innerText = `Result of operation is: ${result}`;
        }
      },
    },
    task2: {
      taskItem: '',
      render: function () {

        //Prepare area to append task
        HW_14.clearContentContainer();


        // Create and define task variables
        const renderArea = document.getElementById('Content-area');

        if (this.taskItem) {
          renderArea.appendChild(this.taskItem);
          return;
        }


        let taskContainer = document.createElement('div');
        let caption = document.createElement('h4');

        // Paragraphs variables
        let paragraphsText = ['Создать форму которая содержит 2 инпута в которые вводятся размеры таблицы.',
          'По клику на ячейку она должна показывать свой индекс. Индекс нельзя хранить в разметке.'];
        let paragraphs = [];
        let paragraph;
        let i;

        // Create and define task form
        let form = document.createElement('form');
        let row = document.createElement('div');

        // media container variables
        let mediaContainer;

        // Input variables
        let input;
        let inputCaptionText = ['Columns:', 'Rows:'];
        let inputsPlaceholders = ['Enter columns quantity', 'Enter rows quantity'];
        let label;
        let inputCaption;
        let btnWrapper = document.createElement('div');
        btnWrapper.className = 'Button-submitWrapper';


        // Create paragraphs
        for (i = 0; i < 2; i++) {
          paragraph = document.createElement('p');
          paragraph.className = 'Task-text';
          paragraph.innerText = paragraphsText[i];
          paragraphs.push(paragraph);
        }

        // Create form
        form.setAttribute('action', '#');
        form.id = 'TableGenerator';
        row.className = 'row';
        form.appendChild(row);

        // Create mediaContainers and inputs, then append them to row container
        for (i = 0; i < 3; i++) {
          // Media
          mediaContainer = document.createElement('div');
          mediaContainer.className = i !== 2 ? 'cell-5 cell-ml-6' : 'cell-2 cell-ml';

          //Inputs
          input = document.createElement('input');
          if (i !== 2) {
            label = document.createElement('label');
            input.setAttribute('type', 'number');
            input.setAttribute('placeholder', inputsPlaceholders[i]);
            input.className = 'Task-input';

            // Input Caption
            inputCaption = document.createElement('span');
            inputCaption.className = 'Task-text Task-text--decorated';
            inputCaption.innerText = inputCaptionText[i];

            label.appendChild(inputCaption);
            label.appendChild(input);
            mediaContainer.appendChild(label);
          } else {
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Generate');
            input.className = 'Button Button-submit';
            btnWrapper.appendChild(input);
            mediaContainer.appendChild(btnWrapper);
          }

          row.appendChild(mediaContainer);
        }


        // Set classes
        taskContainer.classList.add('Task-container');
        caption.classList.add('Task-title');
        caption.innerText = 'Задача №2';

        // Append all to div container
        taskContainer.appendChild(caption);
        taskContainer.appendChild(paragraphs[0]);
        taskContainer.appendChild(paragraphs[1]);
        taskContainer.appendChild(form);

        form.addEventListener('submit', HW_14.task2.renderTable.bind(HW_14.task2));

        renderArea.appendChild(taskContainer);
        this.taskItem = taskContainer;
      }
      ,
      renderTable:

        function (e) {
          e.preventDefault();
          const taskContainer = document.querySelector('#Content-area > .Task-container');
          const tableContainer = document.getElementById('Table-container') || document.createElement('div');
          const tableData = document.getElementsByClassName('Task-input');

          tableContainer.id = 'Table-container';

          let table = document.createElement('table');
          let columns = +tableData[0].value;
          let rows = +tableData[1].value;
          let tr;
          let td;

          let i;
          let j;

          tableData[0].value = '';
          tableData[1].value = '';

          if (tableContainer.firstChild) {
            tableContainer.removeChild(tableContainer.firstChild);
          }

          if (Number.isFinite(columns) && Number.isFinite(rows) && columns < 20) {
            for (i = 0; i < rows; i++) {
              tr = document.createElement('tr');

              for (j = 0; j < columns; j++) {
                td = document.createElement('td');
                td.innerText = `${i} - ${j}`;
                tr.appendChild(td);
              }

              table.appendChild(tr);
            }

            tableContainer.appendChild(table);
            taskContainer.appendChild(tableContainer);

          } else {
            alert('Введены некорректные данные');
            return;
          }

          table.onclick = HW_14.task2.getCellPosition;
          this.taskItem = taskContainer;
        }

      ,
      getCellPosition: function (e) {
        alert(`row - ${e.target.closest('tr').rowIndex} cell - ${e.target.closest('td').cellIndex}`);
      }
    },
    task3: {
      taskItem: '',
      render () {
        const renderArea = document.getElementById('Content-area');

        //Prepare area to append task
        HW_14.clearContentContainer();

        // if we already load this task we load them from static variable
        if (this.taskItem) {
          renderArea.appendChild(this.taskItem);
          return;
        }

        let taskContainer = document.createElement('div');
        let caption = document.createElement('h4');
        let paragraphsText = ['Написать функцию часов, которые показывают дату и время.',
          'Перерисовка не реже раз в секунду.',
          'Не перерисовывать данные если они не поменялись.',
          'Не использовать информацию из HTML разметки.',
          'Не хранить никакую информацию в глобальных переменных',
          '',
          'Часики вроде работают правильно, не понял про глобальные переменные',
          'Функция которая относится к этой задаче вынесена в отдельный файл "Date.js"'];
        let paragraphs = [];
        let paragraph;
        let i;

        // Create paragraphs
        for (i = 0; i < paragraphsText.length; i++) {
          paragraph = document.createElement('p');
          paragraph.className = 'Task-text';
          paragraph.innerText = paragraphsText[i];
          paragraphs.push(paragraph);
        }

        // Set classes
        taskContainer.classList.add('Task-container');
        caption.classList.add('Task-title');
        caption.innerText = 'Задача №3';

        // Append text to div container
        taskContainer.appendChild(caption);
        taskContainer.appendChild(paragraphs[0]);
        taskContainer.appendChild(paragraphs[1]);
        taskContainer.appendChild(paragraphs[2]);

        renderArea.appendChild(taskContainer);
        this.taskItem = taskContainer;
      },
      createClock () {
        let self = this;
        let clocks = document.querySelectorAll('header span.Date-item:not(.Date-item--colon)');
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        clocks[0].innerText = self.normalizeTime(hours);
        clocks[1].innerText = self.normalizeTime(minutes);
        clocks[2].innerText = self.normalizeTime(seconds);

        return function () {
          let newDate = new Date();
          if (hours !== newDate.getHours()) {
            hours = newDate.getHours();
            clocks[0].innerText = self.normalizeTime(hours);
          }

          if (minutes !== newDate.getMinutes()) {
            minutes = newDate.getMinutes();
            clocks[1].innerText = self.normalizeTime(minutes);
          }

          seconds = newDate.getSeconds();
          clocks[2].innerText = self.normalizeTime(seconds);
        };
      },
      createDate () {
        let self = this;
        const date = document.querySelectorAll('[data-date="Date"] span');
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        date[0].innerText = self.normalizeTime(day) + '.';
        date[1].innerText = self.normalizeTime(month + 1) + '.';
        date[2].innerText = year;

        return function () {
          let newDate = new Date();
          if (day !== newDate.getDate()) {
            day = newDate.getDate();
            date[0].innerText = self.normalizeTime(day) + '.';
          }

          if (month !== newDate.getMonth()) {
            month = newDate.getMonth();
            date[1].innerText = self.normalizeTime(month + 1) + '.';
          }

          if (year !== newDate.getFullYear()) {
            year = newDate.getFullYear();
            date[1].innerText = year;
          }
        };
      },
      normalizeTime (value) {
        return value < 10 ? '0' + value : '' + value;
      }
    }
    ,
    task4: {
      taskItem: '',
      render () {
        //Prepare area to append task
        HW_14.clearContentContainer();

        const renderArea = document.getElementById('Content-area');

        if (this.taskItem) {
          renderArea.appendChild(this.taskItem);
          return;
        }

        // Create and define task variables

        let taskContainer = document.createElement('div');
        let caption = document.createElement('h4');
        let paragraphsText = ['Написать функцию, которая после изменения окна выводит его размеры.',
          'Выводить информацию после того как пользователь не менял размер 2 секунды',
          'Все работает можно пробовать'];
        let paragraph;
        let i;

        // Append text to div container
        taskContainer.appendChild(caption);

        // Create paragraphs and append paragraphs
        for (i = 0; i < paragraphsText.length; i++) {
          paragraph = document.createElement('p');
          paragraph.className = 'Task-text';
          paragraph.innerText = paragraphsText[i];
          taskContainer.appendChild(paragraph);
        }

        // Set classes
        taskContainer.classList.add('Task-container');
        caption.classList.add('Task-title');
        caption.innerText = 'Задача №4';

        renderArea.appendChild(taskContainer);
        this.taskItem = taskContainer;
      },
      resizeID: '',
      resizeFunction () {
        function getResize () {
          const container = document.querySelector('header .Header-currentSize span');
          container.innerText = `${window.innerWidth} x ${window.innerHeight} px`
        }

        function renderResize () {
          clearTimeout(HW_14.task4.resizeID);
          HW_14.task4.resizeID = setTimeout(getResize, 2000)
        }

        getResize();

        window.addEventListener('resize', renderResize);
      }
    }
    ,
    clearContentContainer: function () {
      const renderArea = document.getElementById('Content-area');
      while (renderArea.firstChild) {
        renderArea.removeChild(renderArea.firstChild);
      }
    }
  }
;


function renderHW_14 (e) {
  const task = e.target.closest('li.Menu-item');
  let taskNumber;

  // Validate item link
  if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
    return;
  }

  taskNumber = parseInt(task.dataset.task);

  switch (taskNumber) {
    case 1:
      HW_14.task1.render();
      break;

    case 2:
      HW_14.task2.render();
      break;

    case 3:
      HW_14.task3.render();
      break;

    case 4:
      HW_14.task4.render();
      break;

    default:
      alert('This task doesn\'t exist :(');
  }
}


// Task 3 functions

document.addEventListener('DOMContentLoaded', function () {
  let renderClock = HW_14.task3.createClock();
  let renderDate = HW_14.task3.createDate();
  renderClock();
  renderDate();
  setInterval(renderClock, 1000);
  setInterval(renderDate, 1000);
});


//Task 4 functions

window.addEventListener('DOMContentLoaded', HW_14.task4.resizeFunction);






