import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ActivationContainer from './ActivationContainer';
import ActivationCard from './ActivationCard';
import ActivationIcon from './ActivationIcon';
import ActivationButtons from './ActivationButtons';

const ActivationError = ({ error }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoToHome = () => {
        navigate('/');
    };

    return (
        <ActivationContainer>
            <ActivationCard>
                <ActivationIcon type="error" />
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                    {t('activate.errorTitle')}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                    {t(error || 'activate.errors.unexpectedError')}
                </p>
                <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 text-rose-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{t('activate.status.activationFailed')}</span>
                    </div>
                </div>
                <ActivationButtons
                    type="error"
                    onSecondaryClick={handleGoToHome}
                    secondaryText={t('activate.goToHome')}
                />
            </ActivationCard>
        </ActivationContainer>
    );
};

export default ActivationError;
