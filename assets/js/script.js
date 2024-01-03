const API_KEY = "8823600ae11757d74ec67f06b60ca5ef";
const BASE_PATH = "https://api.openweathermap.org";
const GEO_PATH = "/geo/1.0/direct";
const WEATHER_PATH = "/data/2.5/weather";
const FIVE_DAY_PATH = "/data/2.5/forecast";

const searchForm = document.querySelector("#city-search");
const inputEl = document.querySelector("#q");
const cityContainer = document.querySelector("#cities");
const weatherEl = document.querySelector("#current-weather");
const fiveDayContainer = document.querySelector("#five-day");

// Function to pull weather data from OpenWeather API
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

      // Show the weather cards after data is fetched
      weatherEl.classList.remove("d-none");
      fiveDayContainer.classList.remove("d-none");
    });
}

// Current Weather Function
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

      // Weather icon
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

      // Creating the image element for the weather icon
      const iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      iconImg.alt = "Weather Icon";

    // CSS FOR WEATHER ICON TEST
    iconImg.classList.add("weather-icon", "img-fluid"); 

      // Appending the weather icon to the card body
      weatherEl.appendChild(iconImg);

      const weatherData = [
        { label: "Temp", value: data.main.temp },
        { label: "Humidity", value: data.main.humidity },
        { label: "Wind", value: data.wind.speed },
      ];

      // Populate Weather Data
      weatherData.forEach((item) => {
        const lineEl = document.createElement("p");
        lineEl.textContent = `${item.label}: ${item.value}`;
        weatherEl.appendChild(lineEl);
      });
    });
  // Show Weather Card After Populating Data
  weatherEl.classList.remove("d-none");
}

// Five Day Forecast Function
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
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        const h4El = document.createElement("h4");
        h4El.textContent = formattedDate;
        h4El.className = "card-title";
        cardBody.appendChild(h4El);

        // Weather icon
        const icon = weather.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

        // Creating the image element for the weather icon
        const iconImg = document.createElement("img");
        iconImg.src = iconUrl;
        iconImg.alt = "Weather Icon";

        // Appending the weather icon to the card body
        cardBody.appendChild(iconImg);

        const dataLines = [
          { label: "Temp", value: weather.main.temp },
          { label: "Humidity", value: weather.main.humidity },
          { label: "Wind", value: weather.wind.speed },
        ];

        dataLines.forEach((item) => {
          const lineEl = document.createElement("p");
          lineEl.textContent = `${item.label}: ${item.value}`;
          cardBody.appendChild(lineEl);
        });
      }
    });
  fiveDayContainer.classList.remove("d-none");
}

// Event Listener for Search Button
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getGeocoding(inputEl.value.trim());
});

// Function to Save City to Local Storage
function saveCityToLocalStorage(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Function to Retrieve and Display Cities from Local Storage
function displayCitiesFromLocalStorage() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  cityContainer.innerHTML = "";
  cities.forEach((city) => {
    const cityButton = document.createElement("button");
    cityButton.textContent = city;
    cityButton.className = "btn btn-lg btn-secondary mb-3 w-100";
    cityButton.addEventListener("click", function () {
      getGeocoding(city);
    });
    cityContainer.appendChild(cityButton);
  });
}

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
      saveCityToLocalStorage(city);
      displayCitiesFromLocalStorage();
    });
}

displayCitiesFromLocalStorage();
