import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import userService from '../services/userService';
import { 
    ViewProfileContent,
    ViewProfileLoading
} from '../components/viewProfile';

const ViewProfilePage = () => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isLoading: authLoading } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) {
            return;
        }

        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                if (!userId) {
                    setError(t('viewProfile.errors.userNotFound'));
                    return;
                }

                const result = await userService.getUserById(userId);
                
                if (result.success) {
                    setProfileUser(result.user);
                } else {
                    setError(t('viewProfile.errors.profileNotFound'));
                }
            } catch (error) {
                setError(t('viewProfile.errors.loadFailed'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, authLoading, t]);

    if (isLoading || authLoading) {
        return <ViewProfileLoading />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">{error}</h1>
                    <p className="text-gray-300">{t('viewProfile.errors.notFoundMessage')}</p>
                </div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">{t('viewProfile.errors.notFoundTitle')}</h1>
                    <p className="text-gray-300">{t('viewProfile.errors.userNotFoundMessage')}</p>
                </div>
            </div>
        );
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 pb-8">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300 px-6 py-3 rounded-lg border border-gray-600 hover:border-yellow-400 transition-all duration-200 cursor-pointer text-lg font-medium"
                    >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('common.back', 'Powrót')}
                    </button>
                </div>
                
                <div className="text-center pb-8">
                    <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                        {profileUser.nickname}
                    </h1>
                </div>
            </div>
            <ViewProfileContent user={profileUser} />
        </div>
    );
};

export default ViewProfilePage;
