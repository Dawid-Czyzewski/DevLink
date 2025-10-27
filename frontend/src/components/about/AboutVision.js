import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutVision = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('about.vision.title')}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
                {t('about.vision.description')}
            </p>
        </div>
    );
};

export default AboutVision;
