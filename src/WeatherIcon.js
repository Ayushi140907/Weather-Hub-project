import React from "react";

export default function WeatherIcon(props) {

  const weatherIcons = require.context("./Images", true);

  let icon = props.code;

  if (
    ![
      "01d","01n",
      "02d","02n",
      "03d","03n",
      "04d","04n",
      "09d","09n",
      "10d","10n",
      "11d","11n",
      "13d","13n",
      "50d","50n",
    ].includes(icon)
  ) {
    icon = "01d";
  }

  return (
    <div className="WeatherIcon">
      <img
        src={weatherIcons(`./${icon}.svg`)}
        alt={props.description}
        width={props.size}
      />
    </div>
  );
}