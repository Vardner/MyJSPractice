'use strict';
const defaultMenuWork18 = document.querySelector('#Menu li.Menu-item[data-work="18"]');
const tabletMenuWork18 = document.querySelector('#Menu--tablet li.Menu-item[data-work="18"]');

defaultMenuWork18.addEventListener('click', renderHW_18);
tabletMenuWork18.addEventListener('click', renderHW_18);

class Carousel {
  constructor ({
                 name,
                 container,
                 imagesPath,
                 startPosition = 1,
                 pauseOnHover = false,
                 autoPlaySpeed = 2500,
                 loop = true,
                 speed
               }) {
    if (!name || !imagesPath || !container) {
      throw new Error('Input error: required parameters not passed');
    }

    if (startPosition > imagesPath.length) {
      throw new Error('Input error: start position can\'t be greater then slides quantity');
    }

    this._name = name;
    this._renderContainer = container;
    this._imagesPath = imagesPath;
    this._autoPlaySpeed = autoPlaySpeed;
    this._pauseState = pauseOnHover;
    this._loop = loop;
    this._slideChangeSpeed = speed;

    this.constructor.createDefaultSlider.call(this);
    this.constructor.setCarouselShift.call(this, startPosition);
    this.constructor.runCarousel.call(this);
  }

  static createDefaultSlider () {
    const carousel = document.createElement('div');
    const carouselFrame = document.createElement('div');
    const slidesStrip = document.createElement('div');

    let currentSlideIndicator = document.createElement('h4');
    let slide;
    let slideImage;
    let i;

    this._frame = carouselFrame;
    this._strip = slidesStrip;
    this._indicator = currentSlideIndicator;
    this._slides = [];

    this._renderContainer.appendChild(carousel);

    carousel.dataset.carousel = this._name + '';

    carousel.className = 'Carousel';
    carouselFrame.className = 'Carousel-frame';
    slidesStrip.className = 'Carousel-strip';
    currentSlideIndicator.className = 'Carousel-slideIndicator';

    carousel.appendChild(carouselFrame);
    carouselFrame.appendChild(currentSlideIndicator);
    carouselFrame.appendChild(slidesStrip);

    this._frameWidth = carouselFrame.clientWidth;

    if (this._loop) {


      // Clone second half of slides
      for (i = Math.ceil(this._imagesPath.length / 2); i < this._imagesPath.length; i++) {
        slide = document.createElement('div');
        slideImage = document.createElement('img');

        slide.className = 'Carousel-item cloned';
        slideImage.className = 'Carousel-itemImage';
        slideImage.setAttribute('alt', 'Cat image');
        slideImage.src = this._imagesPath[i];

        slide.appendChild(slideImage);
        slidesStrip.appendChild(slide);
        slide.slideNumber = i + 1;
        this._slides.push(slide);
      }

      // Create original slides
      for (i = 0; i < this._imagesPath.length; i++) {
        slide = document.createElement('div');
        slideImage = document.createElement('img');

        slide.className = 'Carousel-item';
        slideImage.className = 'Carousel-itemImage';
        slideImage.setAttribute('alt', 'Cat image');
        slideImage.src = this._imagesPath[i];

        slide.appendChild(slideImage);
        slidesStrip.appendChild(slide);
        slide.slideNumber = i + 1;
        this._slides.push(slide);
      }

      // Clone first half of slides
      for (i = 0; i < Math.floor(this._imagesPath.length / 2); i++) {
        slide = document.createElement('div');
        slideImage = document.createElement('img');

        slide.className = 'Carousel-item cloned';
        slideImage.className = 'Carousel-itemImage';
        slideImage.setAttribute('alt', 'Cat image');
        slideImage.src = this._imagesPath[i];

        slide.appendChild(slideImage);
        slidesStrip.appendChild(slide);
        slide.slideNumber = i + 1;
        this._slides.push(slide);
      }
    }

    this._stripWidth = this._frameWidth * this._slides.length;
    slidesStrip.style.width = this._stripWidth + 'px';

    if (this._pauseState) {
      this.constructor.createPauseState.call(this, carouselFrame);
    }
  }

