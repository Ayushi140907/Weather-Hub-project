import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">

      {/* Background Glow */}

      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>

      {/* Header */}

      <header className="appHeader">

        <h1 className="appTitle">
          🌦 WeatherHub
        </h1>

        <p className="appSubtitle">
          Beautiful • Accurate • Real-Time Weather Forecast
        </p>

      </header>

      {/* Weather Card */}

      <main className="Container">
        <Weather defaultCity="Jaipur" />
      </main>

    </div>
  );
}