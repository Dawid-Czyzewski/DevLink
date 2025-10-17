import { useTranslation } from 'react-i18next';

const ContactSection = ({ github, website, linkedin, onChange, errors }) => {
    const { t } = useTranslation();

    const contactFields = [
        {
            field: 'github',
            label: t('editProfile.contact.github'),
            placeholder: 'https://github.com/username'
        },
        {
            field: 'website',
            label: t('editProfile.contact.website'),
            placeholder: 'https://yourwebsite.com'
        },
        {
            field: 'linkedin',
            label: t('editProfile.contact.linkedin'),
            placeholder: 'https://linkedin.com/in/username'
        }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
                {t('editProfile.contact.title')}
            </h2>
            <p className="text-gray-400 text-sm mb-8">
                {t('editProfile.contact.subtitle')}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {contactFields.map((field) => (
                    <div key={field.field}>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            {field.label}
                        </label>
                        <input
                            type="url"
                            value={field.field === 'github' ? github : field.field === 'website' ? website : linkedin}
                            onChange={(e) => onChange(field.field, e.target.value)}
                            placeholder={field.placeholder}
                            className={`w-full bg-gray-800/50 border rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none transition-colors duration-200 text-base ${
                                errors[field.field] ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-yellow-400'
                            }`}
                        />
                            {errors[field.field] && (
                                <p className="text-red-400 text-sm mt-2">{t(errors[field.field])}</p>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactSection;
