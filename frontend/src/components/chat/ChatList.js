import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const ChatList = ({ chats, selectedChatId, onChatSelect, loading, hasNewMessages = {} }) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const formatLastMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
        }
    };

    const getDisplayName = (chat) => {
        if (!user || !chat) return 'Unknown User';
        
        if (user.id === chat.announcement_author_id) {
            return chat.chat_initiator_nickname || 'Unknown User';
        } else {
            return chat.announcement_owner_nickname || 'Unknown User';
        }
    };

    const getChatOptionText = (chat) => {
        const displayName = getDisplayName(chat);
        const lastMessageTime = formatLastMessageTime(chat.last_message?.created_at);
        const lastMessagePreview = chat.last_message ? 
            `${chat.last_message.sender_id === user?.id ? 'ty' : (chat.last_message.sender_nickname || 'Unknown')}: ${chat.last_message.content}` : 
            t('chat.list.noLastMessage');
        
        return `${displayName} - ${lastMessagePreview} (${lastMessageTime})`;
    };

    if (loading) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 sm:p-5 md:p-6 flex flex-col h-full">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">{t('chat.list.title')}</h2>
                <div className="animate-pulse">
                    <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4 md:p-5">
                        <div className="h-4 bg-gray-600 rounded mb-2"></div>
                        <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 sm:p-5 md:p-6 flex flex-col h-full">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">{t('chat.list.title')}</h2>
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center px-2">{t('chat.noChats')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 sm:p-5 md:p-6 lg:p-6 flex flex-col h-full">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold text-white mb-4">{t('chat.list.title')}</h2>

            <div className="flex-1 flex flex-col lg:hidden">
                <select
                    value={selectedChatId || ''}
                    onChange={(e) => {
                        const chatId = parseInt(e.target.value);
                        console.log('Select onChange - value:', e.target.value, 'parsed:', chatId);
                        if (!isNaN(chatId)) {
                            onChatSelect(chatId);
                        }
                    }}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                    disabled={loading}
                >
                    <option value="" disabled>
                        {t('chat.list.selectChat')}
                    </option>
                    {chats.map((chat) => (
                        <option key={chat.id} value={chat.id} className="bg-gray-700 text-white">
                            {getChatOptionText(chat)}
                        </option>
                    ))}
                </select>

                {selectedChatId && (
                    <div className="hidden lg:block mt-4 p-3 sm:p-4 md:p-5 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-medium text-sm sm:text-base md:text-lg truncate">
                                {getDisplayName(chats.find(chat => chat.id === selectedChatId))}
                            </h3>
                            <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0 ml-2">
                                {formatLastMessageTime(chats.find(chat => chat.id === selectedChatId)?.last_message?.created_at)}
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base truncate">
                            {(() => {
                                const selectedChat = chats.find(chat => chat.id === selectedChatId);
                                if (!selectedChat?.last_message) return t('chat.list.noLastMessage');
                                return `${selectedChat.last_message.sender_id === user?.id ? 'ty' : (selectedChat.last_message.sender_nickname || 'Unknown')}: ${selectedChat.last_message.content}`;
                            })()}
                        </p>
                    </div>
                )}
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:flex-col">
                <div className="flex-1 overflow-y-auto space-y-2 chat-scrollbar">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => {
                                console.log('Desktop button clicked - chatId:', chat.id, 'type:', typeof chat.id);
                                onChatSelect(chat.id);
                            }}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                                selectedChatId === chat.id
                                    ? 'bg-yellow-400/20 border border-yellow-400/30'
                                    : hasNewMessages[chat.id]
                                    ? 'bg-blue-500/20 border border-blue-400/30 hover:bg-blue-400/30'
                                    : 'bg-gray-700/50 hover:bg-gray-600/50 border border-transparent'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center">
                                        <h3 className="text-white font-medium truncate">
                                            {getDisplayName(chat)}
                                        </h3>
                                        {hasNewMessages[chat.id] && (
                                            <div className="w-2 h-2 bg-blue-400 rounded-full ml-2 flex-shrink-0"></div>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm truncate">
                                        {chat.last_message ? 
                                            `${chat.last_message.sender_id === user?.id ? 'ty' : (chat.last_message.sender_nickname || 'Unknown')}: ${chat.last_message.content}` : 
                                            t('chat.list.noLastMessage')
                                        }
                                    </p>
                                </div>
                                <div className="flex-shrink-0 ml-3">
                                    <span className="text-xs text-gray-500">
                                        {formatLastMessageTime(chat.last_message?.created_at)}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
