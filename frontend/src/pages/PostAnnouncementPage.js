import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import AuthRequired from '../components/common/AuthRequired';
import PageContainer from '../components/common/PageContainer';

const PostAnnouncementPage = () => {
    const { t } = useTranslation();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
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
        <PageContainer>
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {t('postAnnouncement.title')}
                    </h1>
                    <p className="text-gray-300 text-lg">
                        {t('postAnnouncement.subtitle')}
                    </p>
                </div>
            </div>
        </PageContainer>
    );
};

export default PostAnnouncementPage;
