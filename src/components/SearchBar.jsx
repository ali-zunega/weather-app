import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "../services/weatherService";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const isSelectingRef = useRef(false);

  // click fuera de las sugerencias para cerrarlas
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 3) {
        const results = await getCitySuggestions(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [query]);

  const handleSelect = (city) => {
    isSelectingRef.current = true;
    // nombre en formato amigable al usuario
    setQuery(`${city.name}, ${city.region}`);

    // enviamos city en url completo
    // Esto garantiza que traiga exactamente esa ubicación.
    onSearch(city.url);

    // Vaciamos sugerencias y cerramos la lista
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container" ref={suggestionsRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Ej: Mendoza, Argentina..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Solo mostramos si hay sugerencias y el estado showSuggestions es true */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li key={city.id} onClick={() => handleSelect(city)}>
              <strong>{city.name}</strong>
              <span className="region-text">
                {" "}
                - {city.region}, {city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
