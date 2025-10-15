import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import ToastContainer from './components/common/ToastContainer';

function AppContent() {
	const { toasts, removeToast } = useToast();

	return (
		<LanguageProvider>
			<HashRouter>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/registration-success" element={<RegistrationSuccessPage />} />
						</Routes>
					</main>
					<Footer />
					<ToastContainer toasts={toasts} onRemoveToast={removeToast} />
				</div>
			</HashRouter>
		</LanguageProvider>
	);
}

function App() {
	return (
		<ToastProvider>
			<AppContent />
		</ToastProvider>
	);
}

export default App;
