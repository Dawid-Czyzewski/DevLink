import { useTranslation } from 'react-i18next';
import ActivationContainer from './ActivationContainer';
import ActivationCard from './ActivationCard';
import ActivationIcon from './ActivationIcon';

const ActivationLoading = () => {
    const { t } = useTranslation();

    return (
        <ActivationContainer>
            <ActivationCard>
                <ActivationIcon type="loading" />
                <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('activate.activating')}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                    {t('activate.activatingMessage')}
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                </div>
            </ActivationCard>
        </ActivationContainer>
    );
};

export default ActivationLoading;
