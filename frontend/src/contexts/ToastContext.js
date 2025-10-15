import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, type = "error", duration = 5000) => {
		const id = Date.now() + Math.random();
		setToasts(prev => [...prev, { id, message, type, duration }]);
	}, []);

	const removeToast = useCallback((id) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const showSuccess = useCallback((message, duration = 5000) => {
		addToast(message, "success", duration);
	}, [addToast]);

	const showError = useCallback((message, duration = 5000) => {
		addToast(message, "error", duration);
	}, [addToast]);

	const showWarning = useCallback((message, duration = 5000) => {
		addToast(message, "warning", duration);
	}, [addToast]);

	return (
		<ToastContext.Provider value={{
			toasts,
			addToast,
			removeToast,
			showSuccess,
			showError,
			showWarning,
		}}>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};
