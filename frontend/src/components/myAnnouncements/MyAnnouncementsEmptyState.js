import { useTranslation } from 'react-i18next';

const MyAnnouncementsEmptyState = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/50 rounded-3xl mb-8 border border-gray-700/50">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
                {t('myAnnouncements.empty.title')}
            </h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                {t('myAnnouncements.empty.message')}
            </p>
        </div>
    );
};

export default MyAnnouncementsEmptyState;
