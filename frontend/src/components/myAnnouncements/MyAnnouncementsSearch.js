import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TagsInput from '../common/TagsInput';

const MyAnnouncementsSearch = ({ onSearch }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        title: '',
        tags: [],
        categories: []
    });

    const categoryOptions = [
        { value: 'frontend', label: t('editProfile.category.frontend') },
        { value: 'backend', label: t('editProfile.category.backend') },
        { value: 'fullstack', label: t('editProfile.category.fullstack') },
        { value: 'uxui', label: t('editProfile.category.uxui') },
        { value: 'pm', label: t('editProfile.category.pm') }
    ];

    const handleInputChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const handleTagsChange = (tags) => {
        const newFilters = { ...filters, tags };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const handleCategoryChange = (category, isChecked) => {
        const newCategories = isChecked
            ? [...filters.categories, category]
            : filters.categories.filter(cat => cat !== category);
        
        const newFilters = { ...filters, categories: newCategories };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = { title: '', tags: [], categories: [] };
        setFilters(clearedFilters);
        onSearch(clearedFilters);
    };

    const hasActiveFilters = filters.title || filters.tags.length > 0 || filters.categories.length > 0;

    return (
        <div className="space-y-4 lg:space-y-6">
            <div className="text-center mb-6 lg:mb-8">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl mb-3 lg:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                    {t('myAnnouncements.search.title')}
                </h2>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 lg:mb-3">
                    {t('myAnnouncements.search.titleField')}
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={filters.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder={t('myAnnouncements.search.titlePlaceholder')}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                    <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 lg:mb-3">
                    {t('myAnnouncements.search.tagsField')}
                </label>
                <TagsInput
                    tags={filters.tags}
                    onChange={handleTagsChange}
                    placeholder={t('myAnnouncements.search.tagsPlaceholder')}
                    maxTags={10}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 lg:mb-3">
                    {t('myAnnouncements.search.categoriesField')}
                </label>
                <div className="space-y-2 lg:space-y-3">
                    {categoryOptions.map((category) => (
                        <label key={category.value} className="group flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category.value)}
                                onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                                className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-200">{category.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {hasActiveFilters && (
                <div className="pt-3 lg:pt-4 border-t border-gray-700/50">
                    <button
                        onClick={clearFilters}
                        className="w-full px-4 py-2 sm:py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg sm:rounded-xl transition-all duration-200 font-medium border border-gray-600 hover:border-gray-500 text-sm sm:text-base cursor-pointer"
                    >
                        {t('myAnnouncements.search.clearFilters')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyAnnouncementsSearch;
