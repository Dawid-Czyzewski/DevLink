import { useTranslation } from 'react-i18next';

export const useAnnouncementsUtils = () => {
    const { t } = useTranslation();

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

    return {
        formatDate,
        getCategoryLabel
    };
};