  static setCarouselShift (index) {
    const shiftValue = (Math.ceil(this._imagesPath.length / 2) + (index - 1)) * this._frameWidth;
    this._strip.style.transform = `translateX(-${shiftValue})`;
    this._currentTranslate = shiftValue;
    this._indicator.innerText = `Slide #${index}`;
  }

  static runCarousel () {
    const self = this;
    const clonesQuantity = Math.floor(this._slides.length / 2);

    let currentAnimationProgress = 0;
    let animationTranslate = 0;

    this._currentSlideIndex = this._currentTranslate / this._frameWidth;
    this._firstSlideTranslate = clonesQuantity / 2 * this._frameWidth;
    this._lastSlideTranslate = this._frameWidth * (this._slides.length - 1 - clonesQuantity / 2);
    this._slides[this._currentSlideIndex].classList.add('active');

    // This function shift carousel strip to next slide,
    // input parameter is percent of shift animation (number 0-1)
    function scrollSlide (percentOfAnimation) {
      currentAnimationProgress = percentOfAnimation;
      animationTranslate = percentOfAnimation * self._frameWidth;
      self._currentTranslate = animationTranslate + self._currentSlideIndex * self._frameWidth;
      self._strip.style.transform = `translateX(-${self._currentTranslate}px)`;

      // If we reach last slide, jump on this slide clone and scroll to original slide #1
      if (self._currentTranslate > self._lastSlideTranslate) {
        self._currentTranslate = self._firstSlideTranslate - self._frameWidth + self._currentTranslate - self._lastSlideTranslate;
        self._strip.style.transform = `translateX(-${self._currentTranslate}px)`;
      }

      if (percentOfAnimation === 1) {
        self._slides[self._currentSlideIndex].classList.remove('active');
        animationTranslate = 0;

        self._currentSlideIndex = self._currentTranslate / self._frameWidth;
        self._currentSlideNumber = self._slides[self._currentSlideIndex].slideNumber;
        self._indicator.innerText = `Slide #${self._currentSlideNumber}`;
        self._slides[self._currentSlideIndex].classList.add('active');
      }
    }

    function runCarousel () {
      this._sliderIntervalID = setInterval(this.constructor.startAnimation, this._autoPlaySpeed, scrollSlide, this._slideChangeSpeed);
    }

    runCarousel.call(this);

    // Make our carousel responsive
    const makeCarouselResponsvie = new ResizeSensor(this._frame, adjustCarousel);

    function adjustCarousel () {
      const slideWidth = self._frameWidth = self._frame.clientWidth;
      self._stripWidth = slideWidth * self._slides.length;

      self._currentTranslate = animationTranslate + self._currentSlideIndex * self._frameWidth;

      self._firstSlideTranslate = clonesQuantity / 2 * self._frameWidth;
      self._lastSlideTranslate = slideWidth * (self._slides.length - clonesQuantity / 2 - 1);

      self._strip.style.width = self._stripWidth + 'px';
      self._strip.style.transform = `translateX(-${self._currentTranslate}px`;
    }
  }

