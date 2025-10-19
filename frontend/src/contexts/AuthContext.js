import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userService from '../services/userService';
import { apiServiceInstance } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            try {
                return JSON.parse(storedUserData);
            } catch (error) {
                return null;
            }
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAuthError = useCallback(async () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        window.dispatchEvent(new CustomEvent('sessionExpired', { 
            detail: { message: t('auth.sessionExpired') } 
        }));
        
        navigate('/login');
    }, [navigate, t]);

    useEffect(() => {
        apiServiceInstance.setAuthErrorHandler(handleAuthError);
    }, [handleAuthError]);

    const checkAuthStatus = useCallback(async () => {
        try {
            if (window.location.hash.includes('/view-profile/') || 
                window.location.hash.includes('/edit-profile') ||
                window.location.hash.includes('/activate') ||
                window.location.hash.includes('/registration-success')) {
                return;
            }
            
            if (isAuthenticated && user) {
                return;
            }
            
            setIsLoading(true);
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                try {
                    const result = await userService.getCurrentUser();
                    if (result.success && result.user) {
                        setUser(result.user);
                        setIsAuthenticated(true);
                        localStorage.setItem('userData', JSON.stringify(result.user));
                    } else {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userData');
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    const storedUserData = localStorage.getItem('userData');
                    if (storedUserData) {
                        try {
                            const userData = JSON.parse(storedUserData);
                            setUser(userData);
                            setIsAuthenticated(true);
                        } catch (parseError) {
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('userData');
                            setUser(null);
                            setIsAuthenticated(false);
                        }
                    } else {
                        localStorage.removeItem('isLoggedIn');
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, user]);

    const login = async (loginData) => {
        try {
            setIsLoading(true);
            const result = await userService.login(loginData);
            
            if (result.success && result.user) {
                setUser(result.user);
                setIsAuthenticated(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(result.user));
                return { success: true, user: result.user };
            } else {
                return { success: false, message: result.message, errors: result.errors };
            }
        } catch (error) {
            return { success: false, message: error.message || 'login.errors.unexpectedError' };
        } finally {
            setIsLoading(false);
        }
    };

    const verifySession = useCallback(async () => {
        if (!isAuthenticated) return true;
        
        if (window.location.hash.includes('/view-profile/') || 
            window.location.hash.includes('/edit-profile') ||
            window.location.hash.includes('/activate') ||
            window.location.hash.includes('/registration-success')) {
            return true;
        }
        
        if (isAuthenticated && user) {
            return true;
        }
        
        try {
            const result = await userService.getCurrentUser();
            if (!result.success || !result.user) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                navigate('/login');
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }, [isAuthenticated, user, navigate]);

    const logout = async () => {
        try {
            setIsLoading(true);
            await userService.logout();
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
        checkAuthStatus,
        verifySession
    }), [user, isAuthenticated, isLoading, checkAuthStatus, verifySession]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
