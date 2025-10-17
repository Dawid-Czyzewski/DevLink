import { useTranslation } from 'react-i18next';

const ExperienceSection = ({ hasCommercialExperience, experienceLevel, onCheckboxChange, onLevelChange, error }) => {
    const { t } = useTranslation();

    const experienceLevels = [
        { value: 'junior', label: t('editProfile.experience.junior') },
        { value: 'mid', label: t('editProfile.experience.mid') },
        { value: 'senior', label: t('editProfile.experience.senior') }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
                {t('editProfile.experience.title')}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
                {t('editProfile.experience.subtitle')}
            </p>
            
            <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={hasCommercialExperience}
                        onChange={(e) => onCheckboxChange(e.target.checked)}
                        className="w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-white font-medium text-lg">
                        {t('editProfile.experience.hasCommercial')}
                    </span>
                </label>
            </div>

            {hasCommercialExperience && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {t('editProfile.experience.level')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {experienceLevels.map((level) => (
                            <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="experienceLevel"
                                    value={level.value}
                                    checked={experienceLevel === level.value}
                                    onChange={(e) => onLevelChange(e.target.value)}
                                    className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                                />
                                <span className="text-white font-medium">{level.label}</span>
                            </label>
                        ))}
                    </div>
                    </div>
                )}
                {error && (
                    <p className="text-red-400 text-sm mt-2">{t(error)}</p>
                )}
            </div>
        );
    };

export default ExperienceSection;
