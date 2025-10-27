import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutMission = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('about.mission.title')}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
                {t('about.mission.description')}
            </p>
        </div>
    );
};

export default AboutMission;
