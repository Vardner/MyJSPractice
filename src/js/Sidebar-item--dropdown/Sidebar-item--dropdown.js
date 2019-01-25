'use strict';
document.querySelector('#Menu').addEventListener('click', renderSublist);
document.querySelector('#Menu--tablet').addEventListener('click', renderSublist);

function renderSublist (e) {
  let li = e.target.closest('li.Menu-item');
  if (li.parentElement.classList.contains('Menu-sublist') || li.classList.contains('disabled')) return;
  li.classList.toggle('active');
}