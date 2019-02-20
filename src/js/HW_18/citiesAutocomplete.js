'use strict';

class WeatherTable {
  constructor (weatherObject) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const options = ['temp_c', 'feelslike_c', 'humidity', 'precip_mm', 'pressure_mb', 'cloud', 'wind_kph'];
    let tr;
    let th;
    let td;

    table.className = 'Weather-table';
    table.appendChild(tbody);

    options.forEach((el) => {
      if (weatherObject[el]) {
        tr = document.createElement('tr');
        th = document.createElement('th');
        td = document.createElement('td');

        th.innerText = this.constructor.parseProperty(el);
        td.innerText = weatherObject[el];

        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    });

    return table;
  }

  static parseProperty (property) {
    switch (property) {
      case 'temp_c':
        return 'Temperature, °C';
      case 'feelslike_c':
        return 'Temperature feels like, °C';
      case 'humidity':
        return 'Humidity, %';
      case 'precip_mm':
        return 'Precip, mm';
      case 'pressure_mb':
        return 'Pressure, mb';
      case 'cloud':
        return 'Cloud cover, %';
      case 'wind_kph':
        return 'Wind speed, KPH';
    }
  }
}

class Popup {
  constructor ({
                 shadowID = false, // if you need shadow set id of existing shadow - string
                 shadowType = 'transparent', // transparent / night types - string
                 closeButton = true, // add close button to top left corner of popup - boolean
                 closeText = false, // add text for left, if text exist set text - string
                 popupClass = 'Popup', // moduleName for popup - string
                 popupCaption = '', // Popup heading - string
                 customBody = false, // send custom body to popup - boolean
                 bodyElement = null, // custom body - html element
               }) {
    let shadow;
    let popupTitle;
    let popupCloseText;
    let popupCloseButton;
    const popup = document.createElement('div');

    popup.className = popupClass;
    popup.dataset.popup = 'popup';

    if (shadowID) {
      shadow = document.getElementById(shadowID);
      shadow.classList.add('active');
    }

    if (popupCaption) {
      popupTitle = document.createElement('p');
      popupTitle.innerText = popupCaption;
      popupTitle.className = popupClass + '-title';
      popup.appendChild(popupTitle);
    }

    if (closeButton) {
      let closeButtonIcon = `<svg class="${popupClass}-closeButtonIcon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 475.2 475.2" style="enable-background:new 0 0 475.2 475.2;" xml:space="preserve"> <g> <g> <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6 s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7 s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7 C468.6,170.8,468.6,304.4,386.5,386.5z"/> <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1 l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4 c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"/> </g> </g> </svg>`;
      closeButtonIcon = this.constructor.toHTML(closeButtonIcon);
      popupCloseButton = document.createElement('button');
      popupCloseButton.className = popupClass + '-closeButton';
      popupCloseButton.dataset.popup = 'close';
      popupCloseButton.appendChild(closeButtonIcon);
      popup.appendChild(popupCloseButton);
    }

    if (customBody && this.constructor.isHTML(bodyElement)) {
      popup.appendChild(bodyElement);
    }

    if (closeText) {
      popupCloseText = document.createElement('p');
      popupCloseText.className = popupClass + '-closeText';
      popupCloseText.innerHTML = closeText;
      popupCloseText.dataset.popup = 'close';
    }

    document.body.appendChild(popup);

    return popup;
  }

  static isHTML (element) {
    try {
      return element instanceof HTMLElement;
    }
    catch (e) {
      return (typeof obj === "object") &&
          (element.nodeType === 1) && (typeof element.style === "object") &&
          (typeof element.ownerDocument === "object");
    }
  }

  static toHTML (string) {
    const container = new DOMParser().parseFromString(string, "text/xml");
    return container.firstChild;
  }
}

function activateCitiesAutocomplete () {
  const input = document.querySelector('[data-input=cities-search-weather]');

  const options = {
    types: ['(cities)'],
    fields: ['name', 'geometry']
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setFields();

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    input.geometry = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
  })
}

(function activateWeatherSearch () {
  const cityWeatherForm = document.querySelector('[data-form="city-weather"');
  const cityWeatherIconElem = document.querySelector('[data-container="city-weather"] > i');

  cityWeatherIconElem.addEventListener('click', showWeatherSearchForm);
  cityWeatherForm.addEventListener('submit', getForecast);
  cityWeatherForm.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
})();

function showWeatherSearchForm (e) {
  e.currentTarget.parentElement.classList.add('active');
}

function validateCityText () {
  const input = document.querySelector('[data-input="cities-search-weather"');
  const re = /^[a-z, ]*$/i;

  if (!re.test(input.value)) {
    const errorMessage = document.createElement('span');
    errorMessage.className = 'Header-weatherError';
    errorMessage.innerHTML = 'English only!';
    input.parentElement.appendChild(errorMessage);
    setTimeout(() => input.parentElement.removeChild(errorMessage), 4000);
    return false
  }

  return true;
}

function getForecast (e) {
  e.preventDefault();

  if (validateCityText()) {
    const input = document.querySelector('[data-input=cities-search-weather]');
    const place = input.value;
    const geometry = input.geometry;
    console.dir(input);

    fetch(`https://api.apixu.com/v1/current.json?key=3188df048e8949a397b180202191902&q=${geometry}`)
        .then(
            response => {
              if (response.ok) {
                return response.json();
              } else {
                throw Error(response.statusText);
              }
            }
        )
        .then(
            result => {
              renderWeatherPopup(place, result.current);
            }
        )
        .catch(
            error => {
              console.log(error);
            }
        )

  }
}

function renderWeatherPopup (place, data) {
  const weatherBlock = document.createElement('div');
  const weatherTitle = document.createElement('p');
  const weatherCondition = document.createElement('p');
  const weatherTable = new WeatherTable(data);
  let weatherPopup;

  weatherBlock.className = 'Weather';
  weatherTitle.className = 'Weather-title';
  weatherCondition.className = 'Weather-condition';

  weatherTitle.innerText = place;
  weatherCondition.innerText = 'Weather condition: ' + data.condition.text + '.';

  weatherBlock.appendChild(weatherTitle);
  weatherBlock.appendChild(weatherCondition);
  weatherBlock.appendChild(weatherTable);

  weatherPopup = new Popup({
    shadowID: 'shadow',
    customBody: true,
    bodyElement: weatherBlock
  });
}

