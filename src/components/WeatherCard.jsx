import { AiOutlineClockCircle } from "react-icons/ai";
const WeatherCard = ({ data }) => {
  const formattedTime = new Date(data.localTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`weather-card ${data.is_day ? "day" : "night"}`}>
      <div className="card-header">
        <div className="location-info">
          <h2>{data.name}</h2>
          <p>
            {data.region}, {data.country}
          </p>
        </div>
        <div className="time-badge">
          <AiOutlineClockCircle className="icon-clock" /> {formattedTime}
        </div>
      </div>

      <div className="card-body">
        <div className="temp-display">
          <img src={data.icon} alt={data.condition} className="weather-icon" />
          <span className="temp-number">{Math.round(data.temp_c)}°C</span>
        </div>
        <p className="condition-text">{data.condition}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
