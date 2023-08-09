import React, { useState } from "react";
import axios from "axios";
export default function Weather() {
  let [city, setCity] = useState("");
  let [submit, setSubmit] = useState(false);
  let [weather, setWeather] = useState({});
  function showWeather(response) {
    setSubmit(true);
    setWeather({
      temp: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function searchCity(event) {
    event.preventDefault();
    let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={searchCity}>
      <input type="search" onChange={changeCity} />
      <input type="submit" value="search" />
    </form>
  );
  if (submit) {
    return (
      <div>
        {form}

        <div>Temperature: {Math.round(weather.temp)}</div>
        <div>Description: {weather.description}</div>
        <div>Humidity: {weather.humidity}%</div>
        <div>wind: {weather.wind}km/h</div>
        <div>
          <img src={weather.icon} alt="Weather Icon" />
        </div>
      </div>
    );
  } else {
    return form;
  }
}
