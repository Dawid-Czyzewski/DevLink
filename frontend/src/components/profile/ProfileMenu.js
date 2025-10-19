import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProfileMenu = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	if (isLoading || !user) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
							<div className="animate-pulse">
								<div className="w-12 h-12 bg-gray-700 rounded-xl mb-3"></div>
								<div className="h-6 bg-gray-700 rounded mb-2"></div>
								<div className="h-4 bg-gray-700 rounded w-3/4"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const menuItems = [
		{
			id: 'myAnnouncements',
			title: t('profile.menu.myAnnouncements'),
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			),
			description: t('profile.menu.descriptions.myAnnouncements')
		},
		{
			id: 'chats',
			title: t('profile.menu.chats'),
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
			),
			description: t('profile.menu.descriptions.chats')
		},
		{
			id: 'editProfile',
			title: t('profile.menu.editProfile'),
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>
			),
			description: t('profile.menu.descriptions.editProfile')
		},
		{
			id: 'viewProfile',
			title: t('profile.menu.viewProfile'),
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			),
			description: t('profile.menu.descriptions.viewProfile')
		}
	];

	const handleMenuClick = (itemId) => {
		switch (itemId) {
			case 'myAnnouncements':
				navigate('/my-announcements');
				break;
			case 'chats':
				break;
			case 'editProfile':
				navigate('/edit-profile');
				break;
			case 'viewProfile':
				navigate(`/view-profile/${user.id}`);
				break;
			default:
				break;
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{menuItems.map((item, index) => (
					<button
						key={item.id}
						onClick={() => handleMenuClick(item.id)}
						className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-left border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:bg-gray-800/70 cursor-pointer"
					>
						<div className="flex items-center space-x-6">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300">
									<div className="text-yellow-400 group-hover:text-yellow-300 text-xl">
										{item.icon}
									</div>
								</div>
							</div>

							<div className="flex-1 min-w-0">
								<h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
									{item.title}
								</h3>
								<p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
									{item.description}
								</p>
							</div>

							<div className="flex-shrink-0">
								<svg className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default ProfileMenu;
