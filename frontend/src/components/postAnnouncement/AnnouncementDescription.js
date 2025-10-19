import { useTranslation } from 'react-i18next';
import ErrorMessage from '../common/ErrorMessage';

const AnnouncementDescription = ({ value, onChange, error }) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('postAnnouncement.form.description')} <span className="text-red-400">*</span>
            </label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={t('postAnnouncement.form.descriptionPlaceholder')}
                rows={6}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
            />
            <div className="flex justify-between items-center mt-1">
                {error && <ErrorMessage message={error} />}
                <span className="text-sm text-gray-400 ml-auto">
                    {value.length}/2000
                </span>
            </div>
        </div>
    );
};

export default AnnouncementDescription;

