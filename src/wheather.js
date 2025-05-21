import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const weatherData = async () => {
    if (!city.trim()) return;

    const API_KEY = "a1cb81e8491045e99e5145044250601";
    const url =`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather app</h1>
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={weatherData}>Check</button>

      {/* Display error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display weather data only if it exists */}
      {weather && (
        <div>
          <h1>{weather.location.name}</h1>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt="condition icon"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      )}
    </div>
  );
}


export default Weather;