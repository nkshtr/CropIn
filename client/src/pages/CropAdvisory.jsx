import React, { useState } from 'react';
import { ArrowLeft, Sprout, Calendar, CloudRain, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CropAdvisory = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [season, setSeason] = useState('Kharif');
    const [soilType, setSoilType] = useState('Alluvial');
    const [recommendations, setRecommendations] = useState([]);

    const cropsDB = {
        Kharif: {
            Alluvial: [
                { name: 'Rice', duration: '120-150 days', water: 'High', profit: 'High' },
                { name: 'Maize', duration: '90-110 days', water: 'Medium', profit: 'Medium' }
            ],
            Black: [
                { name: 'Cotton', duration: '150-180 days', water: 'Medium', profit: 'High' },
                { name: 'Soybean', duration: '90-100 days', water: 'Medium', profit: 'Medium' }
            ]
        },
        Rabi: {
            Alluvial: [
                { name: 'Wheat', duration: '120-140 days', water: 'Medium', profit: 'Medium' },
                { name: 'Mustard', duration: '100-110 days', water: 'Low', profit: 'High' }
            ],
            Black: [
                { name: 'Chickpea', duration: '100-120 days', water: 'Low', profit: 'Medium' },
                { name: 'Sorghum', duration: '110-120 days', water: 'Low', profit: 'Low' }
            ]
        }
    };

    const getRecommendations = () => {
        const seasonData = cropsDB[season] || {};
        const soilData = seasonData[soilType] || [];
        setRecommendations(soilData);
    };

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-700 font-medium mb-6 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-1" /> {t('crop.back')}
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-green-600 p-6 text-white flex items-center gap-4">
                        <Sprout size={32} />
                        <div>
                            <h1 className="text-2xl font-bold">{t('crop.title')}</h1>
                            <p className="text-green-100">{t('crop.cropAdvisoryDesc')}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('crop.season')}</label>
                                <div className="relative">
                                    <select
                                        value={season}
                                        onChange={(e) => setSeason(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                                    >
                                        <option value="Kharif">{t('crop.seasons.Kharif')}</option>
                                        <option value="Rabi">{t('crop.seasons.Rabi')}</option>
                                        <option value="Zaid">{t('crop.seasons.Zaid')}</option>
                                    </select>
                                    <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('crop.soilType')}</label>
                                <div className="relative">
                                    <select
                                        value={soilType}
                                        onChange={(e) => setSoilType(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                                    >
                                        <option value="Alluvial">{t('crop.soils.Alluvial')}</option>
                                        <option value="Black">{t('crop.soils.Black')}</option>
                                        <option value="Red">{t('crop.soils.Red')}</option>
                                        <option value="Laterite">{t('crop.soils.Laterite')}</option>
                                    </select>
                                    <div className="absolute right-3 top-3 w-4 h-4 rounded-full bg-amber-700 opacity-50"></div>
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={getRecommendations}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                                >
                                    {t('crop.getRec')}
                                </button>
                            </div>
                        </div>

                        {recommendations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                {recommendations.map((crop, index) => (
                                    <div key={index} className="border border-green-100 rounded-xl p-6 hover:shadow-md transition bg-green-50/50">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-green-800">{crop.name}</h3>
                                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-200">
                                                High Yield
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar size={18} className="mr-2 text-green-600" />
                                                <span>{t('crop.duration')}: {crop.duration}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <CloudRain size={18} className="mr-2 text-blue-500" />
                                                <span>{t('crop.water')}: {crop.water}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Sun size={18} className="mr-2 text-orange-500" />
                                                <span>{t('crop.profit')}: {crop.profit}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <Sprout size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Select season and soil type to see recommendations</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropAdvisory;
