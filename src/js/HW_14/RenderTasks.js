'use strict';
document.querySelector('#Menu li.Menu-item[data-work="14"]').addEventListener('click', renderHW_14);
document.querySelector('#Menu--tablet li.Menu-item[data-work="14"]').addEventListener('click', renderHW_14);


const HW_14 = {
  task1: {
    render: function () {
      //Prepare area to append task
      HW_14.clearContentContainer();

      // Create and define task variables
      const renderArea = document.getElementById('Content-area');
      let taskItem = document.createElement('div');
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
      cache.className = 'Page-taskText';
      result.dataset.role = 'result';
      result.className = 'Page-taskText';

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
          input.className = 'Page-taskInput';

          // Input Caption
          inputCaption = document.createElement('span');
          inputCaption.className = 'Page-taskText Page-taskText--decorated';
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
      taskItem.classList.add('Page-taskItem');
      caption.classList.add('Page-taskTitle');
      caption.innerText = 'Задача №1';
      taskItem.appendChild(caption);

      // Create and append paragraphs
      for (i = 0; i < paragraphsText.length; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Page-taskText';
        paragraph.innerText = paragraphsText[i];
        taskItem.appendChild(paragraph);
      }

      taskItem.appendChild(form);
      taskItem.appendChild(cache);
      taskItem.appendChild(result);
      renderArea.appendChild(taskItem);
      form.addEventListener('submit', this.cache.bind(this));
    },
    cache: (function () {
      console.log(this);
      return (function (func) {
        const cache = [];

        return function (event) {
          event.preventDefault();

          const formData = document.getElementsByClassName('Page-taskInput');
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
            for (i = 0; i < cache.length; i++) {
              cachedResult = cache[i];
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
            for (i = 0; i < cache.length; i++) {
              cachedResult = cache[i];
              if (cachedResult[0] === arg1Value && cachedResult[1] === arg2Value) return cachedResult[2];
            }
          }

          if (result === undefined) {
            result = func(arg1Value, arg2Value);
            cache.push([arg1Value, arg2Value, result]);
          }

          cacheParagraph.innerText = `Current cache is : ${cache}`;
          resultParagraph.innerText = `Result of operation is: ${result}`;
        }
      })(function (a, b) {
        return a + b;
      });
    })()
  },
  task2: {
    render: function () {
      //Prepare area to append task
      HW_14.clearContentContainer();

      // Create and define task variables
      const renderArea = document.getElementById('Content-area');
      let taskItem = document.createElement('div');
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


      // Create paragraphs
      for (i = 0; i < 2; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Page-taskText';
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
        mediaContainer.className = i !== 2 ? 'cell-5 cell-ml' : 'cell-2 cell-ml';

        //Inputs
        input = document.createElement('input');
        if (i !== 2) {
          label = document.createElement('label');
          input.setAttribute('type', 'number');
          input.setAttribute('placeholder', inputsPlaceholders[i]);
          input.className = 'Page-taskInput';

          // Input Caption
          inputCaption = document.createElement('span');
          inputCaption.className = 'Page-taskText Page-taskText--decorated';
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
      taskItem.classList.add('Page-taskItem');
      caption.classList.add('Page-taskTitle');
      caption.innerText = 'Задача №2';

      // Append all to div container
      taskItem.appendChild(caption);
      taskItem.appendChild(paragraphs[0]);
      taskItem.appendChild(paragraphs[1]);
      taskItem.appendChild(form);

      form.addEventListener('submit', HW_14.task2.renderTable);

      renderArea.appendChild(taskItem);
    }
    ,
    renderTable: function (e) {
      e.preventDefault();
      const contentArea = document.getElementById('Content-area');
      const tableContainer = document.getElementById('Table-container') || document.createElement('div');
      const tableData = document.getElementsByClassName('Page-taskInput');

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
        contentArea.appendChild(tableContainer);

      } else {
        alert('Введены некорректные данные');
        return;
      }

      table.onclick = HW_14.task2.getCellPosition;
    }
    ,
    getCellPosition: function (e) {
      alert(`row - ${e.target.closest('tr').rowIndex} cell - ${e.target.closest('td').cellIndex}`);
    }
  },
  task3: {
    render: function () {
      //Prepare area to append task
      HW_14.clearContentContainer();

      const renderArea = document.getElementById('Content-area');
      let taskItem = document.createElement('div');
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
        paragraph.className = 'Page-taskText';
        paragraph.innerText = paragraphsText[i];
        paragraphs.push(paragraph);
      }

      // Set classes
      taskItem.classList.add('Page-taskItem');
      caption.classList.add('Page-taskTitle');
      caption.innerText = 'Задача №3';

      // Append text to div container
      taskItem.appendChild(caption);
      taskItem.appendChild(paragraphs[0]);
      taskItem.appendChild(paragraphs[1]);
      taskItem.appendChild(paragraphs[2]);

      renderArea.appendChild(taskItem);
    }
  },
  task4: {
    render: function () {
      //Prepare area to append task
      HW_14.clearContentContainer();

      // Create and define task variables
      const renderArea = document.getElementById('Content-area');
      let taskItem = document.createElement('div');
      let caption = document.createElement('h4');
      let paragraphsText = ['Написать функцию, которая после изменения окна выводит его размеры.',
        'Выводить информацию после того как пользователь не менял размер 2 секунды',
        'Все работает можно пробовать'];
      let paragraph;
      let i;

      // Append text to div container
      taskItem.appendChild(caption);

      // Create paragraphs and append paragraphs
      for (i = 0; i < paragraphsText.length; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Page-taskText';
        paragraph.innerText = paragraphsText[i];
        taskItem.appendChild(paragraph);
      }

      // Set classes
      taskItem.classList.add('Page-taskItem');
      caption.classList.add('Page-taskTitle');
      caption.innerText = 'Задача №4';

      renderArea.appendChild(taskItem);
    }
  },
  clearContentContainer: function () {
    const renderArea = document.getElementById('Content-area');
    while (renderArea.firstChild) {
      renderArea.removeChild(renderArea.firstChild);
    }
  }
};

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
function createClock () {
  let clocks = document.querySelectorAll("header span.Date-item:not(.Date-item--colon)");
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  clocks[0].innerText = normalizeTime(hours);
  clocks[1].innerText = normalizeTime(minutes);
  clocks[2].innerText = normalizeTime(seconds);

  return function () {
    let newDate = new Date();
    if (hours !== newDate.getHours()) {
      hours = newDate.getHours();
      clocks[0].innerText = normalizeTime(hours);
    }

    if (minutes !== newDate.getMinutes()) {
      minutes = newDate.getMinutes();
      clocks[1].innerText = normalizeTime(minutes);
    }

    seconds = newDate.getSeconds();
    clocks[2].innerText = normalizeTime(seconds);
  };
}

