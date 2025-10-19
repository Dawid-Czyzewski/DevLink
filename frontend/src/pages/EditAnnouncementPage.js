import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import AuthRequired from '../components/common/AuthRequired';
import { EditAnnouncementHeader, EditAnnouncementForm } from '../components/editAnnouncement';
import announcementService from '../services/announcementService';

const EditAnnouncementPage = () => {
    const { t } = useTranslation();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadAnnouncement = async () => {
            try {
                setLoading(true);
                const response = await announcementService.getAnnouncementById(id);
                
                if (response.success && response.data && response.data.announcement) {
                    setAnnouncement(response.data.announcement);
                } else {
                    addToast(response.message || t('editAnnouncement.errors.loadFailed'), 'error', 5000);
                    navigate('/my-announcements');
                }
            } catch (error) {
                console.error('Error loading announcement:', error);
                addToast(t('editAnnouncement.errors.loadFailed'), 'error', 5000);
                navigate('/my-announcements');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && id) {
            loadAnnouncement();
        }
    }, [isAuthenticated, id, addToast, t, navigate]);

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        
        try {
            const response = await announcementService.updateAnnouncement(id, formData);
            
            if (response.success) {
                addToast(t('editAnnouncement.successMessage'), 'success', 5000);
                navigate('/my-announcements');
            } else {
                addToast(response.message || t('editAnnouncement.errorMessage'), 'error', 5000);
            }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                addToast(error.response.data.message, 'error', 5000);
            } else {
                addToast(t('editAnnouncement.errorMessage'), 'error', 5000);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <AuthRequired 
                message={t('editAnnouncement.authRequiredMessage')}
            />
        );
    }

    if (!announcement) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">{t('editAnnouncement.errors.notFound')}</div>
                    <button 
                        onClick={() => navigate('/my-announcements')}
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
                <EditAnnouncementHeader announcementId={id} />
                
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
                    <EditAnnouncementForm 
                        announcement={announcement}
                        onSubmit={handleSubmit}
                        isLoading={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAnnouncementPage;
