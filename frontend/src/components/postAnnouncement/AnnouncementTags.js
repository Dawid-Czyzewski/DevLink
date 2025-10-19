import { useTranslation } from 'react-i18next';
import TagsInput from '../common/TagsInput';
import ErrorMessage from '../common/ErrorMessage';

const AnnouncementTags = ({ tags, onChange, error }) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('postAnnouncement.form.tags')}
            </label>
            <TagsInput
                tags={tags}
                onChange={onChange}
                placeholder={t('postAnnouncement.form.tagsPlaceholder')}
                maxTags={15}
            />
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default AnnouncementTags;
