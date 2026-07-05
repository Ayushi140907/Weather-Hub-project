import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (props.coordinates) {
      load();
    }
    // eslint-disable-next-line
  }, [props.coordinates]);

  function handleResponse(response) {
    const daily = response.data.daily;

    const forecastData = daily.time.map((date, index) => ({
      time: new Date(date).getTime() / 1000,
      temperature: {
        maximum: daily.temperature_2m_max[index],
        minimum: daily.temperature_2m_min[index],
      },
      condition: {
        icon: "01d",
        description: "Forecast",
      },
    }));

    setForecast(forecastData);
    setLoaded(true);
  }

  function load() {
    const latitude = props.coordinates.latitude;
    const longitude = props.coordinates.longitude;

    const apiUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (!loaded) return null;

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 6).map((day, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={day} />
          </div>
        ))}
      </div>
    </div>
  );
}