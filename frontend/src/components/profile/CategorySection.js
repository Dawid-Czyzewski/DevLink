import { useTranslation } from 'react-i18next';

const CategorySection = ({ category, onChange, error }) => {
    const { t } = useTranslation();

    const categories = [
        { value: 'frontend', label: t('editProfile.category.frontend') },
        { value: 'backend', label: t('editProfile.category.backend') },
        { value: 'fullstack', label: t('editProfile.category.fullstack') },
        { value: 'uxui', label: t('editProfile.category.uxui') },
        { value: 'pm', label: t('editProfile.category.pm') }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
                {t('editProfile.category.title')}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
                {t('editProfile.category.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <label key={cat.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={category === cat.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-white font-medium">{cat.label}</span>
                    </label>
                ))}
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="radio"
                        name="category"
                        value=""
                        checked={!category || category === ''}
                        onChange={(e) => onChange('')}
                        className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-gray-400 font-medium">{t('editProfile.category.none') || 'Brak'}</span>
                </label>
            </div>
            {error && (
                <p className="text-red-400 text-sm mt-2">{t(error)}</p>
            )}
        </div>
    );
};

export default CategorySection;
