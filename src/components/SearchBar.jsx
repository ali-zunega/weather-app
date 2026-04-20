import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!input.trim() || loading) return;
    const success = await onSearch(input.trim());
    // borra solo si la búsqueda fue exitosa, para evitar perder el input en caso de error
    if (success) {
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

export default SearchBar;
