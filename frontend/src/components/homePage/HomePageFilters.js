import { useTranslation } from 'react-i18next';

const HomePageFilters = ({ 
    searchTerm, 
    sortOrder, 
    selectedCategories, 
    onSearchChange, 
    onSortChange, 
    onCategoryChange, 
    onClearFilters 
}) => {
    const { t } = useTranslation();

    const getCategoryLabel = (category) => {
        return t(`homePage.categories.${category}`, category);
    };

    const hasActiveFilters = searchTerm || selectedCategories.length > 0;

    return (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 lg:p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('homePage.search.label')}
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder={t('homePage.search.placeholder')}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('homePage.sort.label')}
                    </label>
                    <select
                        value={sortOrder}
                        onChange={onSortChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 cursor-pointer"
                    >
                        <option value="newest">{t('homePage.sort.newest')}</option>
                        <option value="oldest">{t('homePage.sort.oldest')}</option>
                    </select>
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    {t('homePage.categoriesFilter.label')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {['frontend', 'backend', 'fullstack', 'uxui', 'pm', 'mobile', 'gamedev'].map((category) => (
                        <label
                            key={category}
                            className="flex items-center p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={(e) => onCategoryChange(category, e.target.checked)}
                                className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                            />
                            <span className="ml-3 text-sm text-gray-300">
                                {getCategoryLabel(category)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {hasActiveFilters && (
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClearFilters}
                        className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer text-sm"
                    >
                        {t('homePage.search.clear')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePageFilters;
