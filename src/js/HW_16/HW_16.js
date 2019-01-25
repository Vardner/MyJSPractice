// 'use strict';
// document.querySelector('#Menu li.Menu-item[data-work="16"]').addEventListener('click', renderTask);
// document.querySelector('#Menu--tablet li.Menu-item[data-work="16"]').addEventListener('click', renderTask);
//
// function renderTask (e) {
//   const renderArea = document.getElementById('Content-area');
//   let task = e.target.closest('li.Menu-item');
//   let taskNumber;
//
//   // Validate item link
//   if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
//     return;
//   }
//
//   taskNumber = parseInt(task.dataset.task);
//
//   switch (taskNumber) {
//     case 1:
//       deleteAllChildrens(renderArea);
//       renderTask1();
//       break;
//
//     case 2:
//       deleteAllChildrens(renderArea);
//       renderTask2();
//       break;
//
//     default:
//       alert('This task doesn\'t exist :(');
//   }
// }
//
// function deleteAllChildrens (element) {
//   while (element.firstChild) {
//     element.removeChild(element.firstChild);
//   }
// }
//
// function renderTask1 () {
//   // Create and define task variables
//   const renderArea = document.getElementById('Content-area');
//   let taskItem = document.createElement('div');
//   let caption = document.createElement('h4');
//   let paragraphsText = ['Сделать секундомер который подсчитывает время пользователя на сайте',
//     'При наведении на секундомер он должен останавливаться, если убрать - возобнавляется.',
//     'При нажатии на кнопку ESC секундомер обнуляется и запускается снова.'];
//   let paragraph;
//   let i;
//
//   // Set classes
//   taskItem.classList.add('Page-taskItem');
//   caption.classList.add('Page-taskTitle');
//   caption.innerText = 'Задача №1';
//   taskItem.appendChild(caption);
//
//   // Create and append paragraphs
//   for (i = 0; i < paragraphsText.length; i++) {
//     paragraph = document.createElement('p');
//     paragraph.className = 'Page-taskText';
//     paragraph.innerText = paragraphsText[i];
//     taskItem.appendChild(paragraph);
//   }
//   renderArea.appendChild(taskItem);
// }
//
// // Task 1
//
// function createStopwatch () {
//   let clocks = document.querySelectorAll("header span.Date-item:not(.Date-item--colon)");
//   let seconds = 0;
//   let minutes = 0;
//   let hours = 0;
//
//   return function () {
//     seconds++;
//
//     if (seconds === 60) {
//       seconds = 0;
//       minutes++;
//
//       if (minutes === 60) {
//         minutes = 0;
//         hours++;
//       }
//     }
//
//
//     clocks[0].innerText = normalizeTime(hours);
//     clocks[1].innerText = normalizeTime(minutes);
//     clocks[2].innerText = normalizeTime(seconds);
//
//     runStopwatch();
//   };
// }
//
// let countStopwatchTime = createStopwatch();
// let stopwatchID;
//
// function runStopwatch () {
//   stopwatchID = setTimeout(countStopwatchTime, 999)
// }
//
// function normalizeTime (value) {
//   return value < 10 ? '0' + value : '' + value;
// }
//
// document.addEventListener('DOMContentLoaded', function () {
//   runStopwatch();
// });
//
// document.querySelector('header').addEventListener('mouseenter', function () {
//   clearTimeout(stopwatchID);
// });
//
// document.querySelector('header').addEventListener('mouseleave', function () {
//   runStopwatch();
// });