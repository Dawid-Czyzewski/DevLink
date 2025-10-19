import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const EditAnnouncementHeader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/my-announcements');
    };

    return (
        <div className="mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
                <button
                    onClick={handleGoBack}
                    className="group inline-flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-600 hover:border-yellow-400 transition-all duration-300 cursor-pointer text-sm sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">{t('common.back')}</span>
                    <span className="sm:hidden">{t('common.back')}</span>
                </button>
            </div>
            
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl mb-4 sm:mb-6 shadow-2xl">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
                    {t('editAnnouncement.title')}
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
                    {t('editAnnouncement.subtitle')}
                </p>
            </div>
        </div>
    );
};

export default EditAnnouncementHeader;
