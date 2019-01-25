"use strict";

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
