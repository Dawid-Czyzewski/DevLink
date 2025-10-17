import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthRequired = ({ message, redirectTo = '/login' }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    const handleLoginClick = () => {
        navigate(redirectTo);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
                    <div className="mb-6">
                        <div className="mx-auto w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <svg 
                                className="w-8 h-8 text-yellow-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-4">
                        {t('authRequired.title')}
                    </h1>

                    <p className="text-gray-300 mb-8 leading-relaxed">
                        {message || t('authRequired.message')}
                    </p>

                    <button
                        onClick={handleLoginClick}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
                    >
                        {t('authRequired.loginButton')}
                    </button>

                    <p className="text-sm text-gray-400 mt-6">
                        {t('authRequired.noAccount')}{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-yellow-400 hover:text-yellow-300 underline transition-colors duration-200 cursor-pointer"
                        >
                            {t('authRequired.registerLink')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthRequired;
