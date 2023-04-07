import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
    e.preventDefault();
    const searchCountry = searchForm.value.trim();
    if (!searchCountry) {
        countryList.innerHTML = ``;
        countryInfo.innerHTML = ``;
        Notiflix.Notify.info(`Enter name of country`);
        return;
    }
    
    fetchCountries(searchCountry).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
            countryList.innerHTML = ``;
            countryInfo.innerHTML = ``;
            return;
        } else if (data.length >= 2 && data.length <= 10) {
            countryInfo.innerHTML = ``;
            return countryListInfo(data);
        } return countryCardInfo(data);
        })
        .catch(error => {
            countryList.innerHTML = ``;
            countryInfo.innerHTML = ``;
            Notiflix.Notify.failure(error.message);
        });           
}

function countryCardInfo(country){
    countryList.innerHTML = ``;
    const countriesListMarckup = country.map(({ name, flags, languages, capital, population }) =>
        `<div style="display: flex;"><img width="50px" height="auto" style="margin-right: 10px" src="${flags.svg}" alt="Flag of ${name.official}"><span style="font-size: 24px; font-weight: 700">${name.official}</span></div><div style="margin-top: 10px"><b>Capital: </b>${capital}</div><div><b>Population: </b>${population}</div></div><div><b>Languages: </b>${Object.values(languages)}</div>`).join("");
    countryInfo.innerHTML = countriesListMarckup;
}

function countryListInfo(countries) {
    countryInfo.innerHTML = ``;
    const countriesListMarckup = countries.map(({ name, flags }) => `<li style = "display: flex; gap:10px;"><img src = "${flags.svg}" alt = "flag of ${name.oficial}" width = "30px"><span>${name.common}</span></li>`).join("");
    countryList.innerHTML = countriesListMarckup;
    countryList.style.listStyle = "none";
}


