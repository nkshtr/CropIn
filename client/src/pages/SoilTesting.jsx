import React, { useState } from 'react';
import { ArrowLeft, FlaskConical, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SoilTesting = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        ph: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
    });
    const [recommendation, setRecommendation] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateRecommendation = (e) => {
        e.preventDefault();
        const { ph, nitrogen, phosphorus, potassium } = formData;
        let recs = [];

        // Simple logic for demonstration
        const phVal = parseFloat(ph);
        const nVal = parseFloat(nitrogen);
        const pVal = parseFloat(phosphorus);
        const kVal = parseFloat(potassium);

        if (phVal < 6.0) recs.push("Soil is acidic. Consider adding lime to increase pH.");
        if (phVal > 7.5) recs.push("Soil is alkaline. Consider adding sulfur or gypsum.");
        if (nVal < 50) recs.push("Nitrogen is low. Apply urea or nitrogen-rich fertilizers.");
        if (pVal < 20) recs.push("Phosphorus is low. Apply DAP or superphosphate.");
        if (kVal < 100) recs.push("Potassium is low. Apply muriate of potash.");

        if (recs.length === 0) recs.push("Soil nutrient levels appear balanced. Maintain current practices.");

        setRecommendation(recs);
    };

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-700 font-medium mb-6 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-1" /> {t('soil.back')}
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-green-600 p-6 text-white flex items-center gap-4">
                        <FlaskConical size={32} />
                        <div>
                            <h1 className="text-2xl font-bold">{t('soil.title')}</h1>
                            <p className="text-green-100">{t('soil.recommendation')}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <form onSubmit={generateRecommendation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('soil.phLevel')}</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="ph"
                                    value={formData.ph}
                                    onChange={handleChange}
                                    placeholder="e.g., 6.5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Neutral range: 6.0 - 7.5</p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('soil.nitrogen')}</label>
                                <input
                                    type="number"
                                    name="nitrogen"
                                    value={formData.nitrogen}
                                    onChange={handleChange}
                                    placeholder="e.g., 120"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('soil.phosphorus')}</label>
                                <input
                                    type="number"
                                    name="phosphorus"
                                    value={formData.phosphorus}
                                    onChange={handleChange}
                                    placeholder="e.g., 40"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">{t('soil.potassium')}</label>
                                <input
                                    type="number"
                                    name="potassium"
                                    value={formData.potassium}
                                    onChange={handleChange}
                                    placeholder="e.g., 150"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                                >
                                    {t('soil.analyze')}
                                </button>
                            </div>
                        </form>

                        {recommendation && (
                            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                                    <CheckCircle size={24} className="mr-2" /> {t('soil.results')}
                                </h3>
                                <ul className="space-y-3">
                                    {recommendation.map((rec, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                                            <span className="text-gray-700">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoilTesting;
