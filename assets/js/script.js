const API_KEY = "8823600ae11757d74ec67f06b60ca5ef";
const BASE_PATH = "http://api.openweathermap.org";
const GEO_PATH = "/geo/1.0/direct";
const WEATHER_PATH = "/data/2.5/weather";
const FIVE_DAY_PATH = "/data/2.5/forecast";

const searchForm = document.querySelector("#city-search");
const inputEl = document.querySelector("#q");
const cityContainer = document.querySelector("#cities");
const weatherEl = document.querySelector("#current-weather");
const fiveDayContainer = document.querySelector("#five-day");

function getGeocoding(city) {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=${city}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      getCurrentWeather(lat, lon);
      getFiveDayForecast(lat, lon);
      const cityButton = document.createElement("button");
      cityButton.textContent = city;
      cityButton.className = "btn btn-lg btn-secondary mb-3 w-100";
      cityContainer.appendChild(cityButton);
    });
}

function getCurrentWeather(lat, lon) {
  fetch(
    `${BASE_PATH}${WEATHER_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      weatherEl.innerHTML = null;
      const h4El = document.createElement("h4");
      h4El.textContent = data.name;
      h4El.className = "card-title";
      weatherEl.appendChild(h4El);
      for (const line of [
        data.main.temp,
        data.main.humidity,
        data.wind.speed,
      ]) {
        const lineEl = document.createElement("p");
        lineEl.textContent = line;
        weatherEl.appendChild(lineEl);
      }
    });
}

function getFiveDayForecast(lat, lon) {
  fetch(
    `${BASE_PATH}${FIVE_DAY_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fiveDayContainer.innerHTML = null;

      for (let i = 3; i < data.list.length; i += 8) {
        const weather = data.list[i];
        const colEl = document.createElement("div");
        colEl.className = "col-12 col-xl";
        fiveDayContainer.appendChild(colEl);

        const cardEl = document.createElement("div");
        cardEl.className = "card m-3 p-3";
        colEl.appendChild(cardEl);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardEl.appendChild(cardBody);

      
        const date = new Date(weather.dt_txt);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const h4El = document.createElement('h4');
        h4El.textContent = formattedDate;
        h4El.className = 'card-title';
        cardBody.appendChild(h4El);


        const icon = weather.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        const iconImg = document.createElement("img");
        iconImg.src = iconUrl;
        cardBody.appendChild(iconImg);

        const dataLines = [
          weather.main.temp,
          weather.main.humidity,
          weather.wind.speed,
        ];
        for (const line of dataLines) {
          const lineEl = document.createElement("p");
          lineEl.textContent = line;
          cardBody.appendChild(lineEl);
        }
      }
    });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getGeocoding(inputEl.value.trim());
});
