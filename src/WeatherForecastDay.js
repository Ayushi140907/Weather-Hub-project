import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    return Math.round(props.data.temperature.maximum);
  }

  function minTemperature() {
    return Math.round(props.data.temperature.minimum);
  }

  function day() {
    const date = new Date(props.data.time * 1000);

    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    return days[date.getDay()];
  }

  return (
    <div className="WeatherForecastDay">

      <div className="WeatherForecastDay-card">

        <div className="WeatherForecastDay-day">

          {day()}

        </div>

        <div className="forecastIcon">

          <WeatherIcon
            code={props.data.condition.icon}
            description={props.data.condition.description}
            size={58}
          />

        </div>

        <div className="forecastTemp">

          <span className="forecastMax">
            {maxTemperature()}°
          </span>

          <span className="forecastMin">
            {minTemperature()}°
          </span>

        </div>

      </div>

    </div>
  );
}