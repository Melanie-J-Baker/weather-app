import "./style.css";
import { format, parseISO } from "date-fns";

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
      time: data.location.localtime_epoch,
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
      weatherData.gust,
      weatherData.day,
      weatherData.time
    );
    changeTempListener(
      weatherData.tempC,
      weatherData.tempF,
      weatherData.feelslikeC,
      weatherData.feelslikeF
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
      time: data.location.localtime_epoch,
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
      weatherData.gust,
      weatherData.day,
      weatherData.time
    );
    changeTempListener(
      weatherData.tempC,
      weatherData.tempF,
      weatherData.feelslikeC,
      weatherData.feelslikeF
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

  // Execute search when user releases enter on the keyboard
  searchInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      searchBtn.click();
    }
  });
}

function changeTempListener(tempC, tempF, feelsC, feelsF) {
  const radioC = document.querySelector("#temp-c");
  const radioF = document.querySelector("#temp-f");
  const tempDiv = document.querySelector("#temp");
  const feelsDiv = document.querySelector("#feels");

  radioF.addEventListener("click", () => {
    tempDiv.textContent = tempF + String.fromCodePoint(8457);
    feelsDiv.textContent = feelsF + String.fromCodePoint(8457);
  });

  radioC.addEventListener("click", () => {
    tempDiv.textContent = tempC + String.fromCodePoint(8451);
    feelsDiv.textContent = feelsC + String.fromCodePoint(8451);
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
  gusts,
  day,
  time
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

  if (code === 1003 || code === 1006) {
    console.log(code);
    nowDiv.className = "";
    nowDiv.className = "cloudy";
  } else if (day === 0) {
    nowDiv.className = "";
    nowDiv.className = "night";
  } else if (code === 1009 || code === 1030 || code === 1135 || code === 1147) {
    nowDiv.className = "";
    nowDiv.className = "overcast";
  } else if (
    code === 1063 ||
    code === 1150 ||
    code === 1072 ||
    code === 1153 ||
    code === 1180 ||
    code === 1183 ||
    code === 1186 ||
    code === 1189 ||
    code === 1192 ||
    code === 1195 ||
    code === 1168 ||
    code === 1171 ||
    code === 1198 ||
    code === 1201 ||
    code === 1240 ||
    code === 1243 ||
    code === 1246
  ) {
    nowDiv.className = "";
    nowDiv.className = "rain";
  } else if (
    code === 1066 ||
    code === 1069 ||
    code === 1114 ||
    code === 1117 ||
    code === 1204 ||
    code === 1207 ||
    code === 1210 ||
    code === 1213 ||
    code === 1216 ||
    code === 1219 ||
    code === 1222 ||
    code === 1225 ||
    code === 1237 ||
    code === 1249 ||
    code === 1252 ||
    code === 1255 ||
    code === 1258 ||
    code === 1261 ||
    code === 1264
  ) {
    nowDiv.className = "";
    nowDiv.className = "snow";
  } else if (
    code === 1087 ||
    code === 1273 ||
    code === 1276 ||
    code === 1279 ||
    code === 1282
  ) {
    nowDiv.className = "";
    nowDiv.className = "storm";
  } else if (code === 1000) {
    nowDiv.className = "";
    nowDiv.className = "sunny";
  } else {
    nowDiv.className = "";
    nowDiv.className = "night";
  }

  locationDiv.textContent = location;
  console.log(time);
  let date = new Date(time * 1000);
  console.log(date);
  timeDiv.textContent = format(date, "EEEE hh:mmaaaaa'm'");
  mainIcon.src = icon;
  descDiv.textContent = desc;
  tempDiv.textContent = temp + String.fromCodePoint(8451);
  feelsDiv.textContent = "Feels like " + feelTemp + String.fromCodePoint(8451);
  precipDiv.textContent = `Precipitation: ${precip}mm`;
  humidityDiv.textContent = `Humidity: ${humidity}%`;
  windDiv.textContent = `Wind speed: ${wind}mph`;
  gustsDiv.textContent = `(Gusts of up to: ${gusts}mph)`;
}

defaultData();
createListeners();
createNowDisplay();
