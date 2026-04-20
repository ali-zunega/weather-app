import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { getWeatherByCity } from "./services/weatherService";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    // evitar múltiples búsquedas simultáneas
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherByCity(city);

      setWeather(data);
      return true; // indicar que la búsqueda fue exitosa
    } catch (err) {
      setError(err.message);
      setWeather(null);
      return false; // indicar que hubo un error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${weather ? "has-weather" : ""}`}>
      <div className="glass-card">
        <h1 className="title">Weather App</h1>

        <SearchBar onSearch={handleSearch} />

        {loading && <div className="loader">Cargando...</div>}
        {error && <p className="error-msg">{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="location">
              <h2>{weather.name}</h2>
              <span>{weather.country}</span>
            </div>

            <div className="temp-section">
              <img
                src={weather.icon}
                alt={weather.condition}
                className="weather-icon"
              />
              <p className="temp">{Math.round(weather.temp_c)}°C</p>
            </div>

            <p className="condition-desc">{weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
