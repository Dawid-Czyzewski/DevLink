import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PostAnnouncementHeader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="mb-8">
                <button
                    onClick={handleGoBack}
                    className="inline-flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300 px-6 py-3 rounded-lg border border-gray-600 hover:border-yellow-400 transition-all duration-200 cursor-pointer text-lg font-medium"
                >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('common.back')}
                </button>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                    {t('postAnnouncement.title')}
                </h1>
                <p className="text-gray-300 text-lg">
                    {t('postAnnouncement.subtitle')}
                </p>
            </div>
        </>
    );
};

export default PostAnnouncementHeader;
