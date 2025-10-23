import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivatePage from './pages/ActivatePage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import ProfilePage from './pages/ProfilePage';
import PostAnnouncementPage from './pages/PostAnnouncementPage';
import EditProfilePage from './pages/EditProfilePage';
import ViewProfilePage from './pages/ViewProfilePage';
import MyAnnouncementsPage from './pages/MyAnnouncementsPage';
import EditAnnouncementPage from './pages/EditAnnouncementPage';
import ViewAnnouncementPage from './pages/ViewAnnouncementPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import ToastContainer from './components/common/ToastContainer';

function AppContent() {
	const { toasts, removeToast, showError } = useToast();

	useEffect(() => {
		const handleSessionExpired = (event) => {
			showError(event.detail.message);
		};

		window.addEventListener('sessionExpired', handleSessionExpired);

		return () => {
			window.removeEventListener('sessionExpired', handleSessionExpired);
		};
	}, [showError]);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
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
					<Route path="/view-profile/:userId" element={<ViewProfilePage key="view-profile" />} />
					<Route path="/my-announcements" element={
						<ProtectedRoute requireAuth={true}>
							<MyAnnouncementsPage />
						</ProtectedRoute>
					} />
					<Route path="/edit-announcement/:id" element={
						<ProtectedRoute requireAuth={true}>
							<EditAnnouncementPage />
						</ProtectedRoute>
					} />
					<Route path="/view-announcement/:id" element={<ViewAnnouncementPage />} />
					<Route path="/chats" element={
						<ProtectedRoute requireAuth={true}>
							<ChatPage />
						</ProtectedRoute>
					} />
				</Routes>
			</main>
			<Footer />
			<ToastContainer toasts={toasts} onRemoveToast={removeToast} />
		</div>
	);
}

function App() {
	return (
		<HashRouter>
			<LanguageProvider>
				<ToastProvider>
					<AuthProvider>
						<AppContent />
					</AuthProvider>
				</ToastProvider>
			</LanguageProvider>
		</HashRouter>
	);
}

export default App;
