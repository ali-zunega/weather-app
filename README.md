# 🌦️ Weather App — Take-Home Challenge (Evaluación: 10/10)

Aplicación de clima profesional desarrollada con **React + Vite**, evaluada con la máxima puntuación en el proceso de [@IDforIdeas](https://github.com/idforideas).

Este proyecto demuestra un flujo de trabajo completo: desde el manejo de APIs externas hasta la optimización de SEO y arquitectura modular.

---

## 🚀 Demo & Deploy
- **Live Demo:** [Ver WeatherApp en Vercel](https://weather-app-alizunegas-projects.vercel.app)
- **Evaluación Final:** 10/10 ⭐

---

## 🌟 Key Features (Implementadas)

A diferencia de un MVP básico, esta app incluye:
- **🔍 Búsqueda Inteligente:** Datos precisos de temperatura, humedad y viento en tiempo real.
- **📜 Historial de Búsqueda:** Persistencia de datos localmente para acceso rápido a ciudades recientes (Custom Hook).
- **🎭 UI Dinámica:** Fondos adaptativos que cambian según el código de clima y la hora del día (Día/Noche).
- **🌓 Dark Mode Nativo:** Respetando las preferencias del sistema y con persistencia en LocalStorage.
- **⚠️ Robust Error Handling:** Gestión de errores específica (ciudad no encontrada, fallos de API, etc.) con feedback visual claro.

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Frontend:** React (Hooks: useState, useEffect, useMemo).
- **Tooling:** Vite, ESLint.
- **Estilos:** CSS puro (Variables CSS para Tematización).
- **Arquitectura:** Modular basada en componentes, servicios y hooks personalizados para una alta escalabilidad.

---

## 📁 Estructura del Proyecto

```bash
src/
 ├── components/    # Arquitectura basada en componentes atómicos
 ├── services/       # Capa de abstracción para la API (OpenWeather)
 ├── hooks/          # Lógica reutilizable (useSearchHistory, etc.)
 ├── utils/          # Funciones puras de ayuda
 ├── assets/         # Recursos estáticos
 ├── App.jsx         # Orquestador principal
 └── main.jsx        # Punto de entrada
```

---

## 📈 Resultado de la Evaluación
Puntuación: 10/10

“Has implementado un manejo de errores específico y claro... La organización del código es clara y modular, facilitando la comprensión y mantenimiento del proyecto.”

---

## 📌 Próximos Pasos
[ ] Implementación de Geolocalización (detección automática).

[ ] Gráficos de pronóstico extendido para los próximos 5 días.

---

## 🤝 Autor
Alicia Zuñega - [LinkedIn](https://www.linkedin.com/in/alicialzunegamza) | [GitHub](https://github.com/ali-zunega)
