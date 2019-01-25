'use strict';

document.querySelector('.Button-sidebarToggle').parentElement.addEventListener('click', toggleSidebar);

function toggleSidebar() {
  let sidebarBtn = document.querySelector('.Button-sidebarToggle');
  let sidebar = document.querySelector('aside.Sidebar');
  let tabletMenu = document.querySelector('.Menu--tablet');
  let main = document.getElementById('Main');

  sidebarBtn.classList.toggle('active');

  if (window.innerWidth > 768) {
    if (sidebarBtn.classList.contains('active')) {
      main.parentElement.classList.toggle('cell-9');
      main.parentElement.classList.toggle('cell-12');

      sidebar.parentElement.classList.toggle('cell-3');
      sidebar.parentElement.classList.toggle('cell-none');
    } else {
      main.parentElement.classList.toggle('cell-12');
      main.parentElement.classList.toggle('cell-9');
      sidebar.parentElement.classList.toggle('cell-3');
      sidebar.parentElement.classList.toggle('cell-none');
    }
  } else {
    tabletMenu.classList.toggle('active');
  }
}

