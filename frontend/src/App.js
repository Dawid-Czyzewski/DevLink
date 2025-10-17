import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivatePage from './pages/ActivatePage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import ProfilePage from './pages/ProfilePage';
import PostAnnouncementPage from './pages/PostAnnouncementPage';
import EditProfilePage from './pages/EditProfilePage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import ToastContainer from './components/common/ToastContainer';

function AppContent() {
	const { toasts, removeToast } = useToast();

	return (
		<LanguageProvider>
			<HashRouter>
				<AuthProvider>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex-1">
							<Routes>
								<Route path="/login" element={
									<ProtectedRoute requireAuth={false}>
										<LoginPage />
									</ProtectedRoute>
								} />
								<Route path="/register" element={
									<ProtectedRoute requireAuth={false}>
										<RegisterPage />
									</ProtectedRoute>
								} />
								<Route path="/activate" element={<ActivatePage />} />
								<Route path="/registration-success" element={<RegistrationSuccessPage />} />
								<Route path="/profile" element={
									<ProtectedRoute requireAuth={true}>
										<ProfilePage />
									</ProtectedRoute>
								} />
								<Route path="/post-announcement" element={
									<ProtectedRoute requireAuth={true} allowUnauthenticated={true}>
										<PostAnnouncementPage />
									</ProtectedRoute>
								} />
								<Route path="/edit-profile" element={
									<ProtectedRoute requireAuth={true}>
										<EditProfilePage />
									</ProtectedRoute>
								} />
							</Routes>
						</main>
						<Footer />
						<ToastContainer toasts={toasts} onRemoveToast={removeToast} />
					</div>
				</AuthProvider>
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
