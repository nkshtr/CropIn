import React from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Sprout, Droplets, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GovernmentSchemes = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const schemes = [
        {
            id: 1,
            title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            description: "Financial support of ₹6,000 per year to farmer families across the country in three equal installments.",
            eligibility: "All landholding farmer families.",
            benefits: "₹6,000 per year direct bank transfer.",
            link: "https://pmkisan.gov.in/",
            icon: <CreditCard className="text-green-600" size={32} />
        },
        {
            id: 2,
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Crop insurance scheme that provides financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
            eligibility: "Farmers growing notified crops in notified areas.",
            benefits: "Insurance coverage against crop loss.",
            link: "https://pmfby.gov.in/",
            icon: <ShieldCheck className="text-blue-600" size={32} />
        },
        {
            id: 3,
            title: "Soil Health Card Scheme",
            description: "Provides information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients.",
            eligibility: "All farmers.",
            benefits: "Soil health report and fertilizer recommendations.",
            link: "https://soilhealth.dac.gov.in/",
            icon: <Sprout className="text-amber-600" size={32} />
        },
        {
            id: 4,
            title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
            description: "Focuses on extending the coverage of irrigation 'Har Khet ko Pani' and improving water use efficiency 'More crop per drop'.",
            eligibility: "Farmers with cultivable land.",
            benefits: "Subsidy on micro-irrigation systems (drip/sprinkler).",
            link: "https://pmksy.gov.in/",
            icon: <Droplets className="text-cyan-600" size={32} />
        }
    ];

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-700 font-medium mb-6 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-1" /> {t('schemes.back')}
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="bg-green-700 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">{t('schemes.title')}</h1>
                        <p className="text-green-100">{t('schemes.subtitle')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {schemes.map((scheme) => (
                        <div key={scheme.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        {scheme.icon}
                                    </div>
                                    <a
                                        href={scheme.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium"
                                    >
                                        {t('schemes.visit')} <ExternalLink size={14} className="ml-1" />
                                    </a>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{scheme.description}</p>

                                <div className="space-y-2">
                                    <div className="bg-green-50 px-3 py-2 rounded text-sm">
                                        <span className="font-semibold text-green-800">{t('schemes.eligibility')}: </span>
                                        <span className="text-green-700">{scheme.eligibility}</span>
                                    </div>
                                    <div className="bg-blue-50 px-3 py-2 rounded text-sm">
                                        <span className="font-semibold text-blue-800">{t('schemes.benefits')}: </span>
                                        <span className="text-blue-700">{scheme.benefits}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Disclaimer: Information provided is for general awareness. Please verify details on official government portals.</p>
                </div>
            </div>
        </div>
    );
};

export default GovernmentSchemes;
