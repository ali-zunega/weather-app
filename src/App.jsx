import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { AiOutlineWarning, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { TbClockSearch } from "react-icons/tb";
import {
  getWeatherByCity,
  getWeatherBackground,
} from "./services/weatherService";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import useSearchHistory from "./hooks/useSearchHistory";
import ErrorMessage from "./components/ErrorMessage";
import SearchHistory from "./components/SearchHistory";

function App() {
  const { history, saveCity } = useSearchHistory(5);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // estado para theme (light/dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const background = weather
    ? getWeatherBackground(weather.code, weather.is_day === 1)
    : "default";

  const handleSearch = async (city) => {
    // evitar múltiples búsquedas simultáneas
    if (loading) return;

    try {
      setLoading(true);

      setError(null);
      setWeather(null);

      const data = await getWeatherByCity(city);

      if (data) {
        // Si la API respondió bien, guardamos la ciudad en el historial
        saveCity(data.name);
        setWeather(data);
        return true; // indicar que la búsqueda fue exitosa
      }
    } catch (err) {
      setError(err.message);

      setWeather(null);
      return false; // indicar que hubo un error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`app ${background} ${theme} ${weather ? "has-weather" : ""}`}
    >
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? <AiOutlineSun /> : <AiOutlineMoon />}
      </button>
      <div className="weather-container">
        <div className="glass-card">
          {!weather && <h1 className="title">Weather App</h1>}
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            setError={setError}
          />

          {loading && <Loader />}
          {weather && !loading && <WeatherCard data={weather} />}
        </div>

        {/* Sección de errores e historial */}
        <section className="info-section">
          {error && <ErrorMessage errorCode={error} />}

          <SearchHistory history={history} onHistoryClick={handleSearch} />
        </section>
      </div>
    </div>
  );
}

export default App;
