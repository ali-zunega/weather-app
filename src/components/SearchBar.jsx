import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "../services/weatherService";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ onSearch, loading, setError }) {
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

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 3) {
        try {
          // Intentamos obtener sugerencias
          const results = await getCitySuggestions(query);
          setSuggestions(results);
          setShowSuggestions(true);
          setError(null);
        } catch (err) {
          setSuggestions([]);
          setShowSuggestions(false);
          setError(err.message);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [query, setError]);

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
          type="search"
          id="search"
          placeholder="Ej: Mendoza, Argentina..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
        />

        <button type="submit" className="search-button" disabled={loading}>
          <span className="button-text">
            {loading ? "Buscando..." : "Buscar"}
          </span>
          <span className="button-icon">
            <AiOutlineSearch />
          </span>
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
