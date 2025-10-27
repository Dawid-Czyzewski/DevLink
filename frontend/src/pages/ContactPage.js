import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { apiServiceInstance } from '../services/apiService';
import { useToast } from '../contexts/ToastContext';

const ContactPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const result = await apiServiceInstance.post('contact', 'send', formData);
            
            if (result.success) {
                showSuccess(t('contact.form.successToast'));
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                showError(result.message || t('contact.form.errorToast'));
            }
        } catch (error) {
            showError(t('contact.form.errorToast'));
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        {t('contact.title')}
                    </h1>
                    <p className="text-yellow-400 text-lg sm:text-xl font-medium">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 border border-gray-700/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.form.name')} *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder={t('contact.form.namePlaceholder')}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.form.email')} *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder={t('contact.form.emailPlaceholder')}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                {t('contact.form.subject')} *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                placeholder={t('contact.form.subjectPlaceholder')}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                {t('contact.form.message')} *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-vertical"
                                placeholder={t('contact.form.messagePlaceholder')}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
                            >
                                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">{t('contact.info.title')}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {t('contact.info.description')}
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">{t('contact.response.title')}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {t('contact.response.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
