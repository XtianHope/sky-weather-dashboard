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
        weatherEl.innerHTML = null;
        const h4El = document.createElement('h4');
        h4El.textContent = data.name;
        h4El.className = 'card-title';
        weatherEl.appendChild(h4El);
        for (const line of [data.main.temp, data.main.humidity, data.wind.speed]) {
            const lineEl = document.createElement('p');
            lineEl.textContent = line;
            weatherEl.appendChild(lineEl);
        }
      });
  }



  function getFiveDayForecast() {
    fetch(`${BASE_PATH}${FIVE_DAY_PATH}?appid=${API_KEY}&lat=${testLat}&lon=${testLon}&units=imperial`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fiveDayContainer.innerHTML = ''; // Clear the container before adding new content
  
        for (let i = 0; i < data.list.length; i += 8) {
          const weather = data.list[i];
          const colEl = document.createElement('div');
          colEl.className = 'col-12 col-xl';
          fiveDayContainer.appendChild(colEl);
  
          const cardEl = document.createElement('div');
          cardEl.className = 'card m-3 p-3';
          colEl.appendChild(cardEl);
  
          const cardBody = document.createElement('div');
          cardBody.className = 'card-body';
          cardEl.appendChild(cardBody);
  
          const h4El = document.createElement('h4');
          h4El.textContent = weather.dt_txt;
          h4El.className = 'card-title';
          cardBody.appendChild(h4El);
  
          const dataLines = [weather.main.temp, weather.main.humidity, weather.wind.speed];
          for (const line of dataLines) {
            const lineEl = document.createElement('p');
            lineEl.textContent = line;
            cardBody.appendChild(lineEl);
          }
        }
      });
  }

  getFiveDayForecast();