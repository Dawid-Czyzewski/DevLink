import React from 'react';
import { AboutHeader, AboutMission, AboutVision, AboutFeatures } from '../components/about';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-6 sm:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <AboutHeader />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <AboutMission />
                    <AboutVision />
                    <AboutFeatures />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
