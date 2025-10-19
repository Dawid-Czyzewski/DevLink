import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MyAnnouncementsHeader = ({ onAddNew }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/profile');
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
                
                <button
                    onClick={onAddNew}
                    className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-4 sm:px-8 py-2 sm:py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm sm:text-lg font-semibold transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto justify-center"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="hidden sm:inline">{t('myAnnouncements.addNew')}</span>
                    <span className="sm:hidden">{t('myAnnouncements.addNew')}</span>
                </button>
            </div>
            
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl mb-4 sm:mb-6 shadow-2xl">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
                    {t('myAnnouncements.title')}
                </h1>
            </div>
        </div>
    );
};

export default MyAnnouncementsHeader;
