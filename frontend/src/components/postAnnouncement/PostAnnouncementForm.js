import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import AnnouncementTitle from './AnnouncementTitle';
import AnnouncementDescription from './AnnouncementDescription';
import AnnouncementCategories from './AnnouncementCategories';
import AnnouncementTags from './AnnouncementTags';

const PostAnnouncementForm = ({ onSubmit, isLoading }) => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categories: [],
        tags: []
    });
    
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleTagsChange = (tags) => {
        setFormData(prev => ({
            ...prev,
            tags
        }));
    };

    const handleCategoryChange = (category, isChecked) => {
        setFormData(prev => ({
            ...prev,
            categories: isChecked 
                ? [...prev.categories, category]
                : prev.categories.filter(cat => cat !== category)
        }));
        
        if (errors.categories) {
            setErrors(prev => ({
                ...prev,
                categories: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            addToast(t('postAnnouncement.errors.validationFailed'), 'error', 5000);
            return;
        }
        
        onSubmit(formData);
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

            <AnnouncementCategories
                categories={formData.categories}
                onChange={handleCategoryChange}
                error={errors.categories}
            />

            <AnnouncementTags
                tags={formData.tags}
                onChange={handleTagsChange}
                error={errors.tags}
            />

            <div className="flex justify-center pt-8">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('postAnnouncement.form.submitting')}
                        </div>
                    ) : (
                        t('postAnnouncement.form.submit')
                    )}
                </button>
            </div>
        </form>
    );
};

export default PostAnnouncementForm;
