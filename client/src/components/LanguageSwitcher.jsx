import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                English
            </button>
            <button
                onClick={() => changeLanguage('hi')}
                className={`px-3 py-1 rounded text-sm font-medium transition ${i18n.language === 'hi' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                हिंदी
            </button>
            <button
                onClick={() => changeLanguage('pa')}
                className={`px-3 py-1 rounded text-sm font-medium transition ${i18n.language === 'pa' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                ਪੰਜਾਬੀ
            </button>
        </div>
    );
};

export default LanguageSwitcher;
