import React, { useEffect, useState } from 'react';
import { getWeather } from '../services/weatherService';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WeatherCard = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Default to Punjab coordinates if no location provided
                const lat = location?.coordinates?.[1] || 31.1471;
                const lon = location?.coordinates?.[0] || 75.3412;
                console.log("Fetching weather for:", lat, lon);
                const data = await getWeather(lat, lon);
                setWeather(data);
                setError(null);
            } catch (error) {
                console.error("Failed to load weather", error);
                const msg = error.response?.data?.message || error.message || "Failed to load weather data";
                setError(`Error: ${msg}. Status: ${error.response?.status}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 rounded-xl shadow-md p-6 text-red-800 border border-red-200">
                <h3 className="font-bold">Weather Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold">{weather.name}</h3>
                    <p className="text-blue-100 capitalize">{weather.weather[0].description}</p>
                </div>
                <Cloud size={48} className="text-blue-100" />
            </div>

            <div className="flex items-center mb-8">
                <span className="text-6xl font-bold">{Math.round(weather.main.temp)}°</span>
                <div className="ml-4">
                    <div className="flex items-center text-blue-100 mb-1">
                        <Thermometer size={16} className="mr-1" />
                        <span>High: {Math.round(weather.main.temp + 2)}°</span>
                    </div>
                    <div className="flex items-center text-blue-100">
                        <Thermometer size={16} className="mr-1" />
                        <span>Low: {Math.round(weather.main.temp - 2)}°</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-3 flex items-center">
                    <Droplets size={24} className="mr-3 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">{t('weather.humidity')}</p>
                        <p className="font-semibold">{weather.main.humidity}%</p>
                    </div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 flex items-center">
                    <Wind size={24} className="mr-3 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">{t('weather.windSpeed')}</p>
                        <p className="font-semibold">{weather.wind.speed} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
