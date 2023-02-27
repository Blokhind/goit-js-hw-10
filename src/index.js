import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/apiCountry';
// import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listCountryRef = document.querySelector('.country-list');
const countryRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, 300));

function onInput(event) {
  const value = event.target.value.trim();
  if (!value) {
    listCountryRef.innerHTML = '';
    countryRef.innerHTML = '';
    Notiflix.Notify.failure('Please enter your country!');
    return;
  }
  fetchCountries(value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      } else {
        renderCountry(countries[0]);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name!')
    );
}
function renderCountryList(countries) {
  listCountryRef.innerHTML = '';
  countryRef.innerHTML = '';
  const markup = countries
    .map(
      country =>
        `<li class="country-item"><img alt="${country.name.official}" src="${country.flags.svg}" width='100' heigth='150'><h2>${country.name.official}</h2></li>`
    )
    .join('');
  listCountryRef.insertAdjacentHTML('afterbegin', markup);
}
function renderCountry(country) {
  listCountryRef.innerHTML = '';
  countryRef.innerHTML = '';
  const markup = `<img alt="${country.name.official}" src="${
    country.flags.svg
  }" width='100' heigth='150'><h2>${country.name.official}</h2><p>${
    country.capital
  }</p><p>${country.population}</p><p>${Object.values(country.languages)}</p>`;
  countryRef.insertAdjacentHTML('afterbegin', markup);
}
