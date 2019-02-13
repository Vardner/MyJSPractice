'use strict';

function toggleSidebar (e) {
  const sidebarBtn = document.querySelector('.Button-menuWrapper');
  const sidebar = document.querySelector('aside.Sidebar');
  const tabletMenu = document.querySelector('.Menu--tablet');
  const main = document.getElementById('Main');

  if (sidebarBtn.classList.contains('active') && e.target !== sidebarBtn && !e.target.closest('aside.Sidebar') &&  !e.target.closest('ul.Menu--tablet'))  {
    if ( window.innerWidth > 768) {
      main.parentElement.classList.toggle('cell-9');
      main.parentElement.classList.toggle('cell-12');
      main.classList.remove('perspective');
      sidebar.parentElement.classList.toggle('cell-3');
      sidebar.parentElement.classList.toggle('cell-none');
      sidebarBtn.classList.remove('active');
    } else {
      tabletMenu.classList.remove('active');
      main.classList.remove('perspective');
      sidebarBtn.classList.remove('active');
    }

    return;
  }

  if (e.target.closest('.Button-menuWrapper')){
    sidebarBtn.classList.toggle('active');

    if (window.innerWidth > 768) {
      main.parentElement.classList.toggle('cell-9');
      main.parentElement.classList.toggle('cell-12');
      main.classList.toggle('perspective');
      sidebar.parentElement.classList.toggle('cell-3');
      sidebar.parentElement.classList.toggle('cell-none');
    } else {
      tabletMenu.classList.toggle('active');
      main.classList.toggle('perspective');
    }
  }
}


window.addEventListener('click',toggleSidebar);

