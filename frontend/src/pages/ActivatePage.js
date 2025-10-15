import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userService from '../services/userService';
import { useToast } from '../contexts/ToastContext';
import { ActivationLoading, ActivationSuccess, ActivationError } from '../components/activation';

const ActivatePage = () => {
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (!token) {
            setError('activate.errors.tokenRequired');
            setIsLoading(false);
            return;
        }

        const activateAccount = async () => {
            try {
                const result = await userService.activateAccount(token);
                
                if (result.success) {
                    setIsSuccess(true);
                    addToast(t('activate.successMessage'), 'success', 5000);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('activate.errors.unexpectedError');
            } finally {
                setIsLoading(false);
            }
        };

        activateAccount();
    }, [searchParams, addToast, t]);

    if (isLoading) {
        return <ActivationLoading />;
    }

    if (isSuccess) {
        return <ActivationSuccess />;
    }

    return <ActivationError error={error} />;
};

export default ActivatePage;
