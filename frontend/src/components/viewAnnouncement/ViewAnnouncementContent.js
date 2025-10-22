import { useTranslation } from 'react-i18next';

const ViewAnnouncementContent = ({ announcement }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 lg:p-8">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('viewAnnouncement.content.description')}
                </h2>
                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {announcement.description}
                    </p>
                </div>
            </div>

            {announcement.categories && announcement.categories.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {t('viewAnnouncement.content.categories')}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {announcement.categories.map((category, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-400/30 transition-colors duration-200"
                            >
                                {t(`postAnnouncement.categories.${category}`)}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {announcement.tags && announcement.tags.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {t('viewAnnouncement.content.technologies')}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {announcement.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-600/50 transition-colors duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ViewAnnouncementContent;
