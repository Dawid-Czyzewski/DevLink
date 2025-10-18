import { useTranslation } from 'react-i18next';

const ViewProfileLoading = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-gray-300">{t('viewProfile.loading')}</p>
            </div>
        </div>
    );
};

export default ViewProfileLoading;
