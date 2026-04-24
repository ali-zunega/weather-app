import { useState, useEffect } from "react";

const useSearchHistory = (limit = 5) => {
  // Inicializamos el estado directamente desde localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weather_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que el historial cambie
  useEffect(() => {
    localStorage.setItem("weather_history", JSON.stringify(history));
  }, [history]);

  const saveCity = (cityName) => {
    if (!cityName) return;

    setHistory((prev) => {
      // limpiamos duplicados
      const filtered = prev.filter(
        (city) => city.toLowerCase() !== cityName.toLowerCase(),
      );

      // se agrega al principio y limitamos cantidad
      return [cityName, ...filtered].slice(0, limit);
    });
  };

  const deleteCity = (cityName) => {
    setHistory((prev) => prev.filter((city) => city !== cityName));
  };

  const clearHistory = () => setHistory([]);

  return { history, saveCity, deleteCity, clearHistory };
};

export default useSearchHistory;
