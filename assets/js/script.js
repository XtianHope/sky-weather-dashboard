const API_KEY = '8823600ae11757d74ec67f06b60ca5ef';
const BASE_PATH = 'http://api.openweathermap.org';
const GEO_PATH = '/geo/1.0/direct';
const WEATHER_PATH = '/data/2.5/weather';
const FIVE_DAY_PATH= '/data/2.5/forecast';

const searchForm = document.querySelector('#city-search');
const inputEl = document.querySelector('#q');
const cityContainer = document.querySelector('#cities');
const weatherEl = document.querySelector('#current-weather');
const fiveDayContainer = document.querySelector('#five-day');


const testLat = 35.2272086;
const testLon = -80.8430827;
const testCity = 'Charlotte';

function getGeocoding() {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=${testCity}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
}

function getCurrentWeather() {
    fetch(`${BASE_PATH}${WEATHER_PATH}?appid=${API_KEY}&lat=${testLat}&lon=${testLon}&units=imperial`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }

  function getFiveDayForecast() {
    fetch(`${BASE_PATH}${FIVE_DAY_PATH}?appid=${API_KEY}&lat=${testLat}&lon=${testLon}&units=imperial`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }

