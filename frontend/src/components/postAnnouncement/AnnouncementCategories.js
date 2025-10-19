import { useTranslation } from 'react-i18next';
import ErrorMessage from '../common/ErrorMessage';

const AnnouncementCategories = ({ categories, onChange, error }) => {
    const { t } = useTranslation();

    const categoryOptions = [
        { value: 'frontend', label: t('postAnnouncement.categories.frontend') },
        { value: 'backend', label: t('postAnnouncement.categories.backend') },
        { value: 'fullstack', label: t('postAnnouncement.categories.fullstack') },
        { value: 'uxui', label: t('postAnnouncement.categories.uxui') },
        { value: 'pm', label: t('postAnnouncement.categories.pm') }
    ];

    const handleCategoryChange = (categoryValue, isChecked) => {
        onChange(categoryValue, isChecked);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('postAnnouncement.form.categories')}
                <span className="text-red-400 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-400 mb-4">
                {t('postAnnouncement.form.categoriesHelp')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryOptions.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center p-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={categories.includes(option.value)}
                            onChange={(e) => handleCategoryChange(option.value, e.target.checked)}
                            className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-300">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
            
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default AnnouncementCategories;
