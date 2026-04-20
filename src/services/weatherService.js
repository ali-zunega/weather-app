const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getWeatherByCity = async (city) => {
  await simulateDelay(1000);

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=es&aqi=no`,
  );

  if (res.status === 400 || res.status === 404) {
    throw new Error("Ciudad no encontrada");
  }
  if (res.status >= 500) {
    throw new Error("Error del servidor");
  }

  const data = await res.json();

  return {
    name: data.location.name,
    country: data.location.country,
    temp_c: data.current.temp_c,
    condition: data.current.condition.text,
    icon: `https:${data.current.condition.icon}`,
  };
};
