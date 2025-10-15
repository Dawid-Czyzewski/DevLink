import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const storedUserData = localStorage.getItem('userData');
            
            if (isLoggedIn && storedUserData) {
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
    };

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

    const verifySession = async () => {
        if (!isAuthenticated) return true;
        
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
    };

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

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
        checkAuthStatus,
        verifySession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
