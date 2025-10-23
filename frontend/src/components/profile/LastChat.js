import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import chatService from "../../services/chatService";

const LastChat = () => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [lastChat, setLastChat] = useState(null);
	const [lastMessages, setLastMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchLastChat = async () => {
		try {
			setLoading(true);
			const response = await chatService.getUserChats();
			
			if (response.success && response.data && response.data.chats) {
				const chats = response.data.chats;
				const chatWithLatestMessage = chats.reduce((latest, current) => {

					if (!latest) return current;
					if (!latest.last_message) return current;
					if (!current.last_message) return latest;
					
					const latestTime = new Date(latest.last_message.created_at);
					const currentTime = new Date(current.last_message.created_at);
					
					return currentTime > latestTime ? current : latest;
				}, null);

				if (chatWithLatestMessage) {
					setLastChat(chatWithLatestMessage);
					
					const messagesResponse = await chatService.getChatMessages(chatWithLatestMessage.id, 4, 0);
					if (messagesResponse.success && messagesResponse.data && messagesResponse.data.messages) {
						setLastMessages(messagesResponse.data.messages);
					}
				}
			}
		} catch (error) {
			console.error('Error fetching last chat:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchLastChat();
		}
	}, [user]);

	const formatMessageTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString('pl-PL', { 
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit', 
			minute: '2-digit' 
		});
	};

	const getDisplayName = (chat) => {
		if (!user || !chat) return t('user.unknown');
		
		if (user.id === chat.announcement_author_id) {
			return chat.chat_initiator_nickname || t('user.unknown');
		} else {
			return chat.announcement_owner_nickname || t('user.unknown');
		}
	};

	const handleGoToChat = () => {
		if (lastChat) {
			navigate(`/chats?chatId=${lastChat.id}`);
		}
	};

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
				<div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
					<h2 className="text-xl font-semibold text-white mb-4">{t('profile.lastChat.title')}</h2>
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-400/20 border-t-yellow-400 mx-auto mb-4"></div>
						<p className="text-gray-400">{t('profile.lastChat.loading')}</p>
					</div>
				</div>
			</div>
		);
	}

	if (!lastChat) {
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
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
			<div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-white">{t('profile.lastChat.title')}</h2>
					<button
						onClick={handleGoToChat}
						className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-lg font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
					>
						{t('profile.lastChat.goToChat')}
					</button>
				</div>
				
				<div className="mb-4">
					<div className="flex items-center justify-between mb-1">
						<h3 className="text-lg font-medium text-white">
							{lastChat.announcement_title}
						</h3>
						<button
							onClick={() => navigate(`/view-announcement/${lastChat.announcement_id}`)}
							className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-white text-xs rounded-md transition-all duration-300 cursor-pointer"
						>
							{t('profile.lastChat.viewAnnouncement')}
						</button>
					</div>
					<p className="text-gray-400 text-sm">
						{t('profile.lastChat.with')} {getDisplayName(lastChat)}
					</p>
				</div>

				{lastMessages.length > 0 ? (
					<div className="space-y-3 max-h-64 overflow-y-auto chat-scrollbar">
						{lastMessages
							.slice()
							.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
							.map((message) => {
								const isOwnMessage = message.sender_id === user?.id;
								
								return (
									<div
										key={message.id}
										className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`max-w-xs px-3 py-2 rounded-lg ${
												isOwnMessage
													? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
													: 'bg-gray-700/50 text-white'
											}`}
										>
											<p className={`text-xs mb-1 ${
												isOwnMessage ? 'text-gray-700' : 'text-gray-300'
											}`}>
												{isOwnMessage ? 'ty:' : `${message.sender_nickname || t('messages.unknownSender')}:`}
											</p>
											<p className="text-sm">{message.content}</p>
											<p className={`text-xs mt-1 ${
												isOwnMessage ? 'text-gray-700' : 'text-gray-400'
											}`}>
												{formatMessageTime(message.created_at)}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				) : (
					<div className="text-center py-8">
						<p className="text-gray-400">{t('profile.lastChat.noMessagesInChat')}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default LastChat;
