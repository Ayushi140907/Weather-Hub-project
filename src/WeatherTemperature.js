import React, { useState } from "react";

export default function WeatherTemperature({ celsius }) {
  const [unit, setUnit] = useState("celsius");

  if (celsius === undefined || celsius === null) return null;

  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <div className="WeatherTemperature">

      <span className="WeatherTemperature-value">
        {unit === "celsius"
          ? Math.round(celsius)
          : Math.round(fahrenheit)}
      </span>

      <span className="WeatherTemperature-degree">°</span>

      <span className="WeatherTemperature-unit">

        <a
          href="/"
          className={unit === "celsius" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setUnit("celsius");
          }}
        >
          C
        </a>

        {" | "}

        <a
          href="/"
          className={unit === "fahrenheit" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setUnit("fahrenheit");
          }}
        >
          F
        </a>

      </span>

    </div>
  );
}