let findButton = document.querySelector(".content-div button");
let weatherInput = document.querySelector(".content-div input");

findButton.addEventListener("click", function (e) {
  searchCityWeather(weatherInput.value);
});



// to find the location of the user
(async function(){
  let x = await fetch("https://ipinfo.io/json");
  let y = await x.json();
  // console.log(y); 
  searchCityWeather(y.city);

})();

async function searchCityWeather(cityName) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8dd9467353ad4fb7a99102607242801&q=${cityName}&days=3`
  );
  if (response.status == 200) {
    let responseData = await response.json();

    updateUI(responseData)
  }
}


function updateUI(responseData) {
    let parent = document.querySelector(".cards-parent");
    parent.innerHTML = setCurrentWeather(responseData.current, responseData.location) + setFutureWeather(responseData.forecast.forecastday)
}


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentWeatherDiv = document.querySelector(".current-weather");
let forecastDiv = document.querySelector(".forecast-weather");
let customParent = document.querySelector(".cards-parent");

function setCurrentWeather(current, location) {
  var date = new Date(current.last_updated);

  return `
  <div class="col-lg-4 p-0"><div class=" weather-card h-100 rounded-3">
    <div class="card-header d-flex justify-content-between py-2 px-3 rounded-top-3">
      <h3 class=" fs-5">${days[date.getDay()]}</h3>
      <h3 class=" fs-5">${date.getDate() + monthNames[date.getMonth()]}</h3>
    </div>

    <div class=" card-content p-4 rounded-bottom-3">

      <div class=" degree-number pb-5">

        <h3>${location.name}</h3>
        <span class=" fw-medium">${current.temp_c}°C</span>
        <img src="https:${current.condition.icon}" class=" p-5" alt=""/>

      </div>

      <div>
        <span class=" text-info fs-5">${current.condition.text}</span>
      </div>

      <div class=" mt-4">
        <span class=" pe-4 fs-5 ">
          <i class="fa-solid fa-umbrella text-secondary"></i>
          ${current.humidity}%
        </span>

        <span class=" pe-4 fs-5 ">
          <i class="fa-solid fa-wind text-secondary"></i>
          ${current.wind_kph}km/h

        </span>

        <span class=" pe-4 fs-5 ">
          <i class="fa-regular fa-compass text-secondary"></i>
          East
        </span>
      </div>


      </div>

    </div>
  </div>
`;
}

function setFutureWeather(forecastdays) {
  let forecastDivs = "";
  for (let i = 1; i < forecastdays.length; i++) {
    forecastDivs += `<div class="col-lg-4 p-0">
        <div class=" weather-card h-100 rounded-3 ${
          i === 1 ? "middle-card" : ""
        }">
        <div class="card-header py-2 text-center ${
          i === 1 ? "middle-card-header" : ""
        }">
          <h3 class=" fs-5 ">${
            days[new Date(forecastdays[i].date).getDay()]
          }</h3>
        </div>

        <div class=" p-4 rounded-bottom-3 text-center d-flex flex-column gap-4 ">


          <img src="https:${
            forecastdays[i].day.condition.icon
          }" alt="" width=48 class="m-auto pt-3" />
          <span class=" fs-1 fw-medium">${
            forecastdays[i].day.maxtemp_c
          }°C</span>
          <span class=" fs-5 fw-medium text-secondary">${
            forecastdays[i].day.mintemp_c
          }°</span>
          <span class=" text-info fs-5">${
            forecastdays[i].day.condition.text
          }</span>


        </div>

      </div>
      </div>
`;
  }
  return forecastDivs

//   forecastDiv.innerHTML = forecastDivs;
  //   customParent.insertAdjacentHTML('beforeend', forecastDivs)
}

// searchCityWeather("cairo");


