import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaGlobe,
  FaKey,
} from "react-icons/fa";

const ErrorMessage = ({ errorCode }) => {
  const errors = {
    CITY_NOT_FOUND: {
      title: "Ciudad no encontrada",
      message: "Revisa que el nombre esté bien escrito e intenta de nuevo.",
      icon: <FaMapMarkerAlt size={24} color="#ff6b6b" />,
    },
    NETWORK_ERROR: {
      title: "Sin conexión",
      message: "Parece que hay un problema con tu internet.",
      icon: <FaGlobe size={24} color="#ff6b6b" />,
    },
    API_KEY_ERROR: {
      title: "Error de configuración",
      message: "Hay un problema con la API Key del servicio.",
      icon: <FaKey size={24} color="#ff6b6b" />,
    },
    DEFAULT: {
      title: "Ups, algo salió mal",
      message: "No pudimos obtener el clima. Intenta más tarde.",
      icon: <FaExclamationTriangle size={24} color="#ff6b6b" />,
    },
  };

  const { title, message, icon } = errors[errorCode] || errors.DEFAULT;

  return (
    <div className="error-container">
      <span className="error-icon">{icon}</span>
      <div className="error-text">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
