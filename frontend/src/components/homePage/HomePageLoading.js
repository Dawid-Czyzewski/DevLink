import { useTranslation } from 'react-i18next';

const HomePageLoading = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400/20 border-t-yellow-400 mx-auto mb-6"></div>
                <p className="text-gray-300 text-lg font-medium">{t('homePage.loading')}</p>
            </div>
        </div>
    );
};

export default HomePageLoading;
