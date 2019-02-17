function activateCitiesAutocomplete() {
  const input = document.querySelector('[data-input="cities-search-weather"');

   const options = {
    types: ['(cities)'],
    fields: ['place_id', 'name']
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setFields(['name']);
}

const cityWeatherElem = document.querySelector('[data-container="city-weather"');

const cityWeatherIconElem = document.querySelector('[data-container="city-weather"] > i');

cityWeatherIconElem.addEventListener('click', showWeatherSearchForm);

function showWeatherSearchForm (e) {
  e.currentTarget.parentElement.classList.add('active');
}