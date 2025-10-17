import { useTranslation } from "react-i18next";

const LastChat = () => {
	const { t } = useTranslation();

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
			<div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
				<h2 className="text-xl font-semibold text-white mb-4">{t('profile.lastChat.title')}</h2>
				<div className="text-center py-12">
					<div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</div>
					<p className="text-gray-400 text-lg">{t('profile.lastChat.noMessages')}</p>
					<p className="text-gray-500 text-sm mt-2">{t('profile.lastChat.startConversation')}</p>
				</div>
			</div>
		</div>
	);
};

export default LastChat;
