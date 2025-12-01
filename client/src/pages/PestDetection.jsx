import React, { useState } from 'react';
import { ArrowLeft, Upload, Bug, AlertCircle, Check, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PestDetection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;

        setAnalyzing(true);

        // Simulate AI Analysis Delay
        setTimeout(() => {
            setAnalyzing(false);
            // Mock Result
            setResult({
                disease: "Late Blight",
                confidence: "92%",
                symptoms: "Water-soaked spots on leaves, white fungal growth on undersides.",
                treatment: [
                    "Apply fungicides containing mancozeb or chlorothalonil.",
                    "Improve air circulation between plants.",
                    "Remove and destroy infected plant parts immediately."
                ],
                organic: "Use copper-based sprays or neem oil as a preventive measure."
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-green-50 p-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-700 font-medium mb-6 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-1" /> {t('pest.back')}
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-green-600 p-6 text-white flex items-center gap-4">
                        <Bug size={32} />
                        <div>
                            <h1 className="text-2xl font-bold">{t('pest.title')}</h1>
                            <p className="text-green-100">{t('pest.pestDetectionDesc')}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {previewUrl ? (
                                <div className="relative inline-block">
                                    <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg shadow-md" />
                                    <div className="mt-4 text-green-600 font-medium flex items-center justify-center">
                                        <Check size={20} className="mr-1" /> Image Selected
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={48} className="mb-4 text-green-500" />
                                    <p className="text-lg font-medium">{t('pest.upload')}</p>
                                    <p className="text-sm mt-2">Supports JPG, PNG (Max 5MB)</p>
                                </div>
                            )}
                        </div>

                        {selectedImage && !result && (
                            <button
                                onClick={analyzeImage}
                                disabled={analyzing}
                                className={`w-full mt-6 py-3 px-6 rounded-lg font-bold text-white transition duration-200 flex items-center justify-center ${analyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {analyzing ? (
                                    <>
                                        <Loader size={20} className="animate-spin mr-2" /> {t('pest.analyzing')}
                                    </>
                                ) : (
                                    'Diagnose Disease'
                                )}
                            </button>
                        )}

                        {result && (
                            <div className="mt-8 bg-white border border-green-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
                                <div className="bg-red-50 p-4 border-b border-red-100 flex items-center text-red-800">
                                    <AlertCircle size={24} className="mr-2" />
                                    <span className="font-bold text-lg">{t('pest.disease')}: {result.disease}</span>
                                    <span className="ml-auto text-sm bg-red-100 px-3 py-1 rounded-full border border-red-200">
                                        {result.confidence} {t('pest.confidence')}
                                    </span>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">{t('pest.symptoms')}:</h4>
                                        <p className="text-gray-600">{result.symptoms}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">{t('pest.treatment')}:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            {result.treatment.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-800 mb-1">{t('pest.organic')}:</h4>
                                        <p className="text-green-700">{result.organic}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PestDetection;
