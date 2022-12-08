import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  let inputValue = searchBox.value;

  if (inputValue.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  if (!inputValue) {
    Notify.info('Введите название страны!');
    return;
  }

  fetchCountries(inputValue.trim()).then(data => {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }

    if (data.length <= 10) {
      createMarkupList(data);
      countryList.innerHTML = '';
    }

    if (data.length === 1) {
      createMarkupCard(data);
      countryInfo.innerHTML = '';
    }
  });
}

function createMarkupCard(arr) {
  const markup = arr
    .map(
      item => `<div class="country">
    <img class = "capital-flag" src="${item.flags.svg}" alt="${
        item.name.official
      }" width="30%"/>
    <h2 class = "country-title">Country: ${item.name.official}</h2>
    <p class = "country-text">Capital: ${item.capital}</p>
    <p class="country-text">Population: ${item.population}</p>
    <p class="country-text">Languages: ${Object.values(item.languages)}</p>
  </div>`
    )
    .join('');
  countryList.innerHTML = markup;
}

function createMarkupList(arr) {
  const markup = arr
    .map(
      item => `
    <li class = country-item>
    <img class = 'country-list__flags' src="${item.flags.svg}" alt="${item.name.official}" width="20%"/>
    <h2 class = country-list__name>${item.name.official}</h2>
    </li>
    `
    )
    .join('');
  countryInfo.innerHTML = markup;
}
