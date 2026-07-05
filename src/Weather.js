import React, { useState, useEffect } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

import "./Weather.css";

export default function Weather(props) {

  const [weatherData, setWeatherData] = useState({ loaded: false });
  const [city, setCity] = useState(props.defaultCity);



function search() {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  axios.get(url).then((response) => {
    if (!response.data.results) {
      alert("City not found");
      return;
    }

    const place = response.data.results[0];

    searchWeather(place.latitude, place.longitude, place.name, place.country);
  });
}
  
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  function searchLocation(position) {
  searchWeather(
    position.coords.latitude,
    position.coords.longitude,
    "Current Location",
    ""
  );
}
  function currentLocation() {
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  function getWeatherDescription(code) {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 99) return "Thunderstorm";
  return "Weather";
}

function getWeatherIcon(code) {
  if (code === 0) return "01d";
  if (code >= 1 && code <= 3) return "02d";
  if (code >= 45 && code <= 48) return "50d";
  if (code >= 51 && code <= 67) return "10d";
  if (code >= 71 && code <= 77) return "13d";
  if (code >= 80 && code <= 99) return "11d";
  return "01d";
}
  function searchWeather(latitude, longitude, cityName, countryName) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

  axios.get(url).then((response) => {

  console.log(response.data);
  console.log(response.data.current);

  const current = response.data.current;

  setWeatherData({
    loaded: true,
    date: new Date(current.time),
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    city: cityName,
    country: countryName,
    coordinates: {
      latitude,
      longitude,
    },
    description: getWeatherDescription(current.weather_code),
    icon: getWeatherIcon(current.weather_code),
  });

});
}

if (!weatherData.loaded) {
  return (
    <div className="Weather">
      <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </p>
    </div>
  );
}


return (
  <div className="Weather">

    <div className="weatherContainer">

      <form onSubmit={handleSubmit} className="searchForm">

        <div className="searchBox">

      <input
  className="searchInput"
  type="search"
  placeholder="Search city..."
  autoComplete="off"
  autoFocus
  value={city}
  onChange={changeCity}
  aria-label="Search City"
/>

          <button
            type="submit"
            className="searchBtn"
            title="Search"
          >
            🔍
          </button>

          <button
            type="button"
            className="locationBtn"
            onClick={currentLocation}
            title="Current Location"
          >
            📍
          </button>

        </div>

      </form>

      <div className="todayInfo">

        <h2>Today's Weather</h2>

        <p>
          {weatherData.date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p>
          {weatherData.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

      </div>

      <WeatherInfo data={weatherData} />

      <div className="forecastText">
        7-Day Forecast • {weatherData.city}
      </div>

      <WeatherForecast
        coordinates={weatherData.coordinates}
      />

    </div>

    <footer className="weatherFooter">

      <h4>🌦 WeatherHub</h4>

      <p>Modern Weather Dashboard</p>

      <div className="footerLine"></div>

      <span>Designed & Developed by</span>

      <h6>Ayushi Kumari</h6>

      <small>Built with React • Axios • Bootstrap</small>

      <small>© 2026 WeatherHub</small>

    </footer>

  </div>
);
}