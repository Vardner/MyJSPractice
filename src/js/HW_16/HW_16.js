'use strict';
const defaultMenuWork16 = document.querySelector('#Menu li.Menu-item[data-work="16"]');
const tabletMenuWork16 = document.querySelector('#Menu--tablet li.Menu-item[data-work="16"]');

defaultMenuWork16.addEventListener('click', renderHW_16);
tabletMenuWork16.addEventListener('click', renderHW_16);

const HW_16 = {
  task1: {
    taskItem: '',
    render: function () {
      //Prepare area to append task
      HW_16.clearContentContainer();

      // Create and define task variables
      const renderArea = document.getElementById('Content-area');
      const taskContainer = document.createElement('div');
      const caption = document.createElement('h4');
      const paragraphsText = ['Create a stopwatch function that counts user time on the site',
        'When hovering over the stopwatch, time freezes',
        'When you press the "ESC" button the stopwatch is reset.',
      'The stopwatch is located on the bottom left'];
      let paragraph;
      let i;

      renderArea.appendChild(taskContainer);

      taskContainer.classList.add('Task-container');
      taskContainer.appendChild(caption);

      caption.classList.add('Task-title');
      caption.innerText = 'Task #1';

      // Create and append paragraphs
      for (i = 0; i < paragraphsText.length; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Task-text';
        paragraph.innerText = paragraphsText[i];
        taskContainer.appendChild(paragraph);
      }

      this.taskItem = taskContainer;
    },
  },
  task2: {
    taskItem: '',
    render: function () {
      //Prepare area to append task
      HW_16.clearContentContainer();
      // Create and define task variables
      const renderArea = document.getElementById('Content-area');

      if (this.taskItem) {
        renderArea.appendChild(this.taskItem);
        return;
      }

      const taskContainer = document.createElement('div');
      const caption = document.createElement('h4');
      let button;
      let row = document.createElement('div');

      // Paragraphs variables
      const paragraphs = ['Create a single function for a container with 3 buttons.',
        'When you press the button, it changes its color.',
      'When you press the button again, it is painted in its base color.'];
      let paragraph;
      let mediaContainer;
      let i;

      renderArea.appendChild(taskContainer);

      taskContainer.classList.add('Task-container');
      taskContainer.appendChild(caption);

      caption.classList.add('Task-title');
      caption.innerText = 'Task #2';

      // Create paragraphs
      for (i = 0; i < paragraphs.length; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Task-text';
        paragraph.innerText = paragraphs[i];
        taskContainer.appendChild(paragraph);
      }

      taskContainer.appendChild(row);
      row.className = 'row';
      row.style.margin = '15px 0';
      row.addEventListener('click', this.changeColor);

      // Create mediaContainers and buttons, then append them to row container
      for (i = 0; i < 3; i++) {
        mediaContainer = document.createElement('div');
        mediaContainer.className = 'cell-4 cell-ml';
        mediaContainer.style.textAlign = 'center';
        button = document.createElement('button');
        button.className = 'Button';
        button.innerText = `Button #${i+1}`;
        mediaContainer.appendChild(button);
        row.appendChild(mediaContainer);
      }
      this.taskItem = taskContainer;
    },
    changeColor: function (e) {
      if (e.target.tagName === 'BUTTON') {
        if (!e.target.style.background) {
          e.target.style.background = HW_16.task2.getRandomColor();
        } else {
          e.target.style.background = '';
        }
      }
    },
    getRandomColor: function () {
      return `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256}`;
    },
  },
  clearContentContainer: function () {
    const renderArea = document.getElementById('Content-area');
    while (renderArea.firstChild) {
      renderArea.removeChild(renderArea.firstChild);
    }
  }
};

function renderHW_16 (e) {
  const task = e.target.closest('li.Menu-item');
  let taskNumber;

  // Validate item link
  if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
    return;
  }

  taskNumber = parseInt(task.dataset.task);

  switch (taskNumber) {
    case 1:
      HW_16.task1.render();
      break;

    case 2:
      HW_16.task2.render();
      break;

    case 3:
      HW_16.task3.render();
      break;

    case 4:
      HW_16.task4.render();
      break;

    default:
      alert('This task doesn\'t exist :(');
  }
}

const renderStopwatch = createStopwatch();
let stopwatchID;

function createStopwatch () {
  let clocks = document.querySelectorAll('.Date[data-date ="Stopwatch"] .Date-item');
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  clocks[2].innerText = normalizeTime(seconds);
  clocks[1].innerText = normalizeTime(minutes);
  clocks[0].innerText = normalizeTime(hours);

  window.addEventListener('keyup', resetStopwatch);

  function resetStopwatch (e) {
    if (e.keyCode === 27) {
      clearInterval(stopwatchID);
      seconds = minutes = hours = 0;
      clocks[2].innerText = normalizeTime(seconds);
      clocks[1].innerText = normalizeTime(minutes);
      clocks[0].innerText = normalizeTime(hours);
      setInterval(renderStopwatch,999);
    }
  }

  return function () {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
      clocks[1].innerText = normalizeTime(minutes);

      if (minutes === 60) {
        minutes = 0;
        hours++;
        clocks[0].innerText = normalizeTime(hours);
      }
    }

    clocks[2].innerText = normalizeTime(seconds);
  };
}

function runStopwatch () {
  stopwatchID = setInterval(renderStopwatch,999)
}

function normalizeTime (value) {
  return value < 10 ? '0' + value : '' + value;
}

document.addEventListener('DOMContentLoaded', function () {
  runStopwatch();
});

document.querySelector('.Date[data-date ="Stopwatch"]').addEventListener('mouseenter', function () {
  clearInterval(stopwatchID);
});

document.querySelector('.Date[data-date ="Stopwatch"]').addEventListener('mouseleave', function () {
  runStopwatch(renderStopwatch);
});

