import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-6 sm:py-8 lg:py-12">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="group inline-flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-600 hover:border-yellow-400 transition-all duration-300 cursor-pointer text-sm sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">{t('common.back')}</span>
                        <span className="sm:hidden">{t('common.back')}</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                        {t('terms.title')}
                    </h1>
                    <p className="text-yellow-400 text-lg sm:text-xl font-medium">
                        {t('terms.subtitle')}
                    </p>
                </div>

                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 border border-gray-700/50">
                    <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 space-y-6">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section1.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section1.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section2.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section2.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section3.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section3.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section4.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section4.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section5.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section5.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section6.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section6.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section7.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section7.content')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">{t('terms.section8.title')}</h2>
                                <p className="text-gray-300 leading-relaxed">{t('terms.section8.content')}</p>
                            </section>

                            <div className="mt-8 pt-6 border-t border-gray-600">
                                <p className="text-sm text-gray-400">
                                    {t('terms.lastUpdated')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
