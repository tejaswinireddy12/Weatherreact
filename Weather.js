// Weather.js
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "68a801117808f6390a4e5ae73c2bd2bf"; // e.g., OpenWeatherMap key

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-md rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Weather App</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
