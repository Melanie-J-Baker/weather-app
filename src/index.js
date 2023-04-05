import "./style.css";
//import image from '.image.png'; (put images in src folder)

async function defaultData() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eabfe4bec5494c7f88485950232903&q=London`,
      { mode: "cors" }
    );
    const data = await response.json();
    const weatherData = {
      location: data.location.name,
      time: data.location.localtime,
      desc: data.current.condition.text,
      icon: data.current.condition.icon,
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      feelslikeC: data.current.feelslike_c,
      feelslikeF: data.current.feelslike_f,
      wind: data.current.wind_mph,
      gust: data.current.gust_mph,
      rain: data.current.precip_mm,
      humidity: data.current.humidity,
      day: data.current.is_day,
    };
    createNowDisplay(weatherData.location, weatherData.time, weatherData.icon);
  } catch (err) {
    alert(err);
    //mainIcon.src = DEFAULT IMAGE
  }
}

async function getData() {
  const searchInput = document.querySelector("#search");
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eabfe4bec5494c7f88485950232903&q=${searchInput.value}`,
      { mode: "cors" }
    );
    const data = await response.json();
    const weatherData = {
      location: data.location.name,
      time: data.location.localtime,
      desc: data.current.condition.text,
      icon: data.current.condition.icon,
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      feelslikeC: data.current.feelslike_c,
      feelslikeF: data.current.feelslike_f,
      wind: data.current.wind_mph,
      gust: data.current.gust_mph,
      rain: data.current.precip_mm,
      humidity: data.current.humidity,
      day: data.current.is_day,
    };
    createNowDisplay(weatherData.location, weatherData.time, weatherData.icon);
  } catch (err) {
    alert(err);
    //mainIcon.src = DEFAULT IMAGE
  }
}

function createListeners() {
  const searchBtn = document.querySelector("#search-btn");
  const searchInput = document.querySelector("#search");
  searchBtn.addEventListener("click", () => {
    if (searchInput.value !== "") {
      getData();
      createNowDisplay();
    } else {
      defaultData();
      createNowDisplay();
    }
  });
}

function createNowDisplay(location, time, icon) {
  const locationDiv = document.querySelector("#location");
  const timeDiv = document.querySelector("#time");
  const mainIcon = document.querySelector("#main-icon");

  locationDiv.textContent = location;
  timeDiv.textContent = time;
  mainIcon.src = icon;
}

createListeners();
defaultData();
createNowDisplay();
