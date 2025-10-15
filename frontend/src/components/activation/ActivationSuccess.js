import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ActivationContainer from './ActivationContainer';
import ActivationCard from './ActivationCard';
import ActivationIcon from './ActivationIcon';
import ActivationButtons from './ActivationButtons';

const ActivationSuccess = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoToHome = () => {
        navigate('/');
    };

    return (
        <ActivationContainer>
            <ActivationCard>
                <ActivationIcon type="success" />
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    {t('activate.successTitle')}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                    {t('activate.successMessage')}
                </p>
                <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 text-emerald-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{t('activate.status.accountActivated')}</span>
                    </div>
                </div>
                <ActivationButtons
                    type="success"
                    onPrimaryClick={handleGoToLogin}
                    onSecondaryClick={handleGoToHome}
                    primaryText={t('activate.goToLogin')}
                    secondaryText={t('activate.goToHome')}
                />
            </ActivationCard>
        </ActivationContainer>
    );
};

export default ActivationSuccess;
