const WeatherCard = ({ data }) => {
  return (
    <div className="weather-info">
      <div className="location">
        <h2>{data.name}</h2>
        <span>
          {data.region}, {data.country}
        </span>
      </div>

      <div className="temp-section">
        <img src={data.icon} alt={data.condition} className="weather-icon" />
        <p className="temp">{Math.round(data.temp_c)}°C</p>
      </div>

      <p className="condition-desc">{data.condition}</p>
    </div>
  );
};

export default WeatherCard;
