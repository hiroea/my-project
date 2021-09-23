function showCity() {
  let city = document.querySelector("#search-city").value;
  let apiKey = "8d78900de96863eec7f22dd9ac02260d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(ShowSearchTemp);
}

function handleSubmit(event) {
event.preventDefault();
 let city = document.querySelector("#search-city").value;
showCity(city);
}

let search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

function ShowSearchTemp(response) {
 document.querySelector("#input-city").innerHTML = response.data.name;
 document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
 document.querySelector("#description").innerHTML = response.data.weather[0].main;
 document.querySelector("#temp-max").innerHTML = Math.round(response.data.main.temp_max);
 document.querySelector("#temp-min").innerHTML = Math.round(response.data.main.temp_min);
}
 
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
  "Dec"
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

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
let day = days[now.getDay()];
let dayNow = document.querySelector("#day-now");
dayNow.innerHTML = `${day}`;

function positionNow(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8d78900de96863eec7f22dd9ac02260d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(ShowSearchTemp);
}

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(positionNow);
}

let button = document.querySelector("#search-current")
button.addEventListener(`click`, getCurrentPosition);

showCity("Tokyo");