import { useTranslation } from 'react-i18next';

const EditProfileSubmitButton = ({ isLoading }) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center pt-4">
            <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-gray-900 font-semibold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:transform-none disabled:shadow-none cursor-pointer text-lg"
            >
                {isLoading ? t('editProfile.saving') : t('editProfile.save')}
            </button>
        </div>
    );
};

export default EditProfileSubmitButton;
