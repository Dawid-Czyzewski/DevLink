import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ViewAnnouncementHeader = ({ announcement }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCategoryLabel = (category) => {
        const categoryMap = {
            'frontend': t('editProfile.category.frontend'),
            'backend': t('editProfile.category.backend'),
            'fullstack': t('editProfile.category.fullstack'),
            'uxui': t('editProfile.category.uxui'),
            'pm': t('editProfile.category.pm')
        };
        return categoryMap[category] || category;
    };

    return (
        <div className="mb-8 lg:mb-12">
            <button
                onClick={handleGoBack}
                className="group inline-flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-600 hover:border-yellow-400 transition-all duration-300 cursor-pointer text-sm sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-6"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{t('common.back')}</span>
                <span className="sm:hidden">{t('common.back')}</span>
            </button>

            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 px-4">
                    {announcement.title}
                </h1>
                
                <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                    <div className="flex items-center text-gray-400 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(announcement.created_at)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAnnouncementHeader;