  static startAnimation (animationFunction, animationDuration) {
    let animationTimeStart = performance.now();

    requestAnimationFrame(function animate (timePassed) {
      let animationPercentage = (timePassed - animationTimeStart) / animationDuration;

      // Animation percentage cant be more than 100%
      if (animationPercentage > 1) {
        animationPercentage = 1;
      }

      animationFunction(animationPercentage);

      // If the animation isn`t over we request they to the next frame
      if (animationPercentage < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  static createPauseState (container) {
    const freezeWrapper = document.createElement('div');
    const freezeCaption = document.createElement('span');
    const freezeSubCaption = document.createElement('span');

    freezeWrapper.className = 'Carousel-frozen';
    freezeCaption.className = 'Carousel-frozenCaption';
    freezeSubCaption.className = 'Carousel-frozenText';

    freezeCaption.innerText = 'The Carousel is frozen.';
    freezeSubCaption.innerText = 'Rather, remove the mouse, the kittens are cold :(';

    freezeWrapper.appendChild(freezeCaption);
    freezeWrapper.appendChild(freezeSubCaption);

    this._pauseBlock = freezeWrapper;

    container.appendChild(freezeWrapper);

    container.addEventListener('mouseenter', this.constructor.showPauseState.bind(this));
    container.addEventListener('mouseleave', this.constructor.hidePauseState.bind(this));
  }

  static showPauseState () {
    this._pauseBlock.classList.add('visible');
  }

  static hidePauseState () {
    this._pauseBlock.classList.remove('visible');
  }
}

const HW_18 = {
  task1: {
    taskItem: '',

    sliderImages: [
      '../images/slide1.jpg',
      '../images/slide2.jpg',
      '../images/slide3.jpg',
      '../images/slide4.jpg',
    ],

    sliderIntervalID: 0,

    render () {
      HW_18.clearContentContainer();

      const renderArea = document.getElementById('Content-area');

      if (this.taskItem) {
        renderArea.appendChild(this.taskItem);
        return;
      }

      const taskContainer = document.createElement('div');
      const caption = document.createElement('h4');
      const paragraphsText = [
        'Create infinite carousel',
        'This is not the simple carousel, it`s RESPONSIVE, you can ',
        'You can test it using the icon in the bottom right',
        'The slide that is shown gets class active',
        'During the creation of the carousel, clones are created will be used in the future'
      ];

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

      const carousel = new Carousel({
        name: 'Cat carousel',
        container: taskContainer,
        imagesPath: this.sliderImages,
        pauseOnHover: false,
        loop: true,
        startPosition: 1,
        autoPlaySpeed: 3000,
        speed: 500
      });

      this.taskItem = taskContainer;
      // this.renderCarousel();
      // this.runCarousel();
    },

    renderCarousel () {
      const slider = document.createElement('div');
      const sliderViewWindow = document.createElement('div');
      const sliderStrip = document.createElement('div');
      const freezeWrapper = document.createElement('div');
      const freezeCaption = document.createElement('span');
      const freezeSubCaption = document.createElement('span');

      let slideCaption = document.createElement('h4');
      let slide;
      let slideImage;
      let i;

      this.taskItem.appendChild(slider);
      this.sliderWindow = sliderViewWindow;
      slideCaption.className = 'Carousel-slideIndicator';
      slideCaption.innerText = 'Slide #1';
      sliderViewWindow.appendChild(slideCaption);

      slider.className = 'Carousel';
      sliderViewWindow.appendChild(freezeWrapper);
      freezeWrapper.className = 'Carousel-frozen';

      freezeCaption.innerText = 'The slider is frozen.';
      freezeSubCaption.innerText = 'Rather, remove the mouse, the kittens are cold :(';
      freezeCaption.className = 'Carousel-frozenCaption';
      freezeSubCaption.className = 'Carousel-frozenText';
      freezeWrapper.appendChild(freezeCaption);
      freezeWrapper.appendChild(freezeSubCaption);

      sliderViewWindow.className = 'Carousel-frame';
      sliderStrip.className = 'Carousel-strip';

      slider.appendChild(sliderViewWindow);
      sliderStrip.style.width = sliderViewWindow.clientWidth * (this.sliderImages.length + 1) + 'px'; // Strip width is our slider window
      sliderViewWindow.appendChild(sliderStrip);                                                  //width * images quantity plus additional image for loop

      for (i = 0; i <= this.sliderImages.length; i++) {
        slide = document.createElement('div');
        slide.className = 'Carousel-item';

        slideImage = document.createElement('img');
        slideImage.className = 'Carousel-itemImage';
        slideImage.draggable = false;
        slideImage.src = i === this.sliderImages.length
            ? this.sliderImages[0]
            : this.sliderImages[i];
        slideImage.setAttribute('alt', 'Slider image');

        slide.appendChild(slideImage);
        sliderStrip.appendChild(slide);
      }
    },

    runCarousel () {
      const self = this;
      const carousel = document.querySelector('.Carousel');
      const sliderStrip = document.querySelector('.Carousel-strip');
      const slides = document.querySelectorAll('.Carousel-item');
      const currentSliderCaption = document.querySelector('.Carousel-slideIndicator');
      let translateX;
      let currentSlideNumber = 0;
      let currentAnimationProgress;

      function scrollSlide (percentOfAnimation) {
        currentAnimationProgress = percentOfAnimation
        translateX = (percentOfAnimation + currentSlideNumber) * self.sliderWindow.clientWidth;
        sliderStrip.style.transform = `translateX(-${translateX}px)`;

        if (percentOfAnimation === 1) {
          currentSlideNumber++;
        }

        if (currentSlideNumber >= slides.length - 1) {
          currentSlideNumber = 0;
          translateX = 0;
        }

        currentSliderCaption.innerText = `Slider #${currentSlideNumber + 1}`;
      }

      function runCarousel () {
        self.sliderIntervalID = setInterval(self.toNextSlide, 3000, scrollSlide, 500);
      }

      runCarousel();

      // carousel.addEventListener('mouseenter', this.freezeSlider);
      // carousel.addEventListener('mouseleave', runCarousel);
      // Make our carousel responsive

      new ResizeSensor(self.sliderWindow, adjustSlider);

      function adjustSlider () {
        sliderStrip.style.width = self.sliderWindow.clientWidth * (self.sliderImages.length + 1) + 'px';
        sliderStrip.style.transform = `translateX(-${currentAnimationProgress * currentSlideNumber * self.sliderWindow.clientWidth}px`;
      }
    },

    toNextSlide (animationFunction, animationDuration) {
      let animationTimeStart = performance.now();

      requestAnimationFrame(function animate (timePassed) {
        let animationPercentage = (timePassed - animationTimeStart) / animationDuration;

        // Animation percentage cant be more than 100%
        if (animationPercentage > 1) {
          animationPercentage = 1;
        }

        animationFunction(animationPercentage);

        // If the animation isn`t over we request they to the next frame
        if (animationPercentage < 1) {
          requestAnimationFrame(animate);
        }
      });
    },

    freezeSlider () {
      clearInterval(HW_18.task1.sliderIntervalID);
    }
  },

  task2: {
    taskItem: '',
    render () {
      const self = this;
      //Prepare area to append task
      HW_18.clearContentContainer();
      // Create and define task variables
      const renderArea = document.getElementById('Content-area');

      if (this.taskItem) {
        renderArea.appendChild(this.taskItem);
        return;
      }

      const taskContainer = document.createElement('div');
      const caption = document.createElement('h4');
      const table = document.createElement('table');
      const tableWrapper = document.createElement('div');
      let tbody = document.createElement('tbody');

      tableWrapper.className = 'Task-tableWrapper';
      tableWrapper.appendChild(table);

      table.appendChild(this.getTableHead());
      table.appendChild(tbody);

      this.studentsBase.members.forEach(function (student) {
        tbody.appendChild(self.getStudentRow(student));
      });

      // Paragraphs variables
      const paragraphs = ['Create a students base table layout'];
      let paragraph;
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

      table.appendChild(tbody);

      taskContainer.appendChild(tableWrapper);

      this.taskItem = taskContainer;
    },
    getStudentRow ({id = '?', age = '?', specialization = '?', firstName = '?', lastName = '?', start = '?', finish = '?'}) {
      const tr = document.createElement('tr');
      const student = arguments[0];
      let checkbox;
      let deleteControl;
      let editControl;
      let td;
      let key;

      td = document.createElement('td');
      checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('title', 'Выделить');
      td.appendChild(checkbox);
      tr.appendChild(td);

      for (key in student) {
        td = document.createElement('td');
        td.innerText = student[key];
        tr.appendChild(td);
      }

      td = document.createElement('td');
      editControl = getEditIcon();
      td.appendChild(editControl);
      tr.appendChild(td);

      editControl.addEventListener('click', editRow);

      td = document.createElement('td');
      deleteControl = getDeleteIcon();
      td.appendChild(deleteControl);
      tr.appendChild(td);

      deleteControl.addEventListener('click', deleteRow);

      return tr;

      function getDeleteIcon () {
        let div = document.createElement('div');
        div.innerHTML = '<svg class="Task-tableIcon" height="20px" viewBox="-40 0 427 427.00131" width="20px" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<path d="m308.601562 62.300781c15.464844 0 28 12.535157 28 28 0 15.464844-12.535156 28-28 28h-270.402343c-' +
            '15.460938 0-28-12.535156-28-28 0-15.464843 12.539062-28 28-28zm0 0" fill="#00acea"/>' +
            '<path d="m308 118.703125v254.796875c0 25.089844-17.910156 43-40 43h-189.199219c-22.089843 0-40-17.' +
            '910156-40-43v-255.199219h269.199219zm0 0" fill="#00efd1"/><g fill="#083863"><path d="m232.402344 154.703125c' +
            '-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.519531 0 10-4.480469 10-10v-189c0-5.523' +
            '437-4.480469-10-10-10zm0 0"/><path d="m114.402344 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519' +
            '531 4.476562 10 10 10 5.519531 0 10-4.480469 10-10v-189c0-5.523437-4.480469-10-10-10zm0 0"/>' +
            '<path d="m28.402344 127.121094v246.378906c0 14.5625 5.335937 28.234375 14.667968 38.050781 9.28125 ' +
            '9.839844 22.203126 15.425781 35.730469 15.449219h189.199219c13.527344-.023438 26.449219-5.609375 35.7' +
            '30469-15.449219 9.332031-9.816406 14.671875-23.488281 14.671875-38.050781v-246.367188c6.503906-1.816406' +
            ' 12.445312-5.246093 17.277344-9.96875 10.8125-10.964843 14-27.347656 8.089843-41.570312-5.910156-14.22' +
            '2656-19.765625-23.519531-35.167969-23.59375h-51.199218v-12.5c.058594-10.511719-4.097656-20.605469-11.542969' +
            '-28.03125-7.441406-7.421875-17.546875-11.5546875-28.058594-11.46875h-88.800781c-10.511719-.0859375-20.617' +
            '188 4.046875-28.058594 11.46875-7.445312 7.425781-11.601562 17.519531-11.539062 28.03125v12.5h-51.203125' +
            'c-21.015625.21875-37.996094 17.210938-38.199219 38.226562.101562 17.285157 11.71875 32.378907 28.402344 3' +
            '6.894532zm239.597656 279.878906h-189.199219c-17.101562 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.' +
            '5c0 18.8125-13.300782 33.5-30.402344 33.5zm-158.597656-367.5c-.066406-5.207031 1.980468-10.21875 5.671875' +
            '-13.894531 3.695312-3.675781 8.71875-5.695313 13.925781-5.605469h88.800781c5.207031-.089844 10.230469 1.92' +
            '9688 13.925781 5.605469 3.691407 3.671875 5.738282 8.6875 5.675782 13.894531v12.5h-128zm-83.9375 37.929688c' +
            '3.355468-3.429688 7.9375-5.382813 12.734375-5.429688h270.402343c9.964844.082031 18 8.1875 18 18.152344-.' +
            '003906 4.757812-1.90625 9.316406-5.285156 12.667968-3.382812 3.351563-7.957031 5.214844-12.714844 5.17968' +
            '8h-270.402343c-9.921875.023438-17.980469-8.003906-18-17.921875-.007813-4.753906 1.886719-9.308594 5.26562' +
            '5-12.648437zm0 0"/><path d="m173.402344 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562' +
            ' 10 10 10 5.519531 0 10-4.480469 10-10v-189c0-5.523437-4.480469-10-10-10zm0 0"/></g></svg>';
        return div.firstChild
      }

      function getEditIcon () {
        let div = document.createElement('div');
        div.innerHTML = '<svg version="1.1" class="Task-tableIcon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '\t viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n' +
            '<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="26.5698" y1="258" x2="485.4302" y2="258" gradientTransform="matrix(1 0 0 -1 0 514)">\n' +
            '<stop  offset="0" style="stop-color:#00DDE6"/>\n' +
            '\t<stop  offset="0.021" style="stop-color:#03D7E6"/>\n' +
            '\t<stop  offset="0.293" style="stop-color:#25B9E6"/>\n' +
            '\t<stop  offset="0.554" style="stop-color:#36B0E6"/>\n' +
            '\t<stop  offset="0.796" style="stop-color:#4A98E6"/>\n' +
            '\t<stop  offset="1" style="stop-color:#4B96E4"/>' +
            '</linearGradient>\n' +
            '<path style="fill:url(#SVGID_1_);" d="M193.459,492c0,11.046-8.954,20-20,20H106.57c-44.112,0-80-35.888-80-80V80\n' +
            '\tc0-44.112,35.888-80,80-80h245.889c44.112,0,80,35.888,80,80v123c0,11.046-8.954,20-20,20s-20-8.954-20-20V80\n' +
            '\tc0-22.056-17.944-40-40-40H106.57c-22.056,0-40,17.944-40,40v352c0,22.056,17.944,40,40,40h66.889\n' +
            '\tC184.505,472,193.459,480.954,193.459,492z M332.459,120h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206c11.046,0,20-8.954,20-20\n' +
            '\tS343.505,120,332.459,120z M352.459,220c0-11.046-8.954-20-20-20h-206c-11.046,0-20,8.954-20,20s8.954,20,20,20h206\n' +
            '\tC343.505,240,352.459,231.046,352.459,220z M126.459,280c-11.046,0-20,8.954-20,20s8.954,20,20,20H251.57c11.046,0,20-8.954,20-20\n' +
            '\ts-8.954-20-20-20H126.459z M467.885,374.426L358.312,483.793c-2.44,2.436-5.468,4.199-8.79,5.119l-80.725,22.361\n' +
            '\tc-1.763,0.489-3.559,0.727-5.338,0.727c-5.317,0-10.501-2.123-14.317-6.034c-5.094-5.221-6.941-12.8-4.821-19.78l23.913-78.725\n' +
            '\tc0.958-3.152,2.678-6.018,5.01-8.345l109.803-109.56c23.379-23.379,61.443-23.378,84.837,0.016\n' +
            '\tC491.279,312.968,491.279,351.032,467.885,374.426z M407.428,378.254l-28.29-28.29l-74.089,73.925l-11.885,39.129l40.612-11.25\n' +
            '\tL407.428,378.254z M439.601,317.858c-7.798-7.798-20.486-7.798-28.284,0l-3.862,3.854l28.285,28.285l3.875-3.867\n' +
            '\tC447.399,338.344,447.399,325.656,439.601,317.858z"/>\n' +
            '</svg>';
        return div.firstChild;
      }

      function deleteRow () {
        this.closest('tr').parentElement.removeChild(this.closest('tr'));
      }

      function editRow () {
        const data = this.closest('tr').children;
        this.classList.toggle('editing');
        if (this.classList.contains('editing')) {
          [].forEach.call(data, function (el) {
            if (el.innerText) {
              el.innerHTML = `<input type="text" size="1" value="${el.innerText}"/>`
            }
          });
        } else {
          [].forEach.call(data, function (el) {
            if (el.firstChild.tagName === 'INPUT' && el.firstChild.type === 'text') {
              el.innerHTML = el.firstChild.value;
            }
          });
        }
      }
    },
    getTableHead () {
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      let th;

      this.tableParam.forEach(function (param) {
        th = document.createElement('th');
        th.innerText = getParamTitle(param);
        tr.appendChild(th);
      });

      thead.appendChild(tr);

      return thead;

      function getParamTitle (param) {
        let title;
        switch (param) {
          case 'pick':
            title = 'Pick student';
            break;
          case 'id':
            title = 'ID';
            break;
          case 'age':
            title = 'Age';
            break;
          case 'specialization':
            title = 'Specialization';
            break;
          case 'firstName':
            title = 'First Name';
            break;
          case 'lastName':
            title = 'Last Name';
            break;
          case 'start':
            title = 'Year of enrollment';
            break;
          case 'finish':
            title = 'Year of graduation';
            break;
          case 'delete':
            title = 'Delete student';
            break;
          case 'edit':
            title = 'Edit student';
            break;
          default:
            title = 'unknown parameter'
        }
        return title;
      }
    },
    tableParam: ['pick', 'id', 'specialization', 'firstName', 'lastName', 'age', 'start', 'finish', 'edit', 'delete'],
    studentsBase: {
      name: 'Students Base',
      members:
          [
            {
              id: 1,
              specialization: 'Философия',
              firstName: 'Егор',
              lastName: 'Гринько',
              age: 18,
              start: '2018',
              finish: '2022'
            },
            {
              id: 2,
              specialization: 'Экономика',
              firstName: 'Никита',
              lastName: 'Булькач',
              age: 19,
              start: '2014',
              finish: '2018'
            },
            {
              id: 3,
              specialization: 'Политология',
              firstName: 'Алина',
              lastName: 'Брюславец',
              age: 20,
              start: '2015',
              finish: '2019'
            },
            {
              id: 4,
              specialization: 'Менеджмент',
              firstName: 'Марина',
              lastName: 'Заец',
              age: 17,
              start: '2016',
              finish: '2020'
            },
            {
              id: 5,
              specialization: 'Кибербезапасность',
              firstName: 'Сергей',
              lastName: 'Мазница',
              age: 18,
              start: '2007',
              finish: '2011'
            },
            {
              id: 6,
              specialization: 'Туризм',
              firstName: 'Богдан',
              lastName: 'Потемкин',
              age: 21,
              start: '2009',
              finish: '2013'
            },
            {
              id: 7,
              specialization: 'Прикладная механика',
              firstName: 'Александр',
              lastName: 'Шевченко',
              age: 19,
              start: '2014',
              finish: '2018'
            },
            {
              id: 8,
              specialization: 'Химическия технологии',
              firstName: 'Евгений',
              lastName: 'Анкудинов',
              age: 22,
              start: '2003',
              finish: '2017'
            },
            {
              id: 9,
              specialization: 'Транспортныые технологии',
              firstName: 'Виталий',
              lastName: 'Кузьменко',
              age: 19,
              start: '2008',
              finish: '2012'
            },
            {
              id: 10,
              specialization: 'Правоведение',
              firstName: 'Дарина',
              lastName: 'Серяпова',
              age: 20,
              start: '2012',
              finish: '2016'
            },
            {
              id: 11,
              specialization: 'Стоматология',
              firstName: 'Эльвин',
              lastName: 'Гуйсейнов',
              age: 22,
              start: '2009',
              finish: '2013'
            }, {
            id: 12,
            specialization: 'Маркетинг',
            firstName: 'Александр',
            lastName: 'Степанов',
            age: 18,
            start: '2017',
            finish: '2021'
          }
          ]
    }
  }
  ,
  clearContentContainer: function () {
    const renderArea = document.getElementById('Content-area');
    while (renderArea.firstChild) {
      renderArea.removeChild(renderArea.firstChild);
    }
  }
};

function renderHW_18 (e) {
  const task = e.target.closest('li.Menu-item');
  let taskNumber;

  // Validate item link
  if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
    return;
  }

  taskNumber = parseInt(task.dataset.task);

  switch (taskNumber) {
    case 1:
      HW_18.task1.render();
      break;

    case 2:
      HW_18.task2.render();
      break;

    case 3:
      HW_18.task3.render();
      break;

    case 4:
      HW_18.task4.render();
      break;

    default:
      alert('This task doesn\'t exist :(');
  }
}


