import { useTranslation } from 'react-i18next';

const MyAnnouncementsLoadingState = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400/20 border-t-yellow-400 mb-6"></div>
            <p className="text-gray-300 text-lg font-medium">{t('myAnnouncements.loading')}</p>
        </div>
    );
};

export default MyAnnouncementsLoadingState;
