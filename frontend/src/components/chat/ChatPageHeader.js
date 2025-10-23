import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ChatPageHeader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="mb-8 lg:mb-12">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    {t('chat.title')}
                </h1>
                <p className="text-yellow-400 text-lg sm:text-xl font-medium">
                    {t('chat.subtitle')}
                </p>
            </div>
        </div>
    );
};

export default ChatPageHeader;
