import { useTranslation } from 'react-i18next';
import FormInput from '../common/FormInput';

const AnnouncementTitle = ({ value, onChange, error }) => {
    const { t } = useTranslation();

    return (
        <div>
            <FormInput
                label={t('postAnnouncement.form.title')}
                placeholder={t('postAnnouncement.form.titlePlaceholder')}
                value={value}
                onChange={onChange}
                error={error}
                touched={true}
                required
            />
        </div>
    );
};

export default AnnouncementTitle;
