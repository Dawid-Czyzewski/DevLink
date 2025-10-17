import { useTranslation } from 'react-i18next';
import TagsInput from '../common/TagsInput';

const TagsSection = ({ tags, onChange, error }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
                {t('editProfile.tags.title')}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
                {t('editProfile.tags.subtitle')}
            </p>
            <TagsInput
                tags={tags}
                onChange={onChange}
                placeholder={t('editProfile.tags.placeholder')}
                error={error}
            />
        </div>
    );
};

export default TagsSection;
