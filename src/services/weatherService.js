const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCitySuggestions = async (query) => {
  if (!query || query.length < 3) return [];

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`,
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error buscando sugerencias:", err);
    return [];
  }
};

export const getWeatherByCity = async (idOrName) => {
  await simulateDelay(1000); // simula un retraso de 1 segundo
  // utilizamos id para la busqueda
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${idOrName}&lang=es`,
  );

  if (!res.ok) throw new Error("Ciudad no encontrada");

  const data = await res.json();

  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    temp_c: Math.round(data.current.temp_c),
    condition: data.current.condition.text,
    code: data.current.condition.code,
    is_day: data.current.is_day,
    icon: `https:${data.current.condition.icon}`,
  };
};

// funcion para obtener el background
// segun el codigo del clima y si es de dia o de noche
export const getWeatherBackground = (code, isDay) => {
  if ([1000].includes(code)) {
    return isDay ? "sunny-day" : "clear-night";
  }

  if ([1003, 1006, 1009].includes(code)) {
    return isDay ? "cloudy-day" : "cloudy-night";
  }

  if ([1063, 1180, 1183, 1186, 1189].includes(code)) {
    return "rainy";
  }

  if ([1210, 1213, 1216].includes(code)) {
    return "snow";
  }

  return "default";
};
