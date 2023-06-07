//Elements Variable
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.getElementById('search-input')
//Background image
var shuffled_bg = ['assets/background/arseniy-chebynkin-japan-town-street-morning-fog.jpg',
'assets/background/arseniy-chebynkin-japan-town-street-night-clean-sky.jpg',
'assets/background/arseniy-chebynkin-jt-cu1.jpg',
'assets/background/street_night_by_arsenixc.jpg']
//Fetch API
const apiKey = "aba6ff9d6de967d5eac6fd79114693cc";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
//get Location (longtitude and latitude)
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates);
  } else {
    alert("Cannot get your coordinates");
  }
}
const getCoordinates = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log('latitude: ' + latitude + ' - long: ' + longitude)
  getWeather(latitude, longitude);
}
//get Weather info
const getWeather = async (latitude, longitude) => {
  let response = await fetch(apiURL + `lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);
  displayWeather(data);
}
//API request by city name
const getAPICityName = async () => {
  let cityName = document.getElementById('search-input').value;
  let response_city = await fetch(apiURL + `q=${cityName}&appid=${apiKey}`);
  let data_city = await response_city.json();
  if (!response_city.ok) {
    alert(`Weather not available at ${cityName}`);
  } else {
    displayWeather(data_city);
  }
  searchInput.value = '';
}
//update Display
const displayWeather = (data) => {
  shuffled_bg.forEach((i, index) => {
    document.body.style.background = `url('${shuffled_bg[Math.floor(shuffled_bg.length * Math.random())]}') no-repeat center fixed`;
  })
  document.querySelector('.temperature').innerHTML = Math.floor(data.main.temp - 273) + '°C';
  document.querySelector('.city-name').innerHTML = data.name + ', ' + data.sys.country;
  document.querySelector('.weather-cond').innerHTML = (data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1);
  document.querySelector('.humidity').innerHTML = "Humidity: " + data.main.humidity + '%';
  document.querySelector('.wind-speed').innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
  document.querySelector("#weather-img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

getLocation();
