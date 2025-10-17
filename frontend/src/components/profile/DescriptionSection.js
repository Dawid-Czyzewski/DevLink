import { useTranslation } from 'react-i18next';

const DescriptionSection = ({ description, onChange, error }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
                {t('editProfile.description.title')}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
                {t('editProfile.description.subtitle')}
            </p>
                <textarea
                    value={description}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t('editProfile.description.placeholder')}
                    rows={5}
                    className={`w-full bg-gray-800/50 border rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none transition-colors duration-200 resize-none text-base ${
                        error ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                />
                {error && (
                    <p className="text-red-400 text-sm mt-2">{t(error)}</p>
                )}
        </div>
    );
};

export default DescriptionSection;
