import { useTranslation } from 'react-i18next';
import ProtectedRoute from '../common/ProtectedRoute';

const EditProfileLoading = () => {
    const { t } = useTranslation();

    return (
        <ProtectedRoute requireAuth={true}>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <p className="text-gray-300">{t('editProfile.loading')}</p>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default EditProfileLoading;
