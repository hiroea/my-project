function showCity(city) {
  let apiKey = "8d78900de96863eec7f22dd9ac02260d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(ShowSearchTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  showCity(city);
}

function getForecast(coordinates){
  let apiKey = "8d78900de96863eec7f22dd9ac02260d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function ShowSearchTemp(response) {
  document.querySelector("#input-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].icon);
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemp = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord)
}

function positionNow(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8d78900de96863eec7f22dd9ac02260d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(ShowSearchTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(positionNow);
}

function showFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement= document.querySelector("#forecast");

  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
  }

  let forecastHTML = `<div class="row">`;
 
   forecast.forEach(function (forecastDay, index) {
     if (index<6){
       forecastHTML =
         forecastHTML +
         `
            <div class="col-2" id="weather-forecast">
              <div class="weather-forecast-date">
             ${formatDay(forecastDay.dt)}
              </div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="clear sky" id="icon"
               width="45px"
            />
              <div class="weather-forecast-temp">
                <span class="temp-high">
                ${Math.round(forecastDay.temp.max)}°C
                </span>
                <br />
                 <span class="temp-low">
                ${Math.round(forecastDay.temp.min)}°C
                </span>
               </div>
               </div>
  `;
     }
   });
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
 
}



let search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

let now = new Date();
let date = now.getDate();
let dateNow = document.querySelector("#date-now");
dateNow.innerHTML = `${date}`;

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let monthNow = document.querySelector("#months-now");
monthNow.innerHTML = `${month}`;

let hour = now.getHours();
let hourNow = document.querySelector("#hours-now");
hourNow.innerHTML = `${hour}`;
if (hour > 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
let minuteNow = document.querySelector("#minutes-now");
minuteNow.innerHTML = `${minute}`;
if (minute > 10) {
  minute = `0${minute}`;
}

let year = now.getFullYear();
let yearNow = document.querySelector("#year-now");
yearNow.innerHTML = `${year}`;

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let dayNow = document.querySelector("#day-now");
dayNow.innerHTML = `${day}`;

let button = document.querySelector("#search-current");
button.addEventListener(`click`, getCurrentPosition);

let celsiusTemp = null; 

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

showCity("Tokyo");
