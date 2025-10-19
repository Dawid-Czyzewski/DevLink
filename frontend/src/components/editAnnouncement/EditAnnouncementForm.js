import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnnouncementTitle, AnnouncementDescription, AnnouncementCategories, AnnouncementTags } from '../postAnnouncement';

const EditAnnouncementForm = ({ announcement, onSubmit, isLoading }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categories: [],
        tags: []
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (announcement) {
            setFormData({
                title: announcement.title || '',
                description: announcement.description || '',
                categories: announcement.categories || [],
                tags: announcement.tags || []
            });
        }
    }, [announcement]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const handleCategoryChange = (categoryValue, isChecked) => {
        setFormData(prev => ({
            ...prev,
            categories: isChecked 
                ? [...prev.categories, categoryValue]
                : prev.categories.filter(cat => cat !== categoryValue)
        }));
        
        if (errors.categories) {
            setErrors(prev => ({
                ...prev,
                categories: null
            }));
        }
    };

    const handleTagsChange = (tags) => {
        setFormData(prev => ({
            ...prev,
            tags: tags
        }));
        
        if (errors.tags) {
            setErrors(prev => ({
                ...prev,
                tags: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = t('postAnnouncement.errors.titleRequired');
        }

        if (!formData.description.trim()) {
            newErrors.description = t('postAnnouncement.errors.descriptionRequired');
        } else if (formData.description.length > 2000) {
            newErrors.description = t('postAnnouncement.errors.descriptionTooLong');
        }

        if (formData.categories.length === 0) {
            newErrors.categories = t('postAnnouncement.errors.categoriesRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <AnnouncementTitle
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={errors.title}
            />

            <AnnouncementDescription
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={errors.description}
            />

            <div>
                <AnnouncementCategories
                    categories={formData.categories}
                    onChange={handleCategoryChange}
                    error={errors.categories}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('postAnnouncement.form.tags')}
                </label>
                <AnnouncementTags
                    tags={formData.tags}
                    onChange={handleTagsChange}
                    error={errors.tags}
                />
            </div>

            <div className="pt-6 border-t border-gray-700">
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
                >
                    {isSubmitting || isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            {t('editAnnouncement.form.updating')}
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {t('editAnnouncement.form.update')}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default EditAnnouncementForm;
