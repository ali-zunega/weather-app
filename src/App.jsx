import SearchBar from "./components/SearchBar";

function App() {
  const handleSearch = (city) => {
    console.log(`Buscando clima para: ${city}`);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