function createDate () {
  let date = document.querySelectorAll("footer span.Date-item");
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  date[0].innerText = normalizeTime(day) + '.';
  date[1].innerText = normalizeTime(month+1) +'.';
  date[2].innerText = year;

  return function () {
    let newDate = new Date();
    if (day !== newDate.getDate()) {
      day = newDate.getDate();
      date[0].innerText = normalizeTime(day) + '.';
    }

    if (month !== newDate.getMonth()) {
      month = newDate.getMonth();
      date[1].innerText = normalizeTime(month+1) +'.';
    }

    if (year !== newDate.getFullYear()) {
      year = newDate.getFullYear();
      date[1].innerText = year;
    }
  };
}

function normalizeTime (value) {
  return value < 10 ? '0' + value : '' + value;
}

let renderClock = createClock();
let renderDate = createDate();

document.addEventListener('DOMContentLoaded', function () {
  renderClock();
  renderDate();
  setInterval(renderClock, 1000);
  setInterval(renderDate, 1000);
});



//Task 4 functions

window.addEventListener('resize', renderResize);

var resizeID;
function getResize () {
  const container = document.querySelector('header .Header-currentSize span');
  container.innerText = `${window.outerWidth} x ${window.outerHeight} px`
}

function renderResize () {
  clearTimeout(resizeID);
  resizeID = setTimeout(getResize, 2000)
}

getResize();



