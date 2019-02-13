'use strict';
const defaultMenuWork20 = document.querySelector('#Menu li.Menu-item[data-work="20"]');
const tabletMenuWork20 = document.querySelector('#Menu--tablet li.Menu-item[data-work="20"]');

defaultMenuWork20.addEventListener('click', renderHW_20);
tabletMenuWork20.addEventListener('click', renderHW_20);

const HW_20 = {
  task1: {
    taskItem: '',

    images: [
      '../images/Cats-cards/Card-image1.jpg',
      '../images/Cats-cards/Card-image2.jpg',
      '../images/Cats-cards/Card-image3.jpg'
    ],

    titles: [
      'Character',
      'Genesis',
      'Look'
    ],

    descriptions: [
      'Persian cats can not live outside the house. In general, cats of this breed are rather capricious and stubborn. At the same time, they are quite balanced. They are not prone to active aggression, and although they can stand up for themselves, they often simply avoid contact with those who they don’t like.',
      'Now there are about 100 varieties of these cats in color. There is a black, white, gray, blue, red, cream, red, purple cat. Eye color is dark orange, blue, copper, green. Cats of a certain color have their own eye color. Cats of the same color should not have spots and shades.',
      'A distinctive feature of the breed is a small, wide and snub nose. The type of cats with a very small, upturned nose is called “extreme”, and a relatively long and slightly upturned nose is called “classic”. Short and muscular paws are also distinguished. Extreme type is divorced mainly in the United States, and the classic in Europe. The weight of an adult cat can reach 7 kilograms.'
    ],

    cardQuantity: 3,

    render () {
      HW_18.clearContentContainer();

      const renderArea = document.getElementById('Content-area');
      let task;

      if (this.taskItem) {
        renderArea.appendChild(this.taskItem);
        return;
      }

      const taskContainer = document.createElement('div');
      const caption = document.createElement('h4');
      const paragraphsText = [
        'Nothing to tell, just click the button and it will work'
      ];

      let paragraph;
      let i;

      renderArea.appendChild(taskContainer);
      taskContainer.appendChild(caption);

      caption.className = 'Task-title';
      taskContainer.className = 'Task-container';

      caption.innerText = 'Promises';

      // Create and append paragraphs
      for (i = 0; i < paragraphsText.length; i++) {
        paragraph = document.createElement('p');
        paragraph.className = 'Task-text';
        paragraph.innerText = paragraphsText[i];
        taskContainer.appendChild(paragraph);
      }

      task = this.renderTaskContent();
      taskContainer.appendChild(task);
      this.taskItem = taskContainer;
    },

    renderTaskContent () {
      const task = document.createElement('div');
      let button;
      let buttonTypes = ['promise-sync', 'promise-async'];
      let row = document.createElement('div');
      let mediaContainer;
      let i;

      task.className = 'cell-12';
      row.className = 'Task-container row';

      task.appendChild(row);

      for (i = 0; i < 2; i++) {
        mediaContainer = document.createElement('div');
        button = document.createElement('button');

        mediaContainer.className = 'cell-6';
        button.className = 'Button Button--centered';

        button.dataset.control = buttonTypes[i];
        button.innerText = buttonTypes[i];


        row.appendChild(mediaContainer);
        mediaContainer.appendChild(button);
      }

      this.renderProgressBar(task);
      this.renderCardList(task);
      return task;
    },

    renderProgressBar (container) {
      const wrapper = document.createElement('div');
      const progressBar = document.createElement('div');
      const bar = document.createElement('div');

      wrapper.className = 'Task-container cell-12';
      progressBar.className = 'ProgressBar';
      progressBar.dataset.progressBar = 'promises';
      bar.className = 'ProgressBar-bar';

      container.appendChild(wrapper);
      wrapper.appendChild(progressBar);
      progressBar.appendChild(bar);
    },

    renderCardList (container) {
      const cardList = document.createElement('div');
      let card;
      let i;

      cardList.className = 'List-cards';

      for (i = 0; i < this.cardQuantity; i++) {
        card = this.createCard(this.images[i], this.titles[i], this.descriptions[i]);
        cardList.appendChild(card);
      }

      container.appendChild(cardList);
    },

    createCard (image = '../../images/No-image-available.jpg',
                title = '',
                description = 'Here must be description, but something gone wrong') {

      let card = document.createElement('div');
      let cardImage = document.createElement('img');
      let cardBox= document.createElement('div');
      let cardTitle = document.createElement('h3');
      let cardText = document.createElement('p');

      card.className = 'Card';
      cardTitle.className = 'Card-title';
      cardImage.className = 'Card-image';
      cardText.className = 'Card-description';
      cardBox.className = 'Card-box';

      cardTitle.innerText = title;
      cardImage.src = image;
      cardImage.alt = 'Cat image';
      cardText.innerText = description;

      card.appendChild(cardImage);
      card.appendChild(cardBox);
      cardBox.appendChild(cardTitle);
      cardBox.appendChild(cardText);

      return card;
    },

    clearProgressBar () {
      const progressBar = document.querySelector('[data-progress-bar=promises');
      const clearProgressBar = progressBar.classList.toggle('empty');
    },

    startAsyncPromise () {
      const clearProgressBar = new Promise((resolve, reject) => {
        this.clearProgressBar();
        resolve();
      });
    }
  },

  clearContentContainer: function () {
    const renderArea = document.getElementById('Content-area');
    while (renderArea.firstChild) {
      renderArea.removeChild(renderArea.firstChild);
    }
  }
};

function renderHW_20 (e) {
  const task = e.target.closest('li.Menu-item');
  let taskNumber;

  // Validate item link
  if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
    return;
  }

  taskNumber = parseInt(task.dataset.task);

  switch (taskNumber) {
    case 1:
      HW_20.task1.render();
      break;

    default:
      alert('This task doesn\'t exist :(');
  }
}




