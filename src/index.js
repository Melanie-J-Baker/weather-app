import "./style.css";
import { format } from "date-fns";
import rain from "./assets/rain.jpg";

async function defaultData() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eabfe4bec5494c7f88485950232903&q=London`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    const weatherData = {
      location: data.location.name,
      time: data.location.localtime,
      desc: data.current.condition.text,
      icon: data.current.condition.icon,
      code: data.current.condition.code,
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
    createNowDisplay(
      weatherData.code,
      weatherData.location,
      weatherData.icon,
      weatherData.desc,
      weatherData.tempC,
      weatherData.feelslikeC,
      weatherData.rain,
      weatherData.humidity,
      weatherData.wind,
      weatherData.gust
    );
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
      code: data.current.condition.code,
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
    createNowDisplay(
      weatherData.code,
      weatherData.location,
      weatherData.icon,
      weatherData.desc,
      weatherData.tempC,
      weatherData.feelslikeC,
      weatherData.rain,
      weatherData.humidity,
      weatherData.wind,
      weatherData.gust
    );
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

function createNowDisplay(
  code,
  location,
  icon,
  desc,
  temp,
  feelTemp,
  precip,
  humidity,
  wind,
  gusts
) {
  const nowDiv = document.querySelector("#now");
  const locationDiv = document.querySelector("#location");
  const timeDiv = document.querySelector("#time");
  const mainIcon = document.querySelector("#main-icon");
  const descDiv = document.querySelector("#desc");
  const tempDiv = document.querySelector("#temp");
  const feelsDiv = document.querySelector("#feels");
  const precipDiv = document.querySelector("#precip");
  const humidityDiv = document.querySelector("#humidity");
  const windDiv = document.querySelector("#wind");
  const gustsDiv = document.querySelector("#gusts");

  if (code === 1003) {
    console.log(code);
    nowDiv.style.backgroundImage = "url('assets/cloudy.jpg')";
    //"url(<%=require('../src/assets/rain.jpg')%>)"
  }
  locationDiv.textContent = location;
  timeDiv.textContent = format(new Date(), "EEEE hh:mmaaaaa'm'");
  mainIcon.src = icon;
  descDiv.textContent = desc;
  tempDiv.textContent = temp + String.fromCodePoint(8451);
  feelsDiv.textContent = "Feels like " + feelTemp + String.fromCodePoint(8451);
  precipDiv.textContent = `Precipitation: ${precip}mm`;
  humidityDiv.textContent = `Humidity: ${humidity}%`;
  windDiv.textContent = `Wind speed: ${wind}mph`;
  gustsDiv.textContent = `Gusts of up to: ${gusts}mph`;
}

defaultData();
createListeners();
createNowDisplay();
