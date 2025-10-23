import { useTranslation } from 'react-i18next';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';

const ChatMessages = ({ messages, loading, selectedChat }) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex-1 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 max-h-[500px] overflow-hidden">
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-400/20 border-t-yellow-400 mx-auto mb-4"></div>
                        <p className="text-gray-400">{t('chat.messages.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 flex flex-col max-h-[500px] overflow-hidden">
            <ChatHeader selectedChat={selectedChat} />
            <MessageList messages={messages} />
        </div>
    );
};

export default ChatMessages;
