import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { getWeatherByCity } from "./services/weatherService";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

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

        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <Loader />}
        {error && <p className="error-msg">{error}</p>}

        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default App;
