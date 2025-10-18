import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import ProtectedRoute from '../components/common/ProtectedRoute';
import editProfileService from '../services/editProfileService';
import { 
    EditProfileHeader,
    EditProfileForm,
    EditProfileLoading
} from '../components/editProfile';

const EditProfilePage = () => {
    const { t } = useTranslation();
    const { user, updateUser, isLoading: authLoading } = useAuth();
    const { addToast } = useToast();
    
    const [formData, setFormData] = useState(editProfileService.initializeFormData(user));

        const [isLoading, setIsLoading] = useState(false);
        const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(editProfileService.initializeFormData(user));
        }
    }, [user]);

    const handleInputChange = (field, value) => {
        editProfileService.handleInputChange(formData, setFormData, field, value, errors, setErrors);
    };

    const handleCheckboxChange = (field, checked) => {
        editProfileService.handleCheckboxChange(formData, setFormData, field, checked, errors, setErrors);
    };

    const handleTagsChange = (tags) => {
        editProfileService.handleTagsChange(setFormData, tags, errors, setErrors);
    };

    const validateForm = () => {
        const newErrors = editProfileService.validateForm(formData, t);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        if (!validateForm()) {
            addToast(t('editProfile.errors.validationFailed'), 'error', 5000);
            return;
        }
        setIsLoading(true);
        
        try {
            const result = await editProfileService.updateProfile(formData, updateUser, addToast, t);
            if (result.errors) {
                setErrors(result.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!user || authLoading) {
        return <EditProfileLoading />;
    }

    return (
        <ProtectedRoute requireAuth={true}>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <EditProfileHeader />

                    <EditProfileForm
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleTagsChange={handleTagsChange}
                        handleCheckboxChange={handleCheckboxChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default EditProfilePage;
