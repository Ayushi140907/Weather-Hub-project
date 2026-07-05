import React from "react";
import WeatherTemperature from "./WeatherTemperature";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({ data }) {
  if (!data || !data.loaded) {
    return null;
  }

  return (
    <div className="WeatherInfo">

      <div className="locationSection">

        <h1 className="cityName">
          {data.city}
        </h1>

        <span className="countryName">
          {data.country}
        </span>

      </div>

      <div className="weatherTime">

        {data.date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}

        <br />

        {data.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}

      </div>

      <div className="weatherDescription">
        {data.description}
      </div>

      <div className="row align-items-center mt-4">

        <div className="col-lg-6 col-md-6 text-center">

          <WeatherIcon
            code={data.icon}
            description={data.description}
            size={110}
          />

          <WeatherTemperature
            celsius={data.temperature}
          />

        </div>

        <div className="col-lg-6 col-md-6">

          <div className="weatherData">

            <div className="infoCard">

              <div className="dataValue">
                💧 {data.humidity ?? "--"}%
              </div>

              <div className="dataDescription">
                Humidity
              </div>

            </div>

            <div className="infoCard">

              <div className="dataValue">
                🌬 {data.wind !== undefined ? Math.round(data.wind) : "--"} km/h
              </div>

              <div className="dataDescription">
                Wind Speed
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}