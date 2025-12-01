import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};

export const getForecast = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        // Process forecast data to get daily summary if needed, or return as is
        // The free API returns 3-hour forecast for 5 days
        return response.data.list;
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};

export const getAlerts = async (lat, lon) => {
    // OpenWeatherMap One Call API (alerts) requires a paid subscription or separate endpoint.
    // For now, we'll keep the mock alerts or return empty if preferred.
    // Returning mock alerts for demonstration purposes.
    return [
        {
            sender_name: "IMD",
            event: "Heavy Rain",
            start: Date.now(),
            end: Date.now() + 86400000,
            description: "Heavy rainfall expected in the next 24 hours. Farmers are advised to ensure proper drainage."
        }
    ];
};

