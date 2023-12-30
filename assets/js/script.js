const API_KEY = '8823600ae11757d74ec67f06b60ca5ef';
const BASE_PATH = 'http://api.openweathermap.org';
const GEO_PATH = '/geo/1.0/direct';

const testLat = 35.2272086;
const testLon = -80.8430827;

function getGeocoding() {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=Charlotte`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
}

getGeocoding();


