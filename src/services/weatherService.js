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
    icon: `https:${data.current.condition.icon}`.replace("64x64", "128x128"),
    localTime: data.location.localtime,
  };
};

// funcion para obtener el background
// segun el codigo del clima y si es de dia o de noche
export const getWeatherBackground = (code, isDay) => {
  // despejado
  const clearCodes = [1000];

  // nubes
  const cloudyCodes = [1003, 1006, 1009];

  // neblina
  const mistCodes = [1030, 1135, 1147];

  // lluvia
  const rainCodes = [
    1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
  ];

  // nieve
  const snowCodes = [
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
  ];

  // tormentas
  const thunderCodes = [1087, 1273, 1276, 1279, 1282];

  if (clearCodes.includes(code)) {
    return isDay ? "sunny-day" : "clear-night";
  }

  if (cloudyCodes.includes(code)) {
    return isDay ? "cloudy-day" : "cloudy-night";
  }

  if (mistCodes.includes(code)) {
    return "misty";
  }

  if (rainCodes.includes(code)) {
    return "rainy";
  }

  if (snowCodes.includes(code)) {
    return "snow";
  }

  if (thunderCodes.includes(code)) {
    return "tunder-storm";
  }

  return isDay ? "sunny-day" : "clear-night"; // Default según horario
};
