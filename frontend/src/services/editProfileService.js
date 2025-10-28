import userService from './userService';

class EditProfileService {
    constructor() {
        this.userService = userService;
    }

    validateForm(formData, t) {
        const errors = {};

        if (formData.description && formData.description.length > 1000) {
            errors.description = t('editProfile.errors.descriptionTooLong');
        }

        if (!Array.isArray(formData.tags)) {
            errors.tags = t('editProfile.errors.tagsMustBeArray');
        } else if (formData.tags.length > 20) {
            errors.tags = t('editProfile.errors.tooManyTags');
        } else {
            for (const tag of formData.tags) {
                if (typeof tag !== 'string' || tag.length > 50) {
                    errors.tags = t('editProfile.errors.tagTooLong');
                    break;
                }
            }
        }

        const validCategories = ['frontend', 'backend', 'fullstack', 'uxui', 'pm'];
        if (formData.category && formData.category.trim() !== '' && !validCategories.includes(formData.category)) {
            errors.category = t('editProfile.errors.invalidCategory');
        }

        const validLevels = ['junior', 'mid', 'senior'];
        if (formData.experienceLevel && !validLevels.includes(formData.experienceLevel)) {
            errors.experienceLevel = t('editProfile.errors.invalidExperienceLevel');
        }

        if (formData.github && !this.isValidUrl(formData.github)) {
            errors.github = t('editProfile.errors.invalidUrl');
        }

        if (formData.website && !this.isValidUrl(formData.website)) {
            errors.website = t('editProfile.errors.invalidUrl');
        }

        if (formData.linkedin && !this.isValidUrl(formData.linkedin)) {
            errors.linkedin = t('editProfile.errors.invalidUrl');
        }

        return errors;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    clearFieldError(errors, field) {
        if (errors[field]) {
            return {
                ...errors,
                [field]: null
            };
        }
        return errors;
    }

    async updateProfile(formData, updateUser, addToast, t) {
        try {
            const response = await this.userService.updateProfile(formData);
            
            if (response.success) {
                updateUser(response.data.user);
                addToast(t('editProfile.successMessage'), 'success', 5000);
                return { success: true };
            } else {
                addToast(t('editProfile.errors.unexpectedError'), 'error', 5000);
                return { success: false };
            }
        } catch (error) {
            if (error.errors) {
                addToast(t('editProfile.errors.validationFailed'), 'error', 5000);
                return { success: false, errors: error.errors };
            } else {
                addToast(t('editProfile.errors.unexpectedError'), 'error', 5000);
                return { success: false };
            }
        }
    }

    initializeFormData(user) {
        return {
            description: user?.description || '',
            tags: user?.tags || [],
            category: user?.category || '',
            hasCommercialExperience: user?.hasCommercialExperience || false,
            experienceLevel: user?.experienceLevel || '',
            github: user?.github || '',
            website: user?.website || '',
            linkedin: user?.linkedin || ''
        };
    }

    handleInputChange(formData, setFormData, field, value, errors, setErrors) {
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
    }

    handleCheckboxChange(formData, setFormData, field, checked, errors, setErrors) {
        setFormData(prev => ({
            ...prev,
            [field]: checked,
            ...(field === 'hasCommercialExperience' && !checked && { experienceLevel: '' })
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    }

    handleTagsChange(setFormData, tags, errors, setErrors) {
        setFormData(prev => ({
            ...prev,
            tags
        }));
        
        if (errors.tags) {
            setErrors(prev => ({
                ...prev,
                tags: null
            }));
        }
    }
}

const editProfileService = new EditProfileService();
export default editProfileService;
