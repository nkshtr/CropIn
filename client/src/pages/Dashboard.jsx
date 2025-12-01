import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import WeatherAlert from '../components/WeatherAlert';
import { getAlerts } from '../services/weatherService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await getAlerts();
                setAlerts(data);
            } catch (error) {
                console.error("Failed to fetch alerts", error);
            }
        };
        fetchAlerts();
    }, []);

    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post('http://localhost:5000/api/upload', formData, config);
            alert('Profile picture updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Upload failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-green-800">Cropin</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <div
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                onClick={() => setShowProfileModal(true)}
                            >
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border border-green-200">
                                    {user?.profilePicture ? (
                                        <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-green-700 font-bold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                                    )}
                                </div>
                                <span className="text-gray-700 hidden sm:block font-medium">{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                {t('dashboard.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <WeatherAlert alerts={alerts} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Weather Section */}
                        <div className="md:col-span-1">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t('dashboard.liveWeather')}</h2>
                            <WeatherCard location={user?.location} />
                        </div>

                        {/* Other Sections */}
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Soil Testing Card */}
                                <div
                                    onClick={() => navigate('/soil-testing')}
                                    className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition border border-transparent hover:border-green-200"
                                >
                                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.soilTesting')}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t('dashboard.soilTestingDesc')}</p>
                                </div>

                                {/* Pest Detection Card */}
                                <div
                                    onClick={() => navigate('/pest-detection')}
                                    className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition border border-transparent hover:border-green-200"
                                >
                                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.pestDetection')}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t('dashboard.pestDetectionDesc')}</p>
                                </div>

                                {/* Crop Advisory Card */}
                                <div
                                    onClick={() => navigate('/crop-advisory')}
                                    className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition border border-transparent hover:border-green-200"
                                >
                                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.cropAdvisory')}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t('dashboard.cropAdvisoryDesc')}</p>
                                </div>

                                {/* Market Prices Card */}
                                <div
                                    onClick={() => navigate('/market-prices')}
                                    className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition border border-transparent hover:border-green-200"
                                >
                                    <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.marketPrices')}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t('dashboard.marketPricesDesc')}</p>
                                </div>

                                {/* Government Schemes Card */}
                                <div
                                    onClick={() => navigate('/schemes')}
                                    className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition border border-transparent hover:border-green-200"
                                >
                                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.govtSchemes')}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t('dashboard.govtSchemesDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Profile Upload Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Update Profile Picture</h3>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-green-100 shadow-inner">
                                {user?.profilePicture ? (
                                    <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="w-full">
                                <label className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2.5 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100
                                    cursor-pointer
                                ">
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100"
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                    />
                                </label>
                            </div>

                            <p className="text-xs text-gray-500 text-center">
                                Supported formats: JPG, PNG. Max size: 5MB.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
