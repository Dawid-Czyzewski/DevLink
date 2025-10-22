import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ViewAnnouncementHeader, ViewAnnouncementContent, ViewAnnouncementActions } from '../components/viewAnnouncement';
import announcementService from '../services/announcementService';

const ViewAnnouncementPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAnnouncement = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await announcementService.getAnnouncementById(id);

            if (response.success && response.data && response.data.announcement) {
                setAnnouncement(response.data.announcement);
            } else {
                setError(response.message || t('viewAnnouncement.errors.loadFailed'));
            }
        } catch (error) {
            setError(t('viewAnnouncement.errors.loadFailed'));
        } finally {
            setLoading(false);
        }
    }, [id, t]);

    useEffect(() => {
        loadAnnouncement();
    }, [loadAnnouncement]);


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400/20 border-t-yellow-400 mx-auto mb-6"></div>
                    <p className="text-gray-300 text-lg font-medium">{t('viewAnnouncement.loading')}</p>
                </div>
            </div>
        );
    }

    if (error || !announcement) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-3xl mb-6">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">{t('viewAnnouncement.errors.title')}</h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">{error || t('viewAnnouncement.errors.notFound')}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        {t('common.back')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ViewAnnouncementHeader 
                    announcement={announcement}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ViewAnnouncementContent announcement={announcement} />
                    </div>
                    
                    <div className="lg:col-span-1">
                        <ViewAnnouncementActions 
                            announcement={announcement}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAnnouncementPage;
