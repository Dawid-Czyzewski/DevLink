import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import AuthRequired from '../components/common/AuthRequired';
import { PostAnnouncementHeader, PostAnnouncementForm } from '../components/postAnnouncement';
import announcementService from '../services/announcementService';

const PostAnnouncementPage = () => {
    const { t } = useTranslation();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        
        try {
            console.log('Submitting announcement:', formData);
            
            const response = await announcementService.createAnnouncement(formData);
            
            if (response.success) {
                addToast(t('postAnnouncement.successMessage'), 'success', 5000);
                
                navigate('/my-announcements');
            } else {
                addToast(response.message || t('postAnnouncement.errorMessage'), 'error', 5000);
            }
            
        } catch (error) {
            console.error('Error creating announcement:', error);
            
            if (error.response && error.response.data && error.response.data.message) {
                addToast(error.response.data.message, 'error', 5000);
            } else {
                addToast(t('postAnnouncement.errorMessage'), 'error', 5000);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <AuthRequired 
                message={t('postAnnouncement.authRequiredMessage')}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PostAnnouncementHeader />
                
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
                    <PostAnnouncementForm 
                        onSubmit={handleSubmit}
                        isLoading={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostAnnouncementPage;
