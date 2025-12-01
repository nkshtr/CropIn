import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MarketPrices = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedCrop, setSelectedCrop] = useState('Wheat');

    // Mock Data for Market Prices
    const marketData = [
        { crop: 'Wheat', price: 2125, change: '+2.5%', trend: 'up', forecast: 'Stable' },
        { crop: 'Rice', price: 3200, change: '-1.2%', trend: 'down', forecast: 'Rising' },
        { crop: 'Maize', price: 1850, change: '+0.8%', trend: 'up', forecast: 'Stable' },
        { crop: 'Cotton', price: 6200, change: '+5.0%', trend: 'up', forecast: 'High Demand' },
        { crop: 'Mustard', price: 5400, change: '-0.5%', trend: 'down', forecast: 'Falling' },
        { crop: 'Soybean', price: 4800, change: '+1.5%', trend: 'up', forecast: 'Rising' },
    ];

    const historicalData = [
        { month: 'Jan', price: 2000 },
        { month: 'Feb', price: 2050 },
        { month: 'Mar', price: 2100 },
        { month: 'Apr', price: 2125 },
        { month: 'May', price: 2150 },
        { month: 'Jun', price: 2200 },
    ];

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-700 font-medium mb-6 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-1" /> {t('market.back')}
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Price Board */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-green-600 p-6 text-white flex items-center gap-4">
                                <DollarSign size={32} />
                                <div>
                                    <h1 className="text-2xl font-bold">{t('market.title')}</h1>
                                    <p className="text-green-100">{t('market.marketPricesDesc')}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                                                <th className="pb-3 font-semibold">{t('market.crop')}</th>
                                                <th className="pb-3 font-semibold">{t('market.price')}</th>
                                                <th className="pb-3 font-semibold">{t('market.change')}</th>
                                                <th className="pb-3 font-semibold">{t('market.forecast')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {marketData.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-green-50 transition cursor-pointer"
                                                    onClick={() => setSelectedCrop(item.crop)}
                                                >
                                                    <td className="py-4 font-medium text-gray-800">{item.crop}</td>
                                                    <td className="py-4 font-bold text-gray-900">₹{item.price}</td>
                                                    <td className={`py-4 font-medium flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {item.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                                                        {item.change}
                                                    </td>
                                                    <td className="py-4 text-gray-600 text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.forecast === 'Rising' || item.forecast === 'High Demand' ? 'bg-green-100 text-green-800' :
                                                            item.forecast === 'Falling' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {item.forecast}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics & Trends */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <BarChart2 size={20} className="mr-2 text-green-600" />
                                {t('market.trend')}: {selectedCrop}
                            </h3>

                            <div className="h-48 flex items-end justify-between space-x-2 px-2">
                                {historicalData.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center group w-full">
                                        <div
                                            className="w-full bg-green-200 rounded-t-sm hover:bg-green-400 transition relative group-hover:shadow-md"
                                            style={{ height: `${(data.price / 2500) * 100}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                                                ₹{data.price}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">6-Month Price History (Mock Data)</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-md p-6 text-white">
                            <h3 className="font-bold text-lg mb-2">{t('market.insight')}</h3>
                            <p className="text-green-100 text-sm mb-4">
                                Wheat prices are expected to rise by 5% next month due to high export demand. Consider holding stock if possible.
                            </p>
                            <button className="w-full bg-white text-green-700 font-bold py-2 rounded-lg hover:bg-green-50 transition">
                                View Detailed Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPrices;
