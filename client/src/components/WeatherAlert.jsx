import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WeatherAlert = ({ alerts }) => {
    if (!alerts || alerts.length === 0) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Weather Alert</h3>
                    <div className="mt-1 text-sm text-red-700">
                        {alerts.map((alert, index) => (
                            <p key={index}>{alert.description}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherAlert;
