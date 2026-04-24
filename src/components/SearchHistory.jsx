import { TbClockSearch } from "react-icons/tb";

function SearchHistory({ history, onHistoryClick }) {
  if (history.length === 0) return null;

  return (
    <div className="history-section">
      <div className="history-header">
        <TbClockSearch className="icon-search-clock" />
        <p className="history-title">Búsquedas recientes:</p>
      </div>
      <div className="history-container">
        {history.map((cityName, index) => (
          <button
            key={index}
            className="history-pill"
            onClick={() => onHistoryClick(cityName)}
          >
            {cityName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
